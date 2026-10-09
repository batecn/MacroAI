// /macroai/v 每日活跃设备打点。
//
// App 每次启动请求该路径做版本检查（macroai/utils/updater.py:8），
// 这里旁路记录一条 Analytics Engine 数据点，然后用 context.next() 原样透传
// v.html，官网行为不受任何影响。
//
// 打点口径：index = sha256(常量|日期|IP|UA)。日期参与哈希使索引每天变化，
// 跨天无法关联同一设备，避免长期留存可追踪的用户行为轨迹。
// 因此只保证「同一天内去重」，这正是 DAU 需要的语义。
//
// 只记录请求存在与否，不记录任何用户可控标识，也不回传任何数据。
// 查询方式见主仓库 docs/Cloudflare每日活跃用户统计方案_20260929.md

const SALT_PEPPER = "macroai-edge-v1";

export async function onRequest(context) {
  const req = context.request;
  const ip = req.headers.get("cf-connecting-ip") || "";
  const ua = req.headers.get("user-agent") || "";
  const day = new Date().toISOString().slice(0, 10);

  // 打点失败绝不能影响版本检查 —— App 侧 updater.py 对 HTTP 错误是静默降级，
  // 但 /macroai/v 返回 5xx 仍属对外故障。绑定缺失时 MACRO_DAU 为 undefined，
  // 这里兜住，保证任何情况下都正常透传。
  try {
    context.env.MACRO_DAU.writeDataPoint({
      indexes: [await sha256Hex(`${SALT_PEPPER}|${day}|${ip}|${ua}`)],
      blobs: [req.cf?.colo || "", req.cf?.country || ""],
    });
  } catch (e) {
    console.error("dau tracking failed:", e && e.message);
  }

  return context.next();
}

async function sha256Hex(s) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
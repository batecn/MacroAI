// /macroai/* 版本检查端点的每日活跃打点。
//
// 两个客户端各自请求不同路径做版本检查：
//   Windows  macroai/utils/updater.py:8      https://sowe.com/macroai/v
//   Android  UpdateManager.kt:223            https://www.sowe.com/macroai/a.html
// 两条路径都会先经 Pages clean-URL 重定向，因此 a / a.html 两种形式都收录。
//
// 这里旁路记录一条 Analytics Engine 数据点，然后用 context.next() 原样透传
// 静态文件，两个端的版本检查行为都不受影响。
//
// 打点口径：index = sha256(常量|日期|IP|UA)。
//   · 日期参与哈希 → 索引每天变化，跨天无法关联同一设备，
//     避免长期留存可追踪的用户行为轨迹；只保证「同一天内去重」，
//     这正是 DAU 需要的语义。
//   · 平台不入索引 → 同一 IP 下同时用 Win 和 Android 只算 1 个用户，
//     分平台统计时各自独立计数。总 DAU 不会被重复累加。
//   · 平台作为 blob1 维度存储 → 一条 SQL 即可按平台拆分。
//
// 只记录请求存在与否，不记录任何用户可控标识，也不回传任何数据。
// 查询方式见主仓库 docs/Cloudflare每日活跃用户统计方案_20260929.md

const SALT_PEPPER = "macroai-edge-v1";

const PLATFORMS = {
  v: "win",
  a: "android",
  "a.html": "android",
};

export async function onRequest(context) {
  const platform = PLATFORMS[context.params.check];
  if (platform) {
    const req = context.request;
    const ip = req.headers.get("cf-connecting-ip") || "";
    const ua = req.headers.get("user-agent") || "";
    const day = new Date().toISOString().slice(0, 10);

    // 打点失败绝不能影响版本检查 —— App 侧对 HTTP 错误是静默降级，
    // 但返回 5xx 仍属对外故障。绑定缺失时 MACRO_DAU 为 undefined，
    // 这里兜住，保证任何情况下都正常透传。
    try {
      context.env.MACRO_DAU.writeDataPoint({
        indexes: [await sha256Hex(`${SALT_PEPPER}|${day}|${ip}|${ua}`)],
        blobs: [platform, req.cf?.colo || "", req.cf?.country || ""],
      });
    } catch (e) {
      console.error("dau tracking failed:", e && e.message);
    }
  }

  return context.next();
}

async function sha256Hex(s) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
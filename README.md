[English Version →](./README_EN.md)

# MacroAI

新一代跨平台宏自动化平台（Windows / Android）。

核心定位：**可视化节点编排 + 智能执行 + 脚本跨平台复用**。开发者可使用 MacroAI 制作自动化脚本，分发给其他用户使用。同一份 Lua 脚本和图像模板在 Windows 与 Android 上通用执行，内置的跨分辨率适配能力确保同一脚本在不同屏幕、不同缩放比下稳定运行。

[→ 访问官网](https://sowe.com) · [使用说明](https://sowe.com/macroai/docs/zh/user-guide.html) · [API 参考](https://sowe.com/macroai/docs/zh/api-reference.html)

---

## 📥 下载

### Windows

**微软商店**：[Microsoft Store](https://apps.microsoft.com/store/detail/9P29TVVR182J?cid=DevShareMCLPCS)
**GitHub**：[Releases](https://github.com/batecn/MacroAI/releases)
**Gitee**：[Releases](https://gitee.com/batecn/MacroAI/releases)

### Android

**GitHub**：[Releases](https://github.com/batecn/MacroAI/releases)（APK 直接下载）
**Gitee**：[Releases](https://gitee.com/batecn/MacroAI/releases)（APK 直接下载）

---

## ✨ 核心特点

### 跨平台脚本互通 · 一次编写到处运行

同一份 **Lua 脚本**在 Windows 与 Android 上通用执行，图像模板两平台共享。Windows 版可视化节点编辑器生成的脚本可直接在安卓版运行。

### 可视化节点编辑器 · 无代码/脚本双模式（Windows）

拖拽式**树形容器架构**，20+ 种节点类型，LOOP/CONDITION 作为容器节点支持子节点嵌套，直观展示流程层级。节点操作自动生成 **Lua 代码**，兼顾无代码门槛与脚本扩展灵活性。

### 后台输入模拟 · 不抢占焦点（Windows）

基于 Win32 **PostMessage/SendMessage** 实现后台鼠标键盘操作。脚本在后台静默执行，用户可同时使用电脑做其他事，不受干扰。

### OCR 文字识别 · 零安装零模型

Windows 版利用系统内置 **Windows.Media.Ocr（WinRT）**，Android 版使用 **ML Kit OCR**，均无需下载模型文件，中文 OCR 开箱即用。

### 屏幕变化检测 · 智能过滤

**网格比对 + 时序滤波** 算法，区分有效变化 vs 周期性闪烁（光标、动画）。**条块颜色追踪** 支持血条、进度条等变化监控。

### 多分辨率适配 · 脚本跨设备运行

**uniform/desktop 双模式坐标变换策略** + **DPI 感知**，录制时的设计区域与运行时的实际区域自动映射。同一脚本在不同分辨率、不同缩放比的设备上自动适配坐标位置——这是脚本可复用、可分发的核心技术支撑。

### 无障碍服务驱动 · 无需 Root（Android）

基于 Android **AccessibilityService** 实现自动化点击、滑动等手势操作，无需 Root 权限。图像识别场景按需启用屏幕录制权限。

### 多线程架构 · 流畅不卡顿

脚本在**独立线程**中执行，不阻塞 UI。ActionManager 支持多个自定义动作**并发执行**，音频/弹窗通过 Qt Signal 桥接回主线程，全程流畅。

### IME 输入法兼容 · 中文录制准确（Windows）

录制时通过轮询焦点控件 **WM_GETTEXT diff** 捕获输入法文本，而非直接记录按键事件，确保中文输入法下的录制内容准确完整。

### 中英双语界面 · 国际化支持

完整的中文和英文界面，配套的中/英帮助文档和 API 参考，可在设置中一键切换。

### 完全免费 · 无广告

基础核心功能**永久免费**，无功能阉割、无广告弹窗、无捆绑安装。

---

## 系统要求

### Windows

- Windows 10 / Windows 11（64 位）
- 4GB 及以上内存
- 200MB 及以上磁盘空间
- 支持 DirectX 11 的显卡

### Android

- Android 8.0 及以上版本
- 需开启无障碍服务权限（用于自动化操作）
- 图像识别功能需授权屏幕录制权限
- 约 30MB 存储空间

## 技术栈

### Windows 版

- **GUI**: PySide6
- **OCR**: Windows OCR (WinRT)
- **图像处理**: OpenCV
- **脚本语言**: Lua (lupa)
- **系统操作**: pyautogui（前台）、Win32 API（后台）
- **录制**: pynput
- **音频**: QMediaPlayer、winsound

### Android 版

- **GUI**: Jetpack Compose
- **OCR**: ML Kit OCR
- **图像处理**: OpenCV Android SDK
- **脚本语言**: Lua (luaj)
- **自动化**: AccessibilityService + MediaProjection

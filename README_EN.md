[← 中文版本](./README.md)

# MacroAI

A next-generation Windows macro automation platform.

Core positioning: **Visual node-based workflow + Background execution + Reusable scripts**. Developers can create automation scripts with MacroAI and distribute them to other users. Built-in multi-resolution adaptation ensures the same script runs stably across different screen sizes and scaling settings.

[→ Website](https://sowe.com) · [User Guide](https://sowe.com/macroai/docs/en/user-guide.html) · [API Reference](https://sowe.com/macroai/docs/en/api-reference.html)

---

## 📥 Download

Get the latest release: [/batecn/MacroAI/releases](/batecn/MacroAI/releases)

---

## ✨ Key Features

### Visual Node Editor · No-Code / Script Dual Mode

Drag-and-drop **tree-container architecture** with 20+ node types. LOOP and CONDITION act as container nodes that nest child nodes, showing the flow hierarchy visually. All node operations automatically generate **Lua code** — approachable for non-programmers, extensible for developers.

### Background Input Simulation · Zero Focus Stealing

Leverages Win32 **PostMessage/SendMessage** APIs for background mouse and keyboard operations. Scripts execute silently in the background while you continue using your computer uninterrupted.

### Windows OCR · No Model Download Required

Uses the built-in **Windows.Media.Ocr (WinRT)** API for screen text recognition. No model files to download — Chinese OCR works out of the box.

### Screen Change Detection · Smart Filtering

**Grid-based comparison with temporal filtering** distinguishes meaningful changes from periodic flickering (cursors, animations). **Bar segment color tracking** monitors health bars, progress bars, and similar visual indicators.

### Multi-Resolution Adaptation · Cross-Device Scripts

**Uniform/desktop dual-mode coordinate transformation** with **DPI awareness**. The recording design area is automatically mapped to the runtime actual area. The same script automatically adapts to different resolutions and scaling ratios — the core enabler for script reusability and distribution.

### Multi-Threaded Architecture · Smooth Performance

Scripts execute in a **dedicated thread** without blocking the UI. ActionManager supports **concurrent execution** of multiple custom actions. Audio and dialogs are bridged back to the main thread via Qt Signal.

### IME Input Method Compatibility · Accurate Chinese Recording

Polls the focused control via **WM_GETTEXT diff** during recording to capture IME text, rather than recording raw key events. Ensures accurate Chinese text capture during input method composition.

### Bilingual Interface · Full i18n

Complete Chinese and English UI, with matching help documentation and API reference in both languages. Switch between them in settings with one click.

### Completely Free · No Ads

All core features are **permanently free** — no feature gating, no ad popups, no bundled adware.

---

## System Requirements

- Windows 10 / Windows 11 (64-bit)
- 4GB+ RAM
- 200MB+ disk space
- DirectX 11 compatible graphics card

## Tech Stack

- **GUI**: PySide6
- **OCR**: Windows OCR (WinRT)
- **Image Processing**: OpenCV
- **Scripting**: Lua (lupa)
- **System Interaction**: pyautogui (foreground), Win32 API (background)
- **Recording**: pynput
- **Audio**: QMediaPlayer, winsound

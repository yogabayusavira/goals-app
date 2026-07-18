# Goals App

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white" alt="Rust"/>
  <img src="https://img.shields.io/badge/Tauri-FFC131?style=for-the-badge&logo=tauri&logoColor=black" alt="Tauri"/>
</p>

<p align="center">
  A lightweight floating checklist app — your perfect streaming partner.
</p>

---

## ⬇️ Download

Go to the [**Releases**](https://github.com/yogabayusavira/goals-app/releases) page and grab the latest version:

| Installer | Description |
|-----------|-------------|
| `Goals App_x.x.x_x64-setup.exe` | ✅ Recommended — standard Windows installer |
| `Goals App_x.x.x_x64_en-US.msi` | Alternative MSI package |

Run the installer and follow the setup wizard. That's it — no extras needed.

> **Windows may prompt for WebView2 Runtime.** Most Windows 10/11 systems already have it. If not, it will be downloaded automatically during setup.

---

## 🎮 How to Use

| Action | How |
|--------|-----|
| Edit title or subtitle | Click on it, type, press `Enter` or click away to save |
| Add a goal | Type in the bottom input field and press `Enter` |
| Complete a goal | Click the circle checkbox next to it |
| Reorder goals | Drag using the handle on the left |
| Delete a goal | Hover over it and click the `✕` button |

---

## 💾 Where is my data saved?

All your goals are stored locally in a file called `goals.json`. No accounts, no cloud, no telemetry.

**Location on Windows:**
```
C:\Users\<YourName>\AppData\Roaming\com.goalsapp.app\goals.json
```

You can back this file up or copy it to another machine at any time.

---

## 📺 Using with OBS (Streaming Overlay)

**Goals App** is designed to sit neatly in your stream as a floating overlay. Here's how to set it up:

1. **Open Goals App** — make sure it's running and visible on your screen.
2. **In OBS**, go to the **Sources** panel and click **`+`**.
3. Select **Window Capture**.
4. Name the source (e.g. `Goals App`) and click **OK**.
5. In the **Window** dropdown, select **`Goals App`** from the list of open windows.
6. Click **OK**.
7. **Resize and position** the capture in your OBS scene to where you want it on stream.

> **Tip:** Right-click the source in OBS → **Filters** → add a **Color Key** or **Chroma Key** filter if you want to remove the app background and show only the checklist content.

---

## 🗺️ Future Roadmap

- Pre-built themes
- Custom user-defined colors and styling

---

> Want to contribute or build from source? See [CONTRIBUTING.md](CONTRIBUTING.md).

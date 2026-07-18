# Goals App

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white" alt="Rust"/>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
  <img src="https://img.shields.io/badge/Tauri-FFC131?style=for-the-badge&logo=tauri&logoColor=black" alt="Tauri"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
</p>

Goals App is a lightweight, local-first checklist app designed to be your perfect streaming partner. It runs as a tiny floating window that fits beautifully on any streaming overlay or desktop workspace.

It works offline, stores data locally, and does not use databases, cloud services, authentication, or telemetry.

## Download & Install

Go to the [Releases](https://github.com/yogabayusavira/goals-app/releases) page and download the latest installer:

- **`Goals App_x.x.x_x64-setup.exe`** — Recommended standard installer (NSIS)
- **`Goals App_x.x.x_x64_en-US.msi`** — Alternative MSI package

Run the installer and follow the setup wizard. No Node.js or Rust required.

> **Note:** Windows may require [WebView2 Runtime](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) to be installed. Most up-to-date Windows 10/11 systems already have it.

## Controls

- **Click** the title or subtitle to edit it. Press `Enter` or click away to save.
- **Type** in the bottom input field and press `Enter` to add a goal.
- **Click** the checkbox next to a goal to mark it complete.
- **Drag** the handle to reorder goals.
- **Hover** a goal and click `✕` to delete it.

## Storage

Your data is saved automatically to `goals.json` in your system's AppData directory:

```
C:\Users\<YourName>\AppData\Roaming\com.goalsapp.app\goals.json
```

## Future Roadmap

Once the core MVP is complete, we plan to explore adding pre-built themes, or even custom user-defined styling and colors.

---

## Building from Source

Only needed if you want to contribute or build the app yourself.

**Requirements:**
- Node.js 18 or newer
- Rust (stable)

```bash
npm install
npm run tauri dev    # development
npm run tauri build  # production build
```

The installer outputs to `src-tauri/target/release/bundle/`.

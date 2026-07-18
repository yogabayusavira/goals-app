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

Built with Tauri v2, Vite, TypeScript, vanilla HTML/CSS/TypeScript, and a minimal Rust backend.

It works offline, stores data in `goals.json`, and does not use localStorage, databases, cloud services, authentication, or telemetry.

## Requirements

- Node.js 18 or newer
- Rust stable
- Windows WebView2 Runtime

## Install

```bash
npm install
```

## Run in development

```bash
npm run tauri dev
```

## Build for Windows

```bash
npm run tauri build
```

The Windows installer and executable are generated under `src-tauri/target/release/bundle`.

## Storage

During development, Goals App reads and writes `goals.json` in the app data directory managed by Tauri.

The Rust storage layer is isolated in `src-tauri/src/storage.rs`. To store `goals.json` next to the packaged executable later, update `goals_file_path` in that file to resolve from the executable directory instead of the app data directory.

The stored file shape is:

```json
{
  "title": "MVP by Monday",
  "subtitle": "Cold Calling App",
  "goals": [
    {
      "id": "goal-1",
      "text": "Finalize user flow",
      "completed": false,
      "order": 0
    }
  ]
}
```

## Controls

- Click the title or subtitle to edit.
- Press Enter or blur the field to save text edits.
- Click a checkbox to complete a goal.
- Drag the handle to reorder goals.
- Hover a goal and click `X` to delete.
- Type in the bottom field and press Enter to add a goal.

## Future Roadmap
Once the core MVP is complete, we plan to explore adding pre-built themes, or even custom user-defined styling and colors.

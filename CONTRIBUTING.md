# Contributing to Goals App

This guide is for developers who want to build, run, or contribute to Goals App.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | TypeScript, HTML5, CSS3 |
| Desktop runtime | [Tauri v2](https://v2.tauri.app/) |
| Build tool | [Vite](https://vitejs.dev/) |
| Backend | Rust (minimal, storage only) |

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- [Rust](https://rustup.rs/) (stable toolchain)
- [WebView2 Runtime](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) (Windows — usually already installed)

---

## 🚀 Getting Started

```bash
# Install JS dependencies
npm install

# Run in development mode (hot-reload)
npm run tauri dev

# Build production installer
npm run tauri build
```

Build output lands in:
```
src-tauri/target/release/bundle/
├── nsis/   ← Goals App_x.x.x_x64-setup.exe
└── msi/    ← Goals App_x.x.x_x64_en-US.msi
```

---

## 📁 Project Structure

```
Goals/
├── index.html              # App shell HTML
├── src/
│   ├── main.ts             # Entry point
│   ├── board.ts            # UI logic (goals, editing, drag/drop)
│   ├── storage.ts          # JS storage layer (Tauri IPC / localStorage fallback)
│   ├── types.ts            # Shared TypeScript types
│   ├── icons.ts            # Lucide icon bootstrap
│   └── styles.css          # All styles
└── src-tauri/
    ├── tauri.conf.json     # App config (name, version, window, bundle)
    ├── Cargo.toml          # Rust package metadata
    └── src/
        ├── main.rs         # Rust binary entry point
        ├── lib.rs          # Tauri commands registration
        ├── models.rs       # Rust data models
        └── storage.rs      # Rust file I/O (reads/writes goals.json)
```

---

## 💾 Storage

In production, data is saved to:
```
C:\Users\<User>\AppData\Roaming\com.goalsapp.app\goals.json
```

The Rust storage layer lives in `src-tauri/src/storage.rs`. To change the save location (e.g. save next to the executable), update `goals_file_path()` in that file.

The JSON shape is:
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

---

## 🔖 Versioning & Releases

Before each build, bump the version in all three places:

- `package.json`
- `src-tauri/Cargo.toml`
- `src-tauri/tauri.conf.json`

After a successful build:
```bash
git add -A
git commit -m "chore: bump version to x.x.x"
git tag vx.x.x
git push origin main --tags
```

Then create a GitHub Release from that tag and attach both installer files.

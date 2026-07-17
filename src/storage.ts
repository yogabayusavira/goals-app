import type { FocusBoardData } from "./types";

const STORAGE_KEY = "focus_board_data";

const DEFAULT_BOARD: FocusBoardData = {
  title: "MVP by Monday",
  subtitle: "Cold Calling App",
  goals: [],
};

/** Returns true when running inside the real Tauri desktop shell. */
function isTauri(): boolean {
  return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

async function tauriInvoke<T>(cmd: string, args?: Record<string, unknown>): Promise<T> {
  const { invoke } = await import("@tauri-apps/api/core");
  return invoke<T>(cmd, args);
}

export async function loadBoard(): Promise<FocusBoardData> {
  if (isTauri()) {
    return tauriInvoke<FocusBoardData>("load_board");
  }

  // Browser fallback — use localStorage
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FocusBoardData) : { ...DEFAULT_BOARD };
  } catch {
    return { ...DEFAULT_BOARD };
  }
}

export async function saveBoard(data: FocusBoardData): Promise<void> {
  if (isTauri()) {
    await tauriInvoke("save_board", { data });
    return;
  }

  // Browser fallback — persist to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

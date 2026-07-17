mod models;
mod storage;

use models::FocusBoardData;
use storage::{load_board_from_disk, save_board_to_disk, StorageError};

#[tauri::command]
fn load_board(app: tauri::AppHandle) -> Result<FocusBoardData, StorageError> {
    load_board_from_disk(&app)
}

#[tauri::command]
fn save_board(app: tauri::AppHandle, data: FocusBoardData) -> Result<(), StorageError> {
    save_board_to_disk(&app, &data)
}

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![load_board, save_board])
        .run(tauri::generate_context!())
        .expect("error while running Focus Board");
}

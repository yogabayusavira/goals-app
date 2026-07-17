use crate::models::FocusBoardData;
use std::{fs, path::PathBuf};
use tauri::{AppHandle, Manager};
use thiserror::Error;

#[derive(Debug, Error)]
pub enum StorageError {
    #[error("could not resolve the app data directory")]
    AppDataUnavailable,
    #[error("could not create the app data directory: {0}")]
    CreateDirectory(String),
    #[error("could not read goals.json: {0}")]
    Read(String),
    #[error("could not parse goals.json: {0}")]
    Parse(String),
    #[error("could not write goals.json: {0}")]
    Write(String),
    #[error("could not serialize goals.json: {0}")]
    Serialize(String),
}

impl serde::Serialize for StorageError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}

pub fn load_board_from_disk(app: &AppHandle) -> Result<FocusBoardData, StorageError> {
    let path = goals_file_path(app)?;

    if !path.exists() {
        let defaults = FocusBoardData::default();
        save_board_to_path(&path, &defaults)?;
        return Ok(defaults);
    }

    let contents = fs::read_to_string(&path).map_err(|error| StorageError::Read(error.to_string()))?;
    serde_json::from_str(&contents).map_err(|error| StorageError::Parse(error.to_string()))
}

pub fn save_board_to_disk(app: &AppHandle, data: &FocusBoardData) -> Result<(), StorageError> {
    let path = goals_file_path(app)?;
    save_board_to_path(&path, data)
}

fn save_board_to_path(path: &PathBuf, data: &FocusBoardData) -> Result<(), StorageError> {
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent).map_err(|error| StorageError::CreateDirectory(error.to_string()))?;
    }

    let contents = serde_json::to_string_pretty(data).map_err(|error| StorageError::Serialize(error.to_string()))?;
    fs::write(path, contents).map_err(|error| StorageError::Write(error.to_string()))
}

pub fn goals_file_path(app: &AppHandle) -> Result<PathBuf, StorageError> {
    let directory = app
        .path()
        .app_data_dir()
        .map_err(|_| StorageError::AppDataUnavailable)?;

    Ok(directory.join("goals.json"))
}

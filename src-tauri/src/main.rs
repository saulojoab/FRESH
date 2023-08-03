// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;                    
use std::time::SystemTime;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn goodbye(name: &str) -> String {
    format!("Well, {}, see you later!", name)
}

#[tauri::command]
fn log_message(message: &str) {
    println!("{}", message);
}

#[tauri::command]
fn modified_time(file_path: String) -> Result<SystemTime, String> {
    modified_time_of(file_path).map_err(|err| err.to_string())        // separate function to change either error to String
}

#[tauri::command]
fn delete_folder(folder_path: String) -> Result<(), String> {
    fs::remove_dir_all(folder_path).map_err(|err| err.to_string())   // separate function to change either error to String
}

fn modified_time_of(file_path: String) -> Result<SystemTime, std::io::Error> {
  let meta = fs::metadata(file_path)?;
  meta.modified()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, goodbye, log_message, modified_time, delete_folder])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{fs, alloc::System};                    
use std::time::SystemTime;
use chrono::prelude::{DateTime, Utc};

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

fn modified_time_of(file_path: String) -> Result<SystemTime, std::io::Error> {
  let meta = fs::metadata(file_path)?;
  meta.modified()
}

fn iso8601(st: &std::time::SystemTime) -> String {
    let dt: DateTime<Utc> = st.clone().into();
    format!("{}", dt.format("%+"))
    // formats like "2001-07-08T00:34:60.026490+09:30"
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, goodbye, log_message, modified_time])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

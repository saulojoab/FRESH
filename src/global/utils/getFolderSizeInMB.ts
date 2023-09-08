import { invoke } from "@tauri-apps/api";
import { FileEntry } from "@tauri-apps/api/fs";

async function getFolderSizeInMB(entry: FileEntry) {
  const size = (await invoke("get_folder_size", {
    folderPath: entry.path,
  })) as number;

  return (size / 1000000).toFixed(2);
}

export default getFolderSizeInMB;

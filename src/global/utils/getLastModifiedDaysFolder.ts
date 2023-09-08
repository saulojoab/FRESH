import { invoke } from "@tauri-apps/api";
import { FileEntry } from "@tauri-apps/api/fs";

async function getDaysSinceLastModified(entry: FileEntry) {
  const lastModified = (await invoke("modified_time", {
    filePath: entry.path,
  })) as { nanos_since_epoch: number; secs_since_epoch: number };

  const lastModifiedDate = new Date(0);

  lastModifiedDate.setUTCSeconds(lastModified.secs_since_epoch);

  return Math.floor(
    (Date.now() - lastModifiedDate.getTime()) / (1000 * 60 * 60 * 24)
  );
}

export default getDaysSinceLastModified;

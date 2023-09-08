import { FolderWithMetadata } from "@/containers/FolderList";
import { FileEntry } from "@tauri-apps/api/fs";
import getFolderSizeInMB from "./getFolderSizeInMB";
import getDaysSinceLastModified from "./getLastModifiedDaysFolder";

async function checkAllGitRepositoriesFolders(entries: FileEntry[]) {
  const childPathsFromFolder: FolderWithMetadata[] = [];

  async function traverse(node: FileEntry) {
    if (node.children) {
      for (const child of node.children) {
        if (child.name?.endsWith(".git")) {
          const pathWithoutGit = child.path.replace(".git", "");

          childPathsFromFolder.push({
            name: child.path.split("\\")[child.path.split("\\").length - 2],
            path: pathWithoutGit,
            size: await getFolderSizeInMB({ ...child, path: pathWithoutGit }),
            lastModified: await getDaysSinceLastModified({
              ...child,
              path: pathWithoutGit,
            }),
          });
        }

        await traverse(child);
      }
    }
  }

  for (const entry of entries) {
    await traverse(entry);
  }

  return childPathsFromFolder;
}

export default checkAllGitRepositoriesFolders;

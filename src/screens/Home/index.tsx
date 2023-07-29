import { useState } from "react";
import { open } from "@tauri-apps/api/dialog";
import { FileEntry, readDir } from "@tauri-apps/api/fs";
import { invoke } from "@tauri-apps/api";
import styled, { useTheme } from "styled-components";
import { FaCog, FaFolder } from "react-icons/fa";

import FolderListContainer, {
  FolderWithMetadata,
} from "@/containers/FolderList";

function App() {
  const [path, setPath] = useState("");
  const [childPaths, setChildPaths] = useState<FolderWithMetadata[]>([
    {
      name: "test",
      path: "test",
      lastModified: 0,
    },
    {
      name: "test",
      path: "test2",
      lastModified: 15,
    },
    {
      name: "test",
      path: "test3",
      lastModified: 30,
    },
  ]);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  async function openDialog() {
    const selected = (await open({
      directory: true,
      multiple: false,
      defaultPath: "C:\\",
    })) as string;

    if (selected) {
      setPath(selected);
    }

    setLoading(true);
    const entries = await readDir(selected, { recursive: true });

    const allRepositories = await checkGitRepositories(entries);
    setChildPaths(allRepositories);
    setLoading(false);
  }

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

  async function checkGitRepositories(entries: FileEntry[]) {
    const childPathsFromFolder: FolderWithMetadata[] = [];

    async function traverse(node: FileEntry) {
      if (node.children) {
        for (const child of node.children) {
          if (child.name?.endsWith(".git")) {
            const pathWithoutGit = child.path.replace(".git", "");
            childPathsFromFolder.push({
              name: child.path.split("\\")[child.path.split("\\").length - 2],
              path: pathWithoutGit,
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

  return (
    <Container>
      <TopBar>
        <SettingsButton color={theme.colors.white} size={20} />
      </TopBar>

      <Button onClick={openDialog}>
        <FaFolder />
        Select Folder
      </Button>

      <p>{path}</p>
      {!loading && <FolderListContainer childPaths={childPaths} />}
    </Container>
  );
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundDark};
  margin: 0;
  padding-top: 10vh;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.black};
  width: 100%;
  padding: 10px;
  position: fixed;
  top: 0;
  right: 0;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 1px solid transparent;

  &:hover {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.white};
  }
`;

const SettingsButton = styled(FaCog)`
  transition: all 0.5s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: rotate(360deg);
  }
`;

export default App;

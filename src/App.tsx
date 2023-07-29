import { useState } from "react";
import { open } from "@tauri-apps/api/dialog";
import "./App.css";
import { FileEntry, readDir } from "@tauri-apps/api/fs";
import { invoke } from "@tauri-apps/api";
import styled from "styled-components";
import clamp from "./global/utils/clamp";

interface FolderWithMetadata {
  name?: string;
  path: string;
  lastModified: number;
}

function App() {
  const [path, setPath] = useState("");
  const [childPaths, setChildPaths] = useState<FolderWithMetadata[]>([]);

  interface Color {
    r: number;
    g: number;
    b: number;
  }

  function calculateColorBetween(percentage: number) {
    const green = { r: 144, g: 238, b: 144 } as Color;
    const red = { r: 255, g: 0, b: 0 } as Color;

    // calculates color between green and red based on percentage
    const color = {
      r: Math.floor((red.r - green.r) * (percentage / 30) + green.r) as number,
      g: Math.floor((red.g - green.g) * (percentage / 30) + green.g) as number,
      b: Math.floor((red.b - green.b) * (percentage / 30) + green.b) as number,
    } as Color;

    return `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
  }

  function checkFreshLevel(days: number) {
    if (days < 7) {
      return "FRESH";
    }

    if (days < 15) {
      return "NORMAL";
    }

    return "STALE";
  }

  async function openDialog() {
    const selected = (await open({
      directory: true,
      multiple: false,
      defaultPath: "C:\\",
    })) as string;

    if (selected) {
      setPath(selected);
    }

    const entries = await readDir(selected, { recursive: true });

    console.log("starting");
    const allRepositories = await checkGitRepositories(entries);
    setChildPaths(allRepositories);
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
            childPathsFromFolder.push({
              name: child.path.split("\\")[child.path.split("\\").length - 2],
              path: child.path.replace(".git", ""),
              lastModified: await getDaysSinceLastModified(child),
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
      <h1>Welcome to Tauri!</h1>

      <Button onClick={openDialog}>Open dialog</Button>

      <p>{path}</p>
      <FolderList>
        {childPaths.map((childPath) => (
          <FolderContainer>
            <FolderLeftStatus
              linearColor={calculateColorBetween(
                clamp(childPath.lastModified, 0, 30)
              )}
            />
            <FolderName>{childPath.name}</FolderName>
            <FolderPath>{childPath.path}</FolderPath>
            <span>Last accessed: {childPath.lastModified} days</span>
          </FolderContainer>
        ))}
      </FolderList>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  padding-top: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 100vh;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FolderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: white;
  margin: 10px;
`;

interface FolderProps {
  linearColor: string;
}

const FolderLeftStatus = styled.div<FolderProps>`
  height: 100%;
  width: 10px;
  background: ${({ linearColor }) => linearColor};
`;

const FolderName = styled.span`
  font-size: 20px;
  margin: 10px;
`;

const FolderPath = styled.span`
  font-size: 15px;
  margin: 10px;
`;

const FolderList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: scroll;
`;

export default App;

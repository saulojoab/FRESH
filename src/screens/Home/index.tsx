import { useState } from "react";
import { open } from "@tauri-apps/api/dialog";
import { readDir } from "@tauri-apps/api/fs";
import { invoke } from "@tauri-apps/api";
import styled, { useTheme } from "styled-components";
import { FaCog, FaFolder } from "react-icons/fa";

import FolderListContainer, {
  FolderWithMetadata,
} from "@/containers/FolderList";
import checkAllGitRepositoriesFolders from "@/global/utils/checkAllGitRepositoriesFolders";

function App() {
  const [path, setPath] = useState("");
  const [childPaths, setChildPaths] = useState<FolderWithMetadata[]>([]);
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

    const allRepositories = await checkAllGitRepositoriesFolders(entries);
    setChildPaths(allRepositories);
    setLoading(false);
  }

  async function deleteFolder(path: string) {
    //console.log("deleting", path);
    await invoke("delete_folder", { folderPath: path });
    setChildPaths(childPaths.filter((childPath) => childPath.path !== path));
  }

  if (loading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <TopBar>
        <SettingsButton color={theme.colors.white} size={20} />
      </TopBar>

      {!childPaths.length && (
        <Button onClick={openDialog}>
          <FaFolder />
          Select Folder
        </Button>
      )}

      {!!childPaths.length && (
        <DefaultFolderPathContainer>
          <DefaultFolderPathText>
            All repositories in<PathText>{path}</PathText>
          </DefaultFolderPathText>
        </DefaultFolderPathContainer>
      )}

      {!loading && !!childPaths.length && (
        <FolderListContainer
          deleteFolder={deleteFolder}
          childPaths={childPaths}
        />
      )}
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

const DefaultFolderPathText = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.5rem;
  font-family: ${({ theme }) => theme.fonts.lightItalic};
`;

const PathText = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.5rem;
  font-family: ${({ theme }) => theme.fonts.boldItalic};
  margin-left: 10px;
`;

const DefaultFolderPathContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-top: -10px;
`;

export default App;

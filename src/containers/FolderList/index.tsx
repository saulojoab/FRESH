import calculateColorBetween from "@/global/utils/calculateColorsBetween";
import clamp from "@/global/utils/clamp";
import styled from "styled-components";
import {
  FaFolder,
  FaLeaf,
  FaSmile,
  FaExclamationTriangle,
} from "react-icons/fa";

interface FolderListProps {
  childPaths: FolderWithMetadata[];
}

export interface FolderWithMetadata {
  name?: string;
  path: string;
  lastModified: number;
}

export default function FolderListContainer({ childPaths }: FolderListProps) {
  function checkFreshLevel(days: number) {
    if (days < 7) {
      return (
        <>
          <FaLeaf />
          FRESH
        </>
      );
    }

    if (days <= 15) {
      return (
        <>
          <FaSmile />
          NORMAL
        </>
      );
    }

    return (
      <>
        <FaExclamationTriangle />
        STALE
      </>
    );
  }

  return (
    <FolderList>
      <tr>
        <th>Folder</th>
        <th>Path</th>
        <th>Status</th>
        <th>Last Accessed</th>
      </tr>
      {childPaths
        .sort((a, b) => b.lastModified - a.lastModified)
        .map((childPath) => (
          <tr>
            <NameSectionContainer>
              <FolderIconContainer
                backgroundColor={calculateColorBetween(
                  clamp(childPath.lastModified, 0, 30)
                )}
              >
                <FaFolder />
              </FolderIconContainer>
              <FolderName>{childPath.name}</FolderName>
            </NameSectionContainer>

            <SectionContainer>
              <FolderPath>{childPath.path}</FolderPath>
            </SectionContainer>
            <SectionContainer>
              <StatusBadge
                backgroundColor={calculateColorBetween(
                  clamp(childPath.lastModified, 0, 30)
                )}
              >
                {checkFreshLevel(childPath.lastModified)}
              </StatusBadge>
            </SectionContainer>
            <SectionContainer>
              <LastAccessed>
                <b>Last modified:</b> {childPath.lastModified} days ago
              </LastAccessed>
            </SectionContainer>
          </tr>
        ))}
    </FolderList>
  );
}

const FolderList = styled.table`
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  border-spacing: 0px;

  th {
    font-size: 14px;
    font-family: ${({ theme }) => theme.fonts.bold};
    padding: 10px;
  }

  tr:not(:first-child) {
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryLight};
    }
  }

  td {
    padding: 10px;
  }
`;

const LastAccessed = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray};
`;

const SectionContainer = styled.td`
  text-align: center;
`;

const NameSectionContainer = styled.td`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FolderIconContainer = styled.div<{ backgroundColor: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  min-width: 40px;
  min-height: 40px;

  background-color: ${({ backgroundColor }) =>
    backgroundColor.replace("1)", "0.5)")};
`;

const StatusBadge = styled.div<{ backgroundColor: string }>`
  height: 20px;
  min-width: 100px;
  border-radius: 5px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-family: ${({ theme }) => theme.fonts.bold};
  gap: 5px;
`;

interface FolderProps {
  linearColor: string;
}

const FolderName = styled.span`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.blackItalic};
  margin-left: 10px;
  text-align: left;
  max-width: 100px;
`;

const FolderPath = styled.span`
  font-size: 12px;
  margin: 10px;
  flex: 1;
`;

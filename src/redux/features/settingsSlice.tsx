import { createSlice } from "@reduxjs/toolkit";

export interface SettingsProps {
  darkMode?: boolean;
  selectedFolder?: string;
}

const initialState: SettingsProps = {
  darkMode: true,
  selectedFolder: "",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    },
    setSelectedFolder: (state, action) => {
      return {
        ...state,
        selectedFolder: action.payload,
      };
    },
    resetSettingss: () => initialState,
  },
});

export const { resetSettingss, setSelectedFolder, toggleDarkMode } =
  settingsSlice.actions;
export default settingsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

// type Theme = "light" | "dark";

enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

type InitialState = {
  theme: Theme;
};

const initialState: InitialState = {
  theme: Theme.LIGHT,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.theme = state.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;

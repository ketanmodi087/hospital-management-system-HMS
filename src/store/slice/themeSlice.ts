import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    themeMode: "light",
    palette: {
      primary: "#577EC6",
    },
    mode: "light",
    // components: {
    //   ListItemText: {
    //     styleOverrides: {
    //       root:{

    //       }
    //     },
    //   },
    // },
  },
  reducers: {
    manageTheme: (state, { payload }) => {
      state.themeMode = payload;
      localStorage.setItem("theme", state.themeMode || "light");
      if (state.themeMode === "dark") {
        state.palette = {
          primary: "#524f4f",
        };
      } else {
        state.palette = {
          primary: "#577EC6",
        };
      }
    },
  },
});

export const { manageTheme } = themeSlice.actions;
export default themeSlice.reducer;

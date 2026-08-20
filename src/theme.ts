import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 1920,
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    fontSize: 24,
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontWeight: "inherit",
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px', // or any value you like
          boxShadow: 'none', // Remove default shadow
        },
      },
    }, MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '5px', // Rounded papers (e.g., Cards, Dialogs)
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '5px', // Rounded cards
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        root: {
          // Styles for the Select input box
          backgroundColor: '#f9f9f9',
          borderRadius: 5,
          padding: '0px',
        },
        icon: {
          // Style for the dropdown arrow icon
          color: '#555',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          // Styles for the dropdown container
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          // Styles for each dropdown item
          fontSize: '14px',
          padding: '6px 12px',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#009bab',
    },
    secondary: {
      main: '#abdfe1',
    },
    background: {
      default: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#00749b',
    },
  },
});

export default theme;

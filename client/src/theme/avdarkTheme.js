import { createTheme } from "@mui/material/styles";

export const themeColor = {
  primary: {
    100: "#d4d3d8",
    200: "#a9a7b1",
    300: "#7e7c8a",
    400: "#535063",
    500: "#28243c",
    600: "#201d30",
    700: "#181624",
    800: "#100e18",
    900: "#08070c",
  },
  secondary: {
    100: "#e8ddfd",
    200: "#d2bbfc",
    300: "#bb99fa",
    400: "#a577f9",
    500: "#8e55f7",
    600: "#7244c6",
    700: "#553394",
    800: "#392263",
    900: "#1c1131",
  },
  grey: {
    0: "#ffffff",
    100: "#f5f5fa",
    200: "#ecebf4",
    300: "#e2e0ef",
    400: "#d9d6e9",
    500: "#cfcce4",
    600: "#a6a3b6",
    700: "#7c7a89",
    800: "#53525b",
    900: "#29292e",
    1000: "#000000",
  },
};

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      ...themeColor.primary,
      main: themeColor.primary[400],
    },
    secondary: {
      ...themeColor.secondary,
      main: themeColor.secondary[300],
    },
    neutral: {
      ...themeColor.grey,
      main: themeColor.grey[500],
    },
    background: {
      default: themeColor.primary[600],
      alt: themeColor.primary[500],
    },
    text: {
      primary: themeColor.grey[500],
    },
  },
  typography: {
    fontFamily: ["Noto Sans KR", "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontWeight: 700,
      fontSize: 40,
    },
    h2: {
      fontWeight: 700,
      fontSize: 32,
    },
    h3: {
      fontWeight: 600,
      fontSize: 24,
    },
    h4: {
      fontWeight: 500,
      fontSize: 20,
    },
    h5: {
      fontWeight: 500,
      fontSize: 18,
    },
    h6: {
      fontWeight: 400,
      fontSize: 16,
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: 14,
    },
    subtitle2: {
      fontWeight: 300,
      fontSize: 12,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {},
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: themeColor.primary[600],
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: themeColor.primary[500],
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: themeColor.primary[600],
        },
        bar: {
          backgroundColor: themeColor.secondary[500],
        },
      },
    },
    MuiTimelineConnector: {
      styleOverrides: {
        root: {
          backgroundColor: themeColor.primary[400],
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: "#312D4A",
          borderColor: "#3F3B57",
        },
        columnHeaders: {
          backgroundColor: "#3D3758",
          fontSize: "12px",
          borderBottom: "0px !important",
        },
        iconSeparator: {
          color: "transparent",
        },
        withBorderColor: {
          borderColor: "#3F3B57",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          left: "auto",
          width: "auto",
        },
        drawerPaper: {
          backgroundColor: themeColor.primary[500],
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: themeColor.grey[500],
        },
      },
    },
  },
});

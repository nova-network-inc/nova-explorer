import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
// import grey from "@material-ui/core/colors/grey";

export const lightTheme = responsiveFontSizes(createMuiTheme({
  props: {
    MuiAppBar: {
      position: "sticky",
    },
    MuiCard: {
      elevation: 0,
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        background: "#EAEBED !important",
      },
    },
  },
  palette: {
    secondary: {
      main: "#EAEBED",
    },
    background: {
      default: "#F7F8FA",

    },
  },
}));

export const darkTheme = responsiveFontSizes(createMuiTheme({
  props: {
    MuiAppBar: {
      position: "sticky",
    },
    MuiCard: {
      elevation: 0,
    },
  },
  palette: {
    type: "dark",
    secondary: {
      main: "#FFF",
    },
    background: {
      default: "#2C2F36",
      paper: "#2A2D33",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        background: "#2A2D33 !important",
      },
    },
    MuiTable: {
      root: {
        background: "transparent !important",
      },
    },
    MuiTypography: {
      root: {
        color: '#FFF',
      },
    },
  },
}));

export default {
  darkTheme,
  lightTheme,
};

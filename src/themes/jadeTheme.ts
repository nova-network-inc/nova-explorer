import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

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
        background: "#fff !important",
      },
    },
  },
  palette: {
    secondary: {
      main: "#333",
    },
    background: {
      default: "#F8F8F8",

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
      default: "#222431",
      paper: "#2C2E3F",
    },
  },
  overrides: {
    MuiTable: {
      root: {
        background: "transparent !important",
      },
    },
    MuiTypography: {
      root: {
        color: grey[400],
      },
    },
  },
}));

export default {
  darkTheme,
  lightTheme,
};

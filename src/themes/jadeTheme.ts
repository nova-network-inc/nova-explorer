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
        background: "#ECF1F9 !important",
      },
    },
  },
  palette: {
    secondary: {
      main: "#333",
    },
    background: {
      default: "#E3E8F4",

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
      default: "#222",
      paper: "#333",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        background: "#444 !important",
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

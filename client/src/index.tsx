import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PaletteMode } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      ...green,
      ...(mode === "dark" && {
        main: green.A700,
      }),
    },
    ...(mode === "dark" && {
      background: {
        default: grey[800],
        paper: grey[800],
      },
    }),
    text: {
      ...(mode === "light"
        ? {
            primary: grey[900],
            secondary: grey[800],
          }
        : {
            primary: "#fff",
            secondary: grey[500],
          }),
    },
  },
});

const darkModeTheme = createTheme(getDesignTokens("dark"));

ReactDOM.render(
  <ThemeProvider theme={darkModeTheme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

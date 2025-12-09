// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",
            white: "#f5f5f5",
        },
        secondary: {
            main: "#9c27b0", // purple
        },
    },
    typography: {
        fontFamily: "Arial, sans-serif",
        h1: {
            fontSize: "2.5rem",
        },
    },
});

export default theme;

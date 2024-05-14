import { useState } from "react";
import BillingDetails from "./components/BillingDetails";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

// import './App.css'

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BillingDetails />
      </ThemeProvider>
    </>
  );
}

export default App;

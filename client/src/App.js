import {BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
// npm install react-router-dom

import HomePage from "scenes/home_Page";
import LoginPage from "scenes/login_Page";
import ProfilePage from "scenes/profile_Page";
import NavBar from "scenes/navbar";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import {CssBaseline, ThemeProvider} from "@mui/material"

import { createTheme } from "@mui/material/styles"
import { themeSettings } from "theme";

function App() {

  // utilisation du state useSelector
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)),[mode]);

  return (
    <div className="App"> 
   <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="home" element={<HomePage/>} />
        <Route path="/profile/:userId" element={<ProfilePage/>} />
      </Routes>
    </ThemeProvider>
   </BrowserRouter>
    </div>
  );
}

export default App;

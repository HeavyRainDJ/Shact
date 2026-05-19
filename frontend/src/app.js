import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import MainPage from "./Pages/Main/MainPage";
import RegistrationPage from "./Pages/Registration/RegistrationPage";
import LoginPage from "./Pages/Login/LoginPage";
import RestorePage from "./Pages/RestorePassword/RestorePage";
import ChangePasswordPage from "./Pages/ChangePassword/ChangePasswordPage"
import HacktonsPage from "./Pages/Hacktons/HacktonsPage";
import HacktonsCommands from "./Pages/HacktonsCommands/HacktonsCommands";
import ClientCabinet from "./Pages/ClientCabinet/ClientCabinet";
function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<MainPage/>} path="/"></Route>
                <Route element={<MainPage/>} path="/Shact"></Route>
                <Route element={<RegistrationPage/>} path="/Registration"></Route>
                <Route element={<LoginPage/>} path="/Login"></Route>
                <Route element={<RestorePage/>} path="/RestorePassword"></Route>
                <Route element={<ChangePasswordPage/>} path="/ChangePassword"></Route>
                <Route element={<HacktonsPage/>} path="/Hacktons"></Route>
                <Route element={<HacktonsCommands/>} path="/Commands"></Route>
                <Route element={<ClientCabinet/>} path="/Cabinet"></Route>
            </Routes>
        </BrowserRouter>
    )
}
export default App;
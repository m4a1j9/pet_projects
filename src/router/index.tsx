import React from "react";
import Login from "../pages/Login";
import MainPage from "../pages/MainPage";
import Profile from "../pages/Profile";
import SignUp from "../pages/SignUp";
import Chess from "../pages/Chess";
import { Links } from "./links";
import ChessFC from "../pages/ChessFC";

interface RouteInt {
    path: string;
    element: JSX.Element;
}

export const privateRoutes: RouteInt[] = [
    { path: Links.profile, element: <Profile /> },
    { path: Links.mainPage, element: <MainPage /> },
    { path: Links.chess, element: <Chess /> },
    { path: Links.chessFC, element: <ChessFC /> },
    { path: Links.any, element: <MainPage /> },
];

export const publicRoutes: RouteInt[] = [
    { path: Links.login, element: <Login /> },
    { path: Links.signup, element: <SignUp /> },
    { path: Links.mainPage, element: <MainPage /> },
    { path: Links.any, element: <MainPage /> },
];

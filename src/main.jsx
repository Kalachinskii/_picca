// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./components/App";
// 1. npm i react-router-dom
// 2. импорт функции BrowserRouter
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
    // 3. обворачиваем BrowserRouter
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

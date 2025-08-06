// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./components/App";
// 1. npm i react-router-dom
// 2. импорт функции BrowserRouter
import { BrowserRouter } from "react-router-dom";
// npm i @reduxjs/toolkit react-redux
import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter basename="/_picca">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

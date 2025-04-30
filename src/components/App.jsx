import "../styles/app.scss";
// import Header from "./Header";
// import pizzas from "../assets/pizzas.json";
import { createContext, useEffect, useState } from "react";
// 4. импортируем Routes, Route
import { Routes, Route, useRoutes } from "react-router-dom";
import { useRoutesWrapper } from "../hooks/useRoutesWrapper.jsx";
import Layout from "./Layout.jsx";
import { Cart } from "../pages/Cart.jsx";
import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";

export const AppContext = createContext();

export function App() {
    return (
        <AppContext.Provider value={{ hi: "hello", age: 22 }}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* вывод контекста для примера */}
                    <Route index element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </AppContext.Provider>
    );
}

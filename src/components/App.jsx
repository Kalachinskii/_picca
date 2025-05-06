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
// export const UserContext = createContext();

export function App() {
    const [searchValue, setSearchValue] = useState("");
    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(0);
    const [activeSort, setActiveSort] = useState({
        type: 0,
        isUp: true,
    });

    useEffect(() => {
        const category = activeCategory == 0 ? "" : activeCategory;
        const sort = ["rating", "price", "title"][activeSort.type];
        const order = activeSort.isUp ? "asc" : "desc";
        fetch(
            `https://67c45d8cc4649b9551b361e2.mockapi.io/items?category=${category}&sortBy=${sort}&order=${order}&title=${searchValue}`
        )
            .then((response) => response.json())
            .then((data) => setPizzas(data))
            .finally(setLoading(false))
            .catch((err) => {
                alert(`Возникла ошибка к серверу: ${err.message}`);
            });
    }, [activeCategory, activeSort, searchValue]);

    return (
        <AppContext.Provider
            value={{
                setPizzas,
                pizzas,
                setLoading,
                loading,
                setActiveCategory,
                activeCategory,
                setActiveSort,
                activeSort,
                setLoading,
                loading,
                setSearchValue,
            }}
        >
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </AppContext.Provider>
    );
}

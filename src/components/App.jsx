import "../styles/app.scss";
// import Header from "./Header";
// import pizzas from "../assets/pizzas.json";
import { createContext, useEffect, useState } from "react";
// 4. импортируем Routes, Route
import { Routes, Route, useRoutes } from "react-router-dom";
// import { useRoutesWrapper } from "../hooks/useRoutesWrapper.jsx";
import Layout from "./Layout.jsx";
import { Cart } from "../pages/Cart.jsx";
import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";
import { useDispatch, useSelector } from "react-redux";

export const AppContext = createContext();
// export const UserContext = createContext();

export function App() {
    // вытащить из хранилища, state - это store
    const activeCategory = useSelector((state) => state.filter.category);
    const { type, isUp } = useSelector((state) => state.filter.sort);

    // записать в хранилище
    useDispatch();

    const [searchValue, setSearchValue] = useState("");
    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [activeCategory, setActiveCategory] = useState(0);
    // const [activeSort, setActiveSort] = useState({
    //     type: 0,
    //     isUp: true,
    // });
    const store = {
        setPizzas,
        pizzas,
        setLoading,
        loading,
        // setActiveCategory,
        // activeCategory,
        // setActiveSort,
        // activeSort,
        setLoading,
        loading,
        setSearchValue,
    };

    useEffect(() => {
        const category = activeCategory == 0 ? "" : activeCategory;
        const sort = ["rating", "price", "title"][type];
        const order = isUp ? "asc" : "desc";

        Promise.all([
            fetch(
                `https://67c45d8cc4649b9551b361e2.mockapi.io/items?category=${category}&sortBy=${sort}&order=${order}`
            ),
            fetch(
                `https://67c45d8cc4649b9551b361e2.mockapi.io/items?&search=${searchValue}`
            ),
        ])
            .then(([sorted, searched]) => {
                return Promise.all([sorted.json(), searched.json()]);
            })
            .then(([sorted, searched]) => {
                const newData = sorted.filter((sortedItem) =>
                    searched.some(
                        (searchedItem) => sortedItem.id == searchedItem.id
                    )
                );
                setPizzas(newData);
            })
            .finally(setLoading(false))
            .catch((err) => {
                alert(`Возникла ошибка к серверу: ${err.message}`);
            });
    }, [activeCategory, isUp, type, searchValue]);

    return (
        <AppContext.Provider value={store}>
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

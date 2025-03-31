import "../styles/app.scss";
// import Header from "./Header";
// import pizzas from "../assets/pizzas.json";
import { useEffect, useState } from "react";
// 4. импортируем Routes, Route
import { Routes, Route, useRoutes } from "react-router-dom";
import { useRoutesWrapper } from "../hooks/useRoutesWrapper.jsx";
import Layout from "./Layout.jsx";
import { Cart } from "../pages/Cart.jsx";
import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";

export function App() {
    const [dataPiccas, setDataPiccas] = useState([]);
    const [loading, setLoading] = useState(true);
    // const routes = useRoutesWrapper();

    // useEffect(() => {
    //     // временная БД - перекинуты данные с json
    //     fetch("https://67c45d8cc4649b9551b361e2.mockapi.io/items")
    //         // .json() - распарсить (распоковать промис - ответ с сервера)
    //         .then((response) => response.json())
    //         .then((data) => setDataPiccas(data))
    //         .finally(setLoading(false))
    //         .catch((err) => {
    //             // console.warn(`Возникла ошибка к серверу: ${err.message}`);
    //             alert(`Возникла ошибка к серверу: ${err.message}`);
    //         });
    // }, []);

    // return <>{routes}</>;
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route
                    index
                    element={
                        <Home
                            pizzas={dataPiccas}
                            setDataPiccas={setDataPiccas}
                            setLoading={setLoading}
                            {...loading}
                        />
                    }
                />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

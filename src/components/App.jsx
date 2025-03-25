import "../styles/app.scss";
import Header from "./Header";
// import pizzas from "../assets/pizzas.json";
import { useEffect, useState } from "react";
// 4. импортируем Routes, Route
import { Routes, Route, useRoutes } from "react-router-dom";
import { useRoutesWrapper } from "../hooks/useRoutesWrapper.jsx";
import Layout from "./Layout.jsx";

export function App() {
    const [dataPiccas, setDataPiccas] = useState([]);
    const routes = useRoutesWrapper();

    useEffect(() => {
        // временная БД - перекинуты данные с json
        fetch("https://67c45d8cc4649b9551b361e2.mockapi.io/items")
            // .json() - распарсить (распоковать промис - ответ с сервера)
            .then((response) => response.json())
            .then((data) => setDataPiccas(data))
            // .finally(setLoading(false))
            .catch((err) => {
                // console.warn(`Возникла ошибка к серверу: ${err.message}`);
                alert(`Возникла ошибка к серверу: ${err.message}`);
            });
    }, []);

    return <Layout dataPiccas={dataPiccas}>{routes}</Layout>;
}

/* 
<Routes>
    <Route
        path="/"
        element={<Home pizzas={dataPiccas} />}
    />
    <Route path="/cart" element={"Cart"} />
    <Route path="/about" element={"About"} />
    <Route path="*" element={"NotFound"} />
</Routes> 
*/

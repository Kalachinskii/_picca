import "../styles/app.scss";
import Header from "./Header";
// import pizzas from "../assets/pizzas.json";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
// import NotFound from "../pages/NotFound";

export function App() {
    const [dataPiccas, setDataPiccas] = useState([]);

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

    return (
        <div className="wrapper">
            <Header pizzas={dataPiccas} />
            <div className="content">
                <div className="container">
                    <Routes>
                        <Route
                            path="/"
                            element={<Home pizzas={dataPiccas} />}
                        />
                        <Route path="/cart" element={"Cart"} />
                        <Route path="/about" element={"About"} />
                        {/*    * - это если не 1 из ротов не найден */}
                        <Route path="*" element={"NotFound"} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

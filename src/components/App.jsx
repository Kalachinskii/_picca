import "../styles/app.scss";
import Header from "./Header";
import Categories from "./Categories";
import Sort from "./Sort";
import PizzaBlock from "./PizzaBlock";
// import pizzas from "../assets/pizzas.json";
import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";

export function App() {
    const [dataPiccas, setDataPiccas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // временная БД - перекинуты данные с json
        fetch("https://67c45d8cc4649b9551b361e2.mockapi.io/items")
            // .json() - распарсить (распоковать промис - ответ с сервера)
            .then((response) => response.json())
            .then((data) => setDataPiccas(data))
            .finally(setLoading(false))
            .catch((err) => {
                // console.warn(`Возникла ошибка к серверу: ${err.message}`);
                alert(`Возникла ошибка к серверу: ${err.message}`);
            });
    }, []);

    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories />
                        <Sort />
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {!loading ? (
                            dataPiccas.map((pizza) => (
                                // ...pizza - прокинуть все свойства пропсом в компонент
                                <PizzaBlock key={pizza.id} {...pizza} />
                            ))
                        ) : (
                            <Skeleton />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

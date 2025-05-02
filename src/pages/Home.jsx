import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/Skeleton";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../components/App";

function Home() {
    // const [loading, setLoading] = useState(true);
    // const [activeCategory, setActiveCategory] = useState(0);
    // const [activeSort, setActiveSort] = useState({
    //     type: 0,
    //     isUp: true,
    // });

    // использовать контекст
    const { pizzas, setPizzas, loading, activeCategory, activeSort } =
        useContext(AppContext);

    // useEffect(() => {
    //     const category = activeCategory == 0 ? "" : activeCategory;
    //     const sort = ["rating", "price", "title"][activeSort.type];
    //     const order = activeSort.isUp ? "asc" : "desc";
    //     fetch(
    //         `https://67c45d8cc4649b9551b361e2.mockapi.io/items?category=${category}&sortBy=${sort}&order=${order}`
    //     )
    //         .then((response) => response.json())
    //         .then((data) => setPizzas(data))
    //         .finally(setLoading(false))
    //         .catch((err) => {
    //             // console.warn(`Возникла ошибка к серверу: ${err.message}`);
    //             alert(`Возникла ошибка к серверу: ${err.message}`);
    //         });
    // }, [activeCategory, activeSort]);

    return (
        <>
            <div className="content__top">
                <Categories
                    activeCategory={activeCategory}
                    setActiveCategory={(ind) => setActiveCategory(ind)}
                />
                <Sort active={activeSort} setActive={setActiveSort} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {!loading ? (
                    pizzas.map((pizza) => (
                        <PizzaBlock key={pizza.id} {...pizza} />
                    ))
                ) : (
                    // скелет pizzas
                    <div>
                        {[...new Array(12)].map((_, ind) => (
                            <Skeleton key={ind} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Home;

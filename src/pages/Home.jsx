import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/Skeleton";
import { useState } from "react";

function Home({ pizzas }) {
    const [loading, setLoading] = useState(true);

    return (
        // <></> - реакт фрагмент
        <>
            {" "}
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {!loading ? (
                    pizzas.map((pizza) => (
                        <PizzaBlock key={pizza.id} {...pizza} />
                    ))
                ) : (
                    <div>
                        {[...new Array(10)].map((_, ind) => (
                            <Skeleton key={ind} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Home;

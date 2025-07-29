import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/Skeleton";
import { useSelector } from "react-redux";

function Home() {
  const { pizzas } = useSelector((state) => state.pizzas.items);
  // затычка
  // const loading = true;
  const loading = false;

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">
        {loading == false && (pizzas.length ? "Все пиццы" : "Пиццы не найдены")}
      </h2>
      <div className="content__items">
        {!loading ? (
          pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)
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

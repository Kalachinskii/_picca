import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/Skeleton";
import { useSelector } from "react-redux";
import { RootState } from "../store";

function Home() {
  const pizzas = useSelector((state: RootState) => state.pizzas.items);
  const status = useSelector((state: RootState) => state.pizzas.status);
  const error = useSelector((state: RootState) => state.pizzas.error);

  function getTitleText(status: string | null) {
    if (status === "loading") return "Загрузка";
    if (error) return error;
    return status === "resolved" && pizzas?.length > 0
      ? "Все пиццы"
      : "Пиццы не найдены";
  }
  console.log(pizzas);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">{getTitleText(status)}</h2>
      <div className="content__items">
        {status == "resolved" ? (
          pizzas?.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)
        ) : (
          // скелет pizzas
          <div>
            {status === "loading" &&
              [...new Array(12)].map((_, ind) => <Skeleton key={ind} />)}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;

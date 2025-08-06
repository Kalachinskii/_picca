import { useSelector } from "react-redux";
import { setCategory } from "../store/slices/filterSlice";
import { RootState, useAppDispatch } from "../store";

function Categories() {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  const activeCategory = useSelector(
    (state: RootState) => state.filter.category
  );
  const dispatch = useAppDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((category, ind) => (
          <li
            key={ind}
            className={activeCategory === ind ? "activeCategory" : ""}
            // dispatch - передаём action
            onClick={() => dispatch(setCategory(ind))}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;

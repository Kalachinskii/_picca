import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../store/slices/filterSlice";

function Categories() {
    const activeCategory = useSelector((state) => state.filter.category);
    const dispatch = useDispatch();

    const categories = [
        "Все",
        "Мясные",
        "Вегетарианская",
        "Гриль",
        "Острые",
        "Закрытые",
    ];

    return (
        <div className="categories">
            <ul>
                {categories.map((category, id) => (
                    <li
                        key={id}
                        className={
                            activeCategory === id ? "activeCategory" : ""
                        }
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

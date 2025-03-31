import { useEffect, useState } from "react";

function Categories({ setDataPiccas, setLoading }) {
    const [active, setActive] = useState(0);
    const categories = [
        "Все",
        "Мясные",
        "Вегетарианская",
        "Гриль",
        "Острые",
        "Закрытые",
    ];

    useEffect(() => {
        fetch(
            `https://67c45d8cc4649b9551b361e2.mockapi.io/items${
                active > 0 ? "?category=" + active : ""
            }`
        )
            // .json() - распарсить (распоковать промис - ответ с сервера)
            .then((response) => response.json())
            .then((data) => setDataPiccas(data))
            .finally(setLoading(false))
            .catch((err) => {
                // console.warn(`Возникла ошибка к серверу: ${err.message}`);
                alert(`Возникла ошибка к серверу: ${err.message}`);
            });
    }, [active]);

    return (
        <div className="categories">
            <ul>
                {categories.map((category, id) => (
                    <li
                        key={id}
                        className={active === id ? "active" : ""}
                        onClick={() => setActive(id)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;

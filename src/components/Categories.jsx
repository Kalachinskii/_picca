function Categories({ activeCategory, setActiveCategory }) {
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
                        onClick={() => setActiveCategory(id)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;

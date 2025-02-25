import { useState } from 'react'

function Categories() {
    const [active, setActive] = useState(0);
    const categories = ["Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые",];
    
    return (
        <div className="categories">
            <ul>
                {
                    categories.map((category, id) => 
                        <li key={id} className={active === id ? 'active' : ''} onClick={() => setActive(id)}>
                            {category}
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default Categories
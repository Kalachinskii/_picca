import "../styles/app.scss";
// import Header from "./Header";
// import pizzas from "../assets/pizzas.json";
import { createContext, useEffect, useState } from "react";
// 4. импортируем Routes, Route
import { Routes, Route, useRoutes } from "react-router-dom";
// import { useRoutesWrapper } from "../hooks/useRoutesWrapper.jsx";
import Layout from "./Layout.jsx";
import { Cart } from "../pages/Cart.jsx";
import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";
import { useDispatch, useSelector } from "react-redux";
// импорт слайса - action
import { fetchPizzas } from "../store/slices/pizzasSlice.js";

interface Pizza {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
}

interface AppContextType {
  pizzas: Pizza[];
  loading: boolean;
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export function App() {
  // вытащить из хранилища, state - это store
  const activeCategory = useSelector((state) => state.filter.category);
  const { type, isUp } = useSelector((state) => state.filter.sort);
  const search = useSelector((state) => state.filter.search);
  // const [searchValue, setSearchValue] = useState("");

  const pizzas = useSelector((state) => state.pizzas.items);
  // const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPizzas());
  }, [activeCategory, isUp, type, search]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

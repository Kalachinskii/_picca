import "../styles/app.scss";
import { createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import { Cart } from "../pages/Cart.jsx";
import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";
import { useSelector } from "react-redux";
import { fetchPizzas } from "../store/slices/pizzasSlice.js";
import { RootState, useAppDispatch } from "../store/index.js";

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
  const activeCategory = useSelector(
    (state: RootState) => state.filter.category
  );
  const { type, isUp } = useSelector((state: RootState) => state.filter.sort);
  const search = useSelector((state: RootState) => state.filter.search);
  const dispatch = useAppDispatch();

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

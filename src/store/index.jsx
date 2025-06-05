import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import cartReducer from "./slices/cartSlice";
import pizzasReducer from "./slices/pizzasSlice";

export const store = configureStore({
  // reducers - это некоторые action (действие)
  reducer: {
    // компанент: слайс
    filter: filterReducer,
    cart: cartReducer,
    pizzas: pizzasReducer,
  },
});

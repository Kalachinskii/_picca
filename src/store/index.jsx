import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";

export const store = configureStore({
    // reducers - это некоторые action (действие)
    reducer: {
        // компанент: слайс
        filter: filterReducer,
    },
});

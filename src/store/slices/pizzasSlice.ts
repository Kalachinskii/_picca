import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pizzas: [],
};

const pizzasSlice = createSlice({
    name: "pizzas",
    initialState,
    reducers: {},
});

export default pizzasSlice.reducer;
export const {} = pizzasSlice.actions;

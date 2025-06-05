import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setPizzas(state, actions) {
      state.items = actions.payload;
    },
  },
});

export default pizzasSlice.reducer;
export const { setPizzas } = pizzasSlice.actions;

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
    // ! только синхронные действия
    fetchPizzas(state) {
      fetch("https://67c45d8cc4649b9551b361e2.mockapi.io/items")
        .then((resp) => resp.json())
        .then((data) => (state.items = data)); //error
    },
  },
});

export default pizzasSlice.reducer;
export const { setPizzas, fetchPizzas } = pizzasSlice.actions;

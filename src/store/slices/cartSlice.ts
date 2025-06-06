import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  items: [];
  total: number;
  count: number;
}

const initialState: IInitialState = {
  items: [], // [ {id: 1, price: 250}, ]
  total: 1000,
  count: 3,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, actions) {
      const id = actions.payload;
      const ind = state.items.findIndex((item) => item.id == id);
      if (ind == -1) {
        // qty - кол товара
        const item: { id: number; qty: number } = { id, qty: 1 };
        state.items.push(item);
      } else {
        state.items[ind].qty += 1;
      }
    },
    deleteItem(state, actions) {},
  },
});

export const { addItem, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;

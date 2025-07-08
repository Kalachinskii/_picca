import { createSlice } from "@reduxjs/toolkit";

interface IItem {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  detaild: {
    type: number;
    size: {
      size: number;
      qty: number;
    };
  };
}
interface IInitialState {
  items: { id: number; qty: number }[];
  total: number;
  count: number;
  qty?: number;
}

const initialState: IInitialState = {
  items: [], // [ { id: 1, qty: 3 }, ] - !нету бд иной подход
  total: 0,
  count: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, actions) {
      const id = actions.payload.id;
      const ind = state.items.findIndex((item) => item.id == id);
      if (ind == -1) {
        const { id, imageUrl, title, price, activeType, activeSize } =
          actions.payload;
        const item: IItem = {
          id,
          imageUrl,
          title,
          price,
          detaild: [
            {
              type: activeType,
              size: [{ size: activeSize, qty: 1 }],
            },
          ],
        };
        state.items.push(item);
        // console.log(item);
      } else {
        state.items[ind].qty += 1;
      }
      // Колличество товаров
      // state.count = state.items.reduce((count, item) => {
      //   return (count += item.qty);
      // }, 0);

      // Общая стоимость - нет цены отложено
      // state.total = state.items.reduce((count, item) => {
      //   return (count += item.qty);
      // }, 0);
    },
    deleteItem(state, actions) {},
  },
});

export const { addItem, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;

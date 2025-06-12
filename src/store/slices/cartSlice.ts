import { createSlice } from "@reduxjs/toolkit";

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
      // {
      //  id: 6,
      //  imageUrl: '...45a00d.avif',
      //  title: 'Крэйзи пепперони',
      //  price: 580
      // } + qty: n
      const id = actions.payload.id;
      const ind = state.items.findIndex((item) => item.id == id);
      if (ind == -1) {
        // qty - кол товара
        // const item: { id: number; qty: number } = { id, qty: 1 };
        state.items.push({ ...actions.payload, qty: 1 });
        console.log(state);
      } else {
        state.items[ind].qty += 1;
      }
      // Колличество товаров
      state.count = state.items.reduce((count, item) => {
        return (count += item.qty);
      }, 0);

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

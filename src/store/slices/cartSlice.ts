import { createSlice } from "@reduxjs/toolkit";

interface ISizeItem {
  size: number;
  qty: number;
}

interface IDetaildsItem {
  type: number;
  size: ISizeItem[];
}

interface IItem {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  totalQty: number;
  detaild: IDetaildsItem[];
}
interface IInitialState {
  items: { id: number; qty: number }[];
  total: number;
  count: number;
  qty?: number;
}

const initialState: IInitialState = {
  items: [],
  total: 0,
  count: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, actions) {
      const { id, imageUrl, title, price, activeSize, activeType } =
        actions.payload;
      const itemIndex = state.items.findIndex((item) => item.id == id);

      // пицца не найдена
      if (itemIndex == -1) {
        const { id, imageUrl, title, price, activeType, activeSize } =
          actions.payload;
        const item: IItem = {
          id,
          imageUrl,
          title,
          price,
          totalQty: 1,
          detaild: [
            {
              type: activeType,
              size: [{ size: activeSize, qty: 1 }],
            },
          ],
        };
        state.items.push(item);
        state.count = state.count + 1;
        state.total = state.total + price;
        // данная пицца есть
      } else {
        // state.items[itemIndex].detaild[0].size[0].qty += 1;
        const detaildTypeIndex = state.items[itemIndex].detaild.findIndex(
          (el) => el.type == activeType
        );

        if (detaildTypeIndex != -1) {
          const typeSizeIndex = state.items[itemIndex].detaild[
            detaildTypeIndex
          ].size.findIndex((el) => el.size == activeSize);
          // если вид пиццы уже имееться и размер совпадают
          if (typeSizeIndex != -1) {
            state.items[itemIndex].detaild[detaildTypeIndex].size[typeSizeIndex]
              .qty++;
            state.items[itemIndex].totalQty++;
            state.count = state.count + 1;
            // есть вид пиццы но иной размер
          } else {
            const sizesItem = {
              size: activeSize,
              qty: 1,
            };
            state.items[itemIndex].detaild[detaildTypeIndex].size.push(
              sizesItem
            );
            state.items[itemIndex].totalQty++;
            state.count = state.count + 1;
          }
          // если нету пиццы с таким типом то добавляем
        } else {
          const detaildItem = {
            type: activeType,
            size: [{ size: activeSize, qty: 1 }],
          };
          state.items[itemIndex].detaild.push(detaildItem);
          state.items[itemIndex].totalQty++;
          state.count = state.count + 1;
        }
      }
    },
    deleteItem(state, actions) {
      const { id, imageUrl, title, price, activeType, activeSize } =
        actions.payload;
      state.items.forEach((item) => {
        if (item.id == id) {
          item.detaild.forEach((detaildItem) => {
            if (detaildItem.type == activeType) {
              detaildItem.size.forEach((sizeItem, ind) => {
                if (sizeItem.size == activeSize) {
                  if (sizeItem.qty <= 1) {
                    detaildItem.size.splice(ind, 1);
                  } else {
                    sizeItem.qty--;
                  }
                  item.totalQty--;
                  // state.count--;
                  // state.total = state.total - price;
                }
              });
            }
          });
        }
      });
    },
  },
});

export const { addItem, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;

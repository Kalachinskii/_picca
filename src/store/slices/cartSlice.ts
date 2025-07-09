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
                    detaild: [
                        {
                            type: activeType,
                            size: [{ size: activeSize, qty: 1 }],
                        },
                    ],
                };
                state.items.push(item);
                // данная пицца есть
            } else {
                // state.items[itemIndex].detaild[0].size[0].qty += 1;
                const detaildTypeIndex = state.items[
                    itemIndex
                ].detaild.findIndex((el) => el.type == activeType);

                if (detaildTypeIndex != -1) {
                    const typeSizeIndex = state.items[itemIndex].detaild[
                        detaildTypeIndex
                    ].size.findIndex((el) => el.size == activeSize);
                    // если вид пиццы уже имееться и размер совпадают
                    if (typeSizeIndex != -1) {
                        state.items[itemIndex].detaild[detaildTypeIndex].size[
                            typeSizeIndex
                        ].qty++;
                        // есть вид пиццы но иной размер
                    } else {
                        const sizesItem = {
                            size: activeSize,
                            qty: 1,
                        };
                        state.items[itemIndex].detaild[
                            detaildTypeIndex
                        ].size.push(sizesItem);
                    }
                    // если нету пиццы с таким типом то добавляем
                } else {
                    const detaildItem = {
                        type: activeType,
                        size: [{ size: activeSize, qty: 1 }],
                    };
                    state.items[itemIndex].detaild.push(detaildItem);
                }
            }
        },
        deleteItem(state, actions) {},
    },
});

export const { addItem, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;

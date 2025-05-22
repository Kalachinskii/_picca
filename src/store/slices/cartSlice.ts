import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    items: [];
    total: number;
    count: number;
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
            const id = actions.payload;
            state.items = 
        },
        deleteItem(state, actions) {},
    },
});

export const { addItem, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

// Слайс – это информация которая храниться по конкретному компоненту
export const stateSlice = createSlice({
    // храним информацию по компанентку App
    name: "App",
    initialState: 0,
    // reducers - это некоторые action
    reducers: {
        increment: function (state) {
            state.value += 1;
        },
    },
});

//reducers = .actions
export const { increment } = stateSlice.actions;
// для изменения данных
export default stateSlice.reducer;

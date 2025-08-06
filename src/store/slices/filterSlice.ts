import { createSlice } from "@reduxjs/toolkit";

interface IState {
  category: number;
  sort: {
    type: number;
    isUp: boolean;
  };
  search: string;
}

const initialState: IState = {
  category: 0,
  sort: {
    type: 0,
    isUp: true,
  },
  search: "",
};

// Слайс – это информация которая храниться по конкретному компоненту
const filterSlice = createSlice({
  name: "filter",
  // начальное состояние
  initialState: initialState,
  // действия/методы для изменения initialState
  reducers: {
    // setCategory: function(state) {
    // setCategory: (state) => {
    // state - это начальное значение заданное в initialState
    // actions - это объект, в котором .paylod лежит переданное значение т.е. actions.payload = id
    setCategory(state, actions) {
      state.category = actions.payload;
    },
    setSort(state, actions) {
      state.sort = actions.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
});

// вытаскиваем метод
//reducers = .actions !!!
export const { setCategory, setSort, setSearch } = filterSlice.actions;
export default filterSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface IState {
  items: [];
  status: null | string;
  error: null | string;
}

const initialState: IState = {
  items: [],
  status: null,
  error: null,
};

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzas",
  // getState - возвращает все слайсы в рамках асинхронной функции
  async (props, { rejectWithValue, getState, dispatch }) => {
    const state = getState() as RootState;
    const activeCategory = state.filter.category;
    const { type, isUp } = state.filter.sort;
    const search = state.filter.search;
    const category = activeCategory == 0 ? "" : activeCategory;
    const sort = ["rating", "price", "title"][type];
    const order = isUp ? "asc" : "desc";

    try {
      const resp = Promise.all([
        fetch(
          `https://67c45d8cc4649b9551b361e2.mockapi.io/items?category=${category}&sortBy=${sort}&order=${order}`
        ),
        fetch(
          `https://67c45d8cc4649b9551b361e2.mockapi.io/items?&search=${search}`
        ),
      ])
        .then(([sorted, searched]) => {
          return Promise.all([sorted.json(), searched.json()]);
        })
        .then(([sorted, searched]) => {
          const newData = sorted.filter((sortedItem) =>
            searched.some((searchedItem) => sortedItem.id == searchedItem.id)
          );
          dispatch(setPizzas(newData));
          return newData;
        });

      const data = await resp;
      return data;
    } catch (error) {
      return rejectWithValue("Ошибка запроса");
    }
  }
);

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    // в рамках редьюсера нельзя писать асинхронные экшены
    setPizzas(state, actions) {
      state.items = actions.payload;
    },
  },
  extraReducers: (builder) => {
    // .pending - перед запросом
    // .fulfilled - в случаее успеха (полчучен результат)
    // .rejected - в результате запроса произошла ошибка
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = "resolved";
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.status = "rejected";
        if (typeof action.payload == "string") {
          state.error = action.payload;
        }
      });
  },
});

export default pizzasSlice.reducer;
export const { setPizzas } = pizzasSlice.actions;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzas",
  // getState - возвращает все слайсы в рамках асинхронной функции
  async (props, { rejectWithValue, getState, dispatch }) => {
    const activeCategory = getState().filter.category;
    const { type, isUp } = getState().filter.sort;
    const { search } = getState().filter.search;
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
        })
        // .finally(setLoading(false))
        .catch((err) => {
          console.log(`Возникла ошибка к серверу: ${err}`);
        });

      const data = await resp;
      // if (!resp.ok) throw new Error("Данные не пришли");

      // const data = await resp.json();
      return data;
    } catch (error) {
      return rejectWithValue("Данные не пришли");
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
      .addCase(fetchPizzas.pending, (state, action) => {
        console.log("Загрузка данных");
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        // выполняем действие
        console.log("Получен результат");
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        console.log(action.payload);
      });
  },
});

export default pizzasSlice.reducer;
export const { setPizzas } = pizzasSlice.actions;

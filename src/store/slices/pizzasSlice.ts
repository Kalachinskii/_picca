import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

// выноситься асинхронщина вне
// createAsyncThunk - создание асинхронных дополнений
// pizzas/fetchPizzas - индефикатор действия
export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzas",
  async (_, { rejectWithValue }) => {
    try {
      const resp = await fetch(
        "https://67c45d8cc4649b9551b361e2.mockapi.io/items"
      );

      if (!resp.ok) throw new Error("Данные не пришли");

      const data = await resp.json();
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

    // ! только синхронные действия
    // fetchPizzas(state) {
    //   fetch("https://67c45d8cc4649b9551b361e2.mockapi.io/items")
    //     .then((resp) => resp.json())
    //     .then((data) => (state.items = data)); //error
    // },
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

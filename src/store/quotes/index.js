import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allQuotes: [],
};

export const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    addQuote: (state, actions) => {
      state.allQuotes = [...state.allQuotes, ...actions.payload];
    },
    setAllQuotes: (state, actions) => {
      state.allQuotes = actions.payload;
    },
    resetQuotes: (state) => {
      state.allQuotes = []
    }
  },
});

export const { addQuote, setAllQuotes,resetQuotes } = quotesSlice.actions;

export default quotesSlice.reducer;
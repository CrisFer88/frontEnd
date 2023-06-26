import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initData = {
  statusQuery: boolean;
  data: [];
  dataFetched: boolean;
}

const initialState: initData = {
  statusQuery: false,
  data: [],
  dataFetched: false
};

export const productsSlice = createSlice({
  name: "productsApp",
  initialState,
  reducers: {
    startConnection: (state) => {
      state.statusQuery = true;
    },
    dbSetProducts: ( state, action: PayloadAction< initData >) => {
        state.statusQuery = false;
        state.data = action.payload.data
        state.dataFetched = true;
    }
}});


export const { startConnection, dbSetProducts } =  productsSlice.actions;

export default productsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

interface initData {
  statusQuery: boolean;
  data: [];
  dataFetched: boolean;
}

const initialState: initData = {
  statusQuery: false,
  data: [],
  dataFetched: false
};

export const dataAppSlice = createSlice({
  name: "datApp",
  initialState,
  reducers: {
    startConnection: (state) => {
      state.statusQuery = true;
    },
    dbSetProducts: ( state, { payload }) => {
        state.statusQuery = false;
        state.data = payload.data
        state.dataFetched = true;
    }
  },
});


export const { startConnection, dbSetProducts } =  dataAppSlice.actions;

export default dataAppSlice.reducer;

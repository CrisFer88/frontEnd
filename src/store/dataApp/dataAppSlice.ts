import { createSlice } from "@reduxjs/toolkit";

interface initData {
  statusQuery: boolean;
  data: Object;
}

const initialState: initData = {
  statusQuery: false,
  data: [],
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
        state.data = payload
    }
  },
});


export const { startConnection, dbSetProducts } =  dataAppSlice.actions;

export default dataAppSlice.reducer;

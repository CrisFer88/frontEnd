import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initData = {
  statusQuery: boolean;
  data: [];
  dataFetched: boolean;
};

const initialState: initData = {
  statusQuery: false,
  data: [],
  dataFetched: false,
};

export const parameterColorSlice = createSlice({
  name: "colorApp",
  initialState,
  reducers: {
    startConnColor: (state) => {
      state.statusQuery = true;
    },
    dbSetColor: (state, action: PayloadAction<initData>) => {
      state.statusQuery = action.payload.statusQuery;
      state.data = action.payload.data;
      state.dataFetched = action.payload.dataFetched;
    },
  },
});

export const { startConnColor, dbSetColor} =  parameterColorSlice.actions;

export default parameterColorSlice.reducer;
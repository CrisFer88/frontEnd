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

export const parameterSkuSize = createSlice({
  name: "skuSizeApp",
  initialState,
  reducers: {
    startConnSkuSize: (state) => {
      state.statusQuery = true;
    },
    dbSetSkuSize: (state, action: PayloadAction<initData>) => {
      state.statusQuery = action.payload.statusQuery;
      state.data = action.payload.data;
      state.dataFetched = action.payload.dataFetched;
    },
  },
});

export const { startConnSkuSize, dbSetSkuSize} =  parameterSkuSize.actions;

export default parameterSkuSize.reducer;
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

export const parameterColorAssigment = createSlice({
  name: "colorAssigApp",
  initialState,
  reducers: {
    startConnColorAssig: (state) => {
      state.statusQuery = true;
    },
    dbSetColorAssig: (state, action: PayloadAction<initData>) => {
      state.statusQuery = action.payload.statusQuery;
      state.data = action.payload.data;
      state.dataFetched = action.payload.dataFetched;
    },
  },
});

export const { startConnColorAssig, dbSetColorAssig} =  parameterColorAssigment.actions;

export default parameterColorAssigment.reducer;
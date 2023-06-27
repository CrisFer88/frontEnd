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

export const parameterClasesSlice = createSlice({
  name: "clasesApp",
  initialState,
  reducers: {
    startConnection: (state) => {
      state.statusQuery = true;
    },
    dbSetClase: (state, action: PayloadAction<initData>) => {
      state.statusQuery = action.payload.statusQuery;
      state.data = action.payload.data;
      state.dataFetched = action.payload.dataFetched;
    },
  },
});

export const { startConnection, dbSetClase} =  parameterClasesSlice.actions;

export default parameterClasesSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  delItemClasses,
  fetchClasses,
  newItemClasses,
  updateItemClasses,
} from "../../thunks/dataApp/classe.thunk";
import {  IS_dataClasses, IS_typeClasse } from "../../utils/types";

const initialState: IS_typeClasse = {
  isLoading: false,
  dataFetched: false,
  data: [],
  error: undefined,
};

export const parameterClasesSlice = createSlice({
  name: "clasesApp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchClasses.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchClasses.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dataFetched = true;
      state.data = action.payload;
    });
    builder.addCase(fetchClasses.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(newItemClasses.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dataFetched = true;
      state.data = [...state.data, action.payload];
    });
    builder.addCase(delItemClasses.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dataFetched = true;
      state.data = [
        ...state.data.filter((st) => st.itemc_id !== action.payload),
      ];
    });
    builder.addCase(updateItemClasses.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dataFetched = true;
      state.data = [
        ...state.data.filter((st) => st.itemc_id !== action.payload?.itemc_id),
      ];
      state.data = [  ...state.data, action.payload as IS_dataClasses ]
    })
  },
});

// export const { startConnClasse, dbSetClase} =  parameterClasesSlice.actions;

export default parameterClasesSlice.reducer;

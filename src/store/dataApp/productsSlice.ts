import {createSlice } from "@reduxjs/toolkit";
import { fetchAllItems } from "../../thunks/dataApp/allitems.thunk";
import { IS_typeAllProducts  } from "../../utils/types";




const initialState: IS_typeAllProducts = {
  isLoading: false,
  data: [],
  dataFetched: false,
  error: undefined
};

export const productsSlice = createSlice({
  name: "productsApp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllItems.pending, ( state ) => {
      state.isLoading = true;
    })
    builder.addCase( fetchAllItems.fulfilled, ( state, action) => {
      state.isLoading = false;
      state.dataFetched = true;
      state.data = action.payload;
    })
    builder.addCase ( fetchAllItems.rejected , (state, action)=> {
      state.isLoading= false;
      state.error = action.error.message;
    }) 
  }

});


export default productsSlice.reducer;


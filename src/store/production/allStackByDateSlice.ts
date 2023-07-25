import {createSlice } from "@reduxjs/toolkit";
import { IS_typeAllStackByDate } from "../../utils/types";
import { fetchAllStacksByDate, newStack } from "../../thunks/production/allstackbydate.thunk";




const initialState: IS_typeAllStackByDate = {
  isLoading: false,
  data: [],
  dataFetched: false,
  error: undefined
};

export const allOrdersByDate = createSlice({
  name: "allStacks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllStacksByDate.pending, ( state ) => {
      state.isLoading = true;
    })
    builder.addCase( fetchAllStacksByDate.fulfilled, ( state, action) => {
      state.isLoading = false;
      state.dataFetched = true;
      state.data = action.payload;
    })
    builder.addCase ( fetchAllStacksByDate.rejected , (state, action)=> {
      state.isLoading= false;
      state.error = action.error.message;
    }) 
    builder.addCase(newStack.pending, ( state ) => {
      state.isLoading = true;
    })
    builder.addCase( newStack.fulfilled, ( state, action) => {
        state.isLoading = false;
        state.dataFetched = true;
        state.data = [ ...state.data, action.payload ];
      })
  }

});


export default allOrdersByDate.reducer;
import {createSlice } from "@reduxjs/toolkit";
import { IS_typeAllOrdersByDate } from "../../utils/types";
import { fetchAllOrdersByDate, newOrder } from "../../thunks/production/allordersbydate.thunk";




const initialState: IS_typeAllOrdersByDate = {
  isLoading: false,
  data: [],
  dataFetched: false,
  error: undefined
};

export const allOrdersByDate = createSlice({
  name: "allOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllOrdersByDate.pending, ( state ) => {
      state.isLoading = true;
    })
    builder.addCase( fetchAllOrdersByDate.fulfilled, ( state, action) => {
      state.isLoading = false;
      state.dataFetched = true;
      state.data = action.payload;
    })
    builder.addCase ( fetchAllOrdersByDate.rejected , (state, action)=> {
      state.isLoading= false;
      state.error = action.error.message;
    }) 
    builder.addCase(newOrder.pending, ( state ) => {
      state.isLoading = true;
    })
    builder.addCase( newOrder.fulfilled, ( state, action) => {
        state.isLoading = false;
        state.dataFetched = true;
        state.data = [ ...state.data, action.payload ];
      })
  }

});


export default allOrdersByDate.reducer;
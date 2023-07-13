import { createSlice } from "@reduxjs/toolkit";
import { fetchSkuSize } from "../../thunks/dataApp/skusize.thunk";
import { IS_typeSkuSize} from "../../utils/types";


const initialState: IS_typeSkuSize = {
  isLoading: false,
  data: [],
  dataFetched: false,
  error: undefined
};

export const parameterSkuSize = createSlice({
  name: "skuSizeApp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSkuSize.pending, ( state ) => {
      state.isLoading = true;
    })
    builder.addCase( fetchSkuSize.fulfilled, ( state, action) => {
      state.isLoading = false;
      state.dataFetched = true;
      state.data = action.payload;
    })
    builder.addCase ( fetchSkuSize.rejected , (state, action)=> {
      state.isLoading= false;
      state.error = action.error.message;
    }) 
  }
});


export default parameterSkuSize.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { fetchColors } from "../../thunks/dataApp/color.thunk";
import { IS_typeColor } from "../../utils/types";




const initialState: IS_typeColor = {
  isLoading: false,
  dataFetched: false,
  data: [],
  error: undefined,
};

export const parameterColorSlice = createSlice({
  name: "colorApp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchColors.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchColors.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dataFetched = true;
      state.data = action.payload;
    });
    builder.addCase(fetchColors.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default parameterColorSlice.reducer;

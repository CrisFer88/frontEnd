import { createSlice } from "@reduxjs/toolkit";
import { IS_typeColorAssignment} from "../../utils/types";
import { fetchColorAssignment } from "../../thunks/dataApp/colorassignment.thunk";



const initialState: IS_typeColorAssignment = {
  isLoading: false,
  data: [],
  dataFetched: false,
  error: undefined
};

export const parameterColorAssigment = createSlice({
  name: "colorAssigApp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchColorAssignment.pending, ( state ) => {
      state.isLoading = true;
    })
    builder.addCase( fetchColorAssignment.fulfilled, ( state, action) => {
      state.isLoading = false;
      state.dataFetched = true;
      state.data = action.payload;
    })
    builder.addCase ( fetchColorAssignment.rejected , (state, action)=> {
      state.isLoading= false;
      state.error = action.error.message;
    }) 
  }
});



export default parameterColorAssigment.reducer;
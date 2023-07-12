import { createSlice} from "@reduxjs/toolkit";
import { fetchClasses } from "../../thunks/dataApp/classe.thunk";
import { initApiData } from "../../utils/types";

const initialState: initApiData= {
  isLoading: false,
  dataFetched: false,
  data: [],
  error: undefined
};

export const parameterClasesSlice = createSlice({
  name: "clasesApp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchClasses.pending, ( state ) => {
      state.isLoading = true;
    })
    builder.addCase( fetchClasses.fulfilled, ( state, action) => {
      state.isLoading = false;
      state.dataFetched = true;
      state.data = action.payload;
    })
    builder.addCase ( fetchClasses.rejected , (state, action)=> {
      state.isLoading= false;
      state.error = action.error.message;
    }) 
  }
});

// export const { startConnClasse, dbSetClase} =  parameterClasesSlice.actions;

export default parameterClasesSlice.reducer;

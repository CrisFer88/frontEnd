import { createAsyncThunk } from '@reduxjs/toolkit';
import { transactionApi } from "../../api";


const fetchClasses = createAsyncThunk(
    'clasesApp/fetchClasses',
    async() => {
        const response = await transactionApi.get("parameters/newItemClass");
        const data = Object.values(response.data)[1] as [] ; 
        return data
    }

);

  export{
    fetchClasses
  }
  
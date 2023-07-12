import { createAsyncThunk } from '@reduxjs/toolkit';
import { transactionApi } from "../../api";


const fetchAllItems= createAsyncThunk(
    'productsApp/fetchAllItems',
    async() => {
        const response = await transactionApi.get("parameters/allparameter");
      const data = Object.values(response.data)[1] as [] ;
        return data
    }

);

  export{
    fetchAllItems
  }
  
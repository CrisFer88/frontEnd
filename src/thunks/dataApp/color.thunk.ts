import { createAsyncThunk } from "@reduxjs/toolkit";
import { transactionApi } from "../../api";

const fetchColors = createAsyncThunk(
    "colorApp/fetchColors", 
    async () => {
  const response = await transactionApi.get("parameters/color");
  const data = Object.values(response.data)[1] as [];
  return data;
});

export { fetchColors };

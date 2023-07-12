import { createAsyncThunk } from "@reduxjs/toolkit";
import { transactionApi } from "../../api";

const fetchSkuSize = createAsyncThunk(
    "skuSizeApp/fetchSkuSize", 
    async () => {
  const response = await transactionApi.get("parameters/skusize");
  const data = Object.values(response.data)[1] as [];
  return data;
});

export { fetchSkuSize };
import { createAsyncThunk } from "@reduxjs/toolkit";
import { transactionApi } from "../../api";

const fetchColorAssignment = createAsyncThunk(
  "colorAssigApp/fetchColorAssignment",
  async () => {
    const response = await transactionApi.get("parameters/colorassigment");
    const data = Object.values(response.data)[1] as [];
    return data;
  }
);

export { fetchColorAssignment };

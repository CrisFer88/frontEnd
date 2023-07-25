import { createAsyncThunk } from "@reduxjs/toolkit";
import { transactionApi } from "../../api";
import { IS_allOrdersByDate } from "../../utils/types";

interface dr {
  assig_id: number;
  order_date: string;
}

const fetchAllOrdersByDate = createAsyncThunk(
  "allOrders/fetchAllOrdersByDate",
  async (dataReq: dr) => {
    // console.log("Esto es dataReq: ", dataReq);
    try {
      const response = await transactionApi.get(`/orders/user`, {
        params: {
          assig_id: dataReq.assig_id,
          order_date: dataReq.order_date,
        },
      });
      const data = response.data.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const newOrder = createAsyncThunk(
  "allOrders/newOrder",
  async (dataReq: IS_allOrdersByDate) => {
    const response = await transactionApi.post("/orders", {
      assig_id: dataReq.assig_id,
      order_qty: dataReq.order_qty,
      order_date: dataReq.order_date,
      order_name: dataReq.order_name,
    });
    return response.data.data;
  }
);

export { fetchAllOrdersByDate, newOrder };

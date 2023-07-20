import { createAsyncThunk } from "@reduxjs/toolkit";
import { transactionApi } from "../../api";
import { IS_allOrdersByDate, IS_allStacksByDate } from "../../utils/types";

interface dr {
  assig_id: number;
  stackp_date: string;
}

const fetchAllStacksByDate = createAsyncThunk(
  "allStack/fetchAllStacksByDate",
  async (dataReq: dr) => {
    console.log("Esto es dataReq: ", dataReq);
    try {
      const response = await transactionApi.get(`/stack/user`, {
        params: {
          assig_id: dataReq.assig_id,
          stackp_date: dataReq.stackp_date,
        },
      });
      const data = response.data.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const newStack = createAsyncThunk(
  "allStack/newStack",
  async (dataReq: IS_allStacksByDate) => {
    const response = await transactionApi.post("/stack", {
      assig_id: dataReq.assig_id,
      order_id: dataReq.order_id,
      stackp_class: dataReq.stackp_class,
      stackp_component: dataReq.stackp_component,
      stackp_shortname: dataReq.stackp_shortname,
      stackp_size: dataReq.stackp_size,
      stackp_sku: dataReq.stackp_sku,
      stackp_color: dataReq.stackp_color,
      stackp_qty: dataReq.stackp_qty,
      stackp_status: dataReq.stackp_status,
      stackp_date: dataReq.stackp_date,
      stackp_combine: dataReq.stackp_combine
    });
    return response.data.data;
}
);

export { fetchAllStacksByDate, newStack };

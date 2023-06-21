import { transactionApi } from "../../api";
import { useAppDispatch } from "../store";
import { dbSetProducts, startConnection } from "./dataAppSlice";

export const getAllItems = () => {
  return async (dispatch: ReturnType<typeof useAppDispatch>) => {
    dispatch(startConnection());

    try {
      const response = await transactionApi.get("parameters/paramlist");
      const data = Object.values(response.data)[1];
      dispatch(dbSetProducts({ statusQuery: false, data  }));
    } catch (error) {
      console.error(error);
    }
  };
};

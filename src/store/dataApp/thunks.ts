import { transactionApi } from "../../api";
import { useAppDispatch } from "../store";
import { dbSetProducts, startConnection } from "./productsSlice";

 const getAllItems = () => {
  return async (dispatch: ReturnType<typeof useAppDispatch>) => {
    dispatch(startConnection());

    try {
      const response = await transactionApi.get("parameters/paramlist");
      const data = Object.values(response.data)[1] as [] ;
      dispatch(dbSetProducts({ statusQuery: false, data, dataFetched: true }));
    } catch (error) {
      console.error(error);
    }
  };
};


export {
  getAllItems,

}
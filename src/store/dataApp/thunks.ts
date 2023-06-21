import { transactionApi } from "../../api";
import { useAppDispatch } from "../store";
import { dbSetProducts, startConnection } from "./dataAppSlice";

export const getAllItems = () => {
  // interface AllProductsPromp {
  //   ColorItems: { color_name: string }[];
  //   ParaItemTypes: {
  //     itemt_name: string;
  //     itemt_shortname: string;
  //     ParaSkuSizes: { skusize_name: string }[];
  //   }[];
  //   itemc_id: string;
  //   itemc_name: string;
  // }
  return async (dispatch = useAppDispatch()) => {
    dispatch(startConnection());

    const data= await transactionApi
      .get("parameters/paramlist")
      .then((resp) => {
        return Object.values( resp.data )[1];
      })
      .catch( (e) => { return e });

    dispatch(
      dbSetProducts({
        statusQuery: false,
        data
      })
    );
  };
};

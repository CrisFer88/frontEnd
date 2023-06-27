import { transactionApi } from "../../api";
import { useAppDispatch } from "../store";
import { dbSetClase } from "./parameterClasesSlice";
import { dbSetProducts, startConnection } from "./productsSlice";

 const getAllItems = () => {
  return async (dispatch: ReturnType<typeof useAppDispatch>) => {
    dispatch(startConnection());

    try {
      const response = await transactionApi.get("parameters/paramlist");
      const data = Object.values(response.data)[1] as [] ;
      dispatch(dbSetProducts({ statusQuery: false, data, dataFetched: true }));
      // console.log('obtuvo productos');
    } catch (error) {
      console.error(error);
    }
  };
};


const getAllClases = () => {
  return async (dispatch: ReturnType<typeof useAppDispatch>) => {
    dispatch(startConnection());

    try {
      const response = await transactionApi.get("parameters/newItemClass");
      const data = Object.values(response.data)[1] as [] ;
      dispatch(dbSetClase({ statusQuery: false, data, dataFetched: true }));
      // console.log('obtuvo clases');
    } catch (error) {
      console.error(error);
    }
  };
}


export {
  getAllItems,
  getAllClases
}
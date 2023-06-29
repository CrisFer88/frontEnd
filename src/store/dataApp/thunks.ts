import { transactionApi } from "../../api";
import { useAppDispatch } from "../store";
import { dbSetClase, startConnClasse } from "./parameterClasesSlice";
import { dbSetColorAssig, startConnColorAssig } from "./parameterColorAssigment";
import { dbSetColor , startConnColor } from "./parameterColorSlice";
import { dbSetSkuSize, startConnSkuSize } from "./parameterSkuSize";
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

const apiClasse = () => {
  return async (dispatch: ReturnType<typeof useAppDispatch>) => {
    dispatch(startConnClasse());

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

const apiColor = () => {
  return async (dispatch: ReturnType<typeof useAppDispatch>) => {
    dispatch(startConnColor());

    try {
      const response = await transactionApi.get("parameters/color");
      const data = Object.values(response.data)[1] as [] ;
      dispatch(dbSetColor({ statusQuery: false, data, dataFetched: true }));
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
}

const apiSkuSize = () => {
  return async (dispatch: ReturnType<typeof useAppDispatch>) => {
    dispatch(startConnSkuSize());

    try {
      const response = await transactionApi.get("parameters/skusize");
      const data = Object.values(response.data)[1] as [] ;
      dispatch(dbSetSkuSize({ statusQuery: false, data, dataFetched: true }));
      // console.log('SkuSize Thunk',data);
    } catch (error) {
      console.error(error);
    }
  };
}


const apiColorAssigment= () => {
  return async (dispatch: ReturnType<typeof useAppDispatch>) => {
    dispatch(startConnColorAssig());

    try {
      const response = await transactionApi.get("parameters/colorassigment");
      const data = Object.values(response.data)[1] as [] ;
      dispatch(dbSetColorAssig({ statusQuery: false, data, dataFetched: true }));
      // console.log('color Assigment Thunk',data);
    } catch (error) {
      console.error(error);
    }
  };
}


export {
  getAllItems,
  apiClasse,
  apiColor,
  apiSkuSize,
  apiColorAssigment
}
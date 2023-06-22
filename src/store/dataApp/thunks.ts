import { transactionApi } from "../../api";
import { useAppDispatch } from "../store";
import { dbSetColor, dbSetProducts, startConnection } from "./dataAppSlice";

 const getAllItems = () => {
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


const getClass = () => {
  return async (dispatch: ReturnType<typeof useAppDispatch>) => {
    dispatch(startConnection());

    try {
      const response = await transactionApi.get("parameters/newItemClass");
      const data = Object.values(response.data)[1];
      dispatch(dbSetProducts({ statusQuery: false, data  }));
    } catch (error) {
      console.error(error);
    }
  };
};

const getFunction = () => {
  return async (dispatch: ReturnType<typeof useAppDispatch>) => {
    dispatch(startConnection());

    try {
      const response = await transactionApi.get("parameters/color");
      const data = Object.values(response.data)[1];
      dispatch(dbSetColor({ statusQuery: false, data  }));
    } catch (error) {
      console.error(error);
    }
  };
};


export {
  getFunction,
  getAllItems,
  getClass
}
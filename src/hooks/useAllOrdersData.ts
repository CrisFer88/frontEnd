import { useEffect, useState } from "react";
import { IS_allOrdersByDate, localStorageMachine } from "../utils/types";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchAllOrdersByDate } from "../thunks/production/allordersbydate.thunk";

export const useAllOrdersData = ( order_date: string) => {
  const dispatch = useAppDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const machine: localStorageMachine = JSON.parse(
    localStorage.getItem("Machine") || ""
  );
  const respu = useAppSelector((state) => state.allOrders);
  const { isLoading, data, dataFetched, error } = respu;

  // En el componente, utiliza el estado para almacenar los datos en orden inverso
  const iniOrder: IS_allOrdersByDate = {
    order_id: 0,
    assig_id: 0,
    order_qty: 0,
    order_date: "",
    order_name: "",
  };
  const [reversedData, setReversedData] = useState<IS_allOrdersByDate[]>([iniOrder]);

  useEffect(() => {
    setReversedData(data.slice().reverse());
  }, [data]);

//   interface dr {
//     assig_id: number;
//     order_date: string;
//   }

  const dataLocalStorage = {
    assig_id: machine.assignment,
    order_date,
  };

  useEffect(() => {
    if (!dataFetched) {
      dispatch(fetchAllOrdersByDate(dataLocalStorage));
    }
  }, [dataFetched, isLoading]);

 

  return { isLoading, data, reversedData, machine };
};

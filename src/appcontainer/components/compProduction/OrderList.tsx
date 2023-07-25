import { useEffect, useState } from "react";
import { useAllOrdersData } from "../../../hooks/useAllOrdersData";
import { useAppSelector } from "../../../store";
import "../../../styles/page.css";
import { formatDateTime } from "../../../utils/funtionsApp";
import { IS_allOrdersByDate } from "../../../utils/types";
import useForm from "../../../hooks/useForm";

export const OrderList = () => {
  /*
    This hook allowme to get all the record data that comes from the DB 
    and return the machine assignment, I am passing an argument which is the date comimg from
    DatePicker state.
  */
  const { isLoading, reversedData, machine } = useAllOrdersData(
    new Date().toString()
  );

  const iniOrder: IS_allOrdersByDate = {
    order_id: 0,
    assig_id: 0,
    order_qty: 0,
    order_date: "01/01/0000",
    order_name: "-",
  };

  const [orderSelected, setOrderSelected] =
    useState<IS_allOrdersByDate>(iniOrder);

  useEffect(() => {
    // console.log(!isLoading);
    if (!isLoading && reversedData.length > 0) {
      setOrderSelected(reversedData[0]);
      localStorage.setItem(
        "orderId",
        reversedData[0].order_id?.toString() || ""
      );
    }
  }, [reversedData]);

  const handleIndividualItem = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const orderId = e.target.value;

    const listElement = reversedData.find(
      (elem) => elem.order_id?.toString() === orderId
    );
    if (listElement) {
      setOrderSelected(listElement);
      localStorage.setItem("orderId", listElement.order_id?.toString() || "");
    }
  };

  if (isLoading) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  } else {
    return (
      <div className="container__page">
        <div className="container__page--title">
          <label> {machine.machine} </label>
        </div>
        <div>
          <label className="bold">SELECT ORDER:</label>
          <select
            name="order_selected"
            className="select__field"
            onChange={handleIndividualItem}
          >
            {reversedData.length > 0 &&
              reversedData.map((elem) => (
                <option key={elem.order_id} value={elem.order_id}>
                  {elem.order_name} - {formatDateTime(elem.order_date)}
                </option>
              ))}
          </select>
        </div>

        <div className="container__page--info">
          <div className="container__page--title">
            <label>LAST ORDER SELECTED</label>
          </div>
          <div className="centered-data">
            {reversedData.length > 0 ? (
              <p> {orderSelected.order_name} </p>
            ) : (
              <p>
                There are no orders for today, please create a new order before starting.
              </p>
            )}
            {
              reversedData.length > 0 && <p> {formatDateTime(orderSelected.order_date)} </p>
            }
          </div>
        </div>
      </div>
    );
  }
};

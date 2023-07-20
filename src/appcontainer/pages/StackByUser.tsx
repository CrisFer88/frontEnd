import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchAllStacksByDate } from '../../thunks/production/allstackbydate.thunk';
import { IS_allStacksByDate, localStorageMachine } from '../../utils/types';
import addButton from "../../assets/icon/add_button.png";
import { formatDateTime } from '../../utils/funtionsApp';

export const StackByUSer = ({ stackp_date }: { stackp_date: string } ) => {
  const dispatch = useAppDispatch();
  const [selectedItem, setSelectedItem] = useState(false);
  const respu = useAppSelector((state) => state.allStacks);
  const { isLoading, data: reversedData, dataFetched, error } = respu;
  const machine: localStorageMachine = JSON.parse(
    localStorage.getItem("Machine") || ""
  );
  const dataLocalStorage = {
    assig_id: machine.assignment,
    stackp_date
  };

  useEffect(() => {
    if (!dataFetched) {
      console.log(dataLocalStorage);
      dispatch(fetchAllStacksByDate( dataLocalStorage ));
    }
  }, [dataFetched]);

  const handleIndividualItem = (elem: IS_allStacksByDate) => {
    setSelectedItem(true);
    // console.log(elem);
    // setValues({
    //   ...values,
    //   order_qty: elem.order_qty,
    //   order_name: elem.order_name,
    // });
  };


  return (
    <div>
      <div className="container__page">
        {reversedData.length > 0 && (
          <div className="container__table">
            <div className="container__table--title">
              <p>TODAY'S ORDERS</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th>QUANTITY</th>
                  <th>DATE</th>
                  <th>NAME</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {reversedData.map((elem: IS_allStacksByDate, index: number) => (
                  <tr key={`A${index}`}>
                    <td className="centered-data"> {elem.stackp_qty} </td>
                    <td className="centered-data">
                      {" "}
                      {formatDateTime(elem.stackp_date)}
                    </td>
                    <td className="centered-data"> {elem.stackp_sku} </td>
                    <td className="centered-data">
                      <img
                        className="img__add"
                        src={addButton}
                        alt={`Name:${elem.stackp_sku}`}
                        onClick={() => handleIndividualItem(elem)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

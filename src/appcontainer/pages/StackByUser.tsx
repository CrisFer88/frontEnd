import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchAllStacksByDate } from '../../thunks/production/allstackbydate.thunk';
import { IS_allStacksByDate, localStorageMachine } from '../../utils/types';
import addButton from "../../assets/icon/add_button.png";
import { formatDateTime } from '../../utils/funtionsApp';

export const StackByUSer = ({ stackp_date, stackByUserSelected}: { stackp_date: string, stackByUserSelected: (elem: IS_allStacksByDate) => void }) => {
  const dispatch = useAppDispatch();
 
  const respu = useAppSelector((state) => state.allStacks);
  const { isLoading, data: reversedData, dataFetched, error } = respu;
  const machine: localStorageMachine = JSON.parse(
    localStorage.getItem("Machine") || ""
  );
  const dataLocalStorage = {
    assig_id: machine.assignment,
    stackp_date
  };

    // console.log('IsLoading aqui: ', isLoading);

    useEffect(() => {
      if (!dataFetched) {
        dispatch(fetchAllStacksByDate(dataLocalStorage));
      }
    }, [isLoading]);

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
                        onClick={() => stackByUserSelected(elem)}
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

import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";

import useForm from "../../../hooks/useForm";
import Modal from "../ui/Modal";
import addButton from "../../../assets/icon/add_button.png";
import ButtonGroup from "../ui/ButtonGroup";

import "../../../styles/page.css";

import { IS_allOrdersByDate } from "../../../utils/types";
import { formatDateTime } from "../../../utils/funtionsApp";
import { regexEmpty, regexNum, regexZeroEmpty } from "../../../utils/regexVar";

import { newOrder } from "../../../thunks/production/allordersbydate.thunk";
import { useModal } from "../../../hooks/useModal";
import { useAllOrdersData } from "../../../hooks/useAllOrdersData";
import { useAppDispatch } from "../../../store";

export const NewOrder = () => {
  const dispatch = useAppDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [selectedItem, setSelectedItem] = useState(false);
  const { isOpen, closeModal, openModal } = useModal(false);

  /*
    This hook allowme to get all the record data that comes from the DB 
    and return the machine assignment, I am passing an argument which is the date comimg from
    DatePicker state.
  */
  const { isLoading, data, reversedData, machine } = useAllOrdersData(
    startDate.toString()
  );

  const formValidations = {
    order_name: [
      (value: string) => {
        const regex = regexEmpty;
        return regex.test(value);
      },
      "Reference name is required.",
      "require",
    ],
    order_qty: [
      (value: string) => {
        const regex = regexZeroEmpty;
        const regex2 = regexNum;
        return regex.test(value) && regex2.test(value);
      },
      "Quantity is required and only numbers.",
      "require",
    ],
  };

  const {
    values,
    setValues,
    errors,
    handleChangeInput: onNewOrderInput,
    isFormValid,
    onResetForm,
  } = useForm(
    {
      order_qty: 0,
      order_name: "",
    },
    formValidations
  );

  const handleOnSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isFormValid) {
      openModal();
    } else {
      const dataSend = {
        assig_id: machine.assignment,
        order_qty: values.order_qty,
        order_date: startDate.toString(),
        // order_date: startDate.toLocaleString('en-US', { timeZone: 'America/New_York' }),
        order_name: values.order_name,
      };

      dispatch(newOrder(dataSend));
      onResetForm();
    }
  };

  useEffect(() => {
    setStartDate(new Date());
  }, [values]);

  const handleIndividualItem = (elem: IS_allOrdersByDate) => {
    setSelectedItem(true);
    console.log(elem);
    setValues({
      ...values,
      order_qty: elem.order_qty,
      order_name: elem.order_name,
    });
  };
  const handleOnDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Se va aborrar Color");
  };
  const handleOnUpDate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("se va a actualizar Color");
  };
 


  return (
    <div className="container__form">
      <Modal isOpen={isOpen} closeModal={closeModal} classNameModal="modalA">
        <div className="modal__headerA">
          <p className="es">Estos son los errores en el formulario:</p>
          <p className="en">These are the present error in the form.</p>
        </div>
        <div className="modal__bodyA">
          {Object.values(errors).map(
            (e, index) => !!e && <p key={index}>{e}</p>
          )}
        </div>
      </Modal>
      <div className="container__form--body">
        {/* Inicio del formulario */}
        <form
          // onSubmit={handleOnSave}
          className="form__options"
          autoComplete="none"
        >
          <div className="col center">
            <div className="input__spetialfieldform">
              <ReactDatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                showTimeSelect
                timeIntervals={15} // Puedes ajustar los intervalos de tiempo según tus necesidades
                timeCaption="Hora"
                dateFormat="dd/MM/yyyy HH:mm" // Puedes cambiar el formato de fecha y hora según tus necesidades
                name="singUpDate"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              />
            </div>
          </div>
          <div className="col center">
            <p>{machine.machine}</p>
          </div>
          <div className="col center">
            <label className="label__title">REFERENCE NAME:</label>
            <input
              name="order_name"
              className="select__field"
              value={values.order_name}
              onChange={onNewOrderInput}
            ></input>
          </div>
          <div className="col center">
            <label className="label__title">QUANTITY:</label>
            <input
              name="order_qty"
              className="select__field"
              value={values.order_qty}
              onChange={onNewOrderInput}
            ></input>
          </div>
          <div className="container__buttongroup sizeone">
            <ButtonGroup
              onSave={handleOnSave}
              onDelete={handleOnDelete}
              onUpdate={handleOnUpDate}
              onReset={onResetForm}
              selectedItem={selectedItem}
            />
          </div>
        </form>
      </div>
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
                {reversedData.map((elem: IS_allOrdersByDate, index: number) => (
                  <tr key={`A${index}`}>
                    <td className="centered-data"> {elem.order_qty} </td>
                    <td className="centered-data">
                      {" "}
                      {formatDateTime(elem.order_date)}
                    </td>
                    <td className="centered-data"> {elem.order_name} </td>
                    <td className="centered-data">
                      <img
                        className="img__add"
                        src={addButton}
                        alt={`Name:${elem.order_name}`}
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
  );
};

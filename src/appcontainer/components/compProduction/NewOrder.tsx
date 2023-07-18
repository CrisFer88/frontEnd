import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { localStorageMachine } from "../../../utils/types";
import useForm from "../../../hooks/useForm";
import { regexEmpty, regexZeroEmpty } from "../../../utils/regexVar";
import ButtonGroup from "../ui/ButtonGroup";
import Modal from "../ui/Modal";
import { useModal } from "../../../hooks/useModal";

export const NewOrder = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { isOpen, closeModal, openModal } = useModal(false);
  const machine: localStorageMachine = JSON.parse(
    localStorage.getItem("Machine") || ""
  );

  const formValidations = {
    order_qty: [
      (value: string) => {
        const regex = regexZeroEmpty;
        return regex.test(value);
      },
      "Quantity is required.",
      "require",
    ],
  };

  const {
    values,
    errors,
    handleChangeSelect: onNewOrder,
    handleChangeInput: onNewOrderInput,
    isFormValid,
    onResetForm,
  } = useForm(
    {
      order_qty: "",
    },
    formValidations
  );

  const handleOnSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) {
      openModal();
    } else {
      const dataSend = {
        assig_id: machine.assignment,
        order_qty: values.order_qty,
        order_date: startDate.toLocaleString()
      };

      console.log(dataSend);
    }
  };

  useEffect(() => {
    setStartDate(new Date());
  }, [values]);

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
          onSubmit={handleOnSave}
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
            <label className="label__title">QUANTITY:</label>
            <input
              name="order_qty"
              className="select__field"
              value={values.order_qty}
              onChange={onNewOrderInput}
            ></input>
          </div>
          <div className="container__form--title ">
            <button className="button__form">
              <span>SAVE</span>
            </button>
            <button className="button__form" onClick={onResetForm}>
              <span>RESET</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

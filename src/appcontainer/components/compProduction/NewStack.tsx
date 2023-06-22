import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "../../../styles/formStyle.css";

import "react-datepicker/dist/react-datepicker.css";
import Modal from "../ui/Modal";
import { useModal } from "../../../hooks/useModal";
// import { getPermitions } from "../../../helpers/getPermitions";

export const NewStack = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { isOpen, openModal, closeModal } = useModal(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Se envio algo");
  };
  //TODO: Aqui envio el valor de la vista, para que la funcion evalue que permisos tiene y con base a ello ocultar los botones o la vista completa
  // getPermitions(5);
  const permit = true;

  if (!permit) {
    return (
      <div className="apologize">
        <p>
          Sorry, you do not have the right credentials to access this view,
          please contact the administrator.
        </p>
      </div>
    );
  } else {
    // console.log(isOpen);
    return (
      <>
        <Modal isOpen={isOpen} closeModal={closeModal} classNameModal="modalA">
          <div className="modal__headerA">
            <p className="es">Estos son los errores en el formulario:</p>
            <p className="en">These are the present error in the form.</p>
          </div>
          <div className="modal__bodyA">
            {/* {Object.values(errors).map(
              (e, index) => !!e && <p key={index}>{e}</p>
            )} */}
          </div>
        </Modal>
        <div className="container__form ">
          {/* Tititulo del formulario */}
          {/* <div className="container__form--title">
            <p> NEW STACK </p>
          </div> */}
          {/* Contenedor del formulario */}
          <div className="container__form--body">
            {/* Inicio del formulario */}
            <form onSubmit={handleSubmit} className="form__options">
              <p className="container__form--subtitle"> CURRENT INFO: </p>

              <div className="col center">
                <div className="input__spetialfieldform">
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    name="singUpDate"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText="Birthday"
                  />
                </div>
              </div>

              <div className="fieldform">
                <div className="col center">
                  <label className="label__title">COMPONENT:</label>
                  <input
                    className="input__field"
                    id="comp"
                    name="comp"
                    type="text"
                    autoFocus
                  />
                </div>
              </div>
              <div className="fieldform">
                <div className="col center">
                  <label className="label__title">QUANTITY:</label>
                  <input
                    className="input__field"
                    id="comp"
                    name="comp"
                    type="text"
                  />
                </div>
              </div>

              {/* Contenedor de la botonera */}
              <div className="container__form--title ">
                <button className="button__form">
                  <span>SAVE</span>
                </button>
              </div>
            </form>

            {/* {console.log(startDate)} */}
          </div>
        </div>
      </>
    );
  }
};

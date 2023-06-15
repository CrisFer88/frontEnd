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
        <button onClick={openModal}>Abrir Modal</button>
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <div className="modal--Label">
            <h3>Este es el Modal</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              obcaecati nobis consequatur quae consectetur cupiditate delectus
              rem saepe in vitae excepturi nostrum, est aliquam alias
              necessitatibus unde nam! Reprehenderit, doloribus.
            </p>
          </div>
        </Modal>
        <div className="container__form ">
          {/* Tititulo del formulario */}
          <div className="container__form--title">
            <p> NEW STACK </p>
          </div>
          {/* Contenedor del formulario */}
          <div className="container__form--body">
            {/* Inicio del formulario */}
            <form onSubmit={handleSubmit}>
              <p className="container__form--subtitle"> CURRENT INFO: </p>

              <div className="fieldform--center">
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

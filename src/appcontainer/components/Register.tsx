import React, {useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useForm from "../../hooks/useForm";
import {
  regexBasicPassword,
  regexEmail,
  regexText,
} from "../../utils/regexVar";

export const Register = () => {
  const [startDate, setStartDate] = useState(new Date());

  /*________________________________________________________________________
  
                               PREPARACION DE VARIABLES PARA VALIDACION 
                                   DEL FORMULARIO Y MANEJO DE DATA
  __________________________________________________________________________*/


  //   Defino la interfaz para asegurar el tipado de los datos que estoy utilizando
  interface initFS {
    singUpName: string;
    singUpNameValid: string;
    singUpLastName: string;
    singUpLastNameValid: string;
    singUpEmail: string;
    singUpEmailValid: string;
    singUpPassword: string;
    singUpPasswordValid: string;
  }
  // Creo el objeto que voy a estar utilizando para contener los valores editados de cada campo y referencio la interfaz
  const initFormState: initFS = {
    singUpName: "",
    singUpNameValid: "",
    singUpLastName: "",
    singUpLastNameValid: "",
    singUpEmail: "",
    singUpEmailValid: "",
    singUpPassword: "",
    singUpPasswordValid: "",
  };

  //Establezco la validacion de datos teneindo en cuenta que el objeto a enviar esta constituido de la siguiente manera:
  //nombre del campo:  [ funcion que evalua el error-Aqui importo los regex-  , "Mensaje de error" , especifico si es 'Require' y sino lo dejo vacio '' ]
  const formValidations = {
    singUpName: [
      (value: string) => {
        const regex = regexText;
        return regex.test(value);
      },
      "Just letters are avoid.",
      "require",
    ],
    singUpLastName: [
      (value: string) => {
        const regex = regexText;
        return regex.test(value);
      },
      "Just letters are avoid.",
      "require",
    ],

    singUpEmail: [
      (value: string) => {
        const regex = regexEmail;
        return regex.test(value);
      },
      "Invalid Email.",
      "require",
    ],
    singUpPassword: [
      (value: string) => {
        const regex = regexBasicPassword;
        return regex.test(value);
      },
      "Invalid password.",
      "require",
    ],
  };
  //Hook que contiene el estado de los campos del formulario
  const {
    values,
    errors,
    handleChangeInput: onSingUpInputChange,
    handleOnBlur,
    isFormValid,
    onResetForm,
  } = useForm(initFormState, formValidations);

  //En el evento de envio del formulario
  const registerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();



    //Verifico si el formulario tiene algun error, es decir, si el formulario es valido - true -
    if (isFormValid && errors) {
      const { singUpName, singUpLastName, singUpEmail, singUpPassword } =
        values;
      //Preparlo la data que va a ser enviada al auth
      const data = {
        singUpData: startDate,
        singUpName,
        singUpLastName,
        singUpEmail,
        singUpPassword,
      };

      console.log(data);
      console.log(errors);
      
      onResetForm();

    }
  };

  // console.log(values);

  return (
    <div className="container-left">
      <div className="container__login">
        <div className="container__Login--tittle">
          <h3>SING UP</h3>
        </div>
        <form onSubmit={registerSubmit}>
          <div className="fieldform--center">
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              name= "singUpDate"
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              placeholderText="Birthday"
            />
          </div>

          <div className="fieldform">
            <input
              onChange={onSingUpInputChange}
              onBlur={handleOnBlur}
              value={values.singUpName}
              className="form-control"
              name="singUpName"
              placeholder="Name"
              type="text"
              required
            />
            {!!errors.singUpNameValid && (
              <p className="errormsg"> {errors.singUpNameValid} </p>
            )}
          </div>

          <div className="fieldform">
            <input
              onChange={onSingUpInputChange}
              onBlur={handleOnBlur}
              value={values.singUpLastName}
              className="form-control"
              name="singUpLastName"
              placeholder="Last Name"
              type="text"
              required
            />
            {!!errors.singUpLastNameValid && (
              <p className="errormsg"> {errors.singUpLastNameValid} </p>
            )}
          </div>

          <div className="fieldform">
            <input
              onChange={onSingUpInputChange}
              onBlur={handleOnBlur}
              value={values.singUpEmail}
              className="form-control"
              name="singUpEmail"
              placeholder="Email"
              type="email"
              autoComplete="new-email"
              required
            />
            {!!errors.singUpEmailValid && (
              <p className="errormsg"> {errors.singUpEmailValid} </p>
            )}
          </div>

          <div className="fieldform">
            <input
              onChange={onSingUpInputChange}
              onBlur={handleOnBlur}
              value={values.singUpPassword}
              className="form-control"
              name="singUpPassword"
              placeholder="Password"
              type="password"
              autoComplete="new-password"
              required
            />
            {!!errors.singUpPasswordValid && (
              <p className="errormsg"> {errors.singUpPasswordValid} </p>
            )}
          </div>

          <div className="fieldform">
            <button className="button">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

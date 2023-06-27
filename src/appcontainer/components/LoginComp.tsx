import React from "react";
import { useForm } from "../../hooks/useForm";
import { regexBasicPassword, regexEmail } from "../../utils/regexVar";
import { useAuthStore } from "../../hooks";


export const LoginComp = () => {
  const {  startLoging } = useAuthStore();
  /*________________________________________________________________________
  
  PREPARACION DE VARIABLES PARA VALIDACION 
  DEL FORMULARIO Y MANEJO DE DATA
  __________________________________________________________________________*/
  //   Defino la interfaz para asegurar el tipado de los datos que estoy utilizando
  interface initFS {
    loginEmail: string;
    loginEmailValid: string;
    loginPassword: string;
    loginPasswordValid: string;
  }
  // Creo el objeto que voy a estar utilizando para contener los valores editados de cada campo y referencio la interfaz
  const initFormState: initFS = {
    loginEmail: "",
    loginEmailValid: "",
    loginPassword: "",
    loginPasswordValid: "",
  };

  //Establezco la validacion de datos teneindo en cuenta que el objeto a enviar esta constituido de la siguiente manera:
  //nombre del campo:  [ funcion que evalua el error-Aqui importo los regex-  , "Mensaje de error" , especifico si es 'Require' y sino lo dejo vacio '' ]
  const formValidations = {
    loginEmail: [
      (value: string) => {
        const regex = regexEmail;
        return regex.test(value);
      },
      "Invalid email format.",
      "require",
    ],
    loginPassword: [
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
    handleChangeInput: onLoginInputChange,
    handleOnBlur,
    isFormValid,
    onResetForm,
  } = useForm(initFormState, formValidations);

  //En el evento de envio del formulario

  const loginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //Verifico si el formulario tiene algun error, es decir, si el formulario es valido - true -
    if (isFormValid) {
      const { loginEmail: user_email, loginPassword: user_password } = values;
      //Preparlo la data que va a ser enviada al auth
      startLoging({ user_email, user_password });
    }
    onResetForm();
  };

  return (
    <div className="container-right">
      <div className="container__login">
        <div className="container__title">
          <h3>LOGIN</h3>
        </div>
        <form onSubmit={loginSubmit}>
          <div className="fieldform">
            <input
              autoComplete="new-email"
              autoFocus
              className="form-control"
              name="loginEmail"
              onBlur={handleOnBlur}
              onChange={onLoginInputChange}
              placeholder="Email"
              required
              type="text"
              value={values.loginEmail}
            />
            {!!errors.loginEmailValid && (
              <p className="errormsg"> {errors.loginEmailValid} </p>
            )}
          </div>
          <div className="fieldform">
            <input
              autoComplete="new-password"
              className="form-control"
              name="loginPassword"
              onChange={onLoginInputChange}
              onBlur={handleOnBlur}
              placeholder="Password"
              type="password"
              value={values.loginPassword}
            />
            {!!errors.loginPasswordValid && (
              <p className="errormsg"> {errors.loginPasswordValid} </p>
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

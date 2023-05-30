import React from "react";
import { useForm } from "../../hooks/useForm";

export const LoginComp = () => {
  //   Defino la interfaz para asegurar el tipado de los datos que estoy utilizando
  interface initFS {
    loginEmail: string;
    loginPassword: string;
  }
  // Creo el objeto que voy a estar utilizando para contener los valores editados de cada campo
  const initFormState: initFS = {
    loginEmail: "",
    loginPassword: ""
  };

  const formValidations = {
    loginEmail: [ (value : string ) =>  value.includes('@'),'Falta arroba'],
    loginPassword: [ (value : string ) =>  value.length >= 6 ,''],
  };
  //Hook que contiene el estado de los campos del formulario
  const {
    values,
    errors,
    handleChange: onLoginInputChange
  } = useForm(initFormState, formValidations);

  const loginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

 console.log(errors);

  return (
    <div className="container-right">
      <div className="container__login">
        <div className="container__Login--tittle">
          <h3>LOGIN</h3>
        </div>
        <form onSubmit={loginSubmit}>
          <div className="fieldform">
            <input
              onChange={onLoginInputChange}
              value={values.loginEmail}
              className="form-control"
              name="loginEmail"
              placeholder="Email"
              type="text"
              required
            />
              
          </div>
          <div className="fieldform">
            <input
              onChange={onLoginInputChange}
              value={values.loginPassword}
              className="form-control"
              name="loginPassword"
              placeholder="Password"
              type="password"
            />
          </div>

          <div className="fieldform">
            <button className="button">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

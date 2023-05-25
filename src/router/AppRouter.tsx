import React, { Fragment } from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage, HomePage }from '../appcontainer';


//TODO: En esta parte puedo realizar  la verificacion del usuario en ell authStore cuando lo cree
const statusAuth: string = 'non-authenticated';
// const statusAuth: string = 'authenticated';

const AppRouter = () :JSX.Element  => {
    //TODO:En el AppRouter voy a definir mi entrada a la aplicacion, aqui valido que la sesion sea validada
    return (
        <Routes >
    
            {
            //  TODO: hacer la autentificacion de la ruta, mostrar el registro si el usuario no esta registrado
              ( statusAuth === 'non-authenticated') //Si estoy autenticado
                ? (
                
                  <>
                    {/* LLevame al login para el ingreso */}
                    <Route path="/auth/*" element={ <LoginPage /> } /> 
                    {/* Esta parte es un fail save, lo que hace es que si no estoy autenticado, me lleva a registrarme */}
                    <Route path="/*" element={ <Navigate to ="/auth/login" /> } /> 
                  </> 
                )
                : (
                  <>
                    {/* Si estoy autenticado llevame a cualquier parte de mi aplicacion */}
                    <Route path="*" element={ <HomePage /> } /> 
                    <Route path="/*" element={ <Navigate to ="/" /> }  />
                  </>
                )
              }
          
    
            
        </Routes >
      )
}

export default AppRouter    
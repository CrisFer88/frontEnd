import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage, HomePage } from "../appcontainer";
import { useAuthStore } from "../hooks";

// const statusAuth: string = 'authenticated';

const AppRouter = (): JSX.Element => {
  //TODO:En el AppRouter voy a definir mi entrada a la aplicacion, aqui valido que la sesion sea validada
  const lastPath = localStorage.getItem("lastPath");
  // Con esta variable se en que Pad estuvo la pagina antes de ser actualizada
  const userSt = localStorage.getItem("userSt");
  const { statusAuth, checkAuthToken } = useAuthStore();
  //TODO: En esta parte puedo realizar  la verificacion del usuario en ell authStore cuando lo cree

  // console.log('este es el statusAuth', statusAuth);

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (statusAuth === "checking") {
    return <h3>Cargando...</h3>;
  }
  return (
    <Routes>
      {
        //  TODO: hacer la autentificacion de la ruta, mostrar el registro si el usuario no esta registrado
        statusAuth === "not-authenticated" && userSt !== 'OK' ? ( //Si estoy autenticado
          <>
            {/* LLevame al login para el ingreso */}
            <Route path="/auth/*" element={<LoginPage />} />
            <Route path="/*" element={<Navigate to="/auth/loging" />} />
          </>
        ) : (
          <>
            {/* Si estoy autenticado llevame a cualquier parte de mi aplicacion */}
            <Route path="/*" element={<HomePage />} />
            <Route path="/*" element={<Navigate to={ lastPath || '/' }/>} />
          </>
        )
      }
    </Routes>
  );
};

export default AppRouter;

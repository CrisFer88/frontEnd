import { loginApi } from "../api";
import { useAppDispatch, useAppSelector } from "../store";
import {
  onChecking,
  onLogin,
  onLogout,
  clearErrorMessage,
} from "../store/auth/authSlice";

export const useAuthStore = () => {
  const { statusAuth, user, errorMsg } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  interface intFC {
    user_email: string;
    user_password: string;
  }
  interface erroDef {
    okResponse: boolean;
    msgResponse: string;
    statusResponse: number;
    eMsgResponse: object;
  }
  const startLoging = async ({ user_email, user_password }: intFC) => {
    // console.log(user_email, user_password);
    dispatch(onChecking());

    try {
      const { data } = await loginApi.post("/api/login", {
        user_email,
        user_password,
      });
      // console.log("CRIS ESTA ES LA DATA---------------->",data);
      //TODO: Cambiar aqui los valores que retorna el Backend, pidiendo el objeto con las vistas que seran bloqueadas
      const machine = { assignment: data.Assignation.assig_id, machine: data.Assignation.Machinery.mach_name, processM: data.Assignation.Machinery.mach_process}
      localStorage.setItem("Machine", JSON.stringify(machine));
      localStorage.setItem("token", data.token);
      localStorage.setItem("userSt", "OK");
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(
        onLogin({
          name: data.uname,
          sessionId: data.sessionId,
          uId: data.uid,
          uStatus: data.ustatus,
          Assignation: data.Assignation
        })
      );
    } catch (e: any) {
      const objectError: erroDef = {
        okResponse: e.response.data.ok,
        msgResponse: e.response.data.msg,
        statusResponse: e.response.status,
        eMsgResponse: e.response.statusText,
      };
      dispatch(onLogout(objectError));
      setTimeout(() => {
        dispatch(clearErrorMessage);
      }, 1000);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    // console.log(`El toquen en el Storage-${!token}-:  ${ token }`);
    if (!token) return dispatch(onLogout("-"));

    try {
      const { data } = await loginApi.get("/api/auth/renew");
      // console.log({ data });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(
        onLogin({
          name: data.uname,
          sessionId: data.sessionId,
          uId: data.uid,
          uStatus: data.ustatus,
        })
      );
    } catch (error) {
      localStorage.clear();
      console.log(error);
      dispatch(onLogout(error));
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout("Logout"));
  };

  return {
    // PROPIEDADES
    statusAuth,
    user,
    errorMsg,
    //METODOS
    checkAuthToken,
    startLoging,
    startLogout,
  };
};

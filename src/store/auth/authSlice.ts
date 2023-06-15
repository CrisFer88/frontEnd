import { createSlice } from "@reduxjs/toolkit";

interface initStateIf {
  //voy a definir los datos que quiero que tenga el usuario al autenticarse
  statusAuth: string;
  user: object;
  errorMsg: object;
}





const initialState: initStateIf = {
  statusAuth: "not-authenticated",
  user: {},
  errorMsg: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogin: (state, { payload }) => {
      state.statusAuth = "authenticated";
      state.user = payload;
      state.errorMsg = {};
      // console.log("Llego el onLoging");
    },
    onLogout: (state , { payload }) => {
      state.statusAuth = "not-authenticated";
      state.user = {};
      state.errorMsg = payload;
    },
    onChecking: (state) => {
      // console.log("Llego el onchecking");
      state.statusAuth = "checking";
      state.user = {};
      state.errorMsg = {};
    },
    clearErrorMessage: (state) => {
      state.errorMsg = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { onLogin, onLogout, onChecking, clearErrorMessage } =
  authSlice.actions;

export default authSlice.reducer;

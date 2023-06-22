import React from "react";


  export const regexText = /^([a-zA-Z])*$/;
  export const regexBasicCel = /^\d{8,11}$/;
  export const regexNum = /^[0-9]*$/;
  export const regexEmpty = /^.+$/;
  // export const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  export const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
  export const regexBasicPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
  export const regexMediumPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
  export const regexStrongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
  //fecha mm-dd-aaaa
  export const regexDateEEUU = /(?:0?[1-9]|1[1-2])([\-/.])(3[01]|[12][0-9]|0?[1-9])\1\d{4}$/;

  
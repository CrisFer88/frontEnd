import {  useEffect, useMemo, useState } from "react";

export const useFields =<T>(initialForm: T) => {
  //Hook que maneja el estado del formulario
  const [formState, setFormState] = useState<T>(initialForm);
  //Hook que contiene el estado de la validacion el formulario
  const [formValidation, setFormValidation] = useState<Partial<T>>({});

  //Se hace la validacion de los campos con cada cambio que tenga en su estado
  useEffect(() => {
  }, [formState]);



  //Hook que contiene el estado de la validacion el formulario
  const onInputChange = ({ target }: { target: any }) => {
    // console.log(target);
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });

  };

  // -----------------------------------DATA VALIDATION-----------------------------------------------

  const validateEmpty = ( { target }: { target: any } ) => {
    const formCheckedValues:any = {};

    for (const inputForm of target) {
        if (inputForm.name !== '') {
            formCheckedValues[`${inputForm.name}Valid`] = !!inputForm.value ? true : "No empty values allowed.";
        }
    }
    // console.log(formCheckedValues);
    setFormValidation(formCheckedValues);
}


//se memoriza el valor de la variable que contiene la validacion total del formulario
const isFormValid = useMemo(() => {
    return true;
}, [])



//Para hacer un reset en el formulario

//Funcion que hace el reset del formulario
const onResetForm = () => {
  setFormState(initialForm);
}


  return {
    formState,
    onInputChange,

    ...formValidation,
    validateEmpty,
    isFormValid,
    onResetForm
  };
};

//  The `<T>` you see in code, such as `<T extends FormData>`, represents a generic type parameter in TypeScript.
//  Generics allow you to create reusable code that can work with different types. The `<T>` syntax is used to declare a type parameter, and you can use any valid identifier within the angle brackets.
//  In the case of `<T extends FormData>`, it means that `T` is a generic type that extends or is constrained to the `FormData` type. This constraint ensures that `T` can only be a type that is compatible with `FormData` or its subtypes.
//  By using `<T>` as a generic type parameter, you can create flexible and reusable code that can work with different types. When using the code, you will specify the actual type to be used in place of `T`, and TypeScript will enforce type safety based on that specific type.
//  By using <T> as a generic type parameter, you can create flexible and
//  reusable code that can work with different types. When using the code,
//  you will specify the actual type to be used in place of T, and TypeScript will
//  enforce type safety based on that specific type.

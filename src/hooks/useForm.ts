import { useEffect, useMemo, useState } from "react";

/*
If you want to do a validation you must to sent the info for each fiel as, e.g:

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





*/

export const useForm = <T>(initialValues: T, formValidations: object = {}) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<T>>({});

  useEffect(() => {
    validationForm();
  }, [values]);

  //se memoriza el valor de la variable que contiene la validacion total del formulario
  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(errors)) {
      if (!(errors as any)[formValue] !== true) return false;
    }
    return true;
  }, [errors]);

  const handleChangeInput = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    // console.log("Target", name, value);
    // console.log(values);
    if (!name.includes(".")) {
      //Si es un select que no tiene hijos, guardara el valor directamente donde corresponde

      setValues(() => ({
        ...values,
        [name]: value,
      }));
    } else {
      //En el caso de que traiga un punto accediendo a un parametro va a tomar esta ruta y guardara en el hijo que corresponde
      const [parentKey, childKey] = name.split(".");

      setValues((prevValues: any) => ({
        ...prevValues,
        [parentKey]: {
          ...prevValues[parentKey],
          [childKey]: value,
        },
      }));
    }
  };

  const handleChangeSelect = ({
    target,
  }: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = target;
    // console.log("Target", target);
    // console.log(values);
    if (!name.includes(".")) {
      //Si es un select que no tiene hijos, guardara el valor directamente donde corresponde
      setValues(() => ({
        ...values,
        [name]: value,
      }));
    } else {
      //En el caso de que traiga un punto accediendo a un parametro va a tomar esta ruta y guardara en el hijo que corresponde
      const [parentKey, childKey] = name.split(".");

      setValues((prevValues: any) => ({
        ...prevValues,
        [parentKey]: {
          ...prevValues[parentKey],
          [childKey]: value,
        },
      }));
    }
  };

  const handleOnBlur = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    const [fn, errorMessage, require] = (formValidations as any)[name];
    // console.log(name);
    if (require === "require" && !value) {
      setErrors(() => ({
        ...errors,
        [`${name}Valid`]: "This field is required.",
      }));
    } else {
      setErrors(() => ({
        ...errors,
        [`${name}Valid`]: fn((values as any)[name]) ? null : errorMessage,
      }));
    }
  };

  //Funcion que hace el reset del formulario
  const onResetForm = () => {
    setValues(initialValues);
  };

  const validationForm = () => {
    const formCheckedValues: object = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = (formValidations as any)[formField];
      (formCheckedValues as any)[`${formField}Valid`] = fn(
        (values as any)[formField]
      )
        ? null
        : errorMessage;
    }

    setErrors(formCheckedValues);
  };

  return {
    values,
    setValues,
    errors,
    handleChangeInput,
    handleChangeSelect,
    handleOnBlur,
    isFormValid,
    onResetForm,
  };
};

export default useForm;

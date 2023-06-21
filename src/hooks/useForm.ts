import { useMemo, useState } from "react";

export const useForm = <T>(initialValues: T, formValidations: object = {}) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<T>>({});

  // useEffect(() => {
  //   validationForm();
  // }, [values]);

  //se memoriza el valor de la variable que contiene la validacion total del formulario
  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(errors)) {
        if (!(errors as any)[formValue] !== true) return false;
    }
    return true;
}, [errors])

  const handleChangeInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setValues(() => ({
      ...values,
      [name]: value,
    }));
  };

  const handleChangeSelect = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(target);
    const { name, value } = target;
    setValues(() => ({
      ...values,
      [name]: value,
    }));
  };



  const handleOnBlur = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    const [fn, errorMessage, require] = (formValidations as any)[name];
    // console.log(name);
    if (require === "require" && !value) {
      setErrors(() => ({
        ...errors,
        [`${name}Valid`]: 'This field is required.'
      }));
    } else {
      setErrors(() => ({
        ...errors,
        [`${name}Valid`]: fn(
          (values as any)[name]
        )
          ? null
          : errorMessage
      }));
    }
  };

  //Funcion que hace el reset del formulario
  const onResetForm = () => {
    setValues(initialValues);
}

  // const validationForm = () => {
  //   const formCheckedValues: object = {};

  //   for (const formField of Object.keys(formValidations)) {
  //     const [fn, errorMessage] = (formValidations as any)[formField];
  //     (formCheckedValues as any)[`${formField}Valid`] = fn(
  //       (values as any)[formField]
  //     )
  //       ? null
  //       : errorMessage;
  //   }

  //   setErrors(formCheckedValues);
  // };

  return {
    values,
    errors,
    handleChangeInput,
    handleChangeSelect,
    handleOnBlur,
    isFormValid,
    onResetForm
  };
};

export default useForm;

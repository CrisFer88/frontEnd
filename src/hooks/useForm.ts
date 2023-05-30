
import { useEffect, useState } from 'react';
import { getNameOfDeclaration } from 'typescript';

export const useForm = <T>(initialValues: T, formValidations: object = {}) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<T>>({});


  useEffect(() => {
    validationForm();
  }, [values]);
  

  const handleChange = ({target} : React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} =  target;
    setValues(() => ({
      ...values,
      [name]: value,
    }));
  };

  const validationForm = () => {
    const formCheckedValues: object= {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = (formValidations as any)[formField];
      (formCheckedValues as any)[`${formField}Valid`] = fn((values as any)[formField]) ? null : errorMessage;
    }

    setErrors(formCheckedValues);
  };

  return {
    values,
    errors,
    handleChange,
  };
};

export default useForm;

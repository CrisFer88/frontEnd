import React, { useState } from "react";
import addButton from "../../../assets/icon/add_button.png";
import refreshButton from "../../../assets/icon/refresh_button.png";
import useForm from "../../../hooks/useForm";
import { useAppSelector } from "../../../store";
const AllParameters = () => {
  //TODO: recordar hacer un Helper para ajacutar el reset de los formularios

  const respu = useAppSelector((state) => state.clasesApp);
  const { statusQuery, data: clases, dataFetched } = respu;

  const [selectedItem, setSelectedItem] = useState(false);
  type data = {
    itemc_id: string;
    itemc_name: string;
    itemc_nameValid: string;
  };
  const initState: data = {
    itemc_id: "",
    itemc_name: "",
    itemc_nameValid: "",
  };

  const {
    values,
    setValues,
    handleChangeInput: handleClases,
    onResetForm,
    isFormValid,
    errors,
  } = useForm(initState);

  //Aqui obtengo de manera dinamica todos los valores que pueda traer el arreglo obtenid de la consulta
  const init: { [key: string]: boolean } = {};

  clases.forEach((e: { itemc_name: string }) => {
    init[e.itemc_name] = false;
  });

  const [isChecked, setIsChecked] = useState(init);

  console.log(isChecked);

  const handleReset = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    onResetForm();
    setSelectedItem(false);
  };

  return (
    <div className="SVcontainer__center--col">
      <div className="SVcontainer__title">
        <h3> ASSIGNATION PARTS </h3>
        <span onClick={handleReset} className="SVreset">
          <img src={refreshButton} alt="Reset Form" />
        </span>
      </div>
      {/* -------------------------------------------------------- */}
      <div className="SVcontainer__items">
        {statusQuery ? (
          <p> Loading </p>
        ) : (
          clases.map((clase: data, index: number) => (
            <div className="checkbox" key={`1a${clase.itemc_id}`}>
              <input
                type="checkbox"
                name={clase.itemc_name}
                onChange={handleClases}
              />
              {clase.itemc_name}
            </div>
          ))
        )}
      </div>
      {/* -------------------------------------------------------- */}
      <div className="SVcontainer__items">
        {statusQuery ? (
          <p> Loading </p>
        ) : (
          clases.map((clase: data, index: number) => (
            <div className="checkbox" key={`1a${clase.itemc_id}`}>
              <input
                type="checkbox"
                name={clase.itemc_name}
                onChange={handleClases}
              />
              {clase.itemc_name}
            </div>
          ))
        )}
      </div>
      <div>colores</div>
      <div>sku-size</div>
      <div>Otra cosa</div>
    </div>
  );
};

export default AllParameters;

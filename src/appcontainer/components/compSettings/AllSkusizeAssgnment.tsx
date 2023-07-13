import React, { useState } from "react";
// import addButton from "../../../assets/icon/add_button.png";
import refreshButton from "../../../assets/icon/refresh_button.png";
import useForm from "../../../hooks/useForm";
import { useAppSelector } from "../../../store";
import ButtonGroup from "../ui/ButtonGroup";
import { IS_AllSkuSizeAssignment, IS_dataClasses, IS_dataSkuSize } from "../../../utils/types";
const AllSkusizeAssignment = () => {

  const respu = useAppSelector((state) => state.clasesApp);
  const { isLoading: stClass, data: clases } = respu;

  const respu2 = useAppSelector((state) => state.skuSizeApp);
  const { isLoading
    : stSkuSize, data: SkuSize } = respu2;

  const [selectedItem, setSelectedItem] = useState(false);

  const [arrSkuSize, setarrSkuSize] = useState<{ skusize_id: string; }[]>([]);

  
  const initState: IS_AllSkuSizeAssignment  = {
    itemc_id: "",
    itemc_name: "",
    itemc_nameValid: "",
    skusize: [],
  };

  const {
    values,
    setValues,
    handleChangeInput,
    onResetForm,
    isFormValid,
    errors,
  } = useForm(initState);


  const handleReset = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    onResetForm();
    setSelectedItem(false);
  };
  const handleOnSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(e);
  };
  const handleOnDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  const handleOnUpDate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("upd");
  };

  const onChangeRadio = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, id } = target;
    setValues(() => ({
      ...values,
      [name]: value,
      itemc_id: id,
    }));
  };

  const onChangeCheck = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = target;
    

    if (checked) {
      setarrSkuSize((prevIds) => [...prevIds, { skusize_id: id }]); // Agrega el ID seleccionado al arreglo
    } else {
      setarrSkuSize((prevIds) =>
        prevIds.filter((item) => item.skusize_id !== id)
      ); // Elimina el ID deseleccionado del arreglo
    }

    console.log(arrSkuSize);
  };


  
  

  return (
    <div className="SVcontainer__center--col">
      <div className="SVcontainer__title">
        <h3> ASSIGNATION SKU-SIZE </h3>
        <span onClick={handleReset} className="SVreset">
          <img src={refreshButton} alt="Reset Form" />
        </span>
      </div>
      {/* -------------------------------------------------------- */}

      <form>
        <div className="SVcontainer__items">
          {stClass ? (
            <p> Loading classes </p>
          ) : (
            clases.map((clase: IS_dataClasses, index: number) => (
              <div className="SVoptionbox" key={`1a${clase.itemc_id}`}>
                <input
                  type="radio"
                  name="itemc_name"
                  id={clase.itemc_id}
                  value={clase.itemc_name}
                  onChange={onChangeRadio}
                />
                {clase.itemc_name}
              </div>
            ))
          )}

          <br />

          {/* -------------------------------------------------------- */}

          {stSkuSize ? (
            <p> Loading </p>
          ) : (
            SkuSize.map((skusize: IS_dataSkuSize, index: number) => (
              <div className="SVoptionbox" key={`2a${index}`}>
                <input
                  type="checkbox"
                  name="color_name"
                  id={skusize.skusize_id}
                  value={skusize.skusize_name}
                  onChange={onChangeCheck}
                />
                {skusize.skusize_name}
              </div>
            ))
          )}
        </div>
        <div className="SVcontainer__center">
              <ButtonGroup
                onSave={handleOnSave}
                // onDelete={handleOnDelete}
                // onUpdate={handleOnUpDate}
                selectedItem={selectedItem}
              />
            </div>
      </form>
    </div>
  );
};

export default AllSkusizeAssignment;

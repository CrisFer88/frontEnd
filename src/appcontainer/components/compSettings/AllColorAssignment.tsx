import { apiColorAssigment, apiSkuSize, useAppDispatch, useAppSelector } from "../../../store";
import { regexEmpty } from "../../../utils/regexVar";
import { useModal } from "../../../hooks/useModal";
import addButton from "../../../assets/icon/add_button.png";
import Modal from "../ui/Modal";
import React, { useEffect, useState } from "react";
import useForm from "../../../hooks/useForm";

const AllColorAssignment = () => {
  const dispatch = useAppDispatch();
  const respu = useAppSelector((state) => state.colorAssigApp);
  const { statusQuery, data: colorAssig, dataFetched } = respu;

  const respu2 = useAppSelector((state) => state.clasesApp);
  const { data: classes } = respu2;

  const [selectedItem, setSelectedItem] = useState(false);
  const [msgErrorModal, setMsgErrorModal] = useState({ en: "", es: "" });
  const { isOpen, closeModal, openModal } = useModal(false);

  type data = {
    itemk_id: string;
    ParaItemClass: {
      itemc_id: string;
      itemc_name: string;
    };
    ColorItem: {
      color_id: string;
      color_name: string;
    };
  };
  const initState: data = {
    itemk_id: "",
    ParaItemClass: {
      itemc_id: "",
      itemc_name: "",
    },
    ColorItem: {
      color_id: "",
      color_name: "",
    },
  };

  const formValidations = {
    skusize_type: [
      (value: string) => {
        const regex = regexEmpty;
        return regex.test(value);
      },
      "Type field is required.",
      "require",
    ],
    skusize_name: [
      (value: string) => {
        const regex = regexEmpty;
        return regex.test(value);
      },
      "Value field is required.",
      "require",
    ],
  };
  const {
    values,
    setValues,
    handleChangeInput: handlecolorAssig,
    handleChangeSelect: handlecolorAssigSelec,
    onResetForm,
    isFormValid,
    errors,
  } = useForm(initState, formValidations);

  useEffect(() => {
    return () => {
      console.log("validacion skusize: ", dataFetched);
      if (!dataFetched) {
        dispatch(apiColorAssigment());
      }
    };
  }, [dataFetched]);

  const handleIndividualItem = (clase: data) => {
    setSelectedItem(true);
    console.log(clase);
    // setValues({
    //   ...values,
    //   skusize_id: clase.skusize_id,
    //   skusize_type: clase.skusize_type,
    //   skusize_name: clase.skusize_name,
    // });
  };

  const handleReset = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    onResetForm();
    setSelectedItem(false);
  };

  const handleOnSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("Todo good", values);
    } else {
      console.log(errors);
      setMsgErrorModal({
        en: "VALUE And TYPE are required in the SKU-SIZE section.",
        es: "VALUE y TYPE son requeridos en la seccion SKU-SIZE.",
      });
      openModal();
    }
  };
  const handleOnDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  const handleOnUpDate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("upd");
  };

  return (
    <>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div className="SVParagraph__En">
          <p>En:</p>
          <p>{msgErrorModal.en}</p>
        </div>
        <div className="SVParagraph__Es">
          <p>Es:</p>
          <p>{msgErrorModal.es}</p>
        </div>
        <br />
        <p> {!isFormValid && "ERROR:"} </p>
        {/* <p> {!!errors.skusize_nameValid && errors.skusize_nameValid}</p>
        <p> {!!errors.skusize_typeValid && errors.skusize_typeValid}</p> */}
      </Modal>
      <div className="SVcontainer__center--col">
        <div className="SVcontainer__title">
          <h3> COLOR ASSIGMENT </h3>
        </div>
        <div className="SVcontainer__form">
          <form>
          <div className="SVform__field">
              <label className="SVform__field--element">PRODUCT CLASS: </label>
              <div className="SVform__field--input-container">
                <select
                  className="SVform__field--element"
                  name="color_name"
                  onChange={handlecolorAssigSelec}
                  // value={values.ColorItem.color_name}
                > 
                  <option></option>
                 {
                  classes.map( (clase: data['ParaItemClass'], index: number) => ( 
                    <option> { clase.itemc_name } </option>
                  ))
                 } 
                </select>
              </div>
            </div>
            <div className="SVform__field">
              <label className="SVform__field--element">COLOR: </label>
              <div className="SVform__field--input-container">
                <select
                  className="SVform__field--element"
                  name="color_name"
                  onChange={handlecolorAssigSelec}
                  // value={values.ColorItem.color_name}
                > 
                  <option></option>
                 {
                  colorAssig.map( (clase: data, index: number) => ( 
                    <option> { clase.ColorItem.color_name  } </option>
                  ))
                 } 
                </select>
              </div>
            </div>

            <div className="SVcontainer__center">
              <button
                className="SVform__field--button"
                onClick={handleOnSave}
                disabled={selectedItem}
              >
                <span>SAVE</span>
              </button>
              <button
                className="SVform__field--button"
                onClick={handleOnDelete}
                disabled={!selectedItem}
              >
                <span>DELETE</span>
              </button>
              <button
                className="SVform__field--button"
                onClick={handleOnUpDate}
                disabled={!selectedItem}
              >
                <span>UPDATE</span>
              </button>
            </div>
          </form>
        </div>
        <div className="SVcontainer__items">
          {statusQuery ? (
            <p> Loading </p>
          ) : (
            colorAssig.map((clase: data, index: number) => (
              <div className="SVlist__item" key={`A${index}`}>
                <label className="SVlist__item--field">
                  {clase.ParaItemClass.itemc_name}
                </label>
                <label className="SVlist__item--field">
                  {clase.ColorItem.color_name}
                </label>
                <img
                  src={addButton}
                  alt={`Name:${clase.ColorItem.color_name}`}
                  onClick={() => handleIndividualItem(clase)}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default AllColorAssignment;

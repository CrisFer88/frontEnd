import { apiSkuSize, useAppDispatch, useAppSelector } from "../../../store";
import { regexEmpty } from "../../../utils/regexVar";
import { useModal } from "../../../hooks/useModal";
import addButton from "../../../assets/icon/add_button.png";
import refreshButton from "../../../assets/icon/refresh_button.png";
import Modal from "../ui/Modal";
import React, { useEffect, useState } from "react";
import useForm from "../../../hooks/useForm";

const AllSkuSize = () => {
  const dispatch = useAppDispatch();
  const respu = useAppSelector((state) => state.skuSizeApp);
  const { statusQuery, data: clases, dataFetched } = respu;

  const [selectedItem, setSelectedItem] = useState(false);
  const [msgErrorModal, setMsgErrorModal] = useState({ en: "", es: "" });
  const { isOpen, closeModal, openModal } = useModal(false);

  type data = {
    skusize_id: string;
    skusize_type: string;
    skusize_typeValid: string;
    skusize_name: string;
    skusize_nameValid: string;
  };
  const initState: data = {
    skusize_id: "",
    skusize_type: "",
    skusize_typeValid: "",
    skusize_nameValid: "",
    skusize_name: "",
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
    handleChangeInput: handleClases,
    handleChangeSelect: handleClasesSelec,
    onResetForm,
    isFormValid,
    errors,
  } = useForm(initState, formValidations);

  useEffect(() => {
    return () => {
      // console.log("validacion skusize: ", dataFetched);
      if (!dataFetched) {
        dispatch(apiSkuSize());
      }
    };
  }, [dataFetched]);

  const handleIndividualItem = (clase: data) => {
    setSelectedItem(true);
    // console.log(clase);
    setValues({
      ...values,
      skusize_id: clase.skusize_id,
      skusize_type: clase.skusize_type,
      skusize_name: clase.skusize_name,
    });
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
        <p> {!!errors.skusize_nameValid && errors.skusize_nameValid}</p>
        <p> {!!errors.skusize_typeValid && errors.skusize_typeValid}</p>
      </Modal>
      <div className="SVcontainer__center--col">

        <div className="SVcontainer__title">
          <h3> SKU - SIZE </h3>
          <span onClick={handleReset} className="SVreset">
            <img src={refreshButton} alt="Reset Form" />
          </span>
        </div>

        <div className="SVcontainer__form">
          <form>
            <div className="SVform__field">
              <label className="SVform__field--element">VALUE: </label>
              <div className="SVform__field--input-container">
                <input
                  type="text"
                  className="SVform__field--element"
                  name="skusize_name"
                  onChange={handleClases}
                  value={values.skusize_name}
                />
              </div>
            </div>
            <div className="SVform__field">
              <label className="SVform__field--element">TYPE: </label>
              <div className="SVform__field--input-container">
                <select
                  className="SVform__field--element"
                  name="skusize_type"
                  onChange={handleClasesSelec}
                  value={values.skusize_type}
                >
                  <option> </option>
                  <option> SKU </option>
                  <option> SIZE </option>
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
            clases.map((clase: data, index: number) => (
              <div className="SVlist__item" key={`A${index}`}>
                <label className="SVlist__item--field">
                  {clase.skusize_type}
                </label>
                <label className="SVlist__item--field">
                  {clase.skusize_name}
                </label>
                <img
                  src={addButton}
                  alt={`Name:${clase.skusize_type}`}
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

export default AllSkuSize;

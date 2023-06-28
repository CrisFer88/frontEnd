import { apiClasse, useAppDispatch, useAppSelector } from "../../../store";
import { regexEmpty } from "../../../utils/regexVar";
import { useModal } from "../../../hooks/useModal";
import addButton from "../../../assets/icon/add_button.png";
import Modal from "../ui/Modal";
import React, {useEffect, useState } from "react";
import useForm from "../../../hooks/useForm";

const AllClases = () => {
  const dispatch = useAppDispatch();
  const respu = useAppSelector((state) => state.clasesApp);
  const { statusQuery, data: clases, dataFetched } = respu;

  const [selectedItem, setSelectedItem] = useState(false);
  const [msgErrorModal, setMsgErrorModal] = useState({ en: "", es: "" });
  const { isOpen, closeModal, openModal } = useModal(false);

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

  const formValidations = {
    itemc_name: [
      (value: string) => {
        const regex = regexEmpty;
        return regex.test(value);
      },
      "This field is required.",
      "require",
    ],
  };
  const {
    values,
    setValues,
    handleChangeInput: handleClases,
    onResetForm,
    isFormValid,
    errors,
  } = useForm(initState, formValidations);

  useEffect(() => {
    return () => {
      console.log("validacion clases: ", dataFetched);
      if (!dataFetched) {
        dispatch(apiClasse());
      }
    };
  }, [dataFetched]);

  const handleIndividualItem = (clase: data) => {
    setSelectedItem(true);
    console.log(clase);
    setValues({
      ...values,
      itemc_name: clase.itemc_name,
      itemc_id: clase.itemc_id,
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
      console.log("Todo good", values.itemc_name);
    } else {
      setMsgErrorModal({
        en: "NAME is required in the PRODUCT CLASS section.",
        es: "NAME es requerido en la seccion PRODUCT CLASS.",
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
          <p>{ msgErrorModal.en }</p>
        </div>
        <div className="SVParagraph__Es">
          <p>Es:</p>
          <p>{ msgErrorModal.es }</p>
        </div>
      </Modal>
      <div className="SVcontainer__center--col">
        <div className="SVcontainer__title">
          <h3> PRODUCT CLASS </h3>
        </div>
        <div className="SVcontainer__form">
          <form>
            <div className="SVform__field">
              <label className="SVform__field--element">NAME: </label>
              <div className="SVform__field--input-container">
                <input
                  type="text"
                  className="SVform__field--element"
                  name="itemc_name"
                  onChange={handleClases}
                  value={values.itemc_name}
                />
                <input
                  type="submit"
                  value="X"
                  className="SVform__field--element"
                  onClick={handleReset}
                />
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
                  {clase.itemc_name}
                </label>
                <img
                  src={addButton}
                  alt={`Name:${clase.itemc_name}`}
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

export default AllClases;

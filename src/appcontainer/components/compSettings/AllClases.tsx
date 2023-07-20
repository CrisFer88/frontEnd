// import { apiClasse, useAppDispatch, useAppSelector } from "../../../store";
import { useAppDispatch, useAppSelector } from "../../../store";
import { regexEmpty } from "../../../utils/regexVar";
import { useModal } from "../../../hooks/useModal";
import addButton from "../../../assets/icon/add_button.png";
import refreshButton from "../../../assets/icon/refresh_button.png";
import Modal from "../ui/Modal";
import React, { useEffect, useState } from "react";
import useForm from "../../../hooks/useForm";
import { IS_dataClasses } from "../../../utils/types";
import { delItemClasses, fetchClasses, newItemClasses, updateItemClasses } from "../../../thunks/dataApp/classe.thunk";
import ButtonGroup from "../ui/ButtonGroup";

const AllClases = () => {
  const dispatch = useAppDispatch();
  const respu = useAppSelector((state) => state.clasesApp);
  const { isLoading, data: clases, dataFetched, error } = respu;

  const [selectedItem, setSelectedItem] = useState(false);
  const [msgErrorModal, setMsgErrorModal] = useState({ en: "", es: "" });
  const { isOpen, closeModal, openModal } = useModal(false);

  const initState: IS_dataClasses = {
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
      console.log("validacion clases: ", !dataFetched);
      if (!dataFetched) {
        dispatch(fetchClasses());
      }
  }, [dataFetched]);

  const handleIndividualItem = (clase: IS_dataClasses) => {
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
      dispatch(newItemClasses(values.itemc_name.toUpperCase())).then((dataFetch) => {
      });
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
    dispatch( delItemClasses(values.itemc_id) );
    console.log("Se va a borrar la Clase");
  };
  const handleOnUpDate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Se va a actualizar la Clase", values);
    dispatch( updateItemClasses({ itemc_id: values.itemc_id , itemc_name: values.itemc_name.toUpperCase() } as IS_dataClasses ) );
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
      </Modal>

      <div className="SVcontainer__center--col">
        <div className="SVcontainer__title">
          <h3> PRODUCT CLASS </h3>
          <span onClick={handleReset} className="SVreset">
            <img src={refreshButton} alt="ResetForm" />
          </span>
        </div>

        <div className="SVerror__p">{!!error && <p>{error}</p>}</div>

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
                  value={values.itemc_name.toUpperCase()}
                />
              </div>
            </div>

            <div className="SVcontainer__center">
              <ButtonGroup
                onSave={handleOnSave}
                onDelete={handleOnDelete}
                onUpdate={handleOnUpDate}
                selectedItem={selectedItem}
              />
            </div>
          </form>
        </div>
        <div className="SVcontainer__items">
          {isLoading ? (
            <p> Loading </p>
          ) : (
            clases.map((clase: IS_dataClasses, index: number) => (
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

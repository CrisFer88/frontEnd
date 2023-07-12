import { useAppDispatch, useAppSelector } from "../../../store";
import { regexEmpty } from "../../../utils/regexVar";
import { useModal } from "../../../hooks/useModal";
import addButton from "../../../assets/icon/add_button.png";
import refreshButton from "../../../assets/icon/refresh_button.png";
import Modal from "../ui/Modal";
import React, { useEffect, useState } from "react";
import useForm from "../../../hooks/useForm";
import { dataColor } from "../../../utils/types";
import { fetchColors } from "../../../thunks/dataApp/color.thunk";
import ButtonGroup from "../ui/ButtonGroup";

const AllColors = () => {
  const dispatch = useAppDispatch();
  const respu = useAppSelector((state) => state.colorApp);
  const { isLoading, data: clases, dataFetched } = respu;

  const [selectedItem, setSelectedItem] = useState(false);
  const [msgErrorModal, setMsgErrorModal] = useState({ en: "", es: "" });
  const { isOpen, closeModal, openModal } = useModal(false);

  const initState: dataColor = {
    color_id: "",
    color_name: "",
    color_nameValid: "",
  };

  const formValidations = {
    color_name: [
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
      // console.log("validacion color: ", dataFetched);
      if (!dataFetched) {
        dispatch(fetchColors());
      }
    };
  }, [dataFetched]);

  const handleIndividualItem = (clase: dataColor) => {
    setSelectedItem(true);
    console.log(clase);
    setValues({
      ...values,
      color_name: clase.color_name,
      color_id: clase.color_id,
    });
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onResetForm();
    setSelectedItem(false);
  };

  const handleOnSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("Todo good", values.color_name);
    } else {
      setMsgErrorModal({
        en: "NAME is required in the PRODUCT COLOR section.",
        es: "NAME es requerido en la seccion PRODUCT COLOR.",
      });
      openModal();
    }
  };
  const handleOnDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Se va aborrar Color");
  };
  const handleOnUpDate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("se va a actualizar Color");
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
          <h3> PRODUCT COLOR </h3>
          <span onClick={handleReset} className="SVreset">
            <img src={refreshButton} alt="Reset Form" />
          </span>
        </div>

        <div className="SVcontainer__form">
          <form>
            <div className="SVform__field">
              <label className="SVform__field--element">NAME: </label>
              <div className="SVform__field--input-container">
                <input
                  type="text"
                  className="SVform__field--element"
                  name="color_name"
                  onChange={handleClases}
                  value={values.color_name.toUpperCase()}
                />
                {/* <input
                  type="submit"
                  value="X"
                  className="SVform__field--element"
                  onClick={handleReset}
                /> */}
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
            clases.map((clase: dataColor, index: number) => (
              <div className="SVlist__item" key={`A${index}`}>
                <label className="SVlist__item--field">
                  {clase.color_name}
                </label>
                <img
                  src={addButton}
                  alt={`Name:${clase.color_name}`}
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

export default AllColors;

import { apiColor, useAppDispatch, useAppSelector } from "../../../store";
import { regexEmpty } from "../../../utils/regexVar";
import { useModal } from "../../../hooks/useModal";
import addButton from "../../../assets/icon/add_button.png";
import refreshButton from "../../../assets/icon/refresh_button.png";
import Modal from "../ui/Modal";
import React, { useEffect, useState } from "react";
import useForm from "../../../hooks/useForm";

const AllColors = () => {
  const dispatch = useAppDispatch();
  const respu = useAppSelector((state) => state.colorApp);
  const { statusQuery, data: clases, dataFetched } = respu;

  const [selectedItem, setSelectedItem] = useState(false);
  const [msgErrorModal, setMsgErrorModal] = useState({ en: "", es: "" });
  const { isOpen, closeModal, openModal } = useModal(false);

  type data = {
    color_id: string;
    color_name: string;
    color_nameValid: string;
  };
  const initState: data = {
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
        dispatch(apiColor());
      }
    };
  }, [dataFetched]);

  const handleIndividualItem = (clase: data) => {
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
      </Modal>



      <div className="SVcontainer__center--col">


        <div className="SVcontainer__title">
          <h3> PRODUCT COLOR </h3>
          <span onClick={ handleReset } className="SVreset">
            <img src={ refreshButton } alt="Reset Form" />
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

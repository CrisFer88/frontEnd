import {
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { regexEmpty } from "../../../utils/regexVar";
import { useModal } from "../../../hooks/useModal";
import addButton from "../../../assets/icon/add_button.png";
import refreshButton from "../../../assets/icon/refresh_button.png";
import Modal from "../ui/Modal";
import React, { useEffect, useState } from "react";
import useForm from "../../../hooks/useForm";
import ButtonGroup from "../ui/ButtonGroup";
import { fetchColorAssignment } from "../../../thunks/dataApp/colorassignment.thunk";

const AllColorAssignment = () => {
  const dispatch = useAppDispatch();
  //COLOR ASSIGMENT store
  const respu = useAppSelector((state) => state.colorAssigApp);
  const { isLoading, data: colorAssig, dataFetched } = respu;
  //PRODUCT CLASS store
  const respu2 = useAppSelector((state) => state.clasesApp);
  const { data: classes } = respu2;
  //COLOR store
  const respu3 = useAppSelector((state) => state.colorApp);
  const { data: colors } = respu3;
  //state control of buttons
  const [selectedItem, setSelectedItem] = useState(false);
  //state control for msg in Modal error
  const [msgErrorModal, setMsgErrorModal] = useState({ en: "", es: "" });
  //hook useModal set up
  const { isOpen, closeModal, openModal } = useModal(false);

  //This type describes the received data
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
  // This is the initial state of the data recived, also it will be fill up with all data selected from the list
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

  //This type describes the state of each select and allows me make validations.
  type requ = {
    itemk_id: string;
    itemc_id: string;
    itemc_name: string;
    itemc_idValid: string;
    color_id: string;
    color_name: string;
    color_idValid: string;
  };
  //This is the initial state used in useForm hook to validate all fields in the form
  const initRequ: requ = {
    itemk_id: "",
    itemc_id: "",
    itemc_name: "",
    itemc_idValid: "",
    color_id: "",
    color_name: "",
    color_idValid: "",
  };

  //Validations for some forms fields
  const formValidations = {
    itemc_name: [
      (value: string) => {
        const regex = regexEmpty;
        return regex.test(value);
      },
      "PRODUCT CLASS field is required.",
      "require",
    ],
    color_name: [
      (value: string) => {
        const regex = regexEmpty;
        return regex.test(value);
      },
      "COLOR is required.",
      "require",
    ],
  };
  //useForm hook to allows make validation and control the state
  const {
    values,
    setValues,
    handleChangeInput: handlecolorAssig,
    handleChangeSelect: handlecolorAssigSelec,
    onResetForm,
    isFormValid,
    errors,
  } = useForm(initRequ, formValidations);

  useEffect(() => {
    return () => {
      // console.log("validacion Color assigment: ", dataFetched);
      if (!dataFetched) {
        dispatch(fetchColorAssignment());
      }
    };
  }, [dataFetched]);

  //Set up selected item from the list to makes updates or delete

  const handleIndividualItem = (clase: data) => {
    setSelectedItem(true);
    setValues({
      ...values,
      itemk_id: clase.itemk_id,
      color_id: clase.ColorItem.color_id,
      color_name: clase.ColorItem.color_name,
      itemc_id: clase.ParaItemClass.itemc_id,
      itemc_name: clase.ParaItemClass.itemc_name,
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
    console.log("id to deleled:", values.itemk_id);
  };
  const handleOnUpDate = (e: React.MouseEvent<HTMLButtonElement>) => {
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

  const handleSelectOption = ({
    target,
  }: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = target;
    switch (name) {
      case "color_name":
        const inf: any = colors.find(
          (ele: data["ColorItem"]) => ele.color_name === value
        );
        const { color_id, color_name } = inf;
        setValues({
          ...values,
          color_id,
          color_name,
        });

        break;
      case "itemc_name":
        const inf2: any = classes.find(
          (ele: data["ParaItemClass"]) => ele.itemc_name === value
        );
        const { itemc_id, itemc_name } = inf2;
        setValues({
          ...values,
          itemc_id,
          itemc_name,
        });
        break;
      default:
        break;
    }
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
          <span onClick={handleReset} className="SVreset">
            <img src={refreshButton} alt="Reset Form" />
          </span>
        </div>

        <div className="SVcontainer__form">
          <form>
            <div className="SVform__field">
              <label className="SVform__field--element">PRODUCT CLASS: </label>
              <div className="SVform__field--input-container">
                <select
                  className="SVform__field--element"
                  name="itemc_name"
                  onChange={handleSelectOption}
                  value={values.itemc_name}
                >
                  <option></option>
                  {classes.map(
                    (clase: data["ParaItemClass"], index: number) => (
                      <option key={index}> {clase.itemc_name} </option>
                    )
                  )}
                </select>
              </div>
            </div>
            <div className="SVform__field">
              <label className="SVform__field--element">COLOR: </label>
              <div className="SVform__field--input-container">
                <select
                  className="SVform__field--element"
                  name="color_name"
                  onChange={handleSelectOption}
                  value={values.color_name}
                >
                  <option></option>
                  {colors.map((clase: data["ColorItem"], index: number) => (
                    <option key={index}> {clase.color_name} </option>
                  ))}
                </select>
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
          {isLoading? (
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

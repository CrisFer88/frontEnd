import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import "../../../styles/formStyle.css";
import ReactDatePicker from "react-datepicker";
import useForm from "../../../hooks/useForm";
import { regexEmpty, regexZeroEmpty } from "../../../utils/regexVar";
import { useModal } from "../../../hooks/useModal";
import Modal from "../ui/Modal";
import { fetchAllItems } from "../../../thunks/dataApp/allitems.thunk";
import {
  IS_AllProducts,
  IS_allStacksByDate,
  IS_dataSkuSize,
  IS_newStack,
  localStorageMachine,
  type_ParaItemType,
} from "../../../utils/types";
import PrintLabel from "../ui/PrintLabel";
import { StackByUSer } from "../../pages/StackByUser";

const initFormState: IS_newStack = {
  order_id: "",
  itemc_id: "",
  itemc_name: "",
  itemt_name: "",
  itemt_shortname: "",
  skusize_name: "",
  color_name: "",
  stack_qty: 0,
};

export const NewStackForm = () => {
  const [startDate, setStartDate] = useState(new Date());

  const { isOpen, closeModal, openModal } = useModal(false);
  const dispatch = useAppDispatch();
  const respu = useAppSelector((state) => state.productsApp);
  const { isLoading: loadingRespu, data, dataFetched } = respu;

  const formValidations = {
    itemc_name: [
      (value: string) => {
        const regex = regexEmpty;
        return regex.test(value);
      },
      "Product class is required.",
      "require",
    ],
    itemt_name: [
      (value: string) => {
        const regex = regexEmpty;
        return regex.test(value);
      },
      "Component is required.",
      "require",
    ],
    skusize_name: [
      (value: string) => {
        const regex = regexEmpty;
        return regex.test(value);
      },
      "Sku or Size is required.",
      "require",
    ],
    color_name: [
      (value: string) => {
        const regex = regexEmpty;
        return regex.test(value);
      },
      "Color is required.",
      "require",
    ],
    stack_qty: [
      (value: string) => {
        const regex = regexZeroEmpty;
        return regex.test(value);
      },
      "Quantity is required.",
      "require",
    ],
  };

  const {
    values,
    errors,
    handleChangeSelect: onNewOrder,
    handleChangeInput: onNewOrderInput,
    handleOnBlur,
    isFormValid,
    onResetForm,
  } = useForm(initFormState, formValidations);

  useEffect(() => {
    return () => {
      if (!dataFetched) {
        dispatch(fetchAllItems());
      }
    };
  }, []);

  useEffect(() => {
    setStartDate(new Date());
  }, [values]);

  const optionComponents = data.filter((elem: IS_AllProducts) => {
    if (elem.itemc_id === values.itemc_id) {
      values.itemc_name = elem.itemc_name;
      return true;
    }
    return false;
  });

  const optionSkusize = optionComponents.map((elem: IS_AllProducts) =>
    elem.ParaItemTypes.filter((ParaType) => {
      if (ParaType.itemt_name === values.itemt_name) {
        values.itemt_shortname = ParaType.itemt_shortname;
        return ParaType.ParaSkuSizes;
      }
    })
  );

  type initDataSend = {
    status: boolean;
    data: IS_allStacksByDate;
  };

  const initialData: initDataSend = {
    status: false,
    data: {
      assig_id: 0,
      order_id: 0,
      stackp_qty: 0,
      stackp_class: "",
      stackp_component: "",
      stackp_shortname: "",
      stackp_size: "",
      stackp_sku: "",
      stackp_color: "",
      stackp_status: "",
      stackp_date: "",
      stackp_combine: false,
    },
  };

  const [printData, setPrintData] = useState(initialData);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // console.log(isFormValid, errors);

    if (!isFormValid) {
      openModal();
    } else {
      const machine: localStorageMachine = JSON.parse(
        localStorage.getItem("Machine") || ""
      );
      const orderId = localStorage.getItem("orderId");
      // const dataSave: IS_allStacksByDate = {
      //   assig_id: machine.assignment,
      //   order_id: Number(orderId),
      //   stackp_class: values.itemc_name,
      //   stackp_component: values.itemt_name,
      //   stackp_shortname: values.itemt_shortname,
      //   stackp_size: values.skusize_name,
      //   stackp_sku: values.itemt_shortname + values.skusize_name,
      //   stackp_color: values.color_name,
      //   stackp_qty: values.stack_qty,
      //   stackp_status: machine.processM,
      //   stackp_date: startDate.toLocaleString(),
      //   stackp_combine: false,
      //   machineName: machine.machine,
      // };
      // console.log(dataSave);
      setPrintData({
        status: true,
        data: {
          assig_id: machine.assignment,
          order_id: Number(orderId),
          stackp_class: values.itemc_name,
          stackp_component: values.itemt_name,
          stackp_shortname: values.itemt_shortname,
          stackp_size: values.skusize_name,
          stackp_sku: values.itemt_shortname + values.skusize_name,
          stackp_color: values.color_name,
          stackp_qty: values.stack_qty,
          stackp_status: machine.processM,
          stackp_date: startDate.toLocaleString(),
          stackp_combine: false,
          machineName: machine.machine,
        },
      });
    }
  };

  if (loadingRespu) {
    return (
      <>
        <p>Loading</p>
      </>
    );
  } else {
    return (
      <>
        <div className="container__form">
          <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            classNameModal="modalA"
          >
            <div className="modal__headerA">
              <p className="es">Estos son los errores en el formulario:</p>
              <p className="en">These are the present error in the form.</p>
            </div>
            <div className="modal__bodyA">
              {Object.values(errors).map(
                (e, index) => !!e && <p key={index}>{e}</p>
              )}
            </div>
          </Modal>
          {/* Tititulo del formulario */}
          {/* <div className="container__form--title">
          <p> NEW ORDER </p>
        </div> */}
          <div className="container__form--body">
            {/* Inicio del formulario */}
            <form
              onSubmit={handleSubmit}
              className="form__options"
              autoComplete="none"
            >
              <div className="col center">
                <div className="input__spetialfieldform">
                  <ReactDatePicker
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    showTimeSelect
                    timeIntervals={15} // Puedes ajustar los intervalos de tiempo según tus necesidades
                    timeCaption="Hora"
                    dateFormat="dd/MM/yyyy HH:mm" // Puedes cambiar el formato de fecha y hora según tus necesidades
                    name="singUpDate"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                </div>
              </div>

              <div className="fieldform">
                <div className="col center">
                  <label className="label__title">PRODUCT CLASS:</label>
                  <select
                    name="itemc_id"
                    className="select__field"
                    value={values.itemc_id}
                    onChange={onNewOrder}
                  >
                    <option key="itemc_1"></option>
                    {Array.isArray(data) &&
                      data.map((elem: IS_AllProducts, index) => (
                        <option value={elem.itemc_id} key={index}>
                          {elem.itemc_name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="col center">
                <label className="label__title">COMPONENT:</label>
                <div className="row">
                  <select
                    name="itemt_name"
                    className="select__field"
                    value={values.itemt_name}
                    onChange={onNewOrder}
                  >
                    <option key="itemt_1"></option>
                    {optionComponents.map((elem: IS_AllProducts) =>
                      elem.ParaItemTypes.map((ParaType, index) => (
                        <option key={index}>{ParaType.itemt_name}</option>
                      ))
                    )}
                  </select>
                  <div className="fieldform">
                    <input
                      className="input__field--short"
                      name="itemt_shortname"
                      onChange={onNewOrderInput}
                      value={values.itemt_shortname}
                    ></input>
                  </div>
                </div>
              </div>

              <div className="col center">
                <label className="label__title">SKU / SIZE:</label>
                <select
                  name="skusize_name"
                  className="select__field"
                  value={values.skusize_name}
                  onChange={onNewOrder}
                >
                  <option key="itemt_1"></option>
                  {optionSkusize.length > 0 &&
                    optionSkusize[0].map((ele: type_ParaItemType) =>
                      ele.ParaSkuSizes.map(
                        (ss: IS_dataSkuSize, index: number) => (
                          <option key={index}>{ss.skusize_name}</option>
                        )
                      )
                    )}
                </select>
              </div>

              <div className="col center">
                <label className="label__title">COLOR:</label>
                <select
                  name="color_name"
                  className="select__field"
                  value={values.color_name}
                  onChange={onNewOrder}
                >
                  <option key="itemt_1"></option>
                  {optionComponents.map((elem: IS_AllProducts, index: number) =>
                    elem.ColorItems.map((ParaType, index) => (
                      <option key={index}>{ParaType.color_name}</option>
                    ))
                  )}
                </select>
              </div>

              <div className="col center">
                <label className="label__title">QUANTITY:</label>
                <input
                  name="stack_qty"
                  className="select__field"
                  value={values.stack_qty}
                  onChange={onNewOrderInput}
                ></input>
              </div>

              {/* Contenedor de la botonera */}
              <div className="container__form--title ">
                <button className="button__form">
                  <span>SAVE</span>
                </button>
                <button className="button__form" onClick={onResetForm}>
                  <span>RESET</span>
                </button>
              </div>
            </form>
          </div>

          {printData.status && (
            <PrintLabel status={printData.status} data={printData.data} />
          )}
        </div>

        <StackByUSer stackp_date={  startDate.toString() }/>

      </>
    );
  }
};

import { useEffect, useState } from "react";
import { getAllItems, useAppDispatch, useAppSelector } from "../../../store";
import "../../../styles/formStyle.css";
import ReactDatePicker from "react-datepicker";
import useForm from "../../../hooks/useForm";

interface dataInterf {
  itemc_id: string;
  itemc_name: string;
  ParaItemTypes: {
    itemt_name: string;
    itemt_shortname: string;
    ParaSkuSizes: {
      skusize_name: string;
    }[];
  }[];
  ColorItems: {
    color_name: string;
  }[];
}

interface initFS {
  itemc_name: string;
  itemc_id: string;
  itemt_name: string;
  itemt_shortname: string;
  skusize_name: string;
  color_name: string;
}

const initFormState: initFS = {
  itemc_id: "",
  itemc_name: "",
  itemt_name: "",
  itemt_shortname: "",
  skusize_name: "",
  color_name: "",
};

export const NewOrder = () => {
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useAppDispatch();
  const respu = useAppSelector((state) => state.datApp);
  const { statusQuery, data, dataFetched } = respu;
  const {
    values,
    errors,
    handleChangeSelect: onNewOrder,
    handleChangeInput: onNewOrderInput,
    handleOnBlur,
    isFormValid,
    onResetForm,
  } = useForm(initFormState);

  useEffect(() => {
    return () => {
      if (!dataFetched) {
        dispatch(getAllItems());
      }
    };
  }, []);

  const optionComponents = data.filter((elem: dataInterf) => {
    if (elem.itemc_id === values.itemc_id) {
      values.itemc_name = elem.itemc_name;
      return elem;
    }
  });

  
  const optionSkusize = optionComponents.map((elem: dataInterf, index) =>
  elem.ParaItemTypes.filter((ParaType, index) => {
    if (ParaType.itemt_name === values.itemt_name) {
      values.itemt_shortname = ParaType.itemt_shortname;
      return ParaType.ParaSkuSizes;
    }
  }));
  
  console.log(values);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  if (statusQuery) {
    return (
      <>
        <p>Loading</p>
      </>
    );
  } else {
    return (
      <div className="container__form">
        {/* Tititulo del formulario */}
        <div className="container__form--title">
          <p> NEW ORDER </p>
        </div>
        <div className="container__form--body">
          {/* Inicio del formulario */}
          <form onSubmit={handleSubmit} className="form__options">
            <p className="container__form--subtitle"> CURRENT INFO: </p>
            <div className="col center">
              <div className="fieldform--center">
                <ReactDatePicker
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                  name="singUpDate"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  placeholderText="Birthday"
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
                  {data.map((elem: dataInterf, index) => (
                    <option value={elem.itemc_id} key={index}>
                      {elem.itemc_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col center">
              <label className="label__title">COMPONENT:</label>
              <select
                name="itemt_name"
                className="select__field"
                value={values.itemt_name}
                onChange={onNewOrder}
              >
                <option key="itemt_1"></option>
                {optionComponents.map((elem: dataInterf, index) =>
                  elem.ParaItemTypes.map((ParaType, index) => (
                    <option key={index}>{ParaType.itemt_name}</option>
                  ))
                )}
              </select>
              <div className="fieldform">
                <input
                  className="input__field"
                  name="itemt_shortname"
                  onChange={onNewOrderInput}
                  value={values.itemt_shortname}
                ></input>
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
                {
                  optionSkusize.length > 0 && (optionSkusize[0].map((ele, index) => (
                    ele.ParaSkuSizes.map(( ss, index ) => (
                      <option key={index}>{ss.skusize_name}</option>
                    ))
                  )))
                }
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
                {optionComponents.map((elem: dataInterf, index) =>
                  elem.ColorItems.map((ParaType, index) => (
                    <option key={index}>{ParaType.color_name}</option>
                  ))
                )}
              </select>
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

        {/* Contenedor del formulario */}
      </div>
    );
  }
};

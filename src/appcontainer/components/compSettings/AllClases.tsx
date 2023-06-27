import React, { ButtonHTMLAttributes, useEffect, useState } from "react";
import { getAllClases, useAppDispatch, useAppSelector } from "../../../store";
import addButton from "../../../assets/icon/add_button.png";

const AllClases = () => {
  const dispatch = useAppDispatch();
  const respu = useAppSelector((state) => state.clasesApp);
  const { statusQuery, data: clases, dataFetched } = respu;

  const [selectedItem, setSelectedItem] = useState<data | null>(null);
  const [inputValue, setInputValue] = useState("" as string);

  type data = {
    itemc_id: string;
    itemc_name: string;
  };

  useEffect(() => {
    return () => {
      console.log("validacion clases: ", dataFetched);
      if (!dataFetched) {
        dispatch(getAllClases());
      }
    };
  }, [dataFetched]);

  const handleIndividualItem = (clase: data) => {
    console.log(clase);
    setSelectedItem(clase);
    setInputValue(clase.itemc_name);
  };

  return (
    <div className="container__center">
      <div className="container__title">
        <h3> PRODUCT CLASS </h3>
      </div>
      <div className="container__body">
        <form>
          <div className="fieldform">
            <label className="label__title">NAME: </label>
            <input type="text" className="form-control" />
          </div>
          <div className="container__buttons--center">
            <button className="button__form button1">
              <span>SAVE</span>
            </button>
            <button className="button__form button1">
              <span>DELETE</span>
            </button>
            <button className="button__form button1">
              <span>UPDATE</span>
            </button>
          </div>
        </form>
      </div>
      <div className="container__items">
        {statusQuery ? (
          <p> Loading </p>
        ) : (
          clases.map((clase: data, index: number) => (
            <div className="list__item" key={`A${index}`}>
              <button className='list__item--name'>
                <span> { clase.itemc_name } </span>
                <span className='list__item--img '> <img src={ addButton } alt={ clase.itemc_name} /> </span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllClases;

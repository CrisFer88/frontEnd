import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { AllClases, AllColorAssignment, AllColors } from "../../appcontainer";
import "../../styles/formStyle.css";

export const NewParamaterPage = () => {
  const dispatch = useAppDispatch();
  const respu = useAppSelector((state) => state.productsApp);
  const { statusQuery, data, dataFetched } = respu;

  useEffect(() => {
    return () => {
      if (!dataFetched) {
        console.log("ok");
      }
    };
  }, []);

  console.log(data);

  return (
    <>
      <div className="container__components">
        <div className="container__cards">
          <div className="card__view">
            <AllClases />
          </div>
          <div className="card__view">
            <AllColors />
          </div>
          <div className="card__view">
            <AllColorAssignment />
          </div>
          {/* <div className="card__view">
          <AllClases />
        </div> */}
        </div>
      </div>
      <div className="container__params">
        <h3>Parameters assigments</h3>
      </div>
    </>
  );
};

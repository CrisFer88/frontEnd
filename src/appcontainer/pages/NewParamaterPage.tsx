import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { AllClases, AllColorAssignment, AllColors } from "../../appcontainer";
import "../../styles/settingsView.css";
import AllSkuSize from "../components/compSettings/AllSkusize";

export const NewParamaterPage = () => {
  const dispatch = useAppDispatch();
  const respu = useAppSelector((state) => state.productsApp);
  const { statusQuery, data, dataFetched } = respu;

  useEffect(() => {
    return () => {
      if (!dataFetched) {
        // console.log("ok");
      }
    };
  }, []);

  // console.log(data);

  return (
    <>
      <div className="SVcontainer__components">
        <div className="SVcontainer__cards">
          <div className="SVcard__view">
            <AllClases />
          </div>
          <div className="SVcard__view">
            <AllColors />
          </div>
          <div className="SVcard__view">
            <AllSkuSize />
          </div>
          <div className="SVcard__view">
            <AllColorAssignment />
          </div>
        </div>
      </div>
      <div className="SVcontainer__params">
        <h3>Parameters assigments</h3>
      </div>
    </>
  );
};

import React, { useState } from "react";
import { NewStackForm } from "../components/compProduction/NewStackForm";
import { NewStack } from "../components/compProduction/NewStack";

export const StackPage = () => {
  const initialCheck = {
    newStack: false,
    scanStack: false,
  };

  const [isChecked, setIsChecked] = useState(initialCheck);

  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = target;

    console.log(name, value, checked);

    setIsChecked(() => ({
      ...initialCheck,
      [name]: checked,
    }));
  };

  return (
    <div className="page__flex dir__col">
      <div className="page__paragraph--center">
        <p className="en"> Select an option</p>
        <p className="es"> Seleccione una opción</p>
      </div>
      <div className="checkbox__option">
        <div className="checkbox">
          <input
            type="checkbox"
            name="newStack"
            checked={isChecked.newStack}
            onChange={handleOnChange}
          />
          NEW STACK
        </div>
        <div className="checkbox">
          <input
            type="checkbox"
            name="scanStack"
            checked={isChecked.scanStack}
            onChange={handleOnChange}
          />
          SCAN STACK
        </div>
      </div>
      {
        isChecked.newStack?<NewStackForm /> : isChecked.scanStack && <NewStack /> 
      }
    </div>
  );
};

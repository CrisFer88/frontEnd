import React, { ReactElement } from "react";
import { ButtonGroupProps } from "../../../utils/types";
import "../../../styles/buttonGroup.css";

const ButtonGroup = ({
  onSave,
  onDelete,
  onUpdate,
  onReset,
  selectedItem,
}: ButtonGroupProps): ReactElement => {
  return (
    <>
      <div className="container__principalbuttons">
        {onSave && (
          <button onClick={onSave} disabled={selectedItem}>
            <span>SAVE</span>
          </button>
        )}
        {onDelete && (
          <button onClick={onDelete} disabled={!selectedItem}>
            <span>DELETE</span>
          </button>
        )}
        {onUpdate && (
          <button onClick={onUpdate} disabled={!selectedItem}>
            <span>UPDATE</span>
          </button>
        )}
      </div>
      <div className="container__reset">
        {onReset && (
          <button onClick={onReset} disabled={!selectedItem}>
            <span>RESET</span>
          </button>
        )}
      </div>
    </>
  );
};

export default ButtonGroup;

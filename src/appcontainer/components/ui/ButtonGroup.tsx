import React, { ReactElement } from "react";
import { ButtonGroupProps } from "../../../utils/types";

const ButtonGroup = ({
  onSave,
  onDelete,
  onUpdate,
  selectedItem,
}: ButtonGroupProps): ReactElement => {
  return (
    <>
      {onSave && (
        <button
          onClick={onSave}
          disabled={selectedItem}
        >
          <span>SAVE</span>
        </button>
      )}
      {onDelete && (
        <button
          onClick={onDelete}
          disabled={!selectedItem}
        >
          <span>DELETE</span>
        </button>
      )}
      {onUpdate && (
        <button
          onClick={onUpdate}
          disabled={!selectedItem}
        >
          <span>UPDATE</span>
        </button>
      )}
    </>
  );
};

export default ButtonGroup;

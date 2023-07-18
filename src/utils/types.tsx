import { MouseEvent } from "react";

//------------------>  INTIAL STATES
export type IS_AllProducts = {
  itemc_id: string;
  itemc_name: string;
  ParaItemTypes: type_ParaItemType[];
  ColorItems: IS_dataColor[];
}

export type  type_ParaItemType = {
  itemt_name: string;
  itemt_shortname: string;
  ParaSkuSizes: IS_dataSkuSize[];
}


//---------------------------------
export type IS_dataClasses = {
  itemc_id: string;
  itemc_name: string;
  itemc_nameValid: string;
};

export type IS_dataColor = {
  color_id: string;
  color_name: string;
  color_nameValid: string;
};

export type IS_dataSkuSize = {
  skusize_id: string;
  skusize_type: string;
  skusize_typeValid: string;
  skusize_name: string;
  skusize_nameValid: string;
};

export type IS_dataColorAssignment = {
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

export type IS_Form_dataColorAssignment = {
  itemk_id: string;
  itemc_id: string;
  itemc_name: string;
  itemc_idValid: string;
  color_id: string;
  color_name: string;
  color_idValid: string;
};

export type IS_newStack = {
  itemc_name: string;
  itemc_id: string;
  itemt_name: string;
  itemt_shortname: string;
  skusize_name: string;
  color_name: string;
  stack_qty: number
};

//------------------>  INITIAL STATE REDUX STORE

export type IS_typeAllProducts = {
  isLoading: boolean;
  dataFetched: boolean;
  data: IS_AllProducts[] | [];
  error: string | undefined;
};

export type IS_typeClasse = {
  isLoading: boolean;
  dataFetched: boolean;
  data: IS_dataClasses[] | [];
  error: string | undefined;
};

export type IS_typeColor = {
  isLoading: boolean;
  dataFetched: boolean;
  data: IS_dataColor[] | [];
  error: string | undefined;
};

export type IS_typeSkuSize = {
  isLoading: boolean;
  dataFetched: boolean;
  data: IS_dataSkuSize[] | [];
  error: string | undefined;
};

export type IS_typeColorAssignment = {
  isLoading: boolean;
  dataFetched: boolean;
  data: IS_dataColorAssignment[] | [];
  error: string | undefined;
};


//------------------> TYPE COMPONENTS

export type ButtonGroupProps = {
  onSave?: (e: MouseEvent<HTMLButtonElement>) => void;
  onDelete?: (e: MouseEvent<HTMLButtonElement>) => void;
  onUpdate?: (e: MouseEvent<HTMLButtonElement>) => void;
  selectedItem?: boolean;
};



export type localStorageMachine = {
  assignment: number;
  machine: string;
  processM: string;
}





//------------------> PENDIENTE

export type IS_AllSkuSizeAssignment = {
  itemc_id: string;
  itemc_name: string;
  itemc_nameValid: string;
  skusize: [];
};


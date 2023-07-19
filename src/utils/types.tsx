import { MouseEvent } from "react";

//------------------>  INTIAL STATES
export type IS_AllProducts = {
  itemc_id: string;
  itemc_name: string;
  ParaItemTypes: type_ParaItemType[];
  ColorItems: IS_dataColor[];
};

export type type_ParaItemType = {
  itemt_name: string;
  itemt_shortname: string;
  ParaSkuSizes: IS_dataSkuSize[];
};

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
  stack_qty: number;
};

export type IS_allOrdersByDate = {
  order_id?: number;
  assig_id: number;
  order_qty: number;
  order_date: string;
  order_name: string;
};

export type IS_allStacksByDate = {
  stackp_id: number;
  assig_id: number;
  order_id: number;
  stackp_class: string;
  stackp_component: string;
  stackp_shortname: string;
  stackp_size: string;
  stackp_sku: string;
  stackp_color: string;
  stackp_qty: number;
  stackp_status: string;
  stackp_date: string;
  stackp_combine: boolean;
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

export type IS_typeAllOrdersByDate = {
  isLoading: boolean;
  dataFetched: boolean;
  data: IS_allOrdersByDate[] | [];
  error: string | undefined;
};
//------------------> TYPE COMPONENTS

export type ButtonGroupProps = {
  onSave?: (e: MouseEvent<HTMLButtonElement>) => void;
  onDelete?: (e: MouseEvent<HTMLButtonElement>) => void;
  onUpdate?: (e: MouseEvent<HTMLButtonElement>) => void;
  onReset?: (e: MouseEvent<HTMLButtonElement>) => void;
  selectedItem?: boolean;
};

export type localStorageMachine = {
  assignment: number;
  machine: string;
  processM: string;
};

//------------------> PENDIENTE

export type IS_AllSkuSizeAssignment = {
  itemc_id: string;
  itemc_name: string;
  itemc_nameValid: string;
  skusize: [];
};

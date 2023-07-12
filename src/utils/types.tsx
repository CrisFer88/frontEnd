import { MouseEvent } from "react";

export type initApiData = {
  isLoading: boolean;
  dataFetched: boolean;
  data: [];
  error: string | undefined
}

export type dataClasses = {
    itemc_id: string;
    itemc_name: string;
    itemc_nameValid: string;
  };

export type dataColor = {
    color_id: string;
    color_name: string;
    color_nameValid: string;
  };

export type dataSkuSize = {
    skusize_id: string;
    skusize_type: string;
    skusize_typeValid: string;
    skusize_name: string;
    skusize_nameValid: string;
  };

 export type ButtonGroupProps = {
  onSave?: (e: MouseEvent<HTMLButtonElement>) => void;
  onDelete?: (e: MouseEvent<HTMLButtonElement>) => void;
  onUpdate?: (e: MouseEvent<HTMLButtonElement>) => void;
  selectedItem?: boolean;
  };
  
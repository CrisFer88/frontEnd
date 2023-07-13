import { createAsyncThunk } from "@reduxjs/toolkit";
import { transactionApi } from "../../api";
import { IS_dataClasses, IS_typeClasse } from "../../utils/types";

const fetchClasses = createAsyncThunk("clasesApp/fetchClasses", async () => {
  const response = await transactionApi.get("parameters/newItemClass");
  const data = Object.values(response.data)[1] as [];
  return data;
});

const newItemClasses = createAsyncThunk(
  "clasesApp/newItemClasses",
  async (itemc_name: string) => {
    const response = await transactionApi.post("parameters/newItemClass", {
      itemc_name,
    });
    return response.data.item;
  }
);

const delItemClasses = createAsyncThunk(
  "clasesApp/delItemClasses",
  async (itemc_id: string) => {
    const response = await transactionApi.delete(
      `parameters/newItemClass/${itemc_id}`
    );
    /*
    No va dejar borrar los valores que tengan propiedades agregadas
    si se desea ese comportamiento, se tiene que cambiar en el backend ]
    en los modelos de las tablas para que sean borrados en cascada  
    */
    if (response.data.ok) {
      return itemc_id;
    }
  }
);

const updateItemClasses = createAsyncThunk(
  "clasesApp/updateItemClasses",
  async (dataC: IS_dataClasses) => {
    const response = await transactionApi.put(
      `parameters/newItemClass/${dataC.itemc_id}`,
      { itemc_name: dataC.itemc_name }
    );
    if (response.data.ok) {
      return { itemc_id: dataC.itemc_id , itemc_name: dataC.itemc_name };
    }
  }
);

export { fetchClasses, newItemClasses, delItemClasses, updateItemClasses };

import { transactionApi } from "../api";

interface AllProductsPromp {
  ok: boolean;
  data: [];
}

const parameterServices = () => {


  const getAllParameters = (): Promise<AllProductsPromp[]> => {
    return transactionApi
      .get("parameters/paramlist")
      .then((respu) => {
        const { status, data } = respu;
        if (status === 200) {
          return data;
        } else {
          throw new Error("Request failed");
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  return {
    getAllParameters,
  };
};

export default parameterServices;

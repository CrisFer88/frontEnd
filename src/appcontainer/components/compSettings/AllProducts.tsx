import { useEffect, useState } from "react";
import parameterServices from "../../../services/parameter";
import "../../../styles/tableStyleOne.css";

interface AllProductsPromp {
  ColorItems: { color_name: string }[];
  ParaItemTypes: {
    itemt_name: string;
    itemt_shortname: string;
    ParaSkuSizes: { skusize_name: string }[];
  }[];
  itemc_id: string;
  itemc_name: string;
}

export const AllProducts = () => {
  const [products, setProducts] = useState<AllProductsPromp[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      //I am reading the local storage variable "productData"
      const storedData = localStorage.getItem("productData");
      if (storedData) {
        // The data is already in the storage
        setProducts(JSON.parse(storedData) as AllProductsPromp[]);
      } else {
        // There is no data in the storage, execute query to data base
        const { getAllParameters } = parameterServices();
        await getAllParameters()
          .then((respu) => {
            const data = Object.values(respu)[1];
            //I want to be sure that data is an Array and it comes with content
            if (Array.isArray(data) && data.length > 0) {
              //Set values to the state
              setProducts(data as AllProductsPromp[]);
              // Save data in the local storage
              localStorage.setItem("productData", JSON.stringify(data));
            }
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="center_title">PRODUCT LIST</h1>

      <div className="scroll_container">
        {products.map((product, index) => (
          <div key={index} className="container_item">
            <h2>{product.itemc_name}</h2>
            <table>
              <tbody>
                <tr>
                  <th>TYPE</th>
                  <th>SHORT NAME</th>
                  <th>SKU OR SIZE</th>
                  <th>COLOR</th>
                </tr>
                {product.ParaItemTypes.map((itemType, i) => (
                  <tr key={`itemType_${i}`}>
                    <td key={`A${i}`} className="bold_text">
                      {itemType.itemt_name}
                    </td>
                    <td key={`B${i}`} className="bold_text">
                      {itemType.itemt_shortname}
                    </td>
                    <td key={`C${i}`}>
                      {itemType.ParaSkuSizes.map((e) => `${e.skusize_name}\n`)}
                    </td>
                    <td key={`D${i}`}>
                      {" "}
                      <ul>
                        {product.ColorItems.map((color, k) => (
                          <li key={`color_${i}_${k}`}>{color.color_name}</li>
                        ))}{" "}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
};

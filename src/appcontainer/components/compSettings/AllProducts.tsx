import { useEffect } from "react";
import "../../../styles/tableStyleOne.css";
import { getAllItems, useAppDispatch, useAppSelector} from "../../../store";

export const AllProducts = () => {
  const dispatch = useAppDispatch();
  const respu = useAppSelector((state) => state.productsApp);
  const { statusQuery, data: products, dataFetched } = respu;

  useEffect(() => {
    return () => {
      if (!dataFetched) {
      dispatch(getAllItems());
      }
    };
  }, [dataFetched]);

  if (statusQuery) {
    return (
      <>
        <p>Loading</p>
      </>
    );
  } else {
    return (
      <>
        <h1 className="center_title">PRODUCT LIST</h1>

        <div className="scroll_container">
          {products.map((product: any, index: number) => (
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
                  {product.ParaItemTypes.map((itemType: any, i: number) => (
                    <tr key={`itemType_${i}`}>
                      <td key={`A${i}`} className="bold_text">
                        {itemType.itemt_name}
                      </td>
                      <td key={`B${i}`} className="bold_text">
                        {itemType.itemt_shortname}
                      </td>
                      <td key={`C${i}`}>
                        {itemType.ParaSkuSizes.map(
                          (e: any) => `${e.skusize_name}\n`
                        )}
                      </td>
                      <td key={`D${i}`}>
                        {" "}
                        <ul>
                          {product.ColorItems.map((color:any, k:number) => (
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
  }
};

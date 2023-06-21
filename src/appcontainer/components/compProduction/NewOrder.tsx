import { useEffect } from "react";
import { getAllItems, useAppDispatch, useAppSelector } from "../../../store";

export const NewOrder = () => {
  const dispatch = useAppDispatch();
  const respu = useAppSelector((state) => state.datApp);
  const { statusQuery, data } = respu;

  useEffect(() => {
    return () => {
      dispatch(getAllItems());
    };
  }, []);


  if (statusQuery) {
    return (
      <>
        <p>Loading</p>
      </>
    );
  } else {
    return (
      <>
        <h1>Ahora aqui</h1>
        <table>
          <tbody>
            <tr>
              <th>Aqui 1</th>
              <th>Aqui 2</th>
            </tr>
            {Object.values(data).length > 0 &&
              Object.values(data)[1].map((e: any, index: number) => (
                <tr key={`Al${index}`}>
                  <td key={`A${index}`}> {e.itemc_id} </td>
                  <td key={`B${index}`}> {e.itemc_name} </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    );
  }
};

import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store';

export const NewParamaterPage = () => {
    const dispatch = useAppDispatch();
    const respu = useAppSelector((state) => state.productsApp);
    const { statusQuery, data, dataFetched } = respu;

    useEffect(() => {
        return () => {
          if (!dataFetched) {
            console.log('ok');
          }
        };
      }, []);

    // console.log(data);


  return (
    <div>NewParamaterPage</div>
  )
}

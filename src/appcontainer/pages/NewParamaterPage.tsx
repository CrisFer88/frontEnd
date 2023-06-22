import React, { useEffect } from 'react'
import { getClass, getFunction, useAppDispatch, useAppSelector } from '../../store';

export const NewParamaterPage = () => {
    const dispatch = useAppDispatch();
    const respu = useAppSelector((state) => state.datApp);
    const { statusQuery, data, dataFetched } = respu;

    useEffect(() => {
        return () => {
          if (!dataFetched) {
            dispatch(getClass());
            dispatch(getFunction());
          }
        };
      }, []);

    console.log(data);


  return (
    <div>NewParamaterPage</div>
  )
}

import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import productsSlice from "./dataApp/productsSlice";
import parameterClasesSlice from "./dataApp/parameterClasesSlice";
import parameterColorSlice  from "./dataApp/parameterColorSlice";
import parameterSkuSize  from "./dataApp/parameterSkuSizeSlice";
import parameterColorAssigment from "./dataApp/parameterColorAssigmentSlice";
import  allOrdersByDate  from "./production/allOrdersByDateSlice";
import  allStacksByDate  from "./production/allStackByDateSlice";
// ...

export const store = configureStore({
  reducer: {
    auth: authSlice,
    productsApp: productsSlice,
    clasesApp: parameterClasesSlice,
    colorApp: parameterColorSlice,
    skuSizeApp: parameterSkuSize,
    colorAssigApp: parameterColorAssigment,
    //Production:
    allOrders: allOrdersByDate, 
    allStacks: allStacksByDate

  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

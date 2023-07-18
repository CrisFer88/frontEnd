import React, { useState } from "react";
import { NewStackForm } from "../components/compProduction/NewStackForm";
import { NewStack } from "../components/compProduction/NewStack";
import { StackByUSer } from "./StackByUser";
import { OrderList } from "../components/compProduction/OrderList";

export const StackPage = () => {

  return (
    <>
      <OrderList />
      <NewStackForm />
      <StackByUSer />
    </>

  );
};

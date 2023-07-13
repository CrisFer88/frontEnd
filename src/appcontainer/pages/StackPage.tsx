import React, { useState } from "react";
import { NewStackForm } from "../components/compProduction/NewStackForm";
import { NewStack } from "../components/compProduction/NewStack";
import { StackByUSer } from "./StackByUser";

export const StackPage = () => {

  return (
    <>
      <NewStackForm />
      <StackByUSer />
    </>

  );
};

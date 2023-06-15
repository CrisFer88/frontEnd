import { useEffect } from "react";
import { useAuthStore } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import "../../styles/formStyle.css";
import { LoginComp } from "../components/LoginComp";
import { Register } from "../components/Register";
import Modal from "../components/ui/Modal";

export const LoginPage = (): JSX.Element => {
  interface errorDef {
    okResponse: boolean;
    msgResponse: string;
    statusResponse: number;
    eMsgResponse: string;
  }

  const { errorMsg } = useAuthStore();
  const { isOpen, openModal, closeModal } = useModal(false);

  const { statusResponse, msgResponse } = errorMsg as errorDef;

  useEffect(() => {
    if (statusResponse === 500 || statusResponse === 400) {
      openModal();
    }
  }, [statusResponse]);

  return (
    <div className="container-X2-Col total--height">
      {
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <p>{msgResponse}</p>
        </Modal>
      }
      <LoginComp />
      <Register />
    </div>
  );
};

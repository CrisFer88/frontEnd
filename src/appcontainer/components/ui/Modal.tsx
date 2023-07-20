import { ReactNode } from "react";
import "../../../styles/modal.css";
interface Props {
  children?: ReactNode;
  isOpen: boolean;
  closeModal: () => void;
  classNameModal?: string;
}

const Modal = ({ children, isOpen, closeModal, classNameModal }: Props) => {
  return (
    <article className={`${isOpen ? "modal modal--open " : "modal"}`}>
      <div className={`${classNameModal} modal__container`}>
        <button className="modal__button" onClick={closeModal}>
          X
        </button>
        {children}
      </div>
    </article>
  );
};

export default Modal;

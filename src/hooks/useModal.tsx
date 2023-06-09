import { useState } from "react"


export const useModal = ( initState: boolean = false, classNameModal?: string) => {
  const [isOpen, setIsOpen] = useState(initState)


  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);


  return{
    isOpen,
    openModal,
    closeModal,
    classNameModal
  }


}

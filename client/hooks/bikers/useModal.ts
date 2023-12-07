import React, { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  return { isModalOpen: isOpen, closeModal, openModal };
};

export default useModal;

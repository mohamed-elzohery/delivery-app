import React from "react";
import { createPortal } from "react-dom";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";

const overlay = document.getElementById("overlay")!;

export type ModalContentProps = {
  children?: JSX.Element | JSX.Element[];
};

export type ModalProps = {
  children?: JSX.Element | JSX.Element[];
  closeModal: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const ModalContent: React.FC<ModalContentProps> = (props) => {
  return (
    <div className="fixed z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-700 shadow-md animate-appearFromTop duration-300 rounded-2xl">
      {props.children}
    </div>
  );
};

const Modal: React.FC<ModalProps> = ({ closeModal, children }) => {
  return (
    <>
      <Backdrop onClickHandler={closeModal} />
      {createPortal(<ModalContent>{children}</ModalContent>, overlay)}
    </>
  );
};

import React from "react";
import classes from "./Backdrop.module.css";
import { ModalContentProps } from "../Modals/Modal";

const BackdropRoot = document.getElementById("backdrop")!;

interface BackdropProps extends ModalContentProps {
  onClickHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
  return (
    <div
      onClick={props.onClickHandler}
      className="fixed w-full h-full top-0 left-0 bg-black bg-opacity-70 z-10"
    ></div>
  );
};

export default Backdrop;

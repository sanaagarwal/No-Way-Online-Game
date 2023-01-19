import React from "react";
import styled from "styled-components";
import { BiX } from "react-icons/bi";
import { motion } from "framer-motion";

interface ModalProps {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ModalBackground = styled(motion.div)`
  color: white;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
`;

const ModalContent = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(20px);
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  flex-direction: row;
  width: calc(100% - 50px);
  position: absolute;
  top: 0;
  left: 0;
  padding-left: 25px;
  padding-right: 25px;
`;

const Modal: React.FC<ModalProps> = ({ onClose, title, children }) => {
  return (
    <ModalBackground onClick={onClose}>
      <ModalContent
        onClick={(event) => event.stopPropagation()}
        initial={{ scale: 0, opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.20 }}
        animate={{ scale: 1, opacity: 1, backdropFilter: "blur(20px)" }}
      >
        <ModalHeader>
          <h1>{title}</h1>
          <button onClick={onClose}>
            <BiX />
          </button>
        </ModalHeader>

        {children}
      </ModalContent>
    </ModalBackground>
  );
};

export default Modal;

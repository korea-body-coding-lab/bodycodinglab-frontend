/** @jsxImportSource @emotion/react */
import React, { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
  onSave: () => void;
};

const Modal = ({ children, onClose, onSave }: ModalProps) => {
  return (
    <div
      css={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        css={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 8,
          minWidth: 300,
          maxWidth: "90vw",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div css={{ flexGrow: 1, overflowY: "auto" }}>
          {children}
        </div>
        <div
          css={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 20,
            gap: 10,
          }}
        >
          <button onClick={onClose}>닫기</button>
          <button onClick={onSave}>저장</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
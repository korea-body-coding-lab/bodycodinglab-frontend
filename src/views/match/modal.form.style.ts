/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const overlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const modalStyle = css`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  width: 50vw;
  max-height: 80vh;
  overflow-y: auto;
`;


export const trainerProfile = css`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #437BC0;
  object-fit: cover;
  background-color: #fff;
  display: block;
  margin: 0 auto;
  cursor: pointer;

  &:hover {
    filter: brightness(1.05);
    cursor: pointer;
  }
`;
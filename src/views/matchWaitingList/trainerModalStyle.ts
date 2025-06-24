/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const trainerRejectModalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const trainerRejectModalContent = css`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h3 {
    margin-bottom: 10px;
    text-align: center;
    color: #3f4756;
  }

  textarea {
    resize: none;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 14px;
    width: 100%;
    box-sizing: border-box;
  }
`;

export const trainerRejectModalButtons = css`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    background-color: #699ce4;
    color: white;
    cursor: pointer;
    font-weight: bold;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background-color: #437bc0;
      transform: scale(1.05); 
    }
  }
`;
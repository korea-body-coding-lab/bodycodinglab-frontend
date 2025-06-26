/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";


export const matchListContainerBox = css`
  display: flex;
  
`; 


export const matchListContainer = css`
  margin-top: 25px;
  margin-left: 15px;

`


export const matchCardListBox = css`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 50vw;
  margin-left: 18%;
`;

export const matchCardListTitle = css`
  text-align: center;
  color: #3F4756;
  margin-bottom: 5%;
`;

export const matchCardBox = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  background-color: #F1FAFF;
`;

export const matchCardLeft = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const matchCardMiddle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
`;

export const matchCardRight = css`
  button {
    padding: 6px 12px;
    font-size: 14px;
    border-radius: 6px;
    border: none;
    background-color: #699CE4;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #437BC0;
      transform: scale(1.05); 
    }
  }
`;
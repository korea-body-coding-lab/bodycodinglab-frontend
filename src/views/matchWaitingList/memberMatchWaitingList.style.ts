/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";



export const MemberMatchWaitingListContainerBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 80vh;
  margin-left:40%;
  margin-top: 15%
`


export const MemberMatchWaitingListContainer = css`
  overflow-y: auto; 
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 30vw;
  background-color: #F1FAFF;
  height: 100vh;

  display: flex;
  flex-direction: column;
`

export const MemberMatchWaitingListTitle = css`
  text-align: center;
  color: #3F4756;
`;


export const MemberMatchWaitingListButtonContainer = css`
  display: flex;
  justify-content: center;
`

export const MatchWaitingListButton = css`
  width: 5vw;
  height: 6vh;
  background-color: #ccc;
  border: 1px solid white;
  color: white;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 8px;
  
  &:not(:disabled) {
    background-color: #699CE4;
    cursor: pointer;
  }

  &:not(:disabled):hover{
  background-color: #437BC0;
  transform: scale(1.05); 
  color: white;
} 
`

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
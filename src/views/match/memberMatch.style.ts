/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";



export const MemberMatchContainerBox = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  
`


export const MemberMatchContainer = css`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid black;
  width: 30vw;
  background-color: #F1FAFF;
`

export const MemberMatchTitle = css`
  text-align: center;
`;


export const MemberMatchButtonContainer = css`
  display: flex;
  justify-content: center;
`

export const MatchButton = css`
  width: 5vw;
  height: 6vh;
  background-color: #699CE4;
  color: white;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 8px;
  margin-bottom: 5px;
  &:hover{
  background-color: #437BC0;
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
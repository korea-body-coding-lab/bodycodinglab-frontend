/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";



export const MemberMatchWaitingListContainerBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`


export const MemberMatchWaitingListContainer = css`
  border: 1px solid black;
  width: 30vw;
`

export const MemberMatchWaitingListTitle = css`
  text-align: center;
`;


export const MemberMatchWaitingListButtonContainer = css`
  display: flex;
  justify-content: center;
`

export const MatchWaitingListButton = css`
  width: 5vw;
  height: 6vh;
  background-color: #699CE4;
  color: white;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 8px;

  &:not(:disabled):hover{
  background-color: #437BC0;
  color: white;
} 
`
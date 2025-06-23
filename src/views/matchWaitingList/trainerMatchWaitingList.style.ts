/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const trainerMatchWaitingListContainerBox = css`
padding-top: 30px ;
display: flex;
justify-content: center;

`

export const trainerMatchWaitingListContainerLayout = css`
display: flex;
`


export const trainerMatchWaitingListContainer = css`
 display: flex;
 justify-content: center;
 width: 60vw;
 
`

export const trainerMatchWaitingListBox = css`
width: 60vw;
`
export const trainerMatchWatingListTableTitle=css`
border: 1px solid black;
margin: 0;
background-color: #699CE4;
`

export const trainerMatchWatingListContext=css`
background-color: #F1FAFF;
`

export const trainerMatchWatingListTableButton= (status: string) =>css`
text-align : center;
background-color: #699CE4;
margin-left: 35px;
width: 90px;
height: 40px;
border-radius: 8px;
color: white;
border: 1px solid white;
cursor: ${status === "NOT_APPROVED" ? "pointer" : "not-allowed"};

background-color: ${status === "APPROVED"
    ? "#4CAF50"   // 녹색
    : status === "REJECT"
    ? "#d3d3d3"   // 회색
    : "#699CE4"}; // 파란색

  &:hover {
    background-color: ${status === "APPROVED"
      ? "#4CAF50"
      : status === "REJECT"
      ? "#d3d3d3"
      : "#437BC0"};
  }

  &:disabled {
    background-color: ${status === "APPROVED"
      ? "#4CAF50"
      : status === "REJECT"
      ? "#d3d3d3"
      : "#699CE4"};
    color: #ffffff;
  }
`;


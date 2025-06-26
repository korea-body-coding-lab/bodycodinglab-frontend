/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// === 스타일 태그 (trainerMatchWaitingList.style.ts) ===

export const trainerMatchContainerLayout = css`
  display: flex;
  padding-top: 30px;
`;

export const trainerMatchMainBox = css`
  margin-top: 2%;
  margin-left: 15px;
  flex: 1;
`;

export const trainerMatchBox = css`
  margin-top: 5%;
`

export const trainerMatchTitle = css`
text-align: center;
color: #3F4756;
margin-right: 4%;
`;


export const trainerMatchTableWrapper = css`
  margin-top: 5%;
  display: flex;
  justify-content: center;
`;



export const trainerMatchTableStyle = css`
  width: 100%;
  border-collapse: collapse;
  background-color: #f1faff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

export const trainerMatchTableHead = css`
  background-color: #cfd9e0;
  color: #ffffff;

  th {
    padding: 14px 12px;
    font-weight: bold;
    text-align: center;
    font-size: 15px;
  }
`;

export const trainerMatchTableRow = css`
  &:hover {
    background-color: #f0f8ff;
  }
`;

export const trainerMatchTableCell = css`
  padding: 12px 10px;
  border-bottom: 1px solid #e0e6ed;
  color: #3f4756;
  text-align: center;
  font-size: 15px;
`;

export const trainerMatchButton = (status: string) => css`
  width: 90px;
  height: 40px;
  border-radius: 8px;
  margin: 0 5px;
  color: white;
  border: 1px solid white;
  font-weight: 600;
  background-color: ${
    status === "APPROVED"
      ? "#4CAF50"
      : status === "REJECT"
      ? "#d3d3d3"
      : "#699CE4"
  };
  cursor: ${status === "NOT_APPROVED" ? "pointer" : "not-allowed"};

  &:hover {
    background-color: ${
      status === "APPROVED"
        ? "#388e3c"
        : status === "REJECT"
        ? "#d3d3d3"
        : "#437BC0"
    };
    transform: ${status === "NOT_APPROVED" ? "scale(1.05)" : "none"};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const tdButtonCellBox = css`
  display: flex;
  justify-content: space-around;
`

export const tdButtonCell = css`
  width: 100px;
  text-align: center;
`;
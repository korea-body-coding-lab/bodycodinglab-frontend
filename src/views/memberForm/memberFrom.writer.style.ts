/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const fromCotinaerBox=css`
  padding-top: 25px;
`


export const formContainer = css`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #f5fbff;
  border-radius: 12px;
  box-shadow: 5px -3px 0px 3px #d3d3d3;
`;

export const formTitle = css`
  text-align: center;
  font-size: 24px;
  margin-bottom: 30px;
`;

export const formRow = css`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const formLabel = css`
  width: 130px;
  font-weight: bold;
`;

export const formOptions = css`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const formRadio = css`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const formNumber = css`
  width: 100px;
`;

export const formSubmit = css`
  text-align: center;
  margin-top: 40px;
`;


export const submitButtonContainer=css`
  display: flex;
  justify-content: center;
`;

export const submitButton = css`
  background-color: #3182f6;
  color: white;
  padding: 10px 30px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #2563eb;
  }
`;
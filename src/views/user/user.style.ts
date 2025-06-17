import { css } from "@emotion/react";

export const layoutStyle = css`
  display: flex;
  height: 100vh;
  justify-content: flex-start;
`;

export const mainStyle = css`
  flex: 1;
  margin-right: 150px;
  padding: 15px;
  /* background-color: #f5f7fa; */
  box-sizing: border-box;
`;

export const mainTitleStyle = css `
  margin-bottom: 15px;
  font-weight: bold;
  color: #3F4756;
`;

export const formWrapperStyle = css`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const formSectionStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  height: auto;
  gap: 20px;
  margin-bottom: 30px;
  padding: 30px;
  border: 1px solid #C5CEE0;
  border-radius: 12px;
  background-color: #ffffff;
`;

export const formTitleStyle = css`
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: bold;
  color: #3F4756;
`;

export const formStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export const formLabelDeleteUserStyle = css`
  width: 70px;
  margin-right: 15px;
  text-align: right;
  word-break: keep-all;
  white-space: normal;
  font-size: 20px;
  font-weight: bold;
  color: #3F4756;
`;

export const inputDeleteUserWrapperStyle = css`
  width: 350px;
  height: 60px;
  padding: 0 14px;
  border: 1px solid #8F98A9;
  border-radius: 12px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  transition: border 0.3s;
  &:focus-within {
    outline: none;
    border: 3px solid #707D97;
  }
`;

export const buttonDeleteUserStyle = css`
  width: 500px;
  padding: 1.3rem;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  background-color: #699CE4;
  transition: background-color 0.3s;
  &:hover {
    background-color: #437BC0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  }
`;

export const pDeleteUserStyle = css `
  font-size: 18px;
  font-weight: 500;
  color: #3F4756;
  margin-bottom: 8px;
  line-height: 1.5;
`;

export const formDeleteUserStyle = css`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const inputStyle = css`
  flex: 1;
  border: none;
  outline: none;
  font-size: 20px;
  line-height: 1.4;
`;
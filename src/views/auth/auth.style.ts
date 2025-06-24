import { css } from "@emotion/react";

export const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px auto;
  padding: 40px 20px;
  background-color: #ffffff;
`;

export const titleStyle = css`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 80px;
  color: #3F4756;
`;

export const selectionWrapperStyle = css`
  display: flex;
  justify-content: center;
  gap: 50px;
`;

export const selectionStyle = css`
  width: 300px;
  height: 300px;
  margin: 50px 50px;
  padding: 42px;
  border: 1px solid #C5CEE0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.3s;
  &:hover {
    border: 3px solid #707D97;
  }
`;

export const selectionImageStyle = css`
  width: 150px;
  height: 150px;
  background-color: #D9D9D9;
  margin-bottom: 30px;
`;

export const selectionLabelStyle = css`
  font-size: 28px;
  font-weight: bold;
  color: #3F4756;
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

export const getSectionStyle = css`
  width: auto;
  height: auto;
  gap: 20px;
  padding: 30px;
  border: 1px solid #C5CEE0;
  border-radius: 12px;
  background-color: #ffffff;
`;

export const formWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const formSignUpStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

export const formStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export const formSignUpTitleStyle = css`
  width: 100%;
  margin-bottom: 30px;
  text-align: left;
  font-size: 28px;
  font-weight: bold;
  color: #3F4756;
`;

export const formTitleStyle = css`
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: bold;
  color: #3F4756;
`;

export const formLabelStyle = css`
  width: 120px;
  margin-right: 15px;
  word-break: keep-all;
  white-space: normal;
  text-align: right;
  font-size: 20px;
  font-weight: bold;
  color: #3F4756;
`;

export const formLabelFindUsernameStyle = css`
  width: 70px;
  margin-right: 15px;
  text-align: right;
  word-break: keep-all;
  white-space: normal;
  font-size: 20px;
  font-weight: bold;
  color: #3F4756;
`;

export const formLabelResetPasswordStyle = css`
  width: 120px;
  margin-right: 15px;
  text-align: right;
  word-break: keep-all;
  white-space: normal;
  font-size: 20px;
  font-weight: bold;
  color: #3F4756;
`;

export const labelFindUsernameStyle = css`
  width: 70px;
  margin-bottom: 30px;
  word-break: keep-all;
  white-space: normal;
  font-size: 20px;
  font-weight: bold;
  color: #3F4756;
`;

export const pFindUsernameStyle = css`
  margin: 15px;
  word-break: keep-all;
  white-space: normal;
  font-size: 20px;
  font-weight: bold;
  color: #3F4756;
`;

export const labelResetPasswordStyle = css`
  width: 70px;
  margin-bottom: 30px;
  word-break: keep-all;
  white-space: normal;
  font-size: 20px;
  font-weight: bold;
  color: #3F4756;
`;

export const getFindedUsernameStyle = css`
  width: 70px;
  margin: auto 15px;
  word-break: keep-all;
  white-space: normal;
  font-size: 25px;
  font-weight: bold;
  color: #437BC0;
`;

export const inputSignUpWrapperStyle = css`
  width: 540px;
  height: 60px;
  padding: 0 14px;
  line-height: 60px;
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

export const inputLoginWrapperStyle = css`
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

export const inputFindUsernameWrapperStyle = css`
  width: 400px;
  height: 60px;
  padding: 0 14px;
  border: 1px solid #8F98A9;
  border-radius: 12px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  transition: border 0.2s;
  &:focus-within {
    outline: none;
    border: 3px solid #707D97;
  }
`;

export const inputStyle = css`
  flex: 1;
  border: none;
  outline: none;
  font-size: 20px;
  line-height: 1.4;
`;

export const inputButtonStyle = css`
  width: 80px;
  height: 50px;
  font-size: 18px;
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

export const genderSectionStyle = css`
  display: flex;
  gap: 20px;
`;

export const hiddenRadioStyle = css`
  display: none;
`;

export const genderButtonStyle = css`
  width: 260px;
  height: 60px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #3F4756;
  border: 1px solid #8F98A9;
  border-radius: 12px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border 0.3s;
  &:hover {
    outline: none;
    border: 3px solid #707D97;
  }
`;

export const genderSelectionStyle = css`
  border: 3px solid #707D97;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
`;

export const buttonSignUpStyle = css`
  width: 730px;
  padding: 1.3rem;
  margin-bottom: 50px;
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

export const buttonLoginStyle = css`
  width: 350px;
  padding: 1.3rem;
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

export const buttonFindUsernameStyle = css`
  width: 440px;
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

export const buttonResetPasswordStyle = css`
  width: 480px;
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

export const errorMessageStyle = css`
  color: red;
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
`;

export const linkEtcFunctionStyle = css `
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

export const linkLoginOrResetPasswordStyle = css `
  width: 100%;
  margin-top: 30px;
`;

export const pLoginOrResetPasswordStyle = css `
  width: 70px;
  word-break: keep-all;
  white-space: normal;
  font-size: 15px;
  font-weight: bold;
  color: #3F4756;
`;

export const linkStyle = css`
  text-decoration: none;
  color: #3f4756;
  margin: 0 4px;
`;

export const dividerStyle = css`
  margin: 0 6px;
  color: #ccc;
`;

export const linkGroupStyle = css`
  margin-top: 10px;
  
  &:first-of-type {
    margin-top: 0;
  }
`;

export const fullPageLoaderStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(30, 30, 30, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #FFF;
  z-index: 9999;
  `;

export const overlayStyle = css`
  position: fixed;
  z-index: 9999;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex; align-items: center; justify-content: center;
`;

export const modalStyle = css`
  position: relative;
  width: 500px;
  height: 600px;
  background: white;
  border-radius: 12px;
  padding: 12px;
  overflow: visible;
`;

export const modalOverlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const modalContentStyle = css`
  background: #fff;
  width: 500px;
  height: 600px;
  border-radius: 10px;
  padding: 16px;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

export const closeButtonStyle = css`
  position: absolute;
  top: 10px;
  right: 4px;
  z-index: 1001;
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  line-height: 1;
  padding: 4px 8px;

  &:hover {
    color: #333;
  }
`;

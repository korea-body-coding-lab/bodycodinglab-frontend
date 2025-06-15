import { css } from "@emotion/react";

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px auto;
  padding: 40px 20px;
  background-color: #ffffff;
`;

const titleStyle = css`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 80px;
  color: #3F4756;
`;

const selectionWrapperStyle = css`
  display: flex;
  justify-content: center;
  gap: 50px;
`;

const selectionStyle = css`
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

const selectionImageStyle = css`
  width: 150px;
  height: 150px;
  background-color: #D9D9D9;
  margin-bottom: 30px;
`;

const selectionLabelStyle = css`
  font-size: 28px;
  font-weight: bold;
  color: #3F4756;
`;

const formSectionStyle = css`
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

const formWrapperStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const formStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const formTitleStyle = css`
  width: 100%;
  margin-bottom: 30px;
  text-align: left;
  font-size: 28px;
  font-weight: bold;
  color: #3F4756;
`;

const formLabelStyle = css`
  width: 120px;
  margin-right: 15px;
  word-break: keep-all;
  white-space: normal;
  text-align: right;
  font-size: 20px;
  font-weight: bold;
  color: #3F4756;
`;

const inputWrapperStyle = css`
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

const inputStyle = css`
  flex: 1;
  border: none;
  outline: none;
  font-size: 20px;
  line-height: 1.4;
`;

const inputButtonStyle = css`
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

const genderSectionStyle = css`
  display: flex;
  gap: 20px;
`;

const hiddenRadioStyle = css`
  display: none;
`;

const genderButtonStyle = css`
  width: 260px;
  height: 60px;
  /* margin: 50px 50px;
  padding: 42px; */
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

const genderSelectionStyle = css`
  border: 3px solid #707D97;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
`;

const buttonStyle = css`
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

const errorMessageStyle = css`
  color: red;
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
`;

export { containerStyle, titleStyle, selectionWrapperStyle, selectionStyle, selectionImageStyle, selectionLabelStyle, formSectionStyle, formWrapperStyle, formStyle, formTitleStyle, formLabelStyle, inputWrapperStyle, inputStyle, inputButtonStyle, genderSectionStyle, hiddenRadioStyle, genderButtonStyle, genderSelectionStyle, buttonStyle, errorMessageStyle };
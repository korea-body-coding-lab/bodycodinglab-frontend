import { css } from "@emotion/react";

export const layoutStyle = css`
  display: flex;
  height: 100vh;
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

export const tableStyle = css`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const theadStyle = css`
  background-color: #f3f8fc;

  th {
    padding: 14px 12px;
    font-weight: bold;
    color: #3f4756;
    border-bottom: 1px solid #cfd9e0;
    text-align: center;
  }
`;

export const tbodyStyle = css`
  tr {
    &:hover {
      background-color: #f9fcff;
    }
  }

  td {
    padding: 12px 10px;
    border-bottom: 1px solid #e0e6ed;
    color: #3f4756;
    text-align: center;
    font-size: 15px;
  }

  button {
    width: 60px;
    height: 40px;
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    color: #fff;

    &.detail {
      background-color: #699ce4;

      &:hover {
        background-color: #437bc0;
      }
    }
  }
`;

export const modalBackdropStyle = css`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const modalBoxStyle = css`
  width: 700px;
  max-height: 90vh;
  padding: 24px;
  background: white;
  border-radius: 12px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }
`;

export const topSectionStyle = css`
  display: flex;
  justify-content: space-between;
`;

export const profileBoxStyle = css`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #75A7EF;

  img {
    width: 120px;
    height: 120px;
    object-fit: cover;
  }
`;

export const fieldBoxStyle = css`
  width: 500px;
  /* min-height: 240px; */
  margin-right: 15px;
  background: #f5f5f5;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

export const fieldRowStyle = css`
  font-weight: bold;
  color: #3F4756;
  margin-top: 10px;
  line-height: 1.6;
  /* margin-bottom: 6px; */
`;

export const buttonContainerStyle = css`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

export const closeButtonStyle = css`
  width: 155px;
  height: 55px;
  background-color: #699CE4;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #437BC0;
  }
`;

export const approveButtonStyle = css`
  width: 155px;
  height: 55px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  &:hover {
    background-color: #388e3c;
  }
`;

export const rejectButtonStyle = css`
  width: 155px;
  height: 55px;
  background-color: #f44336;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  &:hover {
    background-color: #d32f2f;
  }
`;

export const changeReasonBoxStyle = css`
  margin-top: 20px;
  width: 100%;
`;

export const textareaStyle = css`
  width: 100%;
  padding: 8px;
  font-size: 14px;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
`;

export const rejectButtonGroupStyle = css`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 12px;
`;

export const fileDownloadLink = css`
  color: inherit; 
  text-decoration: underline;
  cursor: pointer;
`;

export const filterButtonContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const filterButtonsLeft = css`
  display: flex;
  gap: 12px;
`;

export const filterButtonStyle = (active: boolean) => css`
  padding: 6px 18px;
  border: 2px solid #699CE4;
  background-color: ${active ? '#699CE4' : '#fff'};
  color: ${active ? '#fff' : '#3F4756'};
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.15s ease;
  &:hover {
    background-color: ${active ? '#5C8DFF' : '#EDF3FF'};
  }
`;
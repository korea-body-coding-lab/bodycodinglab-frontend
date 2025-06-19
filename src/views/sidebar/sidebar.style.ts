import { css } from "@emotion/react";

export const sidebarStyle = css`
  width: 250px;
  height: 100vh;
  margin-left: 150px;
  margin-right: 15px; 
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

export const profileStyle = css`
  width: 250px;
  margin-bottom: 18px;
  padding: 24px 16px;
  border: 3px solid #75A7EF;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 24px;
    font-weight: bold;
    color: #3F4756;
    margin-bottom: 8px;
  }

  button {
    background-color: #699CE4;
    color: #fff;
    padding: 6px 12px;
    font-size: 14px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #437BC0;
    }
  }
`;

export const menuStyle = css`
  width: 250px;
  border: 3px solid #75A7EF;
  border-radius: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const menuListStyle = css`
  list-style: none;
  padding: 30px 16px;
  margin: 0;
  display: block;
`;

export const linkStyle = (selected: boolean) => css`
  text-decoration: none;
  width: 100%;
  margin: 30px auto;
  padding: 12px 10px;
  border-bottom: 3px solid ${selected ? " #437BC0" : "transparent"};
  font-size: 20px;
  font-weight: 600;
  color: #3F4756;
  text-align: center;
  display: block;
  cursor: pointer;
  transition: border 0.3s;

  &:hover {
    border-radius: ${selected ? "" : "13px"};
    background-color: ${selected ? "" : "#DFF1FF"};
  }
`;

export const selectedStyle = css`
  border-bottom: 3px solid #437BC0;

  &:hover {
    text-decoration: none;
  }
`;

export const profileWrapper = css`
  position: relative;
  width: 110px;
  height: 110px;
  cursor: pointer;

  &:hover div {
    opacity: 1;
  }
`;

export const loginProfile = css`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #437BC0;
`;

export const hoverText = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
`;

export const profileContainer = css`
  height: 100vh;
  padding: 30px;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const profileTitle = css`
  font-size: 20px;
  margin-bottom: 20px;
  color: #3F4756;
`;

export const profileInput = css`
  margin-bottom: 20px;
`;

export const profileButtonGroup = css`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

export const profileUpload = css`
  padding: 10px 20px;
  background-color: #4f8ef7;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #3b76d1;
  }
`;

export const profileDelete = css`
  padding: 10px 20px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #c0392b;
  }
`;
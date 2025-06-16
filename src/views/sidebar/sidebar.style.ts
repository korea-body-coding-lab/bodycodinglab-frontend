import { css } from "@emotion/react";

export const sidebarStyle = css`
  width: 250px;
  height: 100vh;
  margin-left: 150px;
  margin-right: 15px; 
  padding: 24px 16px;
  /* background-color: #f9f9f9;
  border-right: 1px solid #ddd; */
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

  img {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 12px;
    border: 2px solid #437BC0;
  }

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
  /* padding: 60px 16px; */
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
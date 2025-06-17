import { css } from "@emotion/react";

export const headerStyle = css`
  width: 100%;
  height: 100px;
  margin-bottom: 15px;
  margin-right: 15px;
  background-color: white;
  border-bottom: 3px solid #437bc0;
  box-sizing: border-box;
`;



export const headerUpSet = css`
  width: 60%;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

export const logoStyle = css`
  width: 200px;
  height: 100px;
  background-image: url("/fitmatelogo.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  cursor: pointer;
`;

export const loginStyle = css`
  width: 250px;
  height: 100px;
  font-size: 19px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 100px;
  font-size: 16px;
`;

export const loginProfile = css`
  width: 60px;
  height: 60px;
  background-image: url("/profileImageSample.png");
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
`;

export const loginStyleBtn = css`
  width: 50px;
  height: 50px;

  text-decoration: none;
  border-style: none;
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

export const headerNav = css`
  width: 70%;
  height: 80px;
  margin: auto;
  display: flex;
  justify-content: space-around;
  cursor: pointer;
`;

export const headerNavDivs = css`
  font-size: 32px;
  line-height: 80px;
  color: #699ce4;
`;




export const userName = css`
    height: 100px;
    font-size: 16px;

    display: flex;
    align-items: center;
    justify-content: center;
`
export const click = css`
    cursor: pointer;
`


export const logoutStyle =css`
    width: 250px;
    height: 100%;
    font-size: 20px;
    display: flex;
    justify-content: end;
`
export const logoutStyleA = css`
    margin-right: 10px;
    text-decoration: none;


`

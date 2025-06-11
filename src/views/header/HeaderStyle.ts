import { css } from "@emotion/react";

export const headerStyle = css`
    width: 100%;
    height: 180px;
    background-color: white;
    border-bottom: 3px solid #437BC0;
    box-sizing: border-box;
`
export const headerUp = css`
    width: 100%;
    height: 100px;
    margin: auto;
    
    border-bottom: 3px solid #75A7EF;
    box-sizing: border-box;
    
`
export const headerUpSet = css`
    width: 70%;
    margin: auto;
    display: flex;
    justify-content: space-between;
`
export const logoStyle = css`
    width: 200px;
    height: 100px;
    background-image: url("./fitmatelogo.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
    cursor: pointer;
`
export const loginStyle =css`
    width: 300px;
    height: 100px;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 100px;
    font-size: 16px;
    
`
export const loginProfile = css`
    width: 80px;
    height: 80px;
    background-image: url("./profileImageSample.png");
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
    
`
export const loginStyleBtn = css`
    width: 50px;
    height: 50px;
    margin-right: 10px;
    text-decoration: none;
    
`

export const logoutStyle =css`
    width: 300px;
    height: 100%;
    font-size: 20px;
    display: flex;
    justify-content: end;
`
export const logoutStyleA = css`
    margin-right: 10px;
    text-decoration: none;

`
export const headerNav = css`
    width: 70%;
    height: 80px;
    margin: auto;
    display: flex;
    justify-content: space-around;
    cursor: pointer;
    
`
export const headerNavDivs = css`
    font-size: 32px;
    line-height: 80px;
    color: #699CE4; 
`
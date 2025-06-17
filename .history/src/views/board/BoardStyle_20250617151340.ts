// BoardStyle.ts
import { css } from "@emotion/react";


export const body = css`
    width: 70%;
    margin: auto;
    display: flex;
    flex-grow: 1;
    justify-content: flex-start;
    
`

export const left = css`
    margin-top: 2%;
    margin-left: 10%;
`


export const right = css`
    margin-top: 2%;
    margin-right: 10%;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

`
export const headwrap = css`
    width: 90%;
    
`
export const head = css`
    width: 90%;
    margin-right: auto;
    color: #437BC0;
    margin-bottom: 3px;
`
export const rightTop = css`
    display: flex;
    width: 90%;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
`

export const search = css` 
    flex-grow: 1;
    min-width: 0;
    height: 60px;
    border: 3px solid #C5CEE0;
    display: flex;
    justify-content: space-between;
    border-radius: 40px;
    align-items: center;
    box-sizing: border-box;
`
export const searchInput = css` 
    width: 100%;
    height: 60px;
    margin-left: 20px;
    margin-right: 20px;
    border: none;
    outline: none;
    background: none;
    font-size: 30px;
    line-height: 60px;
`
export const searchBtn = css`
    height: 57px;
    width: 90px;
    font-size: 24px;
    color: white;
    padding: 0;
    margin: 0;
    background-color: #75A7EF;
    border: none;
    border-radius: 35px;
    box-sizing: border-box;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    z-index: -1;
    cursor: pointer;
`
export const writeBtn = css`

    height: 57px;
    width: 92px;
    font-size: 24px;
    color: white;
    line-height: 60px;
    background-color: #75A7EF;
    border: none;
    border-radius: 35px;
    box-sizing: border-box;
    cursor: pointer;
`
export const loading = css`
    font-size: 30px;
`
export const board = css`
    margin-top: 5%;
    width: 90%;
    margin: auto;
    height: 600px;
    border: 3px solid #C5CEE0;
    border-radius: 10px 10px 0 0;
    
`
export const post = css`
margin-left: 10px;
margin-top: 5px;
`
export const boardBottom = css`
    width: 90%;
    height: 30px;
    text-align: center;
    border: 3px solid #C5CEE0;
    border-top: 0px;
    border-radius: 0 0 10px 10px;
`
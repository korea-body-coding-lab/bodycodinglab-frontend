// BoardStyle.ts
import { css } from "@emotion/react";

export const category = css`
    width: 70%;
    height: 60px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    border: 2px solid #C5CEE0;
    border-top: 0px;
    border-radius:0 0 10px 10px;
    box-sizing: border-box;
    margin-bottom: 10px;

`
export const categorys = css`
    display: flex;
`
export const categoryDivs = css`
    font-size: 30px;
    margin-left: 20px;
    line-height: 60px;
    color: #699CE4;
`

export const writeBtn = css`
    font-size: 30px;
    color: white;
    line-height: 60px;
    background-color: #75A7EF;
    border-radius: 10px 0px 8px 10px;
`
export const search = css` 
    width: 70%;
    height: 60px;
    margin: auto;
    border: 2px solid #C5CEE0;
    display: flex;
    justify-content: space-between;
    border-radius: 40px;
    margin-bottom: 10px;
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
    width: 92px;
    font-size: 30px;
    color: white;
    line-height: 60px;
    margin: auto;
    background-color: #75A7EF;
    border: none;
    border-radius: 35px;
    box-sizing: border-box;
  
`

export const board = css`
width: 70%;
margin: auto;
height: 1000px;
    border: 2px solid #C5CEE0;
    border-radius: 10px;
`
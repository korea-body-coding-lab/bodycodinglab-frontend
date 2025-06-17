import { css } from "@emotion/react";

export const head = css`
    width: 300px;
    text-align: center;
    color: #437BC0;
    margin-bottom: 3px;
`
export const category = css`
    width: 300px;
    height: 300px;
    justify-content: space-between;
    border: 3px solid #C5CEE0;
    border-radius:10px;
    box-sizing: border-box;

`

export const categorys = css`
    flex-direction: column;
    display: flex; 
    flex-direction: column; 
    gap: 20px;
`
export const categoryDivs = css`
    font-size: 40px;
    text-align: center;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-decoration-color: #699CE4;
    text-underline-offset: 6px;
    line-height: 60px;
    color: #699CE4;
    padding: 10px;
    cursor: pointer;
`
export const useCategoryDivs = css`
    font-size: 40px;
    text-align: center;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-decoration-color: #437BC0;
    text-underline-offset: 6px;
    line-height: 60px;
    color: #699CE4;
    padding: 10px;
    cursor: pointer;
`
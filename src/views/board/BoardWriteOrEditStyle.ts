import { css } from "@emotion/react";

export const body = css`
    width: 90%;
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
export const titlewrap = css`
    width: 90%;
    height: 50px;
    border: 3px solid #C5CEE0;
    border-radius: 10px;
    margin-bottom: 10px;
`
export const title = css`
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
    height: 50px;
    font-size: 24px;
    &::placeholder {
        color: #3F4756; 
    }
    border-style: none;
    outline: none;
    box-shadow: none;
    background: none;
`

export const contentwrap = css`
    width: 90%;
    height: 500px;
    border: 3px solid #C5CEE0;
    border-radius: 10px 10px 0 0;
`
export const content = css`
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
    height: 500px;
    outline: none;
    box-shadow: none;
    background-color: inherit;
    font-size: 24px;
    font-family: 'Arial';
    &::placeholder {
        color: #3F4756; 
    }
    resize: none;
    border-style: none;
` 
export const file = css`
    width: 90%;
    border: 3px solid #C5CEE0;
    border-top: none;
    font-size: 16px;
    color: #437BC0;
`


export const writeBtn = css`
    width: 90%;
    height: 40px;
    font-size: 30px;
    color: #3F4756;
    line-height: 40px;
    text-align: center;
    border: 3px solid #C5CEE0;
    border-top: 0px;
    border-radius: 0 0 10px 10px;
    cursor: pointer;
`
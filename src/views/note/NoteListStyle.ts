import { css } from "@emotion/react";

export const titlewrap = css`
    width: 80%;
    height: 50px;
    background-color: #699CE4;
    border: 2px solid #9D9D9D;
    border-radius: 10px;
`
export const title = css`
    font-size: 30px;
    line-height: 45px;
    padding-left: 10px;
    color: white;
`
export const loading = css`
    font-size: 30px;
`
export const noteListWrap = css`
    margin-top: 10px;
    width: 80%;
    max-width: 1000px;
    height: 600px;
    background-color: #F1FAFF;
    border: 2px solid #9D9D9D;
    border-radius: 10px 10px 0 0;
`
export const noteWriteWrap = css`
margin-top: 10px;
    width: 80%;
    max-width: 1000px;
    height: 600px;
    background-color: #F1FAFF;
    border: 2px solid #9D9D9D;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
  
`
export const profile = css`
margin: auto;
    margin-top: 50px;
    width: 80%;
    height: 80px;
    background-color: #C5CEE0;
    border-radius: 10px;
    display: flex;
    align-items: center;
    
`
export const profileImage = css`
    margin-left: 10px;
    margin-right: 10px;
    width: 60px;
    height: 60px;
    background-image: url("/profileImageSample.png");
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
`
export const profileSpan = css`
    font-size: 22px;
    color: #3F4756;
    background: none;
    border: none;
    &:focus {
        outline: none;
        border: none; 
        box-shadow: none; 
  }
`
export const noteText = css`
   
    padding-left: 10px;
    padding-right: 10px;
    line-height: 1.5;
    margin: auto;
    margin-top: 27px;
    margin-bottom: 20px;
    width: 80%;
    height: 500px;
    outline: none;
    box-shadow: none;
    background-color: white;
    font-size: 24px;
    font-family: 'Arial';
    &::placeholder {
        color: #3F4756; 
    }
    resize: none;
    border-radius: 10px;
    border: 2px solid #d9d9d9;
`
export const sendBtn = css`
    width: 80%;
    height: 70px;
    margin: auto;
    margin-bottom: 50px;
    border-radius: 10px;
    border: none;
    font-size: 26px;
    color: white;
    background-color: #699CE4;
    cursor: pointer;
`

export const note = css`
    width: 100%;
    box-sizing: border-box;
    
    cursor: pointer;
    
`
export const spans = css`
    color: #ccc;
    border-bottom: 1px solid #ccc;
    
`
export const noteIdSpan = css`
    margin-left: 10px;
    display: inline-block;
    color: #3F4756;
    border-right: 1px solid #ccc;
    min-width: 60px;
    
`
export const noteTextSpan = css`
    margin-left: 10px;
    display: inline-block;
    color: #3F4756;
    min-width: 470px;
    border-right: 1px solid #ccc;
`
export const noteWriterSpan = css`
    margin-left: 10px;
    display: inline-block;
    color: #3F4756;
    min-width: 80px;
    border-right: 1px solid #ccc;
`
export const noteReceiverSpan = css`
    margin-left: 10px;
    display: inline-block;
    color: #3F4756;
    min-width: 80px;
    border-right: 1px solid #ccc;
`
export const noteDateSpan = css`
    margin-left: 10px;
    display: inline-block;
    color: #3F4756;
    min-width: 60px;
`

export const page = css`
    width: 80%;
    height: 50px;
    background-color: #699CE4;
    border-radius: 0 0 10px 10px;
    border: 2px solid #909090;
    border-top: 0px;
    text-align: center;
    line-height: 50px;
`
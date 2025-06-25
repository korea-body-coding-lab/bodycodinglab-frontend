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
    height: 500px;
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
    flex-direction: row;
    align-items: center;
    font-size: 22px;
    color: #3F4756;
    
`
export const profileDetail = css`
    display: flex;
    align-items: center;
    margin-right: 20px;
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
export const profileBtn = css`
    width: 70px;
    height: 40px;
    background-color: #699CE4;
    border: 1px solid white;
    border-radius: 5px;
    font-size: 18px;
    color: #3F4756;
    :active{
        background-color: #437BC0;
        color: white;
    }
    cursor: pointer;
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
    :active{
        background-color: #437BC0;
    }
    cursor: pointer;
`

export const note = css`
    width: 100%;
    box-sizing: border-box;
    
    cursor: pointer;
    
`
export const spanHead = css`
    color: #3F4756;
    border-bottom: 2px solid #C5CEE0;
`
export const noteTextHead = css`
    margin-left: 10px;
    display: inline-block;

    width: 50.8%;
    border-right: 1px solid #ccc;
    text-align: center;
`
export const spans = css`
    color: #3F4756;;
    border-bottom: 1px solid #ccc;
    
    :hover{
        background-color: #ccc;
        color: white;
    }
    
`
export const noteIdSpan = css`
    margin-left: 10px;
    display: inline-block;
    
    border-right: 1px solid #ccc;
    width: 7.2%;
    
`
export const noteTextSpan = css`
    margin-left: 10px;
    display: inline-block;

    width: 50.8%;
    border-right: 1px solid #ccc;
`
export const noteWriterSpan = css`
    margin-left: 10px;
    display: inline-block;

    width: 9%;
    border-right: 1px solid #ccc;
`
export const noteReceiverSpan = css`
    margin-left: 10px;
    display: inline-block;

    width: 9%;
    border-right: 1px solid #ccc;
`
export const noteDateSpan = css`
    margin-left: 10px;
    display: inline-block;

    width: 18.05%;
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
export const pageTextBtn = css`
    width: 20px;
    height: 30px;
    border: none;
    background: none;
    color: #3F4756;
    font-size: 18px;
    line-height: 30px;
    cursor: pointer;
    :hover{
        color: white;
    }
`
export const pageNumBtn = css`
    width: 20px;
    height: 30px;
    border: none;
    background: none;
    font-size: 18px;
    line-height: 30px;
    color: #3F4756;
    cursor: pointer;
    :hover{
        color: white;
    }
`
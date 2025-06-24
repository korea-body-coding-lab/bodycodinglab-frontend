/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const formContainer = css`
  height: 100vh;
  display: flex;
`

export const title = css`
margin-top: 30px;
color: #3F4756
`

export const formContainerBox = css`
margin-top: 30px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-left: 300px;
`

export const formWriteButtonContainerBox = css`
    
`

export const formWriteButtonContainer= css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`


export const formWriteButtontxt = css`
  color: #3f4756;
  font-size: 24px
`

export const button = css`
  color: white;
  background-color:  #699CE4;
  width: 100px;
  height: 40px;
  border-radius: 8px;
  border-color:  #699CE4;
  &:hover {
    background-color: #437BC0;
    transform: scale(1.05); 
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  }
`

export const formViewContainer = css`
  margin-left: 15px;
`

/* export const formViewContainerBox = css`
margin-top:500px;
margin-right: 100px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

` */
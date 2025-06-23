import { css } from "@emotion/react";

export const wrap = css`
    width: 100%;
    height: 80px;
    display: flex;
    
`
export const profileImage = css`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-image: url("/profileImageSample.png");
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
    font-size: 10px;
    line-height: 60px;
`
export const commentWriter = css`
    margin-left: 10px;
    font-size: 24px;
    line-height: 80px;
    margin-right: 5px;
`
export const commentText = css`
    margin: 5px;
    width: 70%;
    height: 70px;
    line-height: 35px;
    padding: 0px 5px;
    background-color: rgba(1,1,1,0.1);
`
export const likeBtn = css`
margin: 10px;
    width: 60px;
    height: 60px;
    background-color: #FF6193;
    border: none;
    cursor: pointer;
    font-size: 24px;
    color: white;
`
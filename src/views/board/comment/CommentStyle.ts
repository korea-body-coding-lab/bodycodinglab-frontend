import { css } from "@emotion/react";

export const wrap = css`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    min-height: 80px;
    display: flex;
    border-bottom: 1px solid #ccc;
    
`
export const profileImage = css`

    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-image: url("/profileImageSample.png");
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
    font-size: 10px;
    line-height: 60px;
    margin-left: 10px;
    margin-top: auto;
    margin-bottom: auto;
`
export const commnetContentBox = css`
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
    min-height: 60px;
`
export const commentInfoBox = css`
    width: 100px;
    margin-left: 5px;
    display: flex;
    align-items: center;
    gap: 8px;
`;
export const commentWriter = css`
    font-size: 18px;
    color: #333;
`
export const createdAt = css`
    font-size: 12px;
    color: #888;
`
export const commentText = css`
    margin: 5px;
    flex: 1;
    padding: 5px 10px;
    min-height: 70px;
    line-height: 1.5;
    min-height: 60px;
    background-color: rgba(1,1,1,0.05);
    white-space: pre-wrap;
    word-break: break-word;
`
export const likeBtn = css`
    margin-left: auto;
    margin-right: 10px;
    width: 60px;
    height: 60px;
    background-color: #FF6193;
    border: none;
    cursor: pointer;
    font-size: 24px;
    color: white;
    align-self: center;
    flex-shrink: 0;
`
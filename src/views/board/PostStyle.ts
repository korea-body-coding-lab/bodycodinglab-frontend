import { css } from "@emotion/react";
export const body = css`
    width: 90%;
    margin: auto;
    display: flex;
    flex-grow: 1;
    justify-content: flex-start;
    margin-bottom: 20px;
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
export const modalOverlay = css`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);

    display: flex;
    justify-content: center;
    align-items: center;
`
export const profileModal = (x: number, y: number) => css`
    position: absolute;
    top: ${y}px;
    left: ${x}px;
    width: 250px;
    height: 200px;
    background-color: white;
    border: 4px solid #75A7EF;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    transform: translate(-50%, -10%);
    z-index: 1000;
`;

export const modalProfileImage = css`

    width: 110px;
    height: 110px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #437BC0;
    object-fit: cover;
    
`
export const profileMiddle = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`
export const profileUser = css`
    font-size: 20px;
    color: #3F4756;
`
export const modalNoteBtn = css`
    width: 30px;
    height: 30px;
    background-color: #ABBED8;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:Hover{
        color: #fff;
    }
`
export const searchWriter = css`
    font-size: 20px;
    color: #3F4756;
    cursor: pointer;
    &:Hover{
        color: #999;
    }
`
export const closeButton = css`
  position: absolute;
  top: 12px;
  right: 12px;
  
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #999;

  &:hover {
    color: #333;
  }
`;
export const deleteModal = css`
    width: 250px;
    height: 120px;
    background-color: white;
    border-radius: 10px;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    box-sizing: border-box;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
`
export const deleteText = css`
    font-size: 20px;
    text-align: center;
    margin-bottom: 10px;
`
export const deleteBtns = css`
    display: flex;
    gap: 30px;
`
export const deleteBtn = css`
    width: 70px;
    height: 30px;
    font-size: 18px;
    background-color: #C5CEE0;
    border: 2px solid #D9D9D9;
    border-radius: 10px;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
`

export const postHeader = css`
width: 90%;
    height: 90px;
    border: 2px solid #C5CEE0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #F1FAFF;
    border-radius: 10px 10px 0 0;
`
export const profile = css`
    width: 300px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`
export const loginProfile = css`
    margin-left: 10px;
    width: 70px;
    height: 70px;   
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #437BC0;
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: cover;

`
export const profileSub = css`
    width: 200px;
    height: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 20px;
`
export const title = css`
    margin-right: auto;
`
export const postHeaderBtns = css`
    margin-right: 10px;
`
export const postHeaderBtn = css`
    width: 80px;
    height: 50px;
    margin-right: 10px;
    border: 2px solid #F1FAFF;
    background-color: #699CE4;
    border-radius: 10px;
    font-size: 24px;
    color: white;
    cursor: pointer;
`
export const postContent = css`
    width: 90%;
    height: auto;
    min-height: 400px;
    background-color: #F1FAFF;
    border: 2px solid #C5CEE0;
    border-top: none;
    padding-bottom: 20px;
`
export const ContentText = css`
margin: 10px;
    height: auto;
    min-height: 400px;
`
export const postImage = css`
  width: 100%;
  max-width: 500px;
  margin-bottom: 10px;
  border-radius: 8px;
  object-fit: cover;
`;

export const imageList = css`
  margin-top: 20px;
`;

export const postLike = css`
    width: 50px;
    height: 50px;
    background-image: url("/likeImage.png");
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    font-size: 20px;
    line-height: 50px;
    text-align: center;
    color: black;
    margin: auto;
    overflow: hidden;
    border: 2.5px solid red;
    cursor: pointer;
`
export const postFooter = css`
    width: 90%;
    height: 50px;
    background-color: #699CE4;
    display: flex;
    justify-content: space-around;
    border: 2px solid #C5CEE0;
    border-top: none;
    border-bottom: none;
`
export const Footer = css`
    margin-right: auto;
    display: flex;
    font-size: 20px;
    margin-left: 10px;
    line-height: 50px;
    align-items: center;
`
export const likeImage = css`
    width: 30px;
    height: 30px;
    background-image: url("/likeImage.png");
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
    margin-right: 10px;
`
export const footerRight = css`
    display: flex;
    justify-content: flex-end;
    margin-right: 20px;
`
export const commentImage = css`
    width: 40px;
    height: 40px;
    background-image: url("/commentImage.png");
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
    margin-right: 5px;
`
export const viewImage = css`
    width: 30px;
    height: 30px;
    background-image: url("/viewCountImage.png");
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
    margin-right: 5px;
`
export const comment = css`
    width: 90%;
    background-color: #F1FAFF;
    border: 2px solid #C5CEE0;
    border-bottom: none;
`
export const noComment = css`
    font-size: 20px;
    color: #aaa;
    text-align: center;
`
export const commentWrite = css`
    width: 90%;
    height: 80px;
    background-color: #75A7EF;
    border-radius: 0 0 10px 10px;
    border: 2px solid #C5CEE0;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
export const commentWriteInput = css`
    font-size: 20px;
    &::placeholder {
        color: #fff; 
    }
    font-family: 'Arial';
    outline: none;
    box-shadow: none;
    background-color: inherit;
    resize: none;
    overflow: hidden;
    margin-left: 10px;
    width: 80%;
    height: 60px;
    border: none;
    background-color:rgba(217, 217, 217, 0.25);
    margin-right: 10px;
    border-radius: 0 0 10px 10px;
`
export const commentWriteBtn = css`
    width: 100px;
    height: 50px;
    margin-right: 10px;
    border-radius: 10px;
    border: 2px solid white;
    background-color: #437BC0;
    font-size: 24px;
    color: white;
    cursor: pointer;
`
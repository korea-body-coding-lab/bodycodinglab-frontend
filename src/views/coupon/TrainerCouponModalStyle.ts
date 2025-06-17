import { css } from "@emotion/react";


export const trainerCouponModalOverlay = css`
 position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
  z-index: 1000;
  
`;

export const trainerCouponModalContent = css`
  background-color: #699CE4;;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h3 {
    text-align: center;
  }

  input {
    height: 30px;
    border-radius: 5px ;
  }
`;


export const trainerCouponModalButtons = css`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
` 
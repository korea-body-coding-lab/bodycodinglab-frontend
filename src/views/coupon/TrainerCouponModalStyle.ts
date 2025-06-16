import { css } from "@emotion/react";


export const trainerCouponModalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const trainerCouponModalContent = css`
  background: gray;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
`;


export const trainerCouponModalButtons = css`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
` 
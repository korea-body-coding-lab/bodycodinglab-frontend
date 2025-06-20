import { css } from "@emotion/react";

export const cardWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  gap: 16px;
  max-width: 500px;
  margin: 20px auto;
`;

export const profileImage = css`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
`;

export const infoBox = css`
  flex: 1;
`;

export const name = css`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 4px;
`;

export const address = css`
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 6px;
`;

export const shortIntroduce = css`
  font-size: 0.95rem;
  color: #333;
  line-height: 1.4;
`;

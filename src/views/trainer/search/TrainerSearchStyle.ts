/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const container = css`
  max-width: 960px;
  margin: 40px auto;
  padding: 0 20px;
`;

export const searchBar = css`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

export const searchInput = css`
  padding: 10px 14px;
  font-size: 16px;
  border: 1.5px solid #ccc;
  border-radius: 4px;
  flex-grow: 1;

  &:focus {
    border-color: #0077cc;
    outline: none;
  }
`;

export const searchButton = css`
  padding: 10px 24px;
  font-size: 16px;
  background-color: #0077cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #005fa3;
  }
`;

export const trainerList = css`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const trainerCard = css`
  padding: 18px 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 10px rgba(0,0,0,0.12);
  }
`;

export const trainerName = css`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 6px;
`;

export const trainerInfo = css`
  font-size: 14px;
  color: #555;

  p {
    margin: 4px 0;
  }
`;

export const pagination = css`
  margin-top: 32px;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

export const pageButton = css`
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  cursor: pointer;

  &:hover {
    background-color: #e6f0fa;
  }
`;

export const activePageButton = css`
  ${pageButton};
  background-color: #0077cc;
  color: white;
  border-color: #0077cc;
  font-weight: 700;
`;

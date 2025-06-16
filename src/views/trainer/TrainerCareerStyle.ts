import { css } from '@emotion/react';

export const container = css`
  padding: 2rem;
  max-width: 600px;
  margin: auto;
  background-color: #f5f7fa;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', sans-serif;
  color: #3f4756;
`;

export const heading = css`
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: #3f4756;
`;

export const formBox = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.03);
  margin-bottom: 2rem; 
`;

export const input = css`
  padding: 0.6rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  color: #3f4756;
  background-color: #fff;
  &:focus {
    outline: none;
    border-color: #699ce4;
    box-shadow: 0 0 0 2px rgba(105, 156, 228, 0.2);
  }
`;

export const dateRow = css`
  display: flex;
  gap: 1rem;
`;

export const submitButton = css`
  padding: 0.75rem;
  background-color: #699ce4;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #437bc0;
  }
`;

export const card = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

export const cardText = css`
  flex: 1;
  font-size: 0.95rem;
  color: #3f4756;
`;

export const cardButtons = css`
  display: flex;
  gap: 0.5rem;
  button.edit {
    color: #699ce4;
    background: none;
    border: none;
    cursor: pointer;
    font-weight: 600;
    &:hover {
      color: #437bc0;
    }
  }
  button.delete {
    color: #dc2626;
    background: none;
    border: none;
    cursor: pointer;
    font-weight: 600;
    &:hover {
      color: #b91c1c;
    }
  }
`;

export const deleteAllButton = css`
  margin-top: 1.5rem;
  padding: 0.6rem 1rem;
  background: none;
  color: #dc2626;
  font-weight: bold;
  border: 1px solid #dc2626;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background-color: #ffe4e6;
  }
`;
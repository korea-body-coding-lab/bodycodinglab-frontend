/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex: 1;
  min-height: calc(100vh - 80px);
`;

export const formWrapper = css`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #f9fafb;
`;

export const title = css`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const input = css`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
`;

export const textarea = css`
  ${input};
  height: 100px;
`;

export const button = css`
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #1d4ed8;
  }
`;

export const messageText = css`
  font-size: 0.875rem;
  color: #374151;
`;

export const pageWrapper = css`
  display: flex;
  flex-direction: column;
`;


export const fileLabel = css`
  display: inline-block;
  cursor: pointer;
  background-color: #2563eb;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  user-select: none;
  transition: background-color 0.25s ease;

  &:hover {
    background-color: #1e40af;
  }

  margin-bottom: 12px;
`;

export const fileInput = css`
  display: none;
`;

export const fileList = css`
  list-style: none;
  padding-left: 0;
  margin-bottom: 20px;
`;

export const fileItem = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f3f4f6;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  margin-bottom: 8px;
  color: #374151;
`;

export const removeFileButton = css`
  background-color: #ef4444;
  border: none;
  color: white;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #b91c1c;
  }
`;

export const recentInfoBox = {
  marginBottom: "16px",
  padding: "12px 16px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  backgroundColor: "#f9f9f9",
  color: "#333",
  fontSize: "14px",
  fontWeight: 500,
};

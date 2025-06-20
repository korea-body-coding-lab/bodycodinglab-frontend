/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const layoutWrapper = css`
  background-color: #f0f2f5;
  min-height: 100vh;
  padding: 60px 0;
`;

export const card = css`
  background: #fff;
  max-width: 800px;
  margin: 0 auto;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

export const section = css`
  margin-top: 24px;
`;

export const sectionTitle = css`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
`;

export const row = css`
  display: flex;
  padding: 8px 0;
  border-bottom: 1px solid #ececec;
  &:last-child {
    border-bottom: none;
  }
`;

export const label = css`
  width: 120px;
  font-weight: bold;
  color: #333;
`;

export const text = css`
  flex: 1;
  color: #555;
`;

export const fileGrid = css`
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(120px,1fr));
  grid-gap: 12px;
`;

export const fileCard = css`
  display: flex;
  height: 120px;
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #0077cc;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const flexContainer = css`
  display: flex;
  gap: 20px;
`;

export const mainContent = css`
  flex: 1;
  /* 너비 꽉 채우기 */
`;

export const stickyProfileCard = css`
  position: sticky;
  top: 100px;
  width: 280px;
  align-self: flex-start;
`;

export const sidebar = css`
  width: 300px;
  position: sticky;
  top: 100px; /* Header 높이에 맞게 조정 */
  align-self: flex-start;
  flex-shrink: 0;
`;
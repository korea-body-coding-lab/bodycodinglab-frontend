import { css } from "@emotion/react";

export const layoutStyle = css`
  display: flex;
  height: 100vh;
`;

export const mainStyle = css`
  flex: 1;
  margin-right: 150px;
  padding: 15px;
  /* background-color: #f5f7fa; */
  box-sizing: border-box;
`;

export const mainTitleStyle = css `
  margin-bottom: 15px;
  font-weight: bold;
  color: #3F4756;
`;

export const filterButtonContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const filterButtonsLeft = css`
  display: flex;
  gap: 12px;
`;

export const ticketCountText = css`
  font-size: 15px;
  font-weight: 500;
  color: #437BC0;
`;

export const filterButtonStyle = (active: boolean) => css`
  padding: 6px 18px;
  border: 2px solid #699CE4;
  background-color: ${active ? '#699CE4' : '#fff'};
  color: ${active ? '#fff' : '#3F4756'};
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.15s ease;
  &:hover {
    background-color: ${active ? '#5C8DFF' : '#EDF3FF'};
  }
`;

export const ticketCardContainer = css`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const ticketCard = css`
  background-color: #F2F9FF;
  padding: 20px 28px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const issuedCardStyle = css`
  background-color: #F2F9FF;
`;

export const usedCardStyle = css`
  background-color: #F3FBF2;
`;

export const canceledCardStyle = css`
  background-color: #FFF5F5;
`;

export const getCardStyleByStatus = (status: string) => {
  switch (status) {
    case 'ISSUANCE':
      return issuedCardStyle;
    case 'USED':
      return usedCardStyle;
    case 'CANCEL':
      return canceledCardStyle;
    default:
      return issuedCardStyle;
  }
};

export const ticketHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ticketMeta = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 15px;
  & > p:first-of-type {
    font-weight: 700;
  }
`;

export const statusBadge = css`
  color: #5C8DFF;
  font-weight: 600;
`;

export const trainerInfo = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const trainerImage = css`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 6px;
`;

export const trainerName = css`
  font-weight: 600;
`;

export const trainerId = css`
  font-size: 13px;
`;

export const ticketBottom = css`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  font-size: 14px;
  color: #555;
`;

export const usedButtonStyle = css`
  color: #4caf50;
`;

export const cancelButtonStyle = css`
  color: #f44336;
`;

export const sectionDivider = css`
  border-top: 1px solid #ddd;
  margin: 24px 0;
`;

export const emptyTicketMessageStyle = css`
  text-align: center;
  margin-top: 2rem;
  font-size: 1.2rem;
  color: #666;
`;
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";


export const memberCouponContainer = css`
  margin-left: 10px;
` 

// 전체 컨테이너
export const memberCouponContainerBox = css`
  display: flex;
  flex-direction: row;
  justify-content:center;
  width: 100%;
  height: 100%;
  font-family: 'Pretendard', sans-serif;
`;

// 왼쪽 사이드바
export const sideBar = css`
  width: 250px;
  background-color: #f5f5f5;
  padding: 20px;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const profileImage = css`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #ccc;
  margin-bottom: 10px;
`;

export const profileName = css`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const menuList = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const menuItem = css`
  padding: 10px;
  text-align: center;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #ddd;
  cursor: pointer;
  font-size: 15px;

  &:hover {
    background-color: #eee;
  }
`;

// 본문 영역
export const contentArea = css`
  flex: 1;
  padding: 30px 40px;
`;

export const tabHeader = css`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-bottom: 30px;

  button {
    background: none;
    border: none;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    padding-bottom: 8px;

    &:hover {
      border-bottom: 2px solid #000;
    }
  }
`;

// 쿠폰 리스트 필터 탭
export const memberCouponFilterTab = css`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  margin-bottom: 20px;

  button {
    background-color: #fff;
    border: 1px solid #aaa;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background-color: #eee;
    }
  }
`;

// 쿠폰 카드 전체 리스트 박스
export const memberCouponListBox = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 30%;
`;

// 쿠폰 개별 카드
export const memberCouponBox = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  background-color:  #F1FAFF;;
`;

// 좌측 쿠폰 번호 + 버튼
export const memberCouponSectionLeft = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
 

  button {
    padding: 6px 12px;
    font-size: 14px;
    border-radius: 6px;
    border: none;
    background-color: #666;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #444;
    }
  }
`;

// 중앙 쿠폰 정보
export const memberCouponSectionMiddle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  background-color: #F1FAFF;
`;

// 우측 이미지 + 트레이너 이름
export const memberCouponSectionRight = css`
  display: flex;
  flex-direction: column;
  align-items: center;


  img {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    background-color: #ccc;
  }

  h4 {
    margin-top: 5px;
    font-size: 14px;
  }
`;



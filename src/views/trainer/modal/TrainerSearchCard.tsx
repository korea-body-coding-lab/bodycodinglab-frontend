/** @jsxImportSource @emotion/react */
import React from "react";
import * as S from "./TrainerProfileCardStyle";
import { TrainerListResponseDto } from "@/dtos/trainer/response/trainer-list.response.dto";

interface TrainerSearchCardProps {
  trainer: TrainerListResponseDto;
  onClick?: () => void;
}

const TrainerSearchCard: React.FC<TrainerSearchCardProps> = ({ trainer, onClick }) => {
  const profileImageUrl = trainer.profileImage
    ? `http://localhost:8080${trainer.profileImage}`
    : "/default-profile.png";

  return (
    <div
      css={S.cardWrapper}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyPress={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          onClick();
        }
      }}
    >
      <img
        src={profileImageUrl}
        alt="프로필 이미지"
        css={S.profileImage}
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/default-profile.png";
        }}
      />
      <div css={S.infoBox}>
        <h3 css={S.name}>{trainer.name ?? "이름 없음"}</h3>
        <p css={S.address}>근무지: {trainer.jobAddress ?? "미입력"}</p>
        <p css={S.shortIntroduce}>{trainer.shortIntroduce ?? ""}</p>
      </div>
    </div>
  );
};

export default TrainerSearchCard;

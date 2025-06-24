/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTrainerById } from "@/apis/trainer/trainer-search.api";
import * as S from "./TrainerProfileCardStyle";
import { TrainerListResponseDto } from "@/dtos/trainer/response/trainer-list.response.dto";
import { useUserStore } from "@/stores/user.store";

const TrainerProfileCard: React.FC = () => {
  const { trainerId } = useParams();
  const [trainer, setTrainer] = useState<TrainerListResponseDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        if (!trainerId) return;

        const response = await getTrainerById(Number(trainerId));
        if (response.code === "SU" && response.data) {
          setTrainer(response.data);
        }
      } catch (error) {
        console.error("트레이너 정보 조회 실패", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainer();
  }, [trainerId]);

  if (loading) return <p>불러오는 중...</p>;
  if (!trainer) return <p>트레이너 정보를 불러올 수 없습니다.</p>;

  const profileImageUrl = trainer.profileImage
    ? `http://localhost:8080${trainer.profileImage}`
    : "/default-profile.png";

  return (
    <div css={S.cardWrapper}>
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
        <p css={S.shortIntroduce}>{trainer.shortIntroduce}</p>
      </div>
    </div>
  );
};

export default TrainerProfileCard;

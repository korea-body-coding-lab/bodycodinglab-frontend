/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTrainerById } from "@/apis/trainer/trainer-search.api";
import * as S from "./TrainerProfileCardStyle";
import { TrainerListResponseDto } from "@/dtos/trainer/response/trainer-list.response.dto";

const TrainerProfileCard: React.FC = () => {
  const { trainerId } = useParams();
  const [trainer, setTrainer] = useState<TrainerListResponseDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <div css={S.cardWrapper}>
      {/* <img
        src={trainer.profileImageUrl || "/default-profile.png"}
        alt="프로필 이미지"
        css={S.profileImage}
      /> */}
      <div css={S.infoBox}>
        <h3 css={S.name}>{trainer.name ?? "이름 없음"}</h3>
        <p css={S.address}>근무지: {trainer.jobAddress ?? "미입력"}</p>
        <p css={S.shortIntroduce}>{trainer.shortIntroduce}</p>
      </div>
    </div>
  );
};

export default TrainerProfileCard;

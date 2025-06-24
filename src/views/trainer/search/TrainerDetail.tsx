/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TrainerDetailResponseDto } from "@/dtos/trainer/response/trainer-detail.response.dto";
import {
  layoutWrapper,
  card,
  section,
  sectionTitle,
  row,
  label,
  text,
  flexContainer,
  mainContent,
  sidebar
} from "./TrainerDetailStyle";
import { getTrainerById } from "@/apis/trainer/trainer-search.api";
import Header from "../../header/Header";
import TrainerProfileCard from "../modal/TrainerProfileCard";
import styled from "@emotion/styled";

const StickyTrainerProfileCard = styled(TrainerProfileCard)`
  position: sticky;
  top: 100px;
  align-self: flex-start;
  width: 300px;
`;

const TrainerDetail = () => {
  const { trainerId } = useParams();
  const [trainer, setTrainer] = useState<TrainerDetailResponseDto | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!trainerId) return;
      const response = await getTrainerById(Number(trainerId));
      if (response.code === "SU" && response.data) {
        setTrainer(response.data);
      }
    };
    fetchData();
  }, [trainerId]);

  if (!trainer) return <div>로딩 중...</div>;

  return (
    <div css={layoutWrapper}>
      <Header />
      <div css={card}>
        <h2 css={sectionTitle}>{trainer.name} 트레이너 프로필</h2>

        <div css={flexContainer}>
          <div css={mainContent}>
            <section css={section}>
              <div css={row}>
                <span css={label}>📍 근무지</span>
                <span css={text}>{trainer.jobAddress}</span>
              </div>
              <div css={row}>
                <span css={label}>📝 한줄 소개</span>
                <span css={text}>{trainer.shortIntroduce}</span>
              </div>
              <div css={row}>
                <span css={label}>🗣️ 상세 소개</span>
                <span css={text}>{trainer.longIntroduce}</span>
              </div>
              <div css={row}>
                <span css={label}>🎓 학력</span>
                <span css={text}>
                  {trainer.educationName} ({trainer.educationEntrance} ~ {trainer.educationGraduate})
                </span>
              </div>
            </section>

            <section css={section}>
              <h3 css={sectionTitle}>🏅 자격증</h3>
              {trainer.licenses.length ? (
                trainer.licenses.map((lic, index) => (
                  <div key={lic.id ?? `license-${index}`} css={row}>
                    <span css={text}>
                      {lic.licenseName} - {lic.licenseType}
                    </span>
                  </div>
                ))
              ) : (
                <span css={text}>등록된 자격증이 없습니다.</span>
              )}
            </section>

            <section css={section}>
              <h3 css={sectionTitle}>💼 경력</h3>
              {trainer.careers.length ? (
                trainer.careers.map((c, index) => (
                  <div key={c.id ?? `career-${index}`} css={row}>
                    <span css={text}>
                      {c.companyName} ({c.companyJoin} ~ {c.companyQuit || "재직 중"})
                    </span>
                  </div>
                ))
              ) : (
                <span css={text}>등록된 경력이 없습니다.</span>
              )}
            </section>
          </div>

          <div css={sidebar}>
            <StickyTrainerProfileCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetail;

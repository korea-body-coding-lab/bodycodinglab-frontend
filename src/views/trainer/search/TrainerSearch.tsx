/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllTrainers,
  searchTrainerByName,
  searchTrainerByAddress,
} from "@/apis/trainer/trainer-search.api";
import { TrainerListResponseDto } from "@/dtos/trainer/response/trainer-list.response.dto";
import TrainerSearchCard from "@/views/trainer/modal/TrainerSearchCard";

import {
  container,
  searchBar,
  searchInput,
  searchButton,
  trainerList,
  trainerCard,
} from "./TrainerSearchStyle";

const TrainerSearch = () => {
  const [trainers, setTrainers] = useState<TrainerListResponseDto[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState<"name" | "jobAddress">("name");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllTrainers();
  }, []);

  const fetchAllTrainers = async () => {
    const res = await getAllTrainers();
    if (res.code === "SU" && res.data) {
      setTrainers(res.data);
    }
  };

  const handleSearch = async () => {
    if (!searchText.trim()) {
      fetchAllTrainers();
      return;
    }

    const res =
      searchType === "name"
        ? await searchTrainerByName(searchText)
        : await searchTrainerByAddress(searchText);

    if (res.code === "SU" && res.data) {
      setTrainers(res.data);
    }
  };

  const handleCardClick = (trainerId: number) => {
    navigate(`/trainers/${trainerId}`);
  };

  return (
    <div css={container}>

      <div css={searchBar}>
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as "name" | "jobAddress")}
          css={searchInput}
          aria-label="검색 타입 선택"
        >
          <option value="name">이름</option>
          <option value="jobAddress">근무지</option>
        </select>
        <input
          type="text"
          placeholder={searchType === "name" ? "이름 검색" : "근무지 검색"}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          css={searchInput}
          aria-label="검색어 입력"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch} css={searchButton} aria-label="검색">
          검색
        </button>
      </div>

      <div css={trainerList}>
        {trainers.length > 0 ? (
          trainers.map((trainer) => (
            <div key={trainer.trainerId} css={trainerCard}>
              <TrainerSearchCard
                trainer={trainer}
                onClick={() => handleCardClick(trainer.trainerId)}
              />
            </div>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default TrainerSearch;

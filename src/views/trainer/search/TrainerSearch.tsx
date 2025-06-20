/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { getAllTrainers, searchTrainerByName, searchTrainerByAddress } from "@/apis/trainer/trainer-search.api";
import { TrainerListResponseDto } from "@/dtos/trainer/response/trainer-list.response.dto";
import { useCookies } from "react-cookie";

import {
  container,
  searchBar,
  searchInput,
  searchButton,
  trainerList,
  trainerCard,
  trainerName,
  trainerInfo,
} from "./TrainerSearchStyle";

const TrainerSearch = () => {
  const [trainers, setTrainers] = useState<TrainerListResponseDto[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState<"name" | "jobAddress">("name");

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
    let res;
    if (searchType === "name") {
      res = await searchTrainerByName(searchText);
    } else {
      res = await searchTrainerByAddress(searchText);
    }

    if (res.code === "SU" && res.data) {
      setTrainers(res.data);
    }
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
              <h3 css={trainerName}>{trainer.name}</h3>
              <div css={trainerInfo}>
                <p>근무지: {trainer.jobAddress}</p>
                <p>한줄소개: {trainer.shortIntroduce}</p>
              </div>
            </div>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
        </div>
    )}
export default TrainerSearch;

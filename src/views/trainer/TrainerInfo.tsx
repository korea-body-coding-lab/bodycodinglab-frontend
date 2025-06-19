/** @jsxImportSource @emotion/react */
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { TrainerInfoRequestDto } from "@/dtos/trainer/request/trainer-info.request.dto";
import { useCookies } from "react-cookie";
import { getTrainerInfo, updateInfo } from "@/apis/trainer/trainer-info.api";
import { button, container, fileInput, fileItem, fileLabel, fileList, formWrapper, input, messageText, pageWrapper, recentInfoBox, removeFileButton, textarea, title } from "./TrainerInfoStyle";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/user.store";
import { getMenuTitleByPath } from "@/utils/menu.util";
import MyPageSidebar from "../sidebar/MyPageSidebar";
import Header from "../header/Header";
import TrainerLicense from "./TrainerLicense";
import Modal from "./modal/TraienrLicenseModal";
import TrainerCareer from "./TrainerCareer";
import { getRecentLicense } from "@/apis/trainer/trainer-license.api";
import { TrainerLicenseResponseDto } from "@/dtos/trainer/response/trainer-license.response.dto";
import { getRecentCareer } from "@/apis/trainer/trainer-career.api";
import { TrainerCareerResponseDto } from "@/dtos/trainer/response/trainer-career.response.dto";

const TrainerInfo = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const path = location.pathname;
  const menuTitle = getMenuTitleByPath(path);

  const [cookies, setCookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken || '';
  const [formData, setFormData] = useState<TrainerInfoRequestDto>({
    jobAddress: "",
    shortIntroduce: "",
    longIntroduce: "",
    educationName: "",
    educationEntrance: "",
    educationGraduate: "",
  });

  const [files, setFiles] = useState<File[] | undefined>(undefined);
  const [message, setMessage] = useState<string>("");

  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [isCareerModalOpen, setIsCareerModalOpen] = useState(false);
  const [recentLicense, setRecentLicense] = useState<TrainerLicenseResponseDto | null>(null);
  const [recentCareer, setRecentCareer] = useState<TrainerCareerResponseDto | null>(null);

  useEffect(() => {
    if (!user?.userId) return;

    const fetchData = async () => {
      const response = await getTrainerInfo(user.userId, accessToken);
      if (response.code && response.data) {
        setFormData({
          ...response.data,
          files: undefined,
        });
      }
    };

    fetchData();
  }, [user?.userId]);


    const fetchRecentLicense = async () => {
      try {
        const response = await getRecentLicense(accessToken);
        if (response.code === "SU" && response.data) {
          setRecentLicense(response.data);
        } else {
          setRecentLicense(null);
        }
      } catch (error) {
        console.error("최근 자격증 조회 실패", error);
        setRecentLicense(null);
      }
    };

  useEffect(() => {
    if (!user?.userId) return;
    fetchRecentLicense();
  }, [user?.userId, accessToken]);

  const fetchRecentCareer = async () => {
    try {
      const response = await getRecentCareer(accessToken);
      if (response.code === "SU" && response.data) {
        setRecentCareer(response.data);
      } else {
        setRecentCareer(null);
      }
    } catch (error) {
      console.error("최근 경력 조회 실패", error);
      setRecentCareer(null);
    }
  };

  useEffect(() => {
  if (!user?.userId) return;
  fetchRecentCareer();
}, [user?.userId, accessToken]);
  
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);

    setFiles((prev) => [...(prev ?? []), ...newFiles]);
  };

  const handleFileRemove = (indexToRemove: number) => {
  setFiles((prev) => (prev ?? []).filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const dto: TrainerInfoRequestDto = {
      ...formData,
      files: files,
  };

  const formDataToSend = new FormData();
  Object.entries(dto).forEach(([key, value]) => {
    if (key !== "files") {
      formDataToSend.append(key, value);
    }
  });

  if (files && files.length > 0) {
    files.forEach((file) => {
      formDataToSend.append("files", file);
    });
  }

    const response = await updateInfo(dto, accessToken);
    if (response.code) {
      setMessage("트레이너 정보가 성공적으로 업데이트되었습니다.");
      // window.location.reload();
    } else {
      setMessage(`실패: ${response.message}`);
    }
  };

  const openLicenseModal = () => setIsLicenseModalOpen(true);
  const closeLicenseModal = () => setIsLicenseModalOpen(false);
  const openCareerModal = () => setIsCareerModalOpen(true);
  const closeCareerModal = () => setIsCareerModalOpen(false);

  const handleLicenseSave = async () => {
    try {
      setIsLicenseModalOpen(false);
      navigate("/users/trainers/me/information");
      await fetchRecentLicense();
    } catch (error) {
      console.error("저장 실패", error);
    }
  };

  const handleCareerSave = async () => {
    try {
      setIsCareerModalOpen(false);
      navigate("/users/trainers/me/information");
      await fetchRecentCareer();
    } catch (error) {
      console.error("저장 실패", error);
    }
  };

  return (
  <div css={pageWrapper}>
    <Header /> 
    <div css={container}>
      <MyPageSidebar />
      <form onSubmit={handleSubmit} css={formWrapper}>
        <h2 css={title}>{menuTitle || "트레이너 정보 입력"}</h2>

        <input
          type="text"
          name="jobAddress"
          placeholder="근무지"
          value={formData.jobAddress}
          onChange={handleChange}
          required
          css={input}
        />
        <textarea
          name="shortIntroduce"
          placeholder="한줄 소개"
          value={formData.shortIntroduce}
          onChange={handleChange}
          required
          css={textarea}
        />
        <textarea
          name="longIntroduce"
          placeholder="상세 소개"
          value={formData.longIntroduce}
          onChange={handleChange}
          required
          css={textarea}
        />
        <input
          type="text"
          name="educationName"
          placeholder="학교 이름"
          value={formData.educationName}
          onChange={handleChange}
          required
          css={input}
        />
        <input
          type="month"
          name="educationEntrance"
          value={formData.educationEntrance}
          onChange={handleChange}
          required
          css={input}
        />
        <input
          type="month"
          name="educationGraduate"
          value={formData.educationGraduate}
          onChange={handleChange}
          required
          css={input}
        />
        <label css={fileLabel} htmlFor="file-upload">
          {files && files.length > 0 ? `${files.length}개 파일 선택됨` : "파일 선택"}
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          accept="image/*,application/pdf"
          multiple
          css={fileInput}
        />

        <ul css={fileList}>
          {(files ?? []).map((file, index) => (
            <li key={index} css={fileItem}>
              <span>{file.name}</span>
              <button
                type="button"
                onClick={() => handleFileRemove(index)}
                css={removeFileButton}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>

          <button type="button" onClick={openLicenseModal} css={button}>
            자격증 등록
          </button>
          {recentLicense && (
          <div css={recentInfoBox}>
          <strong>최근 등록 자격증:</strong> {recentLicense.licenseName} ({recentLicense.licenseType})
          </div>
          )} 
          
          <button type="button" onClick={openCareerModal} css={button}>
            경력 등록
          </button>
          {recentLicense && (
          <div css={recentInfoBox}>
          <strong>최근 경력:</strong> {recentCareer?.companyName} ({recentCareer?.companyJoin} ~ {recentCareer?.companyQuit})
          </div>
          )} 

        <button type="submit" css={button}>저장</button>
        {message && <p css={messageText}>{message}</p>}
      </form>

      {isLicenseModalOpen && (
        <Modal onClose={closeLicenseModal} onSave={handleLicenseSave}>
          <TrainerLicense onClose={closeLicenseModal} />
        </Modal>
      )}
      {isCareerModalOpen && (
        <Modal onClose={closeCareerModal} onSave={handleCareerSave}>
          <TrainerCareer onClose={closeCareerModal} />
        </Modal>
      )}
    </div>
  </div>
);
};

export default TrainerInfo
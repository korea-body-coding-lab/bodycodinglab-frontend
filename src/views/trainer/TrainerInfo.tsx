/** @jsxImportSource @emotion/react */
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { TrainerInfoRequestDto } from "@/dtos/trainer/request/trainer-info.request.dto";
import { useCookies } from "react-cookie";
import { getTrainerInfo, updateInfo } from "@/apis/trainer/trainer-info.api";
import {
  button,
  container,
  fileInput,
  fileItem,
  fileLabel,
  fileList,
  formWrapper,
  input,
  messageText,
  pageWrapper,
  recentInfoBox,
  removeFileButton,
  textarea,
  title
} from "./TrainerInfoStyle";
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
import { uploadTrainerInfoImages } from "@/apis/trainer/update-info-images.api";
import { FileResponseDto } from "@/apis/file.response.dto";

const TrainerInfo = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const path = location.pathname;
  const menuTitle = getMenuTitleByPath(path);

  const [cookies] = useCookies(["accessToken"]);
  const accessToken = cookies.accessToken || "";
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
  const [uploadedFiles, setUploadedFiles] = useState<FileResponseDto[]>([]);

  useEffect(() => {
    if (!user?.userId) return;

    const fetchData = async () => {
      const response = await getTrainerInfo(user.userId, accessToken);
      if (response.code && response.data) {
        setFormData({
          ...response.data,
          files: undefined,
        });

      if (files && files.length > 0) {
        const fileRes = await uploadTrainerInfoImages(files, accessToken);
        if (fileRes.code === "SU") {
          setUploadedFiles(fileRes.data || []);
        }
      }

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    const infoResponse = await updateInfo(formData, accessToken);
    if (infoResponse.code !== "SU") {
      setMessage(`트레이너 정보 업데이트 실패: ${infoResponse.message}`);
      return;
    }

    if (files && files.length > 0 && user?.userId) {
      const imageUploadResponse = await uploadTrainerInfoImages(files, accessToken);
      if (imageUploadResponse.code !== "SU") {
        setMessage(`파일 업로드 실패: ${imageUploadResponse.message}`);
        return;
      }
    }

    setMessage("트레이너 정보 및 이미지 업로드가 완료되었습니다.");
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

          {/* {uploadedFiles.length > 0 && (
  <div css={recentInfoBox}>
    <strong>등록된 첨부파일 목록</strong>
    <ul css={fileList}>
      {uploadedFiles.map((file) => (
        <li key={file.id} css={fileItem}>
          <a href={file.url} target="_blank" rel="noreferrer">
            {file.originalName}
          </a>
        </li>
      ))}
    </ul>
  </div>
)} */}

          <button type="button" onClick={() => setIsLicenseModalOpen(true)} css={button}>
            자격증 등록
          </button>
          {recentLicense && (
            <div css={recentInfoBox}>
              <strong>최근 등록 자격증:</strong> {recentLicense.licenseName} ({recentLicense.licenseType})
            </div>
          )}

          <button type="button" onClick={() => setIsCareerModalOpen(true)} css={button}>
            경력 등록
          </button>
          {recentCareer && (
            <div css={recentInfoBox}>
              <strong>최근 경력:</strong> {recentCareer.companyName} ({recentCareer.companyJoin} ~ {recentCareer.companyQuit || "재직 중"})
            </div>
          )}

          <button type="submit" css={button}>저장</button>
          {message && <p css={messageText}>{message}</p>}
        </form>

        {isLicenseModalOpen && (
          <Modal onClose={() => setIsLicenseModalOpen(false)} onSave={fetchRecentLicense}>
            <TrainerLicense onClose={() => setIsLicenseModalOpen(false)} />
          </Modal>
        )}

        {isCareerModalOpen && (
          <Modal onClose={() => setIsCareerModalOpen(false)} onSave={fetchRecentCareer}>
            <TrainerCareer onClose={() => setIsCareerModalOpen(false)} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default TrainerInfo;
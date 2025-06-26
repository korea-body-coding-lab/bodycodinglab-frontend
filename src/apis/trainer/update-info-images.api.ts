import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { AxiosError } from "axios";
import { FileResponseDto } from "../file.response.dto";

export const uploadTrainerInfoImages = async (
  files: File[],
  trainerId: number,
  accessToken: string
): Promise<ResponseDto<FileResponseDto[]>> => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  try {
    const response = await axiosInstance.post(
      `/api/v1/files/multi?targetId=${trainerId}&targetType=INFOS`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );console.log("🔥 업로드 결과:", response); 
    return responseSuccessHandler(response);
  } catch (e) {
    console.error("❌ 파일 업로드 실패!", e);
    return responseErrorHandler(e as AxiosError<ResponseDto>);
  }
};
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { UPDATE_INFO_IMAGES } from "../constants";
import { AxiosError } from "axios";

export const uploadTrainerInfoImages = async (
  files: File[],
  accessToken: string
): Promise<ResponseDto<void>> => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  try {
    const response = await axiosInstance.post(
       `/api/v1/files/multi/INFOS`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return responseSuccessHandler(response);
  } catch (e) {
    return responseErrorHandler(e as AxiosError<ResponseDto>);
  }
};
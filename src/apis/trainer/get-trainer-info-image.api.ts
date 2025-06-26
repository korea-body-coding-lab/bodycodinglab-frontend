import ResponseDto from "@/dtos/response.dto";
import { FileResponseDto } from "../file.response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { AxiosError } from "axios";
import { MULTI_FILE_URL } from "../constants";

export const getTrainerInfoImages = async (
  trainerId: number,
  accessToken: string
): Promise<ResponseDto<FileResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(
      `${MULTI_FILE_URL}?targetId=${trainerId}&targetType=INFOS`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

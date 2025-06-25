import ResponseDto from "@/dtos/response.dto";
import { FileResponseDto } from "../file.response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { AxiosError } from "axios";

export const getTrainerInfoImages = async (
  trainerId: number,
  accessToken: string
): Promise<ResponseDto<FileResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/files/multi?targetId=${trainerId}&targetType=INFOS`,
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

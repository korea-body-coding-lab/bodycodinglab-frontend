import ResponseDto from "@/dtos/response.dto";
import { TrainerCareerResponseDto } from "@/dtos/trainer/response/trainer-career.response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { SEARCH_TRAINER_CAREER, SEARCH_TRAINER_LICENSE } from "../constants";
import { AxiosError } from "axios";
import { TrainerLicenseResponseDto } from "@/dtos/trainer/response/trainer-license.response.dto";

export const searchCareerList = async (accessToken: string): Promise<ResponseDto<TrainerCareerResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(SEARCH_TRAINER_CAREER, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const searchLicenseList = async (accessToken: string): Promise<ResponseDto<TrainerLicenseResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(SEARCH_TRAINER_LICENSE, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { GET_TRAINER_DETAIL_URL } from "../constants";
import { AxiosError } from "axios";
import { GetTrainerDetailResponseDto } from "@/dtos/admin/response/get-trainer-detail-response.dto";

export const getTrainerDetailRequest = async (trainerId: number, accessToken: string): Promise<ResponseDto<GetTrainerDetailResponseDto>> => {
  try {
    const response = await axiosInstance.get(GET_TRAINER_DETAIL_URL(trainerId), bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
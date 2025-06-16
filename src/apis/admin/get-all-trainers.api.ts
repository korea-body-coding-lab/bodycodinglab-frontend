import { GetAllTrainersResponseDto } from "@/dtos/admin/response/get-all-trainers.response.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { GET_ALL_TRAINERS_URL, GET_TRAINER_DETAIL_URL } from "../constants";
import { AxiosError } from "axios";
import { GetTrainerDetailResponseDto } from "@/dtos/admin/response/get-trainer-detail-response.dto";

export const getAllTrainersRequest = async (accessToken: string): Promise<ResponseDto<GetAllTrainersResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(GET_ALL_TRAINERS_URL, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { GET_TRAINER_MY_INFO_URL } from "../constants";
import { AxiosError } from "axios";
import { GetTrainerInfoResponseDto } from "@/dtos/user/response/get-trainer-info.response.dto";

export const GetTrainerInformationRequest = async (accessToken: string): Promise<ResponseDto<GetTrainerInfoResponseDto>> => {
  try {
    const response = await axiosInstance.get(GET_TRAINER_MY_INFO_URL, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (e) {
    return responseErrorHandler(e as AxiosError<ResponseDto>);
  }
};
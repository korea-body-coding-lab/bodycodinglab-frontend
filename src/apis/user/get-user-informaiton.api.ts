import ResponseDto from "@/dtos/response.dto";
import { GetUserInfoResponseDto } from "@/dtos/user/response/get-user-info.response.dto";

import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { GET_USER_INFO_URL } from "../constants";
import { AxiosError } from "axios";

export const GetUserInformationRequest = async (accessToken: string): Promise<ResponseDto<GetUserInfoResponseDto>> => {
  try {
    const response = await axiosInstance.get(GET_USER_INFO_URL, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (e) {
    return responseErrorHandler(e as AxiosError<ResponseDto>);
  }
}
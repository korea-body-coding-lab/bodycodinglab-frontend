import { FindUsernameResponseDto } from "@/dtos/auth/response/find-username.response.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { FIND_USERNAME_URL } from "../constants";
import { AxiosError } from "axios";
import { FindUsernameRequestDto } from "@/dtos/auth/request/find-username.request.dto";

export const findUsernameRequest = async (dto: FindUsernameRequestDto): Promise<ResponseDto<FindUsernameResponseDto>> => {
  try {
    const response = await axiosInstance.post(FIND_USERNAME_URL, dto);
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
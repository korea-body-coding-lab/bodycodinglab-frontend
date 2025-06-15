import { LoginRequestDto } from "@/dtos/request/auth/login.request.dto";
import ResponseDto from "@/dtos/response.dto";
import LoginResponseDto from "@/dtos/response/auth/login.response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { LOGIN_URL } from "../constants";
import { AxiosError } from "axios";

export const loginRequest = async (dto: LoginRequestDto): Promise<ResponseDto<LoginResponseDto>> => {
  try {
    const response = await axiosInstance.post(LOGIN_URL, dto);
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
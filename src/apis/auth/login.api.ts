import { LoginRequestDto } from "@/dtos/auth/request/login.request.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { LOGIN_URL } from "../constants";
import { AxiosError } from "axios";
import { LoginResponseDto } from "@/dtos/auth/response/login.response.dto";
import { LoginRejectedTrainerResponseDto } from "@/dtos/auth/response/login-rejected-trainer.response.dto";

export const loginRequest = async (dto: LoginRequestDto): Promise<ResponseDto<LoginResponseDto | LoginRejectedTrainerResponseDto>> => {
  try {
    const response = await axiosInstance.post(LOGIN_URL, dto);
    return responseSuccessHandler(response);
  } catch (e) {
    return responseErrorHandler(e as AxiosError<ResponseDto>);
  }
};
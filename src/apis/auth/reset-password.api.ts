import { ResetPasswordRequestDto } from "@/dtos/auth/request/reset-password.request.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { RESET_PASSWORD_USER_URL } from "../constants";
import { AxiosError } from "axios";

export const resetPasswordRequest = async (token: string, dto: ResetPasswordRequestDto): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.post(RESET_PASSWORD_USER_URL(token), dto);
    return responseSuccessHandler(response);
  } catch (e) {
    return responseErrorHandler(e as AxiosError<ResponseDto>);
  }
};
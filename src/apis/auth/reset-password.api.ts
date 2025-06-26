import { ResetPasswordRequestDto } from "@/dtos/auth/request/reset-password.request.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { PASSWORD_RESET } from "../constants";
import { AxiosError } from "axios";

export const resetPasswordRequest = async (token: string, dto: ResetPasswordRequestDto): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.post(PASSWORD_RESET(token), dto);
    return responseSuccessHandler(response);
  } catch (e) {
    return responseErrorHandler(e as AxiosError<ResponseDto>);
  }
};
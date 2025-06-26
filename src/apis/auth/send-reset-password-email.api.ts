import { SendResetPasswordEmailRequestDto } from "@/dtos/auth/request/send-reset-password-email.request.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { PASSWORD_RESET_EMAIL } from "../constants";
import { AxiosError } from "axios";

export const sendResetPasswordEmailRequest = async (dto: SendResetPasswordEmailRequestDto): Promise<ResponseDto<string>> => {
  try {
    const response = await axiosInstance.post(PASSWORD_RESET_EMAIL, dto);
    return responseSuccessHandler(response);
  } catch (e) {
    return responseErrorHandler(e as AxiosError<ResponseDto>);
  }
};
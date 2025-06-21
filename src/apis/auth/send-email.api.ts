import { SendResetPasswordEmailRequestDto } from "@/dtos/auth/request/send-reset-password-email.request.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { SEND_RESET_PASSWORD_EMAIL_URL } from "../constants";
import { AxiosError } from "axios";

export const sendResetPasswordEmailRequest = async (dto: SendResetPasswordEmailRequestDto): Promise<ResponseDto<string>> => {
  try {
    const response = await axiosInstance.post(SEND_RESET_PASSWORD_EMAIL_URL, dto);
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
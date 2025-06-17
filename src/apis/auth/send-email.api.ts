import { SendEmailRequestDto } from "@/dtos/auth/request/send-email.request.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { SEND_VERIFY_EMAIL_URL } from "../constants";
import { AxiosError } from "axios";

export const sendEmailRequest = async (dto: SendEmailRequestDto): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.post(SEND_VERIFY_EMAIL_URL, dto);
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
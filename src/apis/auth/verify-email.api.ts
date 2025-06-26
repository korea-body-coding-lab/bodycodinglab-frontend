import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig"
import { EMAIL_VERIFY } from "../constants";
import { AxiosError } from "axios";

export const VerifyEmailRequest = async(token: string): Promise<ResponseDto<string>> => {
  try {
    const response = await axiosInstance.get(EMAIL_VERIFY(token));
    return responseSuccessHandler(response);
  } catch (e) {
    return responseErrorHandler(e as AxiosError<ResponseDto>);
  }
}
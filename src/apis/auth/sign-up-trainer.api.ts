import { SignUpTrainerResponseDto } from "@/dtos/auth/response/sign-up-trainer.response.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { SIGNUP_TRAINER } from "../constants";
import { AxiosError } from "axios";

export const signUpTrainerRequest = async (formData: FormData): Promise<ResponseDto<SignUpTrainerResponseDto>> => {
  try {
    const response = await axiosInstance.post(SIGNUP_TRAINER, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    return responseSuccessHandler(response);
  } catch (e) {
    return responseErrorHandler(e as AxiosError<ResponseDto>);
  }
};
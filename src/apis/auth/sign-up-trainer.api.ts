import { SignUpTrainerResponseDto } from "@/dtos/auth/response/sign-up-trainer.response.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { SIGN_UP_TRAINER_URL } from "../constants";
import { AxiosError } from "axios";

export const signUpTrainerRequest = async (formData: FormData): Promise<ResponseDto<SignUpTrainerResponseDto>> => {
  try {
    const response = await axiosInstance.post(SIGN_UP_TRAINER_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
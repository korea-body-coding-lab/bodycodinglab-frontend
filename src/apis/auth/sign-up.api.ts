import ResponseDto from "@/dtos/response.dto";
import { SignUpMemberResponseDto } from "@/dtos/response/auth/sign-up-member.response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { AxiosError } from "axios";
import { SIGN_UP_MEMBER_URL, SIGN_UP_TRAINER_URL } from "../constants";
import { SignUpTrainerResponseDto } from "@/dtos/response/auth/sign-up-trainer.response.dto";

export const signUpMemberRequest = async (formData: FormData): Promise<ResponseDto<SignUpMemberResponseDto>> => {
  try {
    const response = await axiosInstance.post(SIGN_UP_MEMBER_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

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
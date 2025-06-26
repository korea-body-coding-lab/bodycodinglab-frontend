import ResponseDto from "@/dtos/response.dto";
import { SignUpMemberResponseDto } from "@/dtos/auth/response/sign-up-member.response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { AxiosError } from "axios";
import { SIGNUP_MEMBER } from "../constants";

export const signUpMemberRequest = async (formData: FormData): Promise<ResponseDto<SignUpMemberResponseDto>> => {
  try {
    const response = await axiosInstance.post(SIGNUP_MEMBER, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    return responseSuccessHandler(response);
  } catch (e) {
    return responseErrorHandler(e as AxiosError<ResponseDto>);
  }
};

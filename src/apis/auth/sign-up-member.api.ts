import ResponseDto from "@/dtos/response.dto";
import { SignUpMemberResponseDto } from "@/dtos/auth/response/sign-up-member.response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { AxiosError } from "axios";
import { SIGN_UP_MEMBER_URL } from "../constants";

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

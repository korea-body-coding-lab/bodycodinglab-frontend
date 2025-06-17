import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { FIND_RESET_PASSWORD_USER_URL } from "../constants";
import { AxiosError } from "axios";
import { GetUserInformationToResetPasswordRequestDto } from "@/dtos/auth/request/get-user-information-to-reset-password.request.dto";
import { GetUserInformationToResetPasswordResponseDto } from "@/dtos/auth/response/get-user-information-to-reset-password.response.dto";

export const findUserToResetPasswordRequest = async (dto: GetUserInformationToResetPasswordRequestDto): Promise<ResponseDto<GetUserInformationToResetPasswordResponseDto>> => {
  try {
    const response = await axiosInstance.post(FIND_RESET_PASSWORD_USER_URL, dto);
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
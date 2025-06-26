import { RecoverUsernameResponseDto } from "@/dtos/auth/response/recover-username.response.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { USERNAME_RECOVERY } from "../constants";
import { AxiosError } from "axios";
import { RecoverUsernameRequestDto } from "@/dtos/auth/request/recover-username.request.dto";

export const recoverUsernameRequest = async (dto: RecoverUsernameRequestDto): Promise<ResponseDto<RecoverUsernameResponseDto>> => {
  try {
    const response = await axiosInstance.post(USERNAME_RECOVERY, dto);
    return responseSuccessHandler(response);
  } catch (e) {
    return responseErrorHandler(e as AxiosError<ResponseDto>);
  }
};
import ResponseDto from "@/dtos/response.dto";
import { DeleteUserRequestDto } from "@/dtos/user/request/delete-user.request.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { AxiosError } from "axios";
import { DELETE_USER_URL } from "../constants";
import { DeleteUserResponseDto } from "@/dtos/user/response/delete-user.response.dto";

export const DeleteUserRequest = async (dto: DeleteUserRequestDto, accessToken: string): Promise<ResponseDto<DeleteUserResponseDto>> => {
  try {
    const response = await axiosInstance.delete(DELETE_USER_URL, { ...bearerAuthorization(accessToken), data: dto });
    return responseSuccessHandler(response);
  } catch (e) {
    return responseErrorHandler(e as AxiosError<ResponseDto>);
  }
};
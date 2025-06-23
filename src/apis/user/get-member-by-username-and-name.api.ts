import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import {GET_MEMBER_USERNAME_AND_NAME } from "../constants";
import { AxiosError } from "axios";
import { GetMemberUsernameAndNameResponseDto } from "@/dtos/user/response/get-member-username-and-name.response.dto";

export const getMemberByUsernameAndName = async (username: string, name: string): Promise<ResponseDto<GetMemberUsernameAndNameResponseDto>> => {
  try {
    const response = await axiosInstance.get(GET_MEMBER_USERNAME_AND_NAME(username, name));
    return responseSuccessHandler(response);
  } catch (e) {
    return responseErrorHandler(e as AxiosError<ResponseDto>);
  }
};
import ResponseDto from "@/dtos/response.dto";
import { GetMemberInfoResponseDto } from "@/dtos/user/response/get-member-info.response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { GET_MEMBER_MY_INFO_URL } from "../constants";
import { AxiosError } from "axios";

export const GetMemberInformationRequest = async (accessToken: string): Promise<ResponseDto<GetMemberInfoResponseDto>> => {
  try {
    const response = await axiosInstance.get(GET_MEMBER_MY_INFO_URL, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (e) {
    return responseErrorHandler(e as AxiosError<ResponseDto>);
  }
};
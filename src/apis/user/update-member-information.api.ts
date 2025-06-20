import ResponseDto from "@/dtos/response.dto";
import { GetMemberInfoResponseDto } from "@/dtos/user/response/get-member-info.response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { UPDATE_MEMBER_MY_INFO_URL } from "../constants";
import { AxiosError } from "axios";
import { UpdateMemberInfoRequestDto } from "@/dtos/user/request/update-member-info.request.dto";

export const UpdateMemberInformationRequest = async (dto: Partial<UpdateMemberInfoRequestDto>, accessToken: string): Promise<ResponseDto<GetMemberInfoResponseDto>> => {
  try {
    const response = await axiosInstance.put(UPDATE_MEMBER_MY_INFO_URL, dto, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (e) {
    return responseErrorHandler(e as AxiosError<ResponseDto>);
  }
};
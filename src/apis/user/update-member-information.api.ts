import ResponseDto from "@/dtos/response.dto";
import { GetMemberInfoResponseDto } from "@/dtos/user/response/get-member-info.response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { UPDATE_MEMBER_MY_INFO_URL } from "../constants";
import { AxiosError } from "axios";

export const UpdateMemberInformationRequest = async (formData: FormData, accessToken: string): Promise<ResponseDto<GetMemberInfoResponseDto>> => {
  try {
    const response = await axiosInstance.put(UPDATE_MEMBER_MY_INFO_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return responseSuccessHandler(response);
  } catch (e) {
    return responseErrorHandler(e as AxiosError<ResponseDto>);
  }
};
import { matchWatingListRequestDto } from "@/dtos/matchWaitingList/request/put.Or.Delete.matchWatingList.Request.Dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { PUT_MEMBER_MATCH_WAITIMG_LIST_CENCEL_URL } from "../constants";
import { AxiosError } from "axios";

export const memberCancelRequest = async (dto: matchWatingListRequestDto, accessToken: string): Promise<ResponseDto<void>> => {
  try{

    const response = await axiosInstance.put(PUT_MEMBER_MATCH_WAITIMG_LIST_CENCEL_URL, dto, bearerAuthorization(accessToken));

    return responseSuccessHandler(response);

  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }

}
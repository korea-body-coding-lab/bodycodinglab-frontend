import { trainerMatchWaitingListResponseDto } from "@/dtos/matchWaitingList/response/get.Trainer.MatchWaitingList.Response.Dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { GET_MEMBER_MATCH_WAITING_LIST_URL } from "../constants";
import ResponseDto from "@/dtos/response.dto";
import { AxiosError } from "axios";

export const findMemberMatchWaitingListRequest = async (accessToken: string): Promise<ResponseDto<trainerMatchWaitingListResponseDto>> => {
  try{
    const response = await axiosInstance.get(GET_MEMBER_MATCH_WAITING_LIST_URL, bearerAuthorization(accessToken))

    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }


}
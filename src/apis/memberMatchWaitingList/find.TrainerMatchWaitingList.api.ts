import { AxiosError } from "axios";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig"
import { GET_TRAINER_MATCH_WAITING_LIST_URL } from "../constants"
import ResponseDto from "@/dtos/response.dto";
import { memberMatchWaitingListResponseDto } from "@/dtos/matchWaitingList/response/get.Member.MatchWaitingList.response.dto";

export const findTrainerMatchWaitingListRequest = async (accessToken: string): Promise<ResponseDto<memberMatchWaitingListResponseDto>> => {
  try{
    const response = await axiosInstance.get(GET_TRAINER_MATCH_WAITING_LIST_URL, bearerAuthorization(accessToken))

    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }


}
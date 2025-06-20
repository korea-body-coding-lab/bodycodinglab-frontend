import { memberMatchListResponseDto } from "@/dtos/match/response/member.matchList.response.dto"
import ResponseDto from "@/dtos/response.dto"
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig"
import { GET_TRAINER_MATCH_URL } from "../constants"
import { AxiosError } from "axios"

export const findTrainerMatchListRequest = async (accessToken: string): Promise<ResponseDto<memberMatchListResponseDto[]>> => {
  try{
    const response = await axiosInstance.get(GET_TRAINER_MATCH_URL, bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  } catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
  
}
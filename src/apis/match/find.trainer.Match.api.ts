import { memberMatchResponseDto } from "@/dtos/match/response/find.member.match.response.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { GET_TRAINER_MATCH_FIND_MEMBER_URL } from "../constants";
import { AxiosError } from "axios";


export const findTrainerMatchRequest = async (matchId: number ,accessToken: string): Promise<ResponseDto<memberMatchResponseDto>> => {
  try{
    const response = await axiosInstance.get(GET_TRAINER_MATCH_FIND_MEMBER_URL(matchId), bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  } catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
  
}
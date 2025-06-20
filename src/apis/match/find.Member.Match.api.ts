import { trainerMatchResponseDto } from "@/dtos/match/response/trainer.Match.Response.Dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { GET_MEMBER_MATCH_URL } from "../constants";
import ResponseDto from "@/dtos/response.dto";
import { AxiosError } from "axios";

export const findMemberMatchRequest = async (accessToken: string): Promise<ResponseDto<trainerMatchResponseDto>> => {
  try{
    const response = await axiosInstance.get(GET_MEMBER_MATCH_URL, bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
}
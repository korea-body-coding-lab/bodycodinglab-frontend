import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { DELETE_MEBER_MATCH_URL } from "../constants";
import { AxiosError } from "axios";

export const deleteMemberMatchRequest = async (matchId: number,accessToken: string): Promise<ResponseDto<void>> => {
  try{
    const response = await axiosInstance.delete(DELETE_MEBER_MATCH_URL(matchId), bearerAuthorization(accessToken))

    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
}
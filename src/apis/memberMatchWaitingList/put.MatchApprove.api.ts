import { matchWatingListRequestDto } from "@/dtos/matchWaitingList/request/put.Or.Delete.matchWatingList.Request.Dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { PUT_TRAINER_MATCH_WAITING_LIST_APPROVE_URL } from "../constants";
import { AxiosError } from "axios";

export const trainerMatchApproveRequest = async (matchWaitingListId: number , dto: matchWatingListRequestDto, accessToken: string, ): Promise<ResponseDto<void>> => {
  try{
    const response = await axiosInstance.put(PUT_TRAINER_MATCH_WAITING_LIST_APPROVE_URL(matchWaitingListId), dto, bearerAuthorization(accessToken));

    return responseSuccessHandler(response);

  }catch(error){

    return responseErrorHandler(error as AxiosError<ResponseDto>)

  }
  
}
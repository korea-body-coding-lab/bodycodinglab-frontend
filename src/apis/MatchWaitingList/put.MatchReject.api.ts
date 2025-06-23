import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { PUT_TRAINER_MATCH_WAITING_LIST_REJECT_URL } from "../constants";
import { AxiosError } from "axios";
import ResponseDto from "@/dtos/response.dto";
import { trainerRejectRequestDto } from "@/dtos/matchWaitingList/request/put.trainer.reject.matchWaitingList.dto";

export const trainerMatchRejectRequest = async (matchWaitingListId: number, dto: trainerRejectRequestDto, accessToken: string): Promise<ResponseDto<string>> => {
  try{
    const response = await axiosInstance.put(PUT_TRAINER_MATCH_WAITING_LIST_REJECT_URL(matchWaitingListId), dto, bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  } catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
  
} 
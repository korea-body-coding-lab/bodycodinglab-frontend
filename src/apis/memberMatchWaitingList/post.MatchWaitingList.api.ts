import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig"
import { POST_MEMBER_MATCH_WAITING_LIST_URL } from "../constants";
import { AxiosError } from "axios";

export const postMatchWaitingListRequest = async (trainerId: number ,accessToken: string): Promise<ResponseDto<number>> => {
  try{
    const response = await axiosInstance.post(POST_MEMBER_MATCH_WAITING_LIST_URL(trainerId), {}, bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  }catch(error){

    return responseErrorHandler(error as AxiosError<ResponseDto>)
  
  }
  }
  
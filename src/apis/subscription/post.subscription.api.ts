import ResponseDto from "@/dtos/response.dto"
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig"
import { POST_SUBSCRIPTIONS } from "../constants";
import { AxiosError } from "axios";



export const postSubscriptionRequest = async (matchWaitingListId: number, accessToken: string): Promise<ResponseDto<number>> => {
  try{
    const response = await axiosInstance.post(POST_SUBSCRIPTIONS(matchWaitingListId), {}, bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
}
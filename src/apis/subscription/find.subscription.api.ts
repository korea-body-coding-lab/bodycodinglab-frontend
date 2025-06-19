import { AxiosError } from "axios";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig"
import { GET_SUBSCRIPTIONS } from "../constants";
import ResponseDto from "@/dtos/response.dto";
import { subscriptionResponseDto } from "@/dtos/subscription/response/get.Subscription.response.dto";

export const findSubscriptionRequest = async (accessToken: string): Promise<ResponseDto<subscriptionResponseDto>> => {

  try{
    const response = await axiosInstance.get(GET_SUBSCRIPTIONS, bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  } catch(error){
    
    return responseErrorHandler(error as AxiosError<ResponseDto>)

  } 

}
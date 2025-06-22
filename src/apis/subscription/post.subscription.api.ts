import ResponseDto from "@/dtos/response.dto"
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig"
import { POST_SUBSCRIPTIONS } from "../constants";
import { AxiosError } from "axios";
import { confirmPaymentRequestDto } from "@/dtos/payment/reqeust/Confirm.Payment.Request.Dto";



export const postSubscriptionRequest = async (dto: confirmPaymentRequestDto, accessToken: string): Promise<ResponseDto<number>> => {
  try{
    const response = await axiosInstance.post(POST_SUBSCRIPTIONS, dto, bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
}
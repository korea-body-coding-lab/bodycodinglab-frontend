import { postPaymentRequestDto } from "@/dtos/payment/reqeust/post.Payment.Request.Dto";
import { postPaymentResponseDto } from "@/dtos/payment/response/post.Payment.Response.Dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { POST_PAYMENT } from "../constants";
import { AxiosError } from "axios";

export const postPaymentRequeust = async (dto: postPaymentRequestDto, accessToken: string): Promise<ResponseDto<postPaymentResponseDto>> => {
  try{
    const response = await axiosInstance.post(POST_PAYMENT, dto, bearerAuthorization(accessToken))

    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
}
import ResponseDto from "@/dtos/response.dto"
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig"
import { POST_COUPON } from "../constants"
import { AxiosError } from "axios";

export const postCouponRequest = async (memberId: number):Promise<ResponseDto<number>> => {

  try{
    const response = await axiosInstance.post(POST_COUPON, memberId);

    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }

}
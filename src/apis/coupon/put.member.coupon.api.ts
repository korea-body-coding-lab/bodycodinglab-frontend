import ResponseDto from "@/dtos/response.dto"
import { PUT_MEMBER_COUPON_URL } from "../constants"
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig"
import { AxiosError } from "axios"

export const memberPutCouponRequest = async (couponId: number): Promise<ResponseDto<void>> => {
  try{
    const response = await axiosInstance.put(PUT_MEMBER_COUPON_URL(couponId))
    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
}
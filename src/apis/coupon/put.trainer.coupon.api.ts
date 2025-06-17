import { PutCouponRequestDto } from "@/dtos/coupon/request/put.Coupon.Request.Dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { PUT_TRAINER_COUPON_URL } from "../constants";
import ResponseDto from "@/dtos/response.dto";
import { AxiosError } from "axios";

export const trainerPutCouponRequest = async (dto: PutCouponRequestDto, couponId: number, accessToken:string): Promise<ResponseDto<void>> => {
  try{
    const response = await axiosInstance.put(PUT_TRAINER_COUPON_URL(couponId), dto, bearerAuthorization(accessToken))
    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
}
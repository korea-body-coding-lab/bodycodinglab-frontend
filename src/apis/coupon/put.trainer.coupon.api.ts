import { PutCouponRequestDto } from "@/dtos/request/coupon/put.coupon.request.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { PUT_TRAINER_COUPON_URL } from "../constants";
import ResponseDto from "@/dtos/response.dto";
import { AxiosError } from "axios";

export const putCouponRequest = async (dto: PutCouponRequestDto, couponId: number): Promise<ResponseDto<void>> => {
  try{
    const response = await axiosInstance.put(PUT_TRAINER_COUPON_URL(couponId), dto)
    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
}
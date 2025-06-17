import ResponseDto from "@/dtos/response.dto";
import { CouponStatus } from "@/dtos/response/coupon/copon.enum";
import { MemberCouponResponseDto } from "@/dtos/response/coupon/member.coupon.response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { GET_TRAINER_COUPON_URL } from "../constants";
import { AxiosError } from "axios";

export const findTrainerCouponRequest = async (status: CouponStatus): Promise<ResponseDto<MemberCouponResponseDto[]>> =>{
  try{
    const response = await axiosInstance.get(GET_TRAINER_COUPON_URL, {
      params : status
    });

    return responseSuccessHandler(response);
  } catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}
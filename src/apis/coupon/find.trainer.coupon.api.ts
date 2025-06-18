import ResponseDto from "@/dtos/response.dto";
import { MemberCouponResponseDto } from "@/dtos/coupon/response/member.coupon.response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { GET_TRAINER_COUPON_URL } from "../constants";
import { AxiosError } from "axios";

type CouponStatus = "NOT_USED" | "APPLICATION" | "COMPLETE" | "EXPIRED";

export const findTrainerCouponRequest = async (status: CouponStatus, accessToken: string): Promise<ResponseDto<MemberCouponResponseDto[]>> =>{
  try{
    const response = await axiosInstance.get(GET_TRAINER_COUPON_URL(status), bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  } catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}
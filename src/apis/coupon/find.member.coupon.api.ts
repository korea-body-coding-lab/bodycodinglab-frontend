import { TrainerCouponResponseDto } from "@/dtos/coupon/response/trainer.coupon.response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { GET_MEMBER_COUPON_URL} from "../constants";
import { AxiosError } from "axios";
import ResponseDto from "@/dtos/response.dto";

type CouponStatus = "NOT_USED" | "APPLICATION" | "COMPLETE" | "EXPIRED";


export const findMemberCouponRequest = async (status: CouponStatus ): Promise<ResponseDto<TrainerCouponResponseDto[]>> => {
  try{
    const response = await axiosInstance.get(GET_MEMBER_COUPON_URL, {
      params: { status }
    });
    return responseSuccessHandler(response);
  }catch (error){
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}
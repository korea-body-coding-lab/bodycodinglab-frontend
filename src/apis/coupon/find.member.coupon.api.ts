import { TrainerCouponResponseDto } from "@/dtos/coupon/response/trainer.coupon.response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { GET_MEMBER_COUPON_URL} from "../constants";
import { AxiosError } from "axios";
import ResponseDto from "@/dtos/response.dto";

type CouponStatus = "NOT_USED" | "APPLICATION" | "COMPLETE" | "EXPIRED";


export const findMemberCouponRequest = async (status: CouponStatus, accessToken: string ): Promise<ResponseDto<TrainerCouponResponseDto[]>> => {
  try{
    console.log("status")
    const response = await axiosInstance.get(GET_MEMBER_COUPON_URL(status), bearerAuthorization(accessToken)
    );
    console.log(response);
    return responseSuccessHandler(response);
    
  }catch (error){
    console.log("비정상 처리")
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}
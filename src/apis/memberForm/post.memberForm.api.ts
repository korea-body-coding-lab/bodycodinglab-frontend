import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { memberFormRequestDto } from "@/dtos/memberForm/request/post.memberForm.request.dto";
import { POST_FORM } from "../constants";
import { AxiosError } from "axios";



export const postMemberFormRequest = async (dto: memberFormRequestDto ,accessToken: string): Promise<ResponseDto<number>> => {
  try{
    const response = await axiosInstance.post(POST_FORM, dto, bearerAuthorization(accessToken));
  
    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
  
}
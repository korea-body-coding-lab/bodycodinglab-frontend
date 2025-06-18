import { memberFormResponseDto } from "@/dtos/memberForm/response/get.memberForm.response.dto"
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig"
import ResponseDto from "@/dtos/response.dto"
import { GET_FIND_ID_FORM } from "../constants"
import { AxiosError } from "axios"


export const findMemberFormRequest = async (accessToken: string): Promise<ResponseDto<memberFormResponseDto>> => {
  try{
  const response = await axiosInstance.get(GET_FIND_ID_FORM, bearerAuthorization(accessToken));
  return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
  
}
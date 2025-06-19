import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { UPDATE_TRAINER_MY_INFO_URL } from "../constants";
import { AxiosError } from "axios";
import { GetTrainerInfoResponseDto } from "@/dtos/user/response/get-trainer-info.response.dto";

export const UpdateTrainerInformationRequest = async (formData: FormData, accessToken: string): Promise<ResponseDto<GetTrainerInfoResponseDto>> => {
  try {
    const response = await axiosInstance.put(UPDATE_TRAINER_MY_INFO_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return responseSuccessHandler(response);
  } catch (e) {
    return responseErrorHandler(e as AxiosError<ResponseDto>);
  }
};
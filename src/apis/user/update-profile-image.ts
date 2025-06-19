import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { UPDATE_PROFILE_IMAGE } from "../constants";
import { AxiosError } from "axios";

export const UpdateProfileImageRequest = async (formData: FormData, accessToken: string): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.put(UPDATE_PROFILE_IMAGE, formData, {
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
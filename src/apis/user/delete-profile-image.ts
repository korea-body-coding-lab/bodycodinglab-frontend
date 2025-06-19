import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { UPDATE_PROFILE_IMAGE } from "../constants";
import { AxiosError } from "axios";

export const DeleteProfileImageRequest = async (accessToken: string): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.delete(UPDATE_PROFILE_IMAGE, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (e) {
    return responseErrorHandler(e as AxiosError<ResponseDto>);
  }
};
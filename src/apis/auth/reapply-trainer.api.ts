import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { REAPPLY_TRAINER_URL } from "../constants";
import { AxiosError } from "axios";

export const ReapplyTrainerRequest = async (token: string, formData: FormData): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.put(REAPPLY_TRAINER_URL(token), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return responseSuccessHandler(response);
  } catch (e) {
    return responseErrorHandler(e as AxiosError<ResponseDto>);
  }
};
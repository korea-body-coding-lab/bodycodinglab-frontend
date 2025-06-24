import axios, { AxiosError } from "axios";
import { FileResponseDto } from "../file.response.dto";
import { responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import ResponseDto from "@/dtos/response.dto";

export const getTrainerInfoImages = async (
  trainerId: number,
  targetType: string
): Promise<ResponseDto<FileResponseDto[]>> => {
  try {
    const response = await axios.get(`/file-api/trainer-info/${trainerId}/${targetType}`);
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

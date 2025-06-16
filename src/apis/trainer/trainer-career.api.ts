import { TrainerCareerRequestDto } from "@/dtos/trainer/request/trainer-career.request.dto";
import ResponseDto from "@/dtos/response.dto";
import { TrainerCareerResponseDto } from "@/dtos/trainer/response/trainer-career.response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { DELETE_ALL_TRAINER_CAREER, DELETE_TRAINER_CAREER, POST_TRAINER_CAREER, PUT_TRAINER_CAREER } from "../constants";
import { AxiosError } from "axios";

export const postCareer = async (dto: TrainerCareerRequestDto, accessToken: string): Promise<ResponseDto<TrainerCareerResponseDto>> => {
  try {
    const response = await axiosInstance.post(POST_TRAINER_CAREER, dto, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const updateCareer = async (dto: TrainerCareerRequestDto, accessToken: string): Promise<ResponseDto<TrainerCareerResponseDto>> => {
  try {
    const response = await axiosInstance.put(PUT_TRAINER_CAREER, dto, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const deleteCareer = async (careerId: number, accessToken: string): Promise<ResponseDto<null>> => {
  try {
    const response = await axiosInstance.delete(DELETE_TRAINER_CAREER(careerId), bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const deleteAllCareer = async ( accessToken: string): Promise<ResponseDto<null>> => {
  try {
    const response = await axiosInstance.delete(DELETE_ALL_TRAINER_CAREER, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}
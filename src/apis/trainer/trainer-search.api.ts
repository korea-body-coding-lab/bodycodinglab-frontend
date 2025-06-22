import ResponseDto from "@/dtos/response.dto";
import { TrainerCareerResponseDto } from "@/dtos/trainer/response/trainer-career.response.dto";
import { axiosInstance,  responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { GET_ALL_TRAINER_INFO, GET_TRAINER_BY_ADDRESS, GET_TRAINER_BY_NAME, GET_TRAINER_INFO, SEARCH_TRAINER_CAREER, SEARCH_TRAINER_LICENSE } from "../constants";
import { AxiosError } from "axios";
import { TrainerLicenseResponseDto } from "@/dtos/trainer/response/trainer-license.response.dto";
import { TrainerListResponseDto } from "@/dtos/trainer/response/trainer-list.response.dto";
import { TrainerDetailResponseDto } from "@/dtos/trainer/response/trainer-detail.response.dto";

export const searchCareerList = async (): Promise<ResponseDto<TrainerCareerResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(SEARCH_TRAINER_CAREER);
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const searchLicenseList = async (): Promise<ResponseDto<TrainerLicenseResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(SEARCH_TRAINER_LICENSE);
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getAllTrainers = async (): Promise<ResponseDto<TrainerListResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(GET_ALL_TRAINER_INFO);
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getTrainerById = async (
  trainerId: number
): Promise<ResponseDto<TrainerDetailResponseDto>> => {
  try {
    const response = await axiosInstance.get(GET_TRAINER_INFO(trainerId));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const searchTrainerByName = async (
  name: string
): Promise<ResponseDto<TrainerListResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(GET_TRAINER_BY_NAME, {
      params: { name },
    });
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const searchTrainerByAddress = async (
  jobAddress: string
): Promise<ResponseDto<TrainerListResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(GET_TRAINER_BY_ADDRESS, {
      params: { jobAddress },
    });
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
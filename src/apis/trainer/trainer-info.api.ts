import ResponseDto from "@/dtos/response.dto";
import { TrainerInfoRequestDto } from "@/dtos/trainer/request/trainer-info.request.dto";
import { TrainerInfoResponseDto } from "@/dtos/trainer/response/trainer-info.response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { GET_TRAINER_INFO, PUT_TRAINER_INFO } from "../constants";
import { AxiosError } from "axios";

const convertToFormData = (dto: TrainerInfoRequestDto): FormData => {
  const formData = new FormData();

  if (dto.id !== undefined && dto.id !== null) {
    formData.append("id", dto.id.toString());
  }

  formData.append("jobAddress", dto.jobAddress);
  formData.append("shortIntroduce", dto.shortIntroduce);
  formData.append("longIntroduce", dto.longIntroduce);
  formData.append("educationName", dto.educationName);
  formData.append("educationEntrance", dto.educationEntrance);
  formData.append("educationGraduate", dto.educationGraduate);

  if (dto.files && dto.files.length > 0) {
    Array.from(dto.files).forEach((file) => {
      formData.append("files", file);
    });
  }

  return formData;
};

export const updateInfo = async (
  dto: TrainerInfoRequestDto,
  accessToken: string
): Promise<ResponseDto<TrainerInfoResponseDto>> => {
  try {
    const formData = convertToFormData(dto);
    const response = await axiosInstance.put(PUT_TRAINER_INFO, formData, {
      ...bearerAuthorization(accessToken),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const getTrainerInfo = async (
  trainerId: number,
  accessToken: string
): Promise<ResponseDto<TrainerInfoResponseDto>> => {
  try {
    const response = await axiosInstance.get(GET_TRAINER_INFO(trainerId), {
      ...bearerAuthorization(accessToken),
    });
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
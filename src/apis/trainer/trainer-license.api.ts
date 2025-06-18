import { TrainerLicenseRequestDto } from "@/dtos/trainer/request/trainer-license.request.dto";
import ResponseDto from "@/dtos/response.dto";
import { TrainerLicenseResponseDto } from "@/dtos/trainer/response/trainer-license.response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { DELETE_ALL_TRAINER_LICENSE, DELETE_TRAINER_LICENSE, GET_TRAINER_LICENSE, POST_TRAINER_LICENSE, PUT_TRAINER_LICENSE } from "../constants";
import { AxiosError } from "axios";
import { TrainerLicenseListResponseDto } from "@/dtos/trainer/response/trainer-licnse-list.response.dto";

const convertToFormData = (dto: TrainerLicenseRequestDto): FormData => {
  const formData = new FormData();

  if (dto.id !== undefined && dto.id !== null) {
    formData.append("id", dto.id.toString());
  }

  formData.append("licenseType", dto.licenseType);
  formData.append("licenseName", dto.licenseName);

  if (dto.file) {
    formData.append("file", dto.file);
  }

  return formData;
};

export const postLicense = async (
  dto: TrainerLicenseRequestDto,
  accessToken: string
): Promise<ResponseDto<TrainerLicenseResponseDto>> => {
  try {
    const formData = convertToFormData(dto);
    const response = await axiosInstance.post(POST_TRAINER_LICENSE, formData, {
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

export const updateLicense = async (
  dto: TrainerLicenseRequestDto,
  accessToken: string
): Promise<ResponseDto<TrainerLicenseResponseDto>> => {
  try {
    const formData = convertToFormData(dto);
    const response = await axiosInstance.put(PUT_TRAINER_LICENSE, formData, {
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

export const deleteLicense = async (
  licenseId: number,
  accessToken: string
): Promise<ResponseDto<TrainerLicenseResponseDto>> => {
  try {
    const response = await axiosInstance.delete(DELETE_TRAINER_LICENSE(licenseId), bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};

export const deleteAllLicense = async ( accessToken: string): Promise<ResponseDto<null>> => {
  try {
    const response = await axiosInstance.delete(DELETE_ALL_TRAINER_LICENSE, bearerAuthorization(accessToken));

      if (response.status === 204) {
      return {
        code: 'SU',
        message: '전체 삭제 성공',
        data: null,
      };
    };
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}

export const getLicenseList = async (accessToken: string): Promise<ResponseDto<TrainerLicenseResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(GET_TRAINER_LICENSE, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
};
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { UPDATE_TRAINER_MY_INFO_URL } from "../constants";
import { AxiosError } from "axios";
import { GetTrainerInfoResponseDto } from "@/dtos/user/response/get-trainer-info.response.dto";
import { UpdateTrainerInfoRequestDto } from "@/dtos/user/request/update-trainer-info.request.dto";

export const UpdateTrainerInformationRequest = async (dto: UpdateTrainerInfoRequestDto, accessToken: string): Promise<ResponseDto<GetTrainerInfoResponseDto>> => {
  try {
    const response = await axiosInstance.put(UPDATE_TRAINER_MY_INFO_URL, dto, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (e) {
    return responseErrorHandler(e as AxiosError<ResponseDto>);
  }
};
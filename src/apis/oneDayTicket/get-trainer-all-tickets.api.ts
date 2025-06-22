import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { GET_TRAINER_ALL_TICKETS_URL } from "../constants";
import { AxiosError } from "axios";
import { GetTrainerAllTicketsResponseDto } from "@/dtos/oneDayTicket/response/get-trainer-all-tickets.response.dto";

export const getTrainerAllTicketsRequest = async (accessToken: string): Promise<ResponseDto<GetTrainerAllTicketsResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(GET_TRAINER_ALL_TICKETS_URL, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (e) {
    return responseErrorHandler(e as AxiosError<ResponseDto>);
  }
};
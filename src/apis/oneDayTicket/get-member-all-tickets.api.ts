import { GetMemberAllTicketsResponseDto } from "@/dtos/oneDayTicket/response/get-member-all-tickets.response.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { GET_MEMBER_ALL_TICKETS_URL } from "../constants";
import { AxiosError } from "axios";

export const getMemberAllTicketsRequest = async (accessToken: string): Promise<ResponseDto<GetMemberAllTicketsResponseDto[]>> => {
  try {
    const response = await axiosInstance.get(GET_MEMBER_ALL_TICKETS_URL, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (e) {
    return responseErrorHandler(e as AxiosError<ResponseDto>);
  }
};
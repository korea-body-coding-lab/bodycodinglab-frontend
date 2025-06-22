import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { AxiosError } from "axios";
import { USE_ONE_DAY_TICKET_URL } from "../constants";
import { TicketCancelRequestDto } from "@/dtos/oneDayTicket/request/ticket-cancel.request.dto";

export const cancelOneDayTicket = async (ticketId: number, dto: TicketCancelRequestDto, accessToken: string): Promise<ResponseDto<null>> => {
  try{
    const response = await axiosInstance.post(USE_ONE_DAY_TICKET_URL(ticketId), dto, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch(error) {
      return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
}
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { AxiosError } from "axios";
import { USE_ONE_DAY_TICKET_URL } from "../constants";
import { TicketUseRequestDto } from "@/dtos/oneDayTicket/request/ticket-use.request.dto";

export const useOneDayTicket = async (ticketId: number, dto: TicketUseRequestDto, accessToken: string): Promise<ResponseDto<null>> => {
  try{
    const response = await axiosInstance.post(USE_ONE_DAY_TICKET_URL(ticketId), dto, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch(error) {
      return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
}
import { TicketIssueRequestDto } from "@/dtos/oneDayTicket/request/ticket-issue.request.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { AxiosError } from "axios";
import { ISSUE_TRAINER_ONE_DAY_TICKET_URL } from "../constants";

export const issueOneDayTicket = async (dto: TicketIssueRequestDto, accessToken: string): Promise<ResponseDto<null>> => {
  try{
    const response = await axiosInstance.post(ISSUE_TRAINER_ONE_DAY_TICKET_URL, dto, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch(error) {
      return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
}
import { GetMemberAllTicketsResponseDto } from "./get-member-all-tickets.response.dto";

export interface GetMemberAllTicketsResultDto {
  count: number;
  tickets: GetMemberAllTicketsResponseDto[];
}
import { LoginResponseDto } from "./login.response.dto";

export interface LoginRejectedTrainerResponseDto extends LoginResponseDto {
  trainerStatus: string;
}
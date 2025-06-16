export interface LoginResponseDto {
  id: number;
  role: string;
  username: string;
  name: string;
  token: string;
  exprTime: number;
}
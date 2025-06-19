export interface LoginResponseDto {
  id: number;
  role: string;
  username: string;
  name: string;
  profileImageUrl: string,
  token: string;
  exprTime: number;
}
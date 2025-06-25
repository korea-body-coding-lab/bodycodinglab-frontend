export interface LoginResponseDto {
  token: string;
  exprTime: number;
  id: number;
  role: string;
  username: string;
  name: string;
  profileImageUrl: string,
}
export interface GetUserInfoResponseDto {
  id: number;
  role: string;
  username: string;
  name: string;
  profileImageUrl: string,
  trainerStatus?: string,
}
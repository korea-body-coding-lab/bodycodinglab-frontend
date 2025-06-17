export interface GetAllTrainersResponseDto {
  id: number;
  trainerId: number;
  username: string;
  name: string;
  birthdate: string;
  jobAddress: string;
  createdAt: string;
  status: 'PENDING' | 'APPROVE' | 'REJECT';
}
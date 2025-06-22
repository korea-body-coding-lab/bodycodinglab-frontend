export interface GetMemberAllTicketsResponseDto {
  id: number;
  trainerId: number;
  trainerName: string;
  jobAddress: string;
  issuedAt: string;
  usedAt: string;
  canceledAt: string;
  cancelReason: string;
  status: 'ISSUANCE' | 'USED' | 'CANCEL';
  trainerProfileImageUrl: string;
}
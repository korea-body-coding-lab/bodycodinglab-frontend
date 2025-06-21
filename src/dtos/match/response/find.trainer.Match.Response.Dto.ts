export interface trainerMatchResponseDto{
  matchId: number,
  trainerId: number,
  profileImageUrl: string | null;
  trainerName: string,
  matchedAt: string;
  trainerJobAddress: string;
}
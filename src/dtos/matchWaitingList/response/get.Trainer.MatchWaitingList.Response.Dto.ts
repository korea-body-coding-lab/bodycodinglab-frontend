type ApprovedStatus = "NOT_APPROVED" | "APPROVED" | "REJECT";

export interface trainerMatchWaitingListResponseDto{
  matchWaitingListId: number;
  trainerId: number;
  profileImageUrl: string | null;
  trainerName: string;
  trainerJobAddress: string;
  appliedAt: string;
  approvedStatus : ApprovedStatus;
}
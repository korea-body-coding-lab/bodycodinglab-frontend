type ApprovedStatus = "NOT_APPROVED" | "APPROVED" | "REJECT"



export interface trainerRejectRequestDto{
  approvedStatus: ApprovedStatus;
  rejectResponse: string;
}
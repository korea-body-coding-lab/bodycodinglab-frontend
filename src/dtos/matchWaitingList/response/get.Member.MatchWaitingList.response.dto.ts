type Gender = "MAN" | "WOMAN"; 
type ApprovedStatus = "NOT_APPROVED" | "APPROVED" | "REJECT";
export interface memberMatchWaitingListResponseDto{
  matchWaitingListId: number;
  memberId: number;
  memberName: string;
  memberAge: number;
  memberGender: Gender;
  appliedAt: string;
  approvedStatus: ApprovedStatus;
}
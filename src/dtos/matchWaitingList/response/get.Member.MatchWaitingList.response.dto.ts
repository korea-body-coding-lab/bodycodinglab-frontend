type Gender = "MAN" | "WOMAN"; 

export interface memberMatchWaitingListResponseDto{
  matchWaitingListId: number;
  memberId: number;
  memberName: string;
  memberAge: number;
  memberGender: Gender;
  appliedAt: string;
}
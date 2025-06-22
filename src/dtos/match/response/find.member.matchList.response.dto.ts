type Gender = "MAN" | "WOMAN";

export interface memberMatchListResponseDto{
  matchId: number;
  memberId: number;
  memberName: string;
  memberAge: number;
  memberGender: Gender
}
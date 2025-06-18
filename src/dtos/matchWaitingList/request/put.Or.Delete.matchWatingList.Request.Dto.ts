type ApproveStatus = "NOT_APPROVED" | "APPROVED" | "REJECT";

export interface matchWatingListRequestDto{
  approvedStatus: ApproveStatus
}
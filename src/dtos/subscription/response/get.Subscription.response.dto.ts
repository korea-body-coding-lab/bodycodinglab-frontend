type MemberStatus = "NOT_PAYMENT" | "PAYMENT" | "REJECT";

export interface subscriptionResponseDto {
  memberName: string;
  price: number;
  paymentDate: string;
  status: MemberStatus;
}
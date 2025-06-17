type CouponStatus = "NOT_USED" | "APPLICATION" | "COMPLETE" | "EXPIRED";

export interface MemberCouponResponseDto{
  couponId : number;
  memberName: string;
  expirationPeriod: string;
  usedDate: string | null;
  status: CouponStatus;
}
import { CouponStatus } from "./copon.enum";

export interface MemberCouponResponseDto{
  couponId : number;
  memberName: string;
  expirationPeriod: string;
  usedDate: string | null;
  status: CouponStatus;
}
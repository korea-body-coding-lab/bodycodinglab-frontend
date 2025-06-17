type CouponStatus = "NOT_USED" | "APPLICATION" | "COMPLETE" | "EXPIRED";


export interface TrainerCouponResponseDto{
  couponId : number;
  trainerName: string;
  expirationPeriod: string;
  status: CouponStatus;

}







import { CouponStatus } from "./copon.enum";


export interface TrainerCouponResponseDto{
  couponId : number;
  trainerName: string;
  expirationPeriod: string;
  status: CouponStatus;

}







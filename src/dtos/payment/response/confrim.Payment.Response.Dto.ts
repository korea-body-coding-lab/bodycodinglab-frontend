type PaymentMethod = "KAKAO_PAY"
type PaymentStatus = "READY" | "SUCCESS" | "FAIL";

export interface confrimPaymentResponseDto{
  paymentId: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus
}
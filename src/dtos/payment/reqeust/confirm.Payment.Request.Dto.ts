//  private String paymentKey;
//     private String orderId;
//     private String provider;
//     private Long matchWaitingListId;

export interface confirmPaymentRequestDto{
  orderId: string;
  provider: string;
  matchWaitingListId: number | undefined
}
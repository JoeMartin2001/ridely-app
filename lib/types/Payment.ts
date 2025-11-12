export interface IPayment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  paymentMethod: IPaymentMethod;
  status: IPaymentStatus;
  transactionId?: string;
  paymentDate?: Date;
  refundAmount?: number;
  refundDate?: Date;
}

export enum IPaymentMethod {
  CREDIT_CARD = "credit_card",
  DEBIT_CARD = "debit_card",
  PAYPAL = "paypal",
  APPLE_PAY = "apple_pay",
  GOOGLE_PAY = "google_pay",
}

export enum IPaymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  REFUNDED = "refunded",
}

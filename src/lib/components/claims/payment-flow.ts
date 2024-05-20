
// Payment steps
export enum PaymentStep {
  CONFIRM_SUBMIT = 1,
  CONNECT_WALLET = 2,
  CONFIRM_PAYMENT = 3,
  PAYMENT_SENT = 4,
  PAYMENT_CANCELED = 5,
  PAID_BY_COMMUNITY = 6
}

export const Step: any = {
  0: { title: "...", description: "..."},
  1: { 
    title: "Let's start your submission", 
    // description: "[ 1 ]-[ ]-[ ]-[ ]-[ ]" 
    description: "Step by step process to submit your claim" 
  },
  2: { 
    title: "Connect your wallet", 
    description: "Step by step process to submit your claim" 
  },
  3: { 
    title: "Confirm your payment", 
    description: "Step by step process to submit your claim" 
  },
  4: { 
    title: "Your claim is paid", 
    description: "Step by step process to submit your claim" 
  },
  5: { 
    title: "Your payment failed", 
    description: "Step by step process to submit your claim" 
  },
  6: { 
    title: "Paid by the community", 
    description: "Step by step process to submit your claim" 
  },
}

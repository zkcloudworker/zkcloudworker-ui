
// steps
export enum VoteStep {
  CONFIRM_SUBMIT = 1,
  CONNECT_WALLET = 2,
  CONFIRM_VOTE = 3,
  PAYMENT_SENT = 4,
  PAYMENT_CANCELED = 5
}

export const Step: any = {
  0: { title: "...", description: "..."},
  1: { 
    title: "Let's start your submission", 
    // description: "[ 1 ]-[ ]-[ ]-[ ]-[ ]" 
    description: "Step by step process to submit your votes" 
  },
  2: { 
    title: "Connect your wallet", 
    description: "Step by step process to submit your votes" 
  },
  3: { 
    title: "Confirm your votes", 
    description: "Step by step process to submit your votes" 
  },
  4: { 
    title: "Your votes are casted", 
    description: "Step by step process to submit your claim" 
  },
  5: { 
    title: "Your votes failed", 
    description: "Step by step process to submit your claim" 
  },
}

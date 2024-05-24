import { zkCloudWorkerClient } from "zkcloudworker";
import { SocialcapDeposits } from "@socialcap/payments";
import { getCurrentBlockchain } from "$lib/store";

const MINA = 1e9;
export const TXNFEE = 150_000_000;


export async function createDepositFeeTransaction(
  claimUid: string,
  payer: string,
  amount: number,
  fee: number,
  chainId?: string,
) {
  const JWT = import.meta.env.VITE_ZKCW_JWT; 

  console.log("zkCloudWorkerClient JWT:", JWT);
  const api = new zkCloudWorkerClient({ jwt: JWT });

  const response = await api.execute({
    mode: "async",
    repo: "socialcap-deposits",
    developer: "MAZ", // keep it simple, no strange chars here ! 
    task: "deposit-credential-fee",
    metadata: `Payment for Claim ${claimUid}`,
    args: JSON.stringify({ 
      chainId: chainId || getCurrentBlockchain().chainId
    }),
    transactions: [JSON.stringify({
      memo: `Claim ${claimUid}`.substring(0, 32), // memo field in Txn
      payer: payer,
      fee: fee,
      amount: amount
    })],
  });

  console.log("API response:", response);
  const jobId = response?.jobId;
  if (jobId === undefined) {
    throw new Error("Job ID is undefined");
  }

  console.log("Waiting for job ...");
  const jobResult = await api.waitForJobResult({ jobId });
  const { result } = jobResult.result;
  const serializedTxn = result; 
  return serializedTxn;
}

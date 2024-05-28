import { API } from "./api-client";
import type { Credential, OnchainCredentialData } from "$lib/types/credential";

export {
  getMyCredentials,
  getCommunityCredentials,
  getCredential,
  getCredentialOnchainData
}

/**
 * Get the list of all user credentials
 * @returns Credential[]
 */
async function getMyCredentials(params?: any): Promise<Credential[]> {
  const rs = await API.query("get_my_credentials", params);
  if (rs.error) return []; // TODO handle error
  return rs.data;
}

/**
 * Get the list of all user credentials
 * @returns Credential[]
 */
async function getCommunityCredentials(
  communityUid: string
): Promise<Credential[]> {
  const rs = await API.query("get_community_credentials", {
    communityUid: communityUid
  });
  if (rs.error) return []; // TODO handle error
  return rs.data;
}

/**
 * Get credential details  
 * @returns Credential∫
 */
async function getCredential(
  uid: string
): Promise<Credential> {
  const rs = await API.query("get_credential", {
    uid: uid
  });
  if (rs.error) throw rs.error;
  return rs.data;
}

/**
 * Get on-chain data for credential  
 * @returns OnchainCredentialData object
 *
 * Get the Credential onchain data
 * @returns A OnchainCredentialData object
 */
async function getCredentialOnchainData(params: {
  claimUid: string
}): Promise<OnchainCredentialData> {
  const { claimUid } = params; 
  const rs = await API.query("get_credential_onchain_data", { 
    claimUid: claimUid 
  });
  if (rs.error) throw rs.error; // TODO handle error
  return rs.data;
}

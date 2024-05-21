import { API } from "./api-client";
import type { Credential } from "$lib/types/credential";

export {
  getMyCredentials,
  getCommunityCredentials,
  getCredential,
  getCredentialDataOnChain
}

/**
 * Get the list of all user credentials
 * @returns Credential[]
 */
async function getMyCredentials(params?: {
}): Promise<Credential[]> {
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
 * @returns Credential
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
 * Get credential data on-chain  
 * @returns Credential
 */
async function getCredentialDataOnChain(
  uid: string
): Promise<Credential> {
  // ToDo call api
  const rs = await API.query("get_credential", {
    uid: uid
  });
  if (rs.error) throw rs.error;
  return rs.data;
}

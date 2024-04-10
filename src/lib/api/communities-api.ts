import { API, type APIResponse } from "./api-client";
import type { Community } from "$lib/store/communities";

export { 
  getAllCommunities,
  getMyCommunities
}

/**
 * Get the list of all the Socialcap communities
 * @param columns?: string[] - selected columns to return from query
 * @param notJoined?: boolean - filter by joined/not joined communities 
 * @returns APIResponse - on success array of Community 
 */
async function getAllCommunities(params: {
  columns?: string[], 
  notJoined?: boolean
}): Promise<Community[]> {
  const rs = await API.query("get_all_communities", params);
  if (rs.error) return []; // TODO handle error
  return rs.data;
}

/**
 * Get the list of communities that I have joined
 * @param columns?: string[] - selected columns to return from query
 * @returns APIResponse - on success array of Community 
 */
async function getMyCommunities(params: {
  columns?: string[], 
}): Promise<Community[]> {
  const rs = await API.query("get_my_communities", params);
  if (rs.error) return []; // Todo handle error
  return rs.data;
}

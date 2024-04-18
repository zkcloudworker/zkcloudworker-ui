import { API, type APIResponse } from "./api-client";
import type { Community, User } from "$lib/types";
import { getCurrentUser } from "$lib/store";

export { 
  getAllCommunities,
  getMyCommunities,
  getCommunity
}

async function getCommunity(params: {
  uid: string, 
}): Promise<Community> {
  const rs = await API.query("get_community", params);
  if (rs.error) throw Error(rs.error.message, rs.error.cause); // Todo handle error
  return rs.data;
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
 * @params admined?: boolean - only admined by current user
 * @param columns?: string[] - selected columns to return from query
 * @returns APIResponse - on success array of Community 
 */
async function getMyCommunities(params: {
  admined?: boolean, 
  columns?: string[], 
}): Promise<Community[]> {
  const rs = await API.query("get_my_communities", {});
  if (rs.error) return []; // Todo handle error

  // if not admined return all
  if (!params.admined) return rs.data; 

  // only the ones admined by this user
  if (params.admined) {
    const user = getCurrentUser();
    if (!user) throw Error("Can not filter admined communities No active user !");
    return (rs.data || []).filter((t: Community) => (
      t.adminUid === user!.uid || t.xadmins.includes(user!.uid)
    ));
  }
  return [];
}

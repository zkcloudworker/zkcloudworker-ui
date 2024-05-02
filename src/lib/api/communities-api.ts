import { API, type APIResponse } from "./api-client";
import { type Community, type User } from "$lib/types";
import { getCurrentUser } from "$lib/store";
import type { NewCommunity } from "$lib/types/community";

export {
  getAllCommunities,
  getMyCommunities,
  getCommunity,
  createCommunity,
  checkCommunityNameExist
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


/**
 * Create a new community
 * @param name: string
 * @param description: string
 * @returns Created Commmunity
 */
async function createCommunity(data: NewCommunity): Promise<Community> {
  const rs = await API.mutate("update_community", { ...data, state: "INITIAL", new: true })
  if (rs.error) throw Error(rs.error.message, rs.error.cause);
  return rs.data;

}

async function checkCommunityNameExist(name: string): Promise<boolean> {
  const rs = await API.query("check_community_name_exist", { name });
  if (rs.error) throw Error(rs.error.message, rs.error.cause);
  return rs.data;
}
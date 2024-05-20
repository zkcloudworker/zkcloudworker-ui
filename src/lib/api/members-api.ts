import { API, type APIResponse } from "./api-client";
import { type Community, type User } from "$lib/types";
import { getCurrentUser } from "$lib/store";
import type { NewCommunity } from "$lib/types/community";

export {
  getMembers
}

/**
 * Get the list of all the members of a given community
 * @param communityUid - UID of the required community
 * @param options - additional options
 * @param options.roles - filter by this roles, including admin
 * @param options.states - filter by the user states 
 * @returns A list of Member
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getMembers(communityUid: string, options?: {
  roles?: string[],
  states?: string[]
}): Promise<Community[]> {
  const rs = await API.query("get_members", {
    communityUid: communityUid
  });
  if (rs.error) throw Error(rs.error.message); // Todo handle error
  return rs.data || [];
}


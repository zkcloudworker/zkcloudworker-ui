import { API } from "./api-client";
import type { Community } from "$lib/store/communities";

export { 
  getAllCommunities
}

async function getAllCommunities(params: {
  notJoined?: boolean 
}): Promise<Community[]> {
  const rs = await API.query("get_all_communities", params);
  if (rs.error) return [];
  return rs.data.data as Community[];
}

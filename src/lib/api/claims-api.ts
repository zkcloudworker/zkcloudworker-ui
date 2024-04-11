import { API, type APIResponse } from "./api-client";
import type { Claim } from "$lib/types/claim";

export { 
  getMyClaims
}

/**
 * Get the list of all user claims
 * @returns Claim[]
 */
async function getMyClaims(params: {
}): Promise<Claim[]> {
  const rs = await API.query("get_my_claims", params);
  if (rs.error) return []; // TODO handle error
  return rs.data;
}

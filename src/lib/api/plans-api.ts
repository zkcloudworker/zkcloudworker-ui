import { API } from "./api-client";
import type { Plan } from "$lib/types/plan";

export { 
  getPlan,
  getAdminedPlans,
  getAllClaimables,
}

/**
 * Get the plan details
 * @returns Plan 
 */
async function getPlan(params: { 
  uid: string
}): Promise<Plan> {
  const rs = await API.query("get_plan", params);
  if (rs.error) throw rs.error; // TODO handle error
  return rs.data;
}

/**
 * Get all plans admined by myself
 */
async function getAdminedPlans(): Promise<Plan[]> {
  const rs = await API.query("get_admined_plans", {});
  if (rs.error) throw rs.error; // TODO handle error
  return rs.data;
}

/**
 * Get all MasterPlans I can claim (my "claimables")
 * but allow all ACTIVE Masterplans for all communities,
 * not just the ones I have joined. Preferebly ordered first
 * by the Masterplans coming from communities I have joined, 
 * and then the ones I have not joined.
 */
async function getAllClaimables(params: {
  joined?: boolean;
}): Promise<Plan[]> {
  const rs = await API.query("get_my_claimables", { 
    joined: false
  });
  if (rs.error) throw rs.error; // TODO handle error
  return rs.data;
}

import { API } from "./api-client";
import type { Plan } from "$lib/types/plan";

export { 
  getPlan,
  getAdminedPlans
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

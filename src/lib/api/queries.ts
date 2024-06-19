import axios from "axios";
import { type APIResult, query } from "./base";

export async function getMyWorkers(params: {
  developer: string
}): Promise<APIResult> {
  const rsp = await query('get_workers', params);
  return {
    success: rsp.success,
    data: rsp.success ? rsp.data : null,
    error: !rsp.success ? rsp.error : null,
  }
}

export async function getMyAccount(params: {
  id: string
}): Promise<APIResult> {
  const rsp = await query('get_accounts', params);
  return {
    success: rsp.success,
    data: rsp.success ? rsp.data[0] : null,
    error: !rsp.success ? rsp.error : null,
  }
}

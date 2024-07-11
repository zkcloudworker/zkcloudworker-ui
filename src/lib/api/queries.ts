import axios from "axios";
import { type APIResult, query } from "./base";
import { searchJobs, searchDistinctRepos } from "./searchs";
import { accountBalance } from "zkcloudworker";

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

export async function getUsedWorkers(params: {
  accountId: string,
  developer: string
}): Promise<APIResult> {
  let jobs = await searchDistinctRepos({
    query: '',
    //filters: `id:${params.accountId} AND NOT developer:${params.developer}`,
    filters: `id:${params.accountId}`,
  });  
  console.log(jobs);
  if (!jobs.success) return {
    success: false, data: null, 
    error: `Search for repos used by ${params.accountId} failed`
  };

  if (!jobs.data.repos.length) return {
    success: true, error: null,
    data: [],
  }

  const rsp = await query('get_workers', {
    repos: jobs.data.repos
  });
  return {
    success: rsp.success,
    data: rsp.success ? rsp.data : null,
    error: !rsp.success ? rsp.error : null,
  }
}

export async function getMyAccount(params: {
  id: string,
  chain?: object,
  signed?: string
}): Promise<APIResult> {
  console.log(JSON.stringify(params));
  const rsp = await query('get_accounts', params);
  return {
    success: rsp.success,
    data: rsp.success ? rsp.data[0] : null,
    error: !rsp.success ? rsp.error : null,
  }
}

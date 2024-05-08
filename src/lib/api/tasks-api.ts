import { API } from "./api-client";
import type { Task } from "$lib/types/task";

export {
    getMyTasks,
    submitBatchTasks
}
/**
 * Get the list of all user tasks
 * @returns Claim[]
 */
async function getMyTasks(params: {
}): Promise<Task[]> {
    const rs = await API.query("get_my_tasks", params);
    if (rs.error) throw rs.error;
    return rs.data;
}

/**
 * 
 * @param senderAccountId: string - the account id of the sender
 * @param signedData: string - the signed data
 * @param extras: { addToQueue: boolean } - extra params
 * @returns 
 */
async function submitBatchTasks(params: {
    senderAccountId: string,
    signedData: any,
    extras?: { addToQueue: boolean }
}): Promise<any> {
    const rs = await API.mutate("submit_tasks_batch", params);
    if (rs.error)
        throw rs.error;
    return rs.data;
};
import { API } from "./api-client";
import type { Task } from "$lib/types/task";

export {
    getMyTasks,
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
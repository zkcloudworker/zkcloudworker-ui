
import { createQuery, useQueryClient, createMutation } from '@tanstack/svelte-query'
import { getMyTasks, submitBatchTasks } from '$lib/api/queries';
import type { Task } from '$lib/types/task';
import { ASSIGNED } from '$lib/types/states';

export function useGetMyTasks() {
    return createQuery<Task[], Error>({
        queryKey: ['get_my_tasks'],
        queryFn: () => getMyTasks({}),
    })
}

export function useGetMyAssignedTasks() {
    return createQuery<Task[], Error>({
        queryKey: ['get_my_tasks'],
        queryFn: () => getMyTasks({states: [ASSIGNED]}),
    })
}

export function useSubmitBatchTasks() {
    const client = useQueryClient();
    return createMutation({
        mutationFn: submitBatchTasks,
        // Always refetch after error or success:
        onSettled: () => {
            client.invalidateQueries({ queryKey: ['get_my_tasks'] })
        },
    })
}
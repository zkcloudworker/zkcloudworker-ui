
import { createQuery } from '@tanstack/svelte-query'
import { getMyTasks } from '$lib/api/queries';
import type { Task } from '$lib/types/task';

export function useGetMyTasks() {
    return createQuery<Task[], Error>({
        queryKey: ['get_my_tasks'],
        queryFn: () => getMyTasks({}),
      })
  }
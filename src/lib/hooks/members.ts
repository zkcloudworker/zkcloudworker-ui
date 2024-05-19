import { createQuery, useQueryClient, createMutation } from '@tanstack/svelte-query'
import { getMembers } from '$lib/api/queries';
import type { Member } from '$lib/types/member';


export function useGetMembers(communityUid: string, options?: {
  roles?: string[],
  states?: string[]
}) {
    return createQuery<Member[], Error>({
        queryKey: ['get_members'],
        queryFn: () => getMembers(communityUid, {}),
      })
}


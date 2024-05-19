
import { createQuery } from '@tanstack/svelte-query'
import { getMyCredentials, getCommunityCredentials } from '$lib/api/queries';
import type { Credential } from '$lib/types/credential';

export function useGetMyCredentials() {
    return createQuery<Credential[], Error>({
        queryKey: ['get_my_credentials'],
        queryFn: () => getMyCredentials({}),
      })
}

export function useGetCommunityCredentials(communityUid: string) {
  return createQuery<Credential[], Error>({
      queryKey: ['get_community_credentials'],
      queryFn: () => getCommunityCredentials(communityUid),
    })
}

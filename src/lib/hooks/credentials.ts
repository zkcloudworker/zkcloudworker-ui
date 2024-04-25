
import { createQuery } from '@tanstack/svelte-query'
import { getMyCredentials } from '$lib/api/queries';
import type { Credential } from '$lib/types/credential';

export function useGetMyCredentials() {
    return createQuery<Credential[], Error>({
        queryKey: ['get_my_credentials'],
        queryFn: () => getMyCredentials({}),
      })
}

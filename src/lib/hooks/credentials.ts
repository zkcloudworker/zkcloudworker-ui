
import { createQuery } from '@tanstack/svelte-query'
import { getMyCredentials, getCommunityCredentials } from '$lib/api/queries';
import type { Credential, OnchainCredentialData } from '$lib/types/credential';
import { getCredentialOnchainData } from '$lib/api/credentials-api';

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

export function useGetCredentialOnchainData(claimUid: string) {
  return createQuery<OnchainCredentialData[], Error>({
      queryKey: ['get_credential_onchain_data'],
      queryFn: () => getCredentialOnchainData({ claimUid: claimUid }),
    })
}

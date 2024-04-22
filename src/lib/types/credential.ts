import type { Community } from "./community";

export type { Credential };

interface Credential {
    uid: string
    // the MINA account where this credential "lives"
    accountId: string
    // this are the other related MINA account ids
    applicantId: string
    claimId: string
    // the source references (redundant by useful for querying)
    applicantUid: string
    communityUid: string
    claimUid: string
    // type & description data
    type?: string
    description?: string
    community?: string
    image?: string
    alias?: string
    stars?: number
    // additional options
    metadata?: string
    revocable?: boolean
    // timestamps
    issuedUTC?: Date
    expiresUTC?: Date
    communityInfo?: Community
}
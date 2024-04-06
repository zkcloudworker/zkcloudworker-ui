export type { Community };

type CommunityState =  "DRAFT" | "APPROVED" | "PAUSED" | "REJECTED";

interface Community {
  /// from basic DB Claim Entity ///
  // ids and references 
  uid: string; 
  accountId: string;
  name: string; 
  description: string;
  state: CommunityState;
  image: string; // logo image

  // activity times
  createdUTC: string;
  updatedUTC: string;
  approvedUTC: string;

  // master plans
  plans: string[]; // Uid of all MasterPlans

  // extras 
  countMembers: number;
  countCredentials: number;
}

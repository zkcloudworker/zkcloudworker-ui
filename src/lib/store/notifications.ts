import { writable } from "svelte/store";

export const notificationsStore = writable({
  last: BigInt(0), // last sequence 
  error: undefined,
  data: []
});

export async function refreshNotifications(
  fromSequence: bigint
) {
//   const rs = await getMyActivities({
//     fromSequence: fromSequence
//   })
// 
//   if (rs.error) {
//     notificationsStore.update((t) => {
//       return {
//         last: t.last, // last sequence 
//         error: rs.error,
//         data: [].concat(t.data) 
//       }
//     })
//     return;
//   }

  notificationsStore.update((t) => {
    const sequence: bigint = rs.data[0].sequence;
    return {
      last: sequence, // last sequence 
      error: undefined,
      data: (rs.data || []).concat(t.data)
    }
  })
}

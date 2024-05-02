/** @type {import('./$types').PageLoad} */
export async function load({ params, route, url }) {
  let planUid = url.searchParams.get('mp');
  return {
    uid: params.uid,
    planUid: planUid
  };
}
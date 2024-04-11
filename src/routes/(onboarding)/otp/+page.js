/** @type {import('./$types').PageLoad} */
export async function load({ route, url }) {
  return {
    route: route,
    sessionKey: (url !== "") ? url.searchParams.get('sk', null) : null
  } 
}
export const ssr = false;

/** @type {import('./$types').PageLoad} */
export async function load({ params, route, url }) {
  return {
    repo: url.searchParams.get('repo')
  };
}
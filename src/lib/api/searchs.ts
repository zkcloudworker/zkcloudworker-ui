import { type APIResult } from "./base";
import algoliasearch from "algoliasearch";

const client = algoliasearch(
  import.meta.env.VITE_ALGOLIA_PROJECT!,
  import.meta.env.VITE_ALGOLIA_KEY!
);


export async function searchJobs(params: {
  query: string;
  filters: string;
  hitsPerPage: number;
  currentPage: number;
}): Promise<APIResult> {
  const { query, filters, hitsPerPage, currentPage } = params;

  const index = client.initIndex("jobs");

  // TODO: limit return fields
  const { hits, nbHits, nbPages, page } = await index.search(query, {
    filters: filters,
    hitsPerPage,
    page: currentPage,
    attributesToRetrieve: [
      "jobId",
      "timeCreated",
      "repo",
      "jobStatus",
      "chain",
      "task",
      "metadata",
    ],
  });
  
  return {
    success: true,
    data: { hits, nbHits, nbPages, page },
    error: null
  }
}

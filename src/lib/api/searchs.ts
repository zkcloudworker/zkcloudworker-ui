import { type APIResult } from "./base";
import algoliasearch from "algoliasearch";

const client = algoliasearch(
  import.meta.env.VITE_ALGOLIA_PROJECT!,
  import.meta.env.VITE_ALGOLIA_KEY!
);


export async function searchJobs(params: {
  query: string;
  filters?: string;
  hitsPerPage: number;
  currentPage: number;
}): Promise<APIResult> {
  const { query, filters, hitsPerPage, currentPage } = params;

  const index = client.initIndex("jobs");
  const rs = await index.search(query, {
    hitsPerPage,
    page: currentPage,
    attributesToRetrieve: [
      "jobId",
      "timeCreated",
      "repo",
      "jobStatus",
      "chain",
      "task",
      "developer",
      "metadata",
    ],
  });
  const { hits, nbHits, nbPages, page } = rs;
  
  return {
    success: true,
    data: { hits, nbHits, nbPages, page },
    error: null
  }
}

export async function searchCharges(params: {
  query: string;
  filters?: string;
  hitsPerPage: number;
  currentPage: number;
}): Promise<APIResult> {
  const { query, filters, hitsPerPage, currentPage } = params;

  const index = client.initIndex("charges");
  const rs = await index.search(query, {
    //filters: filters,
    hitsPerPage,
    page: currentPage,
    attributesToRetrieve: [
      "objectId",
      "id",
      "jobId",
      "billedDuration",
      "time",
    ],
  });
  const { hits, nbHits, nbPages, page } = rs;
  
  return {
    success: true,
    data: { hits, nbHits, nbPages, page },
    error: null
  }
}

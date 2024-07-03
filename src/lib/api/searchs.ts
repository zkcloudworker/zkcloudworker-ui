import { type APIResult } from "./base";
import algoliasearch from "algoliasearch";

const client = algoliasearch(
  import.meta.env.VITE_ALGOLIA_PROJECT!,
  import.meta.env.VITE_ALGOLIA_KEY!
);


export async function searchJobs(params: {
  query: string;
  hitsPerPage: number;
  currentPage: number;
  filters?: string;
}): Promise<APIResult> {
  const { query, filters, hitsPerPage, currentPage } = params;

  const index = client.initIndex("jobs");
  const rs = await index.search(query, {
    filters,
    hitsPerPage,
    page: currentPage,
    attributesToRetrieve: [
      "id",
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


export async function searchDistinctRepos(params: {
  query: string;
  filters?: string;
}): Promise<APIResult> {
  const { query, filters } = params;

  const index = client.initIndex("jobs");
  let nbPages = 1, j=0;
  let repos: string[] = []; 
  while (j < nbPages) {
    const rs = await index.search(query, {
      filters: filters,
      hitsPerPage: 1000,
      page: j,
      attributesToRetrieve: ["id", "repo", "developer"],
    });
    const { hits } = rs;
    nbPages = rs.nbPages;
    (hits || []).forEach((t: any) => {
      if (!repos.includes(t.repo)) repos.push(t.repo);
    })
    j++;
  }
  
  return {
    success: true,
    data: { repos },
    error: null
  }
}


export async function searchTransaction(jobId: string): Promise<APIResult> {
  const index = client.initIndex("transactions");
  const rs = await index.search('', {
    filters: `jobId:${jobId}`,
    hitsPerPage: 10,
    page: 0,
    attributesToRetrieve: ['*'],
  });
  const { hits } = rs;
  return {
    success: true,
    data: { hit: hits[0] },
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

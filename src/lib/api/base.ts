/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getCurrentSession } from "$lib/store";

export interface APIResult { 
  success: boolean;
  data: any | null;
  error: any | null;
}

export async function query(
  path: string, 
  params: object
): Promise<APIResult> {
  try {
    const apiEndpoint = import.meta.env.VITE_DDBAPI_ENDPOINT!;
    const apiKey = import.meta.env.VITE_DDBAPI_KEY!;
    const url = `${apiEndpoint}/queries/${path}`
    const session = getCurrentSession();

    const response = await axios.get(url, {
      params: {
        "params": JSON.stringify(params)
      },
      headers: {
        'Content-Type': 'application/json', // ensure request sent as JSON
        'x-api-key': apiKey, // the AWS API key 
        // 'x-JWT': session?.authorization || '' // the session JWToken             
      }
    })

    console.log('API query data:', JSON.stringify(response.data, null, 2));
    return {
      success: true,
      error: null,
      data: response.data.data
    }
  }
  catch(error: any) {
    const errorRsp = error.response ? error.response.data : error.message;
    console.error('API query ERROR:', errorRsp);
    return {
      success: false,
      error: errorRsp,
      data: null
    }
  }
}

import type { Session } from "$lib/types";

const API_ENDPOINTS: any = {
  'local': {
    host: import.meta.env.VITE_LOCAL_API_HOST,
    protocol: 'http',
    port: 30800, 
    authorization: "",
    key: ""
  },
  'dev': {
    host: import.meta.env.VITE_DEV_API_HOST,
    protocol: 'https',
    port: 443, 
    authorization: "",
    key: ""
  },
  'main': {
    host: import.meta.env.VITE_MAIN_API_HOST,
    protocol: 'https',
    port: 443, 
    authorization: "",
    key: ""
  }
}

export function getDefaultAPISessionFromEnv(): Session {
  const key = import.meta.env.VITE_USE_API;
  const session = API_ENDPOINTS[key] || API_ENDPOINTS['local'];
  console.log("store/api/getDefaultAPISessionFromEnv", session);
  return session;
}

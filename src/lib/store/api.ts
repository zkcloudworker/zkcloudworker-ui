import type { Session } from "$lib/types";

const API_ENDPOINTS: any = {
  'local': {
    host: '127.0.0.1',
    protocol: 'http',
    port: 30800, 
    authorization: "",
    key: ""
  },
  'dev': {
    host: 'api.socialcap.dev',
    protocol: 'https',
    port: 443, 
    authorization: "",
    key: ""
  },
  'main': {
    host:  'api.socialcap.app',
    protocol: 'https',
    port: 443, 
    authorization: "",
    key: ""
  }
}

export function getDefaultAPISessionFromEnv(): Session {
  const key = import.meta.env.VITE_USE_API;
  const session = API_ENDPOINTS[key] || API_ENDPOINTS['dev'];
  console.log("store/api/getDefaultAPISessionFromEnv", session);
  return session;
}

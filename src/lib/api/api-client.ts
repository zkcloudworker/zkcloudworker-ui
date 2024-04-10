import { type Session, getDefaultSession } from "$lib/store/sessions";
import { APIError } from "./api-errors";

export { API, type APIResponse };

/**
 * The API response. 
 * The 'data' prop will always be included, but will be 'null' if on error.
 * The 'error' prop is optional and will only be included when on error.   
 */
interface APIResponse {
  data: any | null;
  error?: APIError
};


/**
 * API Singleton that provides access to the remote API.
 * All methods are static:
 * - connect(Session)
 * - status(...)
 * - mutation(...)
 * - query(...)
 */
class API {
  static host: string;
  static port: number;
  static protocol: 'https' | 'http';
  static authorization: string; // the plain auth token
  static bearerJWT: string; // the JWT bearer token = 'Bearer ${authorization}'
  static baseUrl: string;

  /**
   * Sets all the connection params to the API.
   * @param session - the Session object params
   * @returns API - the API singleton
   */
  static init(session: Session) {
    if (! session) APIError
      .BAD_REQUEST("API.connect() needs a Session object, not Null")
      .raise();
    Object.assign(this, session || getDefaultSession());
    API.baseUrl = `${API.protocol}://${API.host}:${API.port}/api`;
    API.authorize(session.authorization);
    return API;
  }

  /**
   * Sets the Authorization token needed for GET and POST authorized calls.
   * @param jwttoken
   * @returns API - the self API singleton
   */
  static authorize(jwt: string) {
    API.bearerJWT = `Bearer ${jwt}`;
    API.authorization = `${jwt}`;
    return API;
  }

  /**
   * Get the API server and Db status.
   * @params params { metric: boolean } - include metrics in response
   * @returns APIResponse - a promise that must be awaited
   */
  static async status(params?: { 
    metrics: boolean 
  }): Promise<APIResponse> {
    try {
      const query = params?.metrics ? `?metrics` : "";
      const url = `${API.baseUrl}/status`+query;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Accept": "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8",
        }
      });
    
      if (!response.ok) return {
        data: null,
        error: new APIError(response.status, response.statusText)
      }

      return {
        data: await response.json()
      }
    } catch (err: any) {
      return {
        data: null,
        error: APIError.NETWORK_ERROR(err.message, err.cause),
      };
    }
  }

  /**
   * Query request
   * @param method string - the RPC query method to call 
   * @param params object - the query params as a JSON object
   * @returns APIResponse - a promise that must be awaited
   */
  static async query(
    method: string, 
    params: object
  ): Promise<APIResponse> {
    try {
      const query = `params=${JSON.stringify(params || '{}')}`;
      const url = `${API.baseUrl}/query/${method}?${query}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Accept": "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": API.authorization ? API.bearerJWT : ""
        }
      });
    
      if (!response.ok) return {
        data: null,
        error: new APIError(response.status, response.statusText)
      }

      // remember: the API returns also an { data, error } obj
      // that needs to be reformated, and it MAY include an error response too 
      const parsed = await response.json()
      return {
        data: parsed.data,
        error: parsed.error
      }
    } catch (err: any) {
      return {
        data: null,
        error: APIError.NETWORK_ERROR(err.message, err.cause),
      };
    };
  }

  /**
   * Mutation request
   * @param method string - the RPC mutation method to call 
   * @param payload object - the payload as a JSON object
   * @returns APIResponse - a promise that must be awaited
   */
  static async mutate(
    method: string, 
    payload: object
  ): Promise<APIResponse> {
    try {
      const url = `${API.baseUrl}/mutation/${method}`;
      console.log(url);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Accept": "application/json; charset=utf-8",
          "Content-Type": "application/json",
          "Authorization": API.authorization ? API.bearerJWT : ""
        },
        body: JSON.stringify({ params: payload })
      });
    
      if (!response.ok) return {
        data: null,
        error: new APIError(response.status, response.statusText)
      }

      // remember: the API returns also an { data, error } obj
      // that needs to be reformated, and it MAY include an error response too 
      const parsed = await response.json()
      return {
        data: parsed.data,
        error: parsed.error
      }
    } catch (err: any) {
      return {
        data: null,
        error: APIError.NETWORK_ERROR(err.message, err.cause),
      };
    };
  }
}

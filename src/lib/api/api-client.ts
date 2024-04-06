import { type Session, getDefaultSession } from "$lib/store/sessions";
import { IsError } from "./errors";

export { API, type APIResponse };

/**
 * The API response. 
 * The 'data' prop will always be included, but will be 'null' if on error.
 * The 'error' prop is optional and will only be included when on error.   
 */
interface APIResponse {
  data: any | null;
  error?: IsError
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
    if (! session) IsError
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
        error: new IsError(response.status, response.statusText)
      }

      return {
        data: await response.json()
      }
    } catch (err: any) {
      return {
        data: null,
        error: IsError.NETWORK_ERROR(err.message, err.cause),
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
          "Authorization": API.bearerJWT,
        }
      });
    
      if (!response.ok) return {
        data: null,
        error: new IsError(response.status, response.statusText)
      }

      return {
        data: await response.json()
      }
    } catch (err: any) {
      return {
        data: null,
        error: IsError.NETWORK_ERROR(err.message, err.cause),
      };
    };
  }

//   /**
//    * Mutate data
//    * @param params object
//    * @returns any | IsError
//    * */
//   async mutate(method: string, params: any): Promise<AnyResponse> {
//     try {
//       const url = `${this.session.baseUrl}/mutation/${method}`;
//       const payload = {
//         params: params || {},
//       };
//       const headers = {
//         headers: {
//           Authorization: this.session.authorization,
//         },
//       };
//       const response = await axios.post(url, payload, {
//         ...headers,
//       });
// 
//       // The request was received OK, but the response includes an error
//       if (response.data.error) return {
//         data: null, 
//         error: response.data.error
//       }
// 
//       // Response OK and no errors in response
//       return {
//         data: response.data.data,
//         error: null,
//       };
//     } 
//     catch (err: any) {
//       if (err.response && err.response.data.error) {
//         err.message = err.response.data.error.message;
//         err.code = err.response.data.error.code;
//       }
//       return {
//         data: null,
//         error: {
//           code: err.code || ErrorCode.TIMEOUT,
//           message: err.message || err.toString(),
//           source: "Network error or no internet connection",
//         },
//       };
//     }
//   }
}

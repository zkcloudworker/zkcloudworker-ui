/**
 * Normalize the API responses.
 * @MAZ - 2024-04-06
 */
export { APIError };

/**
 * Return a formated HTTP error or raise a formated exception.
 * In both cases it may include the exception 'cause'.
 * 
 * Usage:
 * ~~~ 
 *  try {
 *    let rsp = await Call(...);
 *    return {
 *      data: rsp 
 *    }
 *  }
 *  catch (exception {
 *    // return a formated response
 *    return {
 *      data: null,
 *      error: APIError.BAD_REQUEST("Message ...", except.cause);
 *    }
 * 
 *    // or reraise the Exception
 *    APIError.BAD_REQUEST.raise("Message ...", except.cause);
 *  }
 * ~~~~
 */
class APIError {
  static UNKNOWN = error(600);
  static NETWORK_ERROR = error(601);
  // **What are you talking about?**
  static PARSE_ERROR = error(400);
  static BAD_REQUEST= error(400);
  static NOT_FOUND= error(404);
  static METHOD_NOT_SUPPORTED= error(405);
  static CONFLICT= error(409);
  static PRECONDITION_FAILED= error(412);
  static PAYLOAD_TOO_LARGE= error(413);
  // **Who are you? Not for you ...**
  static UNAUTHORIZED= error(401);
  static FORBIDDEN= error(403);
  // **Uppps ! I have shamely failed ...** 
  static TIMEOUT= error(408);
  static INTERNAL_SERVER_ERROR= error(500);
  static BAD_GATEWAY= error(502);
  static SERVICE_UNAVAILABLE= error(503);

  // the error itself
  // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
  code: number = 0;
  message: string = "";
  cause?: string = ""; // the .cause returned by an exception 

  constructor(code: number, message?: string, reason?: string) {
    // Check if the instance is being created without 'new'
    if (!(this instanceof APIError)) {
        return new APIError(code, message, reason);
    }
    this.code = code || APIError.UNKNOWN().code;
    this.message = message || "Unknown error !";
    this.cause = reason || "No discernible cause."; 
  }

  raise() {
    throw Error(this.message, { cause: this.cause, code: this.code });
  }
};

function error(code: number) {
  return (message?: string, reason?: string) => {
    return new APIError(code, message, reason);
  }  
}

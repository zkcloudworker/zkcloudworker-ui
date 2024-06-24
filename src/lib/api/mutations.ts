import { type APIResult, mutate } from "./base";

export async function signUp(params: { 
  id: string, 
  signed: string
}
): Promise<APIResult> {
  console.log("signUp params:", params);
  const rsp = await mutate('signup', 
    params, // the data to send comes as params to the call
  );
  return {
    success: rsp.success,
    data: rsp.success ? rsp.data : null,
    error: !rsp.success ? rsp.error : null,
  }
}

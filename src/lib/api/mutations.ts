import { type APIResult, mutate, post } from "./base";

export async function signUp(params: { 
  id: string, 
  chain: object,
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

export async function updateProfile(params: { 
  id: string, 
  alias: string,
  fullName: string,
  email?: string,
  preferences?: string,
  discord?: string,
  JWT?: string
}
): Promise<APIResult> {
  console.log("updateAccount params:", params);
  const rsp = await mutate('update_account', 
    params, // the data to send comes as params to the call
  );
  return {
    success: rsp.success,
    data: rsp.success ? rsp.data : null,
    error: !rsp.success ? rsp.error : null,
  }
}

export async function generateJWT(
  address: string
): Promise<APIResult> {
  const apiData = {
    auth: import.meta.env.VITE_ZKCW_AUTH,
    command: "generateJWT",
    jwtToken: import.meta.env.VITE_ZKCW_JWT,
    data: {
      id: address,
      auth: import.meta.env.VITE_JWT_ACCESS_KEY,
    },
    chain: `mainnet`,
  };
  const endpoint = import.meta.env.VITE_NEXT_PUBLIC_ZKCW_ENDPOINT + "mainnet";
  const rsp = await post(endpoint, apiData);
  return {
    success: rsp.success,
    data: rsp.success ? rsp.data : null,
    error: !rsp.success ? rsp.error : null,
  }
}

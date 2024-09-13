import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Config } from "../config";
import { authToken } from "../store/users";

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const token = authToken(api.getState());
  return fetchBaseQuery({
    baseUrl: Config.API_URL,
    prepareHeaders: async (headers) => {
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  })(args, api, extraOptions);
};

export const baseQueryWithInterceptor = async (args, api, extraOptions) => {
  let result = await baseQueryWithAuth(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // here you can deal with 401 error
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});

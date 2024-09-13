import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Config } from "../config";
import { getUserTokenLocal } from "../helpers";

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const token = getUserTokenLocal()?.token
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
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});

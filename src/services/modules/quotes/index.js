import { api } from "../../api";
import { createQuote, fetchQuotes } from "./builder";


export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    fethcQuotes: fetchQuotes(build),
    createQuote: createQuote(build)
  }),
  overrideExisting: true,
});

export const { useFethcQuotesQuery, useCreateQuoteMutation } = userApi;

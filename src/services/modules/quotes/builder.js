export const fetchQuotes = (build) =>
  build.query({
    query: ({ limit, offset }) => `getQuotes?limit=${limit}&offset=${offset}`,
  });

export const createQuote = (build) =>
  build.mutation({
    query: (body) => ({
      url: "postQuote",
      method: "POST",
      body,
    }),
  });
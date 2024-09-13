export const login = (build) =>
  build.mutation({
    query: (body) => ({
      url: "/login",
      method: "POST",
      body,
    }),
  });

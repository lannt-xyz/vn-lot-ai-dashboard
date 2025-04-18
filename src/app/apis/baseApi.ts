import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: "same-origin",
  prepareHeaders: async (headers) => {
    // const session = await fetchAuthSession();
    // const accessToken = session?.tokens?.idToken?.toString();

    // if (!accessToken) {
    //   return headers;
    // }
    // headers.set("authorization", `Bearer ${accessToken}`);
    headers.set("Content-Type", "application/json");

    return headers;
  },
});

export const TAG_TYPES = {
  MINUTES: 'Minutes',
  DICTIONARY: 'Dictionary',
} as const;

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: Object.values(TAG_TYPES),
  baseQuery,
  endpoints: () => ({}),
});
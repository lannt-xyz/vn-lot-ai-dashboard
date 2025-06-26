import { MatchedAlgorithmItem } from "../global";
import { baseApi } from "./baseApi";

export const algorithmApiSlice = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMatchedByAlgorithm: build.query<MatchedAlgorithmItem[], void>({
            query: () => `/algorithm`,
        }),
    })
});

export const {
    useGetMatchedByAlgorithmQuery,
 } = algorithmApiSlice;

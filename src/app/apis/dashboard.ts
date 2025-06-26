import { ProfitChartData, MatchedChartData } from "../global";
import { baseApi } from "./baseApi";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const dashboardApiSlice = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getProfit: build.query<ProfitChartData, { startDate: string, endDate: string }>({
            query: ({ startDate, endDate }) => `/profit-summary?startDate=${encodeURI(startDate)}&endDate=${encodeURI(endDate)}`,
            transformResponse: (response: ProfitChartData) => {
                return response;
            },
        }),
        getMatched: build.query<MatchedChartData[], { startDate: string, endDate: string }>({
            query: ({ startDate, endDate }) => `/matched-results?startDate=${encodeURI(startDate)}&endDate=${encodeURI(endDate)}`,
            transformResponse: (response: any) => {
                return response.data.map((entry: any) => {
                    const { date, type, count } = entry;
                    return {
                        date,
                        type,
                        count,
                    };
                });
            },
        }),
    })
});

export const {
    useLazyGetProfitQuery,
    useLazyGetMatchedQuery,
 } = dashboardApiSlice;

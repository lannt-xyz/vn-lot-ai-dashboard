import { ProfitChartData } from "../global";
import { baseApi } from "./baseApi";

const apiEndPoint = "/v2";

export const dashboardApiSlice = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getProfit: build.query<ProfitChartData, { startDate: string, endDate: string }>({
            query: ({ startDate, endDate }) => `${apiEndPoint}/profit-summary?startDate=${encodeURI(startDate)}&endDate=${encodeURI(endDate)}`,
            transformResponse: (response: ProfitChartData) => {
                console.log("Profit Chart Data", response);
                return response;
            },
        }),
    })
});

export const { useLazyGetProfitQuery } = dashboardApiSlice;

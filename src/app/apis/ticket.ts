import { Ticket } from "../global";
import { baseApi } from "./baseApi";

export const dashboardApiSlice = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTickets: build.query<Ticket[], { startDate: string, endDate: string }>({
            query: ({ startDate, endDate }) => `/ticket?startDate=${encodeURI(startDate)}&endDate=${encodeURI(endDate)}`,
        }),
    })
});

export const {
    useLazyGetTicketsQuery,
 } = dashboardApiSlice;

import { Ticket } from "../global";
import { baseApi } from "./baseApi";

export const ticketApiSlice = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTickets: build.query<Ticket[], { startDate: string, endDate: string }>({
            query: ({ startDate, endDate }) => `/tickets?startDate=${encodeURI(startDate)}&endDate=${encodeURI(endDate)}`,
        }),
        getTodayResultStatus: build.query<void, void>({
            query: () => `/results/today`,
        }),
    })
});

export const {
    useLazyGetTicketsQuery,
    useLazyGetTodayResultStatusQuery,
 } = ticketApiSlice;

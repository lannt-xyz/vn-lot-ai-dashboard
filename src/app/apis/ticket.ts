import { Ticket } from "../global";
import { baseApi } from "./baseApi";

export const ticketApiSlice = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTickets: build.query<Ticket[], { startDate: string, endDate: string }>({
            query: ({ startDate, endDate }) => `/tickets?startDate=${encodeURI(startDate)}&endDate=${encodeURI(endDate)}`,
        }),
    })
});

export const {
    useLazyGetTicketsQuery,
 } = ticketApiSlice;

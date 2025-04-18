'use client';

import React from "react";
import DataTable from "../components/table/DataTable";
import { useLazyGetTicketsQuery } from "../apis/ticket";

const header = [
  { key: 'date', text: 'Date', widthClass: 'w-24' },
  { key: 'cityCode', text: 'City Code', widthClass: 'w-24' },
  { key: 'type', text: 'Type', widthClass: 'w-24' },
  { key: 'lotNumber', text: 'Lot Number', widthClass: 'w-24' },
  { key: 'matchedCount', text: 'Matched Count', widthClass: 'w-24' },
  { key: 'pay', text: 'Pay', widthClass: 'w-24' },
  { key: 'win', text: 'Win', widthClass: 'w-24' }
];

export default function Tickets() {
  const [getTicketTrigger, { data: ticketData }] = useLazyGetTicketsQuery();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <DataTable header={header} data={ticketData || []} dataKeyIdentity="date" />
    </div>
  );
}

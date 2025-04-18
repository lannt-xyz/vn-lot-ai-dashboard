'use client';

import React, { useEffect } from "react";
import DataTable from "../components/table/DataTable";
import { useLazyGetTicketsQuery } from "../apis/ticket";
import { selectSelectedDate } from "../redux/slice/yearMonthSlice";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { DATE_FORMATS } from "../utils/constant";
import { getMonthStartEndFromDate } from "../utils/DateUtils";

const header = [
  { key: 'date', text: 'Date', widthClass: 'w-24' },
  { key: 'cityCode', text: 'City Code', widthClass: 'w-32' },
  { key: 'type', text: 'Type', widthClass: 'w-24' },
  { key: 'lotNumber', text: 'Lot Number', widthClass: 'w-24' },
  { key: 'matchedCount', text: 'Matched Count', widthClass: 'w-24' },
  { key: 'pay', text: 'Pay', widthClass: 'w-24' },
  { key: 'win', text: 'Win', widthClass: 'w-24' }
];

export default function Tickets() {
  const [getTicketTrigger, { data: ticketData }] = useLazyGetTicketsQuery();
  const selectedDate = useSelector(selectSelectedDate);
  useEffect(() => {
    if (!selectedDate) {
      return;
    }
    const { monthStartDate, monthEndDate } = getMonthStartEndFromDate(selectedDate);

    getTicketTrigger({
      startDate: format(monthStartDate, DATE_FORMATS.YYYYMMDD_DASH),
      endDate: format(monthEndDate, DATE_FORMATS.YYYYMMDD_DASH),
    });
  }, [selectedDate, getTicketTrigger]);

  return (
    <div className="flex flex-col w-full h-full pt-4">
      <DataTable height="h-[80vh]" header={header} data={ticketData || []} dataKeyIdentity="date" />
    </div>
  );
}

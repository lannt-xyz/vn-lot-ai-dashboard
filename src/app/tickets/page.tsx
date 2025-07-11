'use client';

import React, { useEffect } from "react";
import DataTable from "../components/table/DataTable";
import { useLazyGetTicketsQuery } from "../apis/ticket";
import { selectSelectedDate } from "../redux/slice/yearMonthSlice";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { DATE_FORMATS } from "../utils/constant";
import { getMonthStartEndFromDate } from "../utils/DateUtils";
import useLoading from "../hook/useLoading";
import { Select, Option, Checkbox } from "@material-tailwind/react";
import { Ticket } from "../global";

const header = [
  { key: 'date', text: 'Date', widthClass: 'w-32' },
  { key: 'cityCode', text: 'City Code', widthClass: 'w-32' },
  { key: 'type', text: 'Type', widthClass: 'w-24' },
  { key: 'lotNumber', text: 'Lot Number', widthClass: 'w-24' },
  { key: 'matchedCount', text: 'Matched Count', widthClass: 'w-24' },
  { key: 'pay', text: 'Pay', widthClass: 'w-24' },
  { key: 'win', text: 'Win', widthClass: 'w-24' }
];

export default function Tickets() {
  const [getTicketTrigger, { isFetching, data: ticketData }] = useLazyGetTicketsQuery();
  const selectedDate = useSelector(selectSelectedDate);

  const { showLoading, hideLoading } = useLoading();
  useEffect(() => {
    if (isFetching) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [isFetching]);

  useEffect(() => {
    if (!selectedDate) {
      return;
    }
    const { monthStartDate, monthEndDate } = getMonthStartEndFromDate(selectedDate, false);

    getTicketTrigger({
      startDate: format(monthStartDate, DATE_FORMATS.YYYYMMDD_DASH),
      endDate: format(monthEndDate, DATE_FORMATS.YYYYMMDD_DASH),
    });
  }, [selectedDate, getTicketTrigger]);

  const [types, setTypes] = React.useState<string[]>([]);
  useEffect(() => {
    if (ticketData) {
      const mappedType = ticketData.map((item: Ticket) => item.type);
      const uniqueTypes = Array.from(new Set(mappedType));
      setTypes(uniqueTypes);
    }
  }, [ticketData]);

  const [filteredData, setFilteredData] = React.useState<Ticket[]>([]);
  const [selectedType, setSelectedType] = React.useState<string>('');
  const [showTodayTicketOnly, setShowTodayTicketOnly] = React.useState<boolean>(false);
  useEffect(() => {
    if (!ticketData) {
      return;
    }

    if (selectedType === '' && !showTodayTicketOnly) {
      setFilteredData(ticketData);
      return;
    }
    console.log('today: ', format(new Date(), DATE_FORMATS.YYYYMMDD_DASH));
    const filtered = ticketData.filter((item: Ticket) => {
      const isToday = format(new Date(item.date), DATE_FORMATS.YYYYMMDD_DASH) === format(new Date(), DATE_FORMATS.YYYYMMDD_DASH);
      const isTypeMatch = selectedType === '' || item.type === selectedType;
      const isTodayTicketOnly = showTodayTicketOnly ? isToday : true;
      return isTypeMatch && isTodayTicketOnly;
    });
    setFilteredData(filtered);
  }, [ticketData, selectedType, showTodayTicketOnly]);

  return (
    <div className="flex flex-col w-full h-full pt-2">
      <div className="flex flex-row items-center justify-between w-full py-2">
        <div className="flex flex-row gap-4 w-full">
          <div className="w-52">
          <Select label="Select Type" placeholder={"Select Type"} onChange={(value) => setSelectedType(value as string)}>
            {types.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
          </div>
          <Checkbox label="Show Today Ticket Only" crossOrigin={undefined} placeholder="" checked={showTodayTicketOnly} onChange={(e) => setShowTodayTicketOnly(e.target.checked)} />
        </div>
      </div>
      <DataTable height="h-[80vh]" header={header} data={filteredData || []} dataKeyIdentity="date" />
    </div>
  );
}

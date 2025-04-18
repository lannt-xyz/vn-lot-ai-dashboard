'use client';

import { useEffect, useState } from "react";
import MatchedChart from "./components/charts/MatchedChart";
import ProfitChart from "./components/charts/ProfitChart";
import DatePicker from "./components/forms/DatePicker";
import { useLazyGetMatchedQuery, useLazyGetProfitQuery } from "./apis/dashboard";
import { format } from "date-fns";
import { DATE_FORMATS } from "./utils/constant";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [triggerGetProfit, { data: profitData }] = useLazyGetProfitQuery();
  const [triggerGetMatched, { data: matchedData }] = useLazyGetMatchedQuery();

  useEffect(() => {
    const monthStartDate = selectedDate ? new Date(selectedDate) : new Date();
    monthStartDate.setDate(1);

    const monthEndDate = selectedDate ? new Date(selectedDate) : new Date();
    monthEndDate.setMonth(monthEndDate.getMonth() + 1);
    monthEndDate.setDate(0);
    // if the monthEndDate is greater than the current date, set it to the current date
    if (monthEndDate > new Date()) {
      monthEndDate.setDate(new Date().getDate());
    }

    triggerGetProfit({
      startDate: format(monthStartDate, DATE_FORMATS.YYYYMMDD_DASH),
      endDate: format(monthEndDate, DATE_FORMATS.YYYYMMDD_DASH),
    });

    triggerGetMatched({
      startDate: format(monthStartDate, DATE_FORMATS.YYYYMMDD_DASH),
      endDate: format(monthEndDate, DATE_FORMATS.YYYYMMDD_DASH),
    });
  }, [selectedDate, triggerGetProfit, triggerGetMatched]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex flex-row w-full justify-start mb-4">
        <DatePicker showMonthYearPicker={true} selected={selectedDate} onChanged={setSelectedDate} width="w-32" />
      </div>
      <ProfitChart rawData={profitData} />
      <MatchedChart rawData={matchedData} />
    </div>
  );
}

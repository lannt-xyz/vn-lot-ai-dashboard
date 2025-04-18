'use client';

import { useEffect } from "react";
import MatchedChart from "./components/charts/MatchedChart";
import ProfitChart from "./components/charts/ProfitChart";
import { useLazyGetMatchedQuery, useLazyGetProfitQuery } from "./apis/dashboard";
import { format } from "date-fns";
import { DATE_FORMATS } from "./utils/constant";
import { useSelector } from "react-redux";
import { selectSelectedDate } from "./redux/slice/yearMonthSlice";
import { getMonthStartEndFromDate } from "./utils/DateUtils";

export default function Home() {
  const [triggerGetProfit, { data: profitData }] = useLazyGetProfitQuery();
  const [triggerGetMatched, { data: matchedData }] = useLazyGetMatchedQuery();
  const selectedDate = useSelector(selectSelectedDate);

  useEffect(() => {
    const { monthStartDate, monthEndDate } = getMonthStartEndFromDate(selectedDate);

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
    <div className="flex flex-col items-center justify-center w-full">
      <ProfitChart rawData={profitData || {}} />
      <MatchedChart rawData={matchedData || []} />
    </div>
  );
}

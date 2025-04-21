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
import useLoading from "./hook/useLoading";

export default function Home() {
  const [triggerGetProfit, { isFetching: profitFetching, data: profitData }] = useLazyGetProfitQuery();
  const [triggerGetMatched, { isFetching: matchedFetching, data: matchedData }] = useLazyGetMatchedQuery();
  const selectedDate = useSelector(selectSelectedDate);
  const {showLoading, hideLoading} = useLoading();

  useEffect(() => {
    if (profitFetching) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [profitFetching]);

  useEffect(() => {
    if (matchedFetching) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [matchedFetching]);

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
      <div className="flex h-full w-full">
        <ProfitChart rawData={profitData ?? {}} />
      </div>
      <div className="flex h-full w-full">
        <MatchedChart rawData={matchedData ?? []} />
      </div>
    </div>
  );
}

'use client';

import { useState } from "react";
import MatchedChart from "./components/charts/MatchedChart";
import ProfitChart from "./components/charts/ProfitChart";
import DatePicker from "./components/forms/DatePicker";
import { ProfitChartData } from "./global";


// Original data
const profitData: ProfitChartData = {
  absent: [
    { color: '#FF0000', label: 'Total Pay', value: 8460000.0 },
    { color: '#00FF00', label: 'Total Winning', value: 4750000.0 },
  ],
  combine: [
    { color: '#FF0000', label: 'Total Pay', value: 8460000.0 },
    { color: '#00FF00', label: 'Total Winning', value: 3800000.0 },
  ],
  common: [
    { color: '#FF0000', label: 'Total Pay', value: 8460000.0 },
    { color: '#00FF00', label: 'Total Winning', value: 8550000.0 },
  ],
  cycle: [
    { color: '#FF0000', label: 'Total Pay', value: 8460000.0 },
    { color: '#00FF00', label: 'Total Winning', value: 7600000.0 },
  ],
  first: [
    { color: '#FF0000', label: 'Total Pay', value: 8460000.0 },
    { color: '#00FF00', label: 'Total Winning', value: 8550000.0 },
  ],
  mnb: [
    { color: '#FF0000', label: 'Total Pay', value: 8460000.0 },
    { color: '#00FF00', label: 'Total Winning', value: 9500000.0 },
  ],
  rfc: [
    { color: '#FF0000', label: 'Total Pay', value: 8460000.0 },
    { color: '#00FF00', label: 'Total Winning', value: 15200000.0 },
  ],
  xgb: [
    { color: '#FF0000', label: 'Total Pay', value: 8460000.0 },
    { color: '#00FF00', label: 'Total Winning', value: 11400000.0 },
  ],
};

const matchedData = [
  {
    "count": 2.0,
    "date": "2025-04-01",
    "type": "rfc"
  },
  {
    "count": 0.0,
    "date": "2025-04-01",
    "type": "xgb"
  },
  {
    "count": 0.0,
    "date": "2025-04-01",
    "type": "combine"
  },
  {
    "count": 1.0,
    "date": "2025-04-01",
    "type": "cycle"
  },
  {
    "count": 0.0,
    "date": "2025-04-01",
    "type": "mnb"
  },
  {
    "count": 1.0,
    "date": "2025-04-01",
    "type": "common"
  },
  {
    "count": 1.0,
    "date": "2025-04-01",
    "type": "first"
  },
  {
    "count": 0.0,
    "date": "2025-04-01",
    "type": "absent"
  },
  {
    "count": 0.0,
    "date": "2025-04-02",
    "type": "rfc"
  },
  {
    "count": 2.0,
    "date": "2025-04-02",
    "type": "xgb"
  },
  {
    "count": 2.0,
    "date": "2025-04-02",
    "type": "combine"
  },
  {
    "count": 1.0,
    "date": "2025-04-02",
    "type": "cycle"
  },
  {
    "count": 0.0,
    "date": "2025-04-02",
    "type": "mnb"
  },
  {
    "count": 1.0,
    "date": "2025-04-02",
    "type": "common"
  },
  {
    "count": 0.0,
    "date": "2025-04-02",
    "type": "first"
  },
  {
    "count": 2.0,
    "date": "2025-04-02",
    "type": "absent"
  },
  {
    "count": 0.0,
    "date": "2025-04-03",
    "type": "rfc"
  },
  {
    "count": 1.0,
    "date": "2025-04-03",
    "type": "xgb"
  },
  {
    "count": 0.0,
    "date": "2025-04-03",
    "type": "combine"
  },
  {
    "count": 0.0,
    "date": "2025-04-03",
    "type": "cycle"
  },
  {
    "count": 0.0,
    "date": "2025-04-03",
    "type": "mnb"
  },
  {
    "count": 0.0,
    "date": "2025-04-03",
    "type": "common"
  },
  {
    "count": 0.0,
    "date": "2025-04-03",
    "type": "first"
  },
  {
    "count": 0.0,
    "date": "2025-04-03",
    "type": "absent"
  },
  {
    "count": 2.0,
    "date": "2025-04-04",
    "type": "rfc"
  },
  {
    "count": 0.0,
    "date": "2025-04-04",
    "type": "xgb"
  },
  {
    "count": 1.0,
    "date": "2025-04-04",
    "type": "combine"
  },
  {
    "count": 1.0,
    "date": "2025-04-04",
    "type": "cycle"
  },
  {
    "count": 1.0,
    "date": "2025-04-04",
    "type": "mnb"
  },
  {
    "count": 0.0,
    "date": "2025-04-04",
    "type": "common"
  },
  {
    "count": 0.0,
    "date": "2025-04-04",
    "type": "first"
  },
  {
    "count": 1.0,
    "date": "2025-04-04",
    "type": "absent"
  },
  {
    "count": 1.0,
    "date": "2025-04-05",
    "type": "rfc"
  },
  {
    "count": 0.0,
    "date": "2025-04-05",
    "type": "xgb"
  },
  {
    "count": 0.0,
    "date": "2025-04-05",
    "type": "combine"
  },
  {
    "count": 1.0,
    "date": "2025-04-05",
    "type": "cycle"
  },
  {
    "count": 1.0,
    "date": "2025-04-05",
    "type": "mnb"
  },
  {
    "count": 0.0,
    "date": "2025-04-05",
    "type": "common"
  },
  {
    "count": 1.0,
    "date": "2025-04-05",
    "type": "first"
  },
  {
    "count": 0.0,
    "date": "2025-04-05",
    "type": "absent"
  },
  {
    "count": 2.0,
    "date": "2025-04-06",
    "type": "rfc"
  },
  {
    "count": 0.0,
    "date": "2025-04-06",
    "type": "xgb"
  },
  {
    "count": 0.0,
    "date": "2025-04-06",
    "type": "combine"
  },
  {
    "count": 2.0,
    "date": "2025-04-06",
    "type": "cycle"
  },
  {
    "count": 0.0,
    "date": "2025-04-06",
    "type": "mnb"
  },
  {
    "count": 1.0,
    "date": "2025-04-06",
    "type": "common"
  },
  {
    "count": 1.0,
    "date": "2025-04-06",
    "type": "first"
  },
  {
    "count": 0.0,
    "date": "2025-04-06",
    "type": "absent"
  },
  {
    "count": 0.0,
    "date": "2025-04-07",
    "type": "rfc"
  },
  {
    "count": 1.0,
    "date": "2025-04-07",
    "type": "xgb"
  },
  {
    "count": 0.0,
    "date": "2025-04-07",
    "type": "combine"
  },
  {
    "count": 0.0,
    "date": "2025-04-07",
    "type": "cycle"
  },
  {
    "count": 1.0,
    "date": "2025-04-07",
    "type": "mnb"
  },
  {
    "count": 1.0,
    "date": "2025-04-07",
    "type": "common"
  },
  {
    "count": 0.0,
    "date": "2025-04-07",
    "type": "first"
  },
  {
    "count": 0.0,
    "date": "2025-04-07",
    "type": "absent"
  },
  {
    "count": 2.0,
    "date": "2025-04-08",
    "type": "rfc"
  },
  {
    "count": 0.0,
    "date": "2025-04-08",
    "type": "xgb"
  },
  {
    "count": 1.0,
    "date": "2025-04-08",
    "type": "combine"
  },
  {
    "count": 1.0,
    "date": "2025-04-08",
    "type": "cycle"
  },
  {
    "count": 0.0,
    "date": "2025-04-08",
    "type": "mnb"
  },
  {
    "count": 0.0,
    "date": "2025-04-08",
    "type": "common"
  },
  {
    "count": 1.0,
    "date": "2025-04-08",
    "type": "first"
  },
  {
    "count": 0.0,
    "date": "2025-04-08",
    "type": "absent"
  },
  {
    "count": 0.0,
    "date": "2025-04-09",
    "type": "rfc"
  },
  {
    "count": 0.0,
    "date": "2025-04-09",
    "type": "xgb"
  },
  {
    "count": 0.0,
    "date": "2025-04-09",
    "type": "combine"
  },
  {
    "count": 0.0,
    "date": "2025-04-09",
    "type": "cycle"
  },
  {
    "count": 3.0,
    "date": "2025-04-09",
    "type": "mnb"
  },
  {
    "count": 0.0,
    "date": "2025-04-09",
    "type": "common"
  },
  {
    "count": 1.0,
    "date": "2025-04-09",
    "type": "first"
  },
  {
    "count": 1.0,
    "date": "2025-04-09",
    "type": "absent"
  },
  {
    "count": 1.0,
    "date": "2025-04-10",
    "type": "rfc"
  },
  {
    "count": 2.0,
    "date": "2025-04-10",
    "type": "xgb"
  },
  {
    "count": 0.0,
    "date": "2025-04-10",
    "type": "combine"
  },
  {
    "count": 0.0,
    "date": "2025-04-10",
    "type": "cycle"
  },
  {
    "count": 1.0,
    "date": "2025-04-10",
    "type": "mnb"
  },
  {
    "count": 1.0,
    "date": "2025-04-10",
    "type": "common"
  },
  {
    "count": 0.0,
    "date": "2025-04-10",
    "type": "first"
  },
  {
    "count": 1.0,
    "date": "2025-04-10",
    "type": "absent"
  },
  {
    "count": 1.0,
    "date": "2025-04-11",
    "type": "rfc"
  },
  {
    "count": 2.0,
    "date": "2025-04-11",
    "type": "xgb"
  },
  {
    "count": 0.0,
    "date": "2025-04-11",
    "type": "combine"
  },
  {
    "count": 0.0,
    "date": "2025-04-11",
    "type": "cycle"
  },
  {
    "count": 2.0,
    "date": "2025-04-11",
    "type": "mnb"
  },
  {
    "count": 1.0,
    "date": "2025-04-11",
    "type": "common"
  },
  {
    "count": 0.0,
    "date": "2025-04-11",
    "type": "first"
  },
  {
    "count": 0.0,
    "date": "2025-04-11",
    "type": "absent"
  },
  {
    "count": 0.0,
    "date": "2025-04-12",
    "type": "rfc"
  },
  {
    "count": 0.0,
    "date": "2025-04-12",
    "type": "xgb"
  },
  {
    "count": 0.0,
    "date": "2025-04-12",
    "type": "combine"
  },
  {
    "count": 0.0,
    "date": "2025-04-12",
    "type": "cycle"
  },
  {
    "count": 1.0,
    "date": "2025-04-12",
    "type": "mnb"
  },
  {
    "count": 0.0,
    "date": "2025-04-12",
    "type": "common"
  },
  {
    "count": 2.0,
    "date": "2025-04-12",
    "type": "first"
  },
  {
    "count": 0.0,
    "date": "2025-04-12",
    "type": "absent"
  },
  {
    "count": 1.0,
    "date": "2025-04-13",
    "type": "rfc"
  },
  {
    "count": 1.0,
    "date": "2025-04-13",
    "type": "xgb"
  },
  {
    "count": 0.0,
    "date": "2025-04-13",
    "type": "combine"
  },
  {
    "count": 0.0,
    "date": "2025-04-13",
    "type": "cycle"
  },
  {
    "count": 0.0,
    "date": "2025-04-13",
    "type": "mnb"
  },
  {
    "count": 0.0,
    "date": "2025-04-13",
    "type": "common"
  },
  {
    "count": 1.0,
    "date": "2025-04-13",
    "type": "first"
  },
  {
    "count": 0.0,
    "date": "2025-04-13",
    "type": "absent"
  },
  {
    "count": 4.0,
    "date": "2025-04-14",
    "type": "rfc"
  },
  {
    "count": 3.0,
    "date": "2025-04-14",
    "type": "xgb"
  },
  {
    "count": 0.0,
    "date": "2025-04-14",
    "type": "combine"
  },
  {
    "count": 1.0,
    "date": "2025-04-14",
    "type": "cycle"
  },
  {
    "count": 0.0,
    "date": "2025-04-14",
    "type": "mnb"
  },
  {
    "count": 3.0,
    "date": "2025-04-14",
    "type": "common"
  },
  {
    "count": 1.0,
    "date": "2025-04-14",
    "type": "first"
  },
  {
    "count": 0.0,
    "date": "2025-04-14",
    "type": "absent"
  },
  {
    "count": 0.0,
    "date": "2025-04-15",
    "type": "rfc"
  },
  {
    "count": 0.0,
    "date": "2025-04-15",
    "type": "xgb"
  },
  {
    "count": 0.0,
    "date": "2025-04-15",
    "type": "combine"
  },
  {
    "count": 0.0,
    "date": "2025-04-15",
    "type": "cycle"
  },
  {
    "count": 0.0,
    "date": "2025-04-15",
    "type": "mnb"
  },
  {
    "count": 0.0,
    "date": "2025-04-15",
    "type": "common"
  },
  {
    "count": 0.0,
    "date": "2025-04-15",
    "type": "first"
  },
  {
    "count": 0.0,
    "date": "2025-04-15",
    "type": "absent"
  }
]

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

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

import ProfitChart from "./components/ProfitChart";
import { ProfitChartData } from "./global";


// Original data
const rawData: ProfitChartData = {
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


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <ProfitChart rawData={rawData} />
    </div>
  );
}

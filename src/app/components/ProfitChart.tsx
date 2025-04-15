'use client';

import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ProfitChartBar } from '../global';

interface ProfitChartProps {
    rawData: Record<string, { color: string; label: string; value: number }[]>;
}

const ProfitChart: React.FC<ProfitChartProps> = ({ rawData }) => {

    const [data, setData] = React.useState<ProfitChartBar[]>([]);
    useEffect(() => {
        // Transform data for the chart
        const transformedData: ProfitChartBar[] = Object.keys(rawData).map((key) => {
            const totalPay = rawData[key].find((item) => item.label === 'Total Pay')?.value || 0;
            const totalWinning = rawData[key].find((item) => item.label === 'Total Winning')?.value || 0;
            const profit = totalWinning - totalPay;
            const color = profit > 0 ? '#82ca9d' : '#ff0000';
            const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);

            return {
                name: formattedKey,
                value: profit,
                color: color,
            };
        });
        setData(transformedData);
    }, [rawData]);

    return (
        <div className='w-full h-96'>
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value / 1000)} />
                    <Tooltip formatter={(value: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)} />
                    <Bar dataKey="value">
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.value > 0 ? '#00ff0059' : '#ff000059'}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
export default ProfitChart;

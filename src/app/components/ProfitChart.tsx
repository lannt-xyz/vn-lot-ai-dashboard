'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ProfitChartBar } from '../global';

interface ProfitChartProps {
    rawData: Record<string, { color: string; label: string; value: number }[]>;
}

const ProfitChart: React.FC<ProfitChartProps> = ({ rawData }) => {

    // Transform data for the chart
    const transformedData: ProfitChartBar[] = Object.keys(rawData).map((key) => {
        const totalPay = rawData[key].find((item) => item.label === 'Total Pay')?.value || 0;
        const totalWinning = rawData[key].find((item) => item.label === 'Total Winning')?.value || 0;
        const profit = totalWinning - totalPay;
        const color = profit > 0 ? '#82ca9d' : '#ff0000';

        return {
            name: key,
            value: profit,
            color: color,
        };
    });

    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <BarChart
                    data={transformedData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value">
                        {transformedData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.value > 0 ? '#82ca9d' : '#8884d8'} // 💡 Expression here
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
export default ProfitChart;

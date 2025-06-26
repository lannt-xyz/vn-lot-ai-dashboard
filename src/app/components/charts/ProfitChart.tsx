'use client';

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { ProfitChartBar } from '../../global';

interface ProfitChartProps {
    rawData?: Record<string, { color: string; label: string; value: number }[]>;
}

const ProfitChart: React.FC<ProfitChartProps> = ({ rawData }) => {

    const [data, setData] = useState<ProfitChartBar[]>([]);
    useEffect(() => {
        if (!rawData) {
            return;
        }

        // Transform data for the chart
        const transformedData: ProfitChartBar[] = Object.keys(rawData).sort().map((key) => {
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

    if (!data || data.length === 0) {
        return <div className='w-full h-96 flex items-center justify-center'>Loading...</div>;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderCustomLabel = (props: any) => {
        const { x, y, width, value } = props;
        const dy = value < 0 ? 14 : -4;
        return (
            <text
                x={x + width / 2}
                y={y}
                dy={dy}
                fill="gray"
                fontSize={12}
                textAnchor="middle"
            >
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
            </text>
        );
    };

    return (
        <div className='w-full h-96'>
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 10,
                        left: 10,
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
                        <LabelList
                            dataKey="value"
                            content={renderCustomLabel}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
export default ProfitChart;

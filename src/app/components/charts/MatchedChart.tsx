'use client';

import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { MatchedChartData } from '../../global';

interface MatchedChartProps {
    rawData?: MatchedChartData[] | undefined;
}

const MatchedChart: React.FC<MatchedChartProps> = ({ rawData = [] }) => {
    const [data, setData] = useState<MatchedChartData[]>([]);
    useEffect(() => {
        // Step 1: Extract dates
        const dates = rawData.map((x: MatchedChartData) => x.date);

        // Step 2: Remove duplicates and sort dates
        const uniqueDates = Array.from(new Set(dates)).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

        // Step 3: Define dataset types and labels
        const datasetTypes = ['cycle', 'absent', 'combine', 'common', 'first', 'rfc', 'mnb', 'xgb'];
        const datasetLabels = ['Cycle', 'Absent', 'Combine', 'Common', 'First', 'RFC', 'MNB', 'XGB'];
        const colors = ['#ff0000', '#00ff00', '#400C85', '#0000ff', '#bc6c25', '#ff00ff', '#ff7f00', '#00ffff'];

        // Step 4: Prepare datasets
        const datasets = datasetTypes.map((type, index) => ({
            type,
            label: datasetLabels[index],
            color: colors[index],
            data: uniqueDates.map((date) => {
                const entry = rawData.find((x: MatchedChartData) => x.date === date && x.type === type);
                return entry ? entry.count : 0; // Default to 0 if no data for the date
            }),
        }));

        // Step 5: Transform data for Recharts
        const transformedData = uniqueDates.map((date, dateIndex) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const entry: any = { date };
            datasets.forEach((dataset) => {
                entry[dataset.type] = dataset.data[dateIndex];
            });
            return entry;
        });
        setData(transformedData);
    }, [rawData]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderCustomLabel = (props: any) => {
        const { x, y, value } = props;
        return (
            <text
                x={x}
                y={y - 10} // Adjust vertical position slightly above the point
                fill="gray" // Set label color to gray
                fontSize={12} // Adjust font size
                textAnchor="middle" // Center the text horizontally
            >
                {value}
            </text>
        );
    };

    return (
        <div className="w-full h-96">
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {['cycle', 'absent', 'combine', 'common', 'first', 'rfc', 'mnb', 'xgb'].map((type, index) => (
                        <Line
                            key={type}
                            type="monotone"
                            dataKey={type}
                            stroke={['#ff0000', '#00ff00', '#400C85', '#0000ff', '#bc6c25', '#ff00ff', '#ff7f00', '#00ffff'][index]}
                            strokeWidth={2}
                            dot={false}
                        >
                            <LabelList
                                dataKey={type}
                                content={renderCustomLabel}
                            />
                        </Line>
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MatchedChart;
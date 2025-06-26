'use client';

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { MatchedChartData } from '../../global';
import { DEFAULT_COLORS } from '@/app/utils/constant';

interface MatchedChartProps {
    rawData?: MatchedChartData[] | undefined;
}

// Helper function to convert text to Title Case
const toTitleCase = (text: string) => {
    return text
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

// Custom Label Renderer
const renderCustomLabel = (props: any) => {
    const { x, y, width, height, value } = props; // Include width and height for positioning
    if (value > 0) {
        return (
            <text
                x={x + width / 2} // Center horizontally
                y={y + height / 2} // Center vertically
                fill="white" // Text color
                fontSize={12} // Font size
                textAnchor="middle" // Center the text horizontally
                dominantBaseline="middle" // Center the text vertically
            >
                {value}
            </text>
        );
    }
    return null; // Do not render anything for zero values
};

const MatchedChartStack: React.FC<MatchedChartProps> = ({ rawData = [] }) => {
    const [data, setData] = useState<any[]>([]);
    const [datasetTypes, setDatasetTypes] = useState<string[]>([]);

    useEffect(() => {
        // Step 1: Extract dates
        const dates = rawData.map((x: MatchedChartData) => x.date);

        // Step 2: Remove duplicates and sort dates
        const uniqueDates = Array.from(new Set(dates)).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

        // Step 3: Define dataset types and labels
        const datasetTypes = Array.from(new Set(rawData.map((x: MatchedChartData) => x.type))).sort();
        setDatasetTypes(datasetTypes);

        // Step 4: Prepare datasets
        const transformedData = uniqueDates.map((date) => {
            const entry: any = { date };
            datasetTypes.forEach((type) => {
                const typeData = rawData.find((x: MatchedChartData) => x.date === date && x.type === type);
                entry[type] = typeData ? typeData.count : 0; // Default to 0 if no data for the type
            });
            return entry;
        });

        setData(transformedData);
    }, [rawData]);

    if (!data || data.length === 0) {
        return <div className='w-full h-96 flex items-center justify-center'>Loading...</div>;
    }

    return (
        <div className="w-full h-96">
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
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                        formatter={(value, name) => [value, toTitleCase(name as string)]} // Format tooltip labels to Title Case
                    />
                    <Legend
                        formatter={(value) => toTitleCase(value as string)} // Format legend labels to Title Case
                    />
                    {datasetTypes.map((type, index) => (
                        <Bar
                            key={type}
                            dataKey={type}
                            stackId="a" // Stack all bars together
                            fill={DEFAULT_COLORS[index % DEFAULT_COLORS.length]} // Use default colors
                        >
                            <LabelList dataKey={type} content={renderCustomLabel} />
                        </Bar>
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MatchedChartStack;

"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { AlgorithmChartBar, MatchedAlgorithmItem } from "../../global";
import { DEFAULT_COLORS } from "@/app/utils/constant";

interface AlgorithmChartProps {
  rawData?: MatchedAlgorithmItem[] | undefined;
}

const AlgorithmChart: React.FC<AlgorithmChartProps> = ({ rawData }) => {
  const [data, setData] = useState<AlgorithmChartBar[]>([]);
  useEffect(() => {
    if (!rawData) {
      return;
    }
    // Transform data for the chart
    const transformedData: AlgorithmChartBar[] = rawData.map((item, index) => {
      const titleCase =
        item.type.charAt(0).toUpperCase() + item.type.slice(1).toLowerCase();
      return {
        name: titleCase,
        count: item.count,
        profit: item.profit,
        color: DEFAULT_COLORS[index % DEFAULT_COLORS.length],
      };
    });
    setData(transformedData);
  }, [rawData]);

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // Custom Label Renderer for Count
  const renderCountLabel = (props: any) => {
    const { x, y, width, value } = props;
    const dy = value < 0 ? 14 : -4;
    return (
      <text
        x={x + width / 2}
        y={y}
        dy={dy}
        fill="red"
        fontSize={12}
        textAnchor="middle"
        fontWeight="bold"
      >
        {new Intl.NumberFormat("vi-VN").format(value)}
      </text>
    );
  };

  // Custom Label Renderer for Profit
  const renderProfitLabel = (props: any) => {
    const { x, y, width, value } = props;
    const dy = value < 0 ? 14 : -4;
    return (
      <text
        x={x + width / 2}
        y={y}
        dy={dy}
        fill="yellow"
        fontSize={12}
        textAnchor="middle"
        fontWeight="bold"
      >
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value)}
      </text>
    );
  };

  return (
    <div className="w-full h-96">
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
          {/* Y-Axis for Count */}
          <YAxis yAxisId="left" />
          {/* Y-Axis for Profit */}
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={(value: number) =>
              new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(value / 1000)
            }
          />
          <Tooltip
            formatter={(value: number, name: string) =>
              name === "profit"
                ? new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(value)
                : new Intl.NumberFormat("vi-VN").format(value)
            }
          />
          {/* Bar for Count */}
          <Bar dataKey="count" name="Matched Count" yAxisId="left">
            {data.map((entry, index) => (
              <Cell
                key={`cell-count-${index}`}
                fill={entry.count > 0 ? "#00ff0059" : "#ff000059"}
              />
            ))}
            <LabelList dataKey="count" content={renderCountLabel} />
          </Bar>
          {/* Bar for Profit */}
          <Bar dataKey="profit" name="Profit" yAxisId="right">
            {data.map((entry, index) => (
              <Cell
                key={`cell-profit-${index}`}
                fill={entry.profit > 0 ? "#0000ff59" : "#ff000059"}
              />
            ))}
            <LabelList dataKey="profit" content={renderProfitLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default AlgorithmChart;

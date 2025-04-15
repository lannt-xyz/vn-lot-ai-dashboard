// filepath: src/global.d.ts
export { };

declare global {
}

export interface ProfitChartItemData {
    color: string;
    label: string;
    value: number;
}

export interface ProfitChartData {
    [key: string]: ProfitChartItemData[];
}

export interface ProfitChartBar {
    name: string;
    value: number;
    color: string;
}

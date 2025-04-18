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

export interface MatchedChartData {
    date: string;
    type: string;
    count: number;
}

export interface DataRow {
    [key: string]: string | ReactNode;
}

export interface DataHeader {
    key: string;
    text: string;
    widthClass?: string;
    align?: 'left' | 'center' | 'right';
    dataAlign?: 'left' | 'center' | 'right';
    columnType?: 'text' | 'node';
}

export interface Ticket {
    date: string;
    cityCode: string;
    type: string;
    lotNumber: string;
    matchedCount: number;
    pay: number;
    win: number;
}

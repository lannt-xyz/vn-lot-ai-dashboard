// filepath: src/global.d.ts
export { };

declare global {
    interface Window {
        TradingView: {
            widget: new (options: TradingViewWidgetOptions) => void;
        };
    }
}

interface TradingViewWidgetOptions {
    container_id: string | undefined;
    autosize: boolean;
    symbol: string;
    interval: string;
    timezone: string;
    theme: string;
    style: string;
    locale: string;
    toolbar_bg: string;
    enable_publishing: boolean;
    allow_symbol_change: boolean;
    hide_side_toolbar: boolean;
    hide_top_toolbar: boolean;
}

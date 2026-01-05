// Interface untuk card trend (trend info current vs previous)
export interface TrendSummary {
    current: number;
    previous: number;
}

// Interface untuk Card utama
export interface HomepageCards {
    balance: number;
    income: TrendSummary;
    expense: TrendSummary;
}

// Interface untuk CHART (Grafik Keuangan)
export interface HomepageChartItem {
    name: string;
    income: number;
    expense: number;
}

// Interface untuk TABLE (Riwayat Transaksi)
export interface HomepageTransactionRow {
    id: string;
    date: string;
    description: string;
    category: string;
    income: number;
    expense: number;
    balance: number;
    proof: string | null;
}

// Interface RESPONSE UTAMA
export interface HomePageSummaryResponse {
    cards: HomepageCards;
    chart: HomepageChartItem[];
    table: HomepageTransactionRow[];
}
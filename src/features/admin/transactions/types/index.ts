export interface Transaction {
    balance: number;
    category: string;
    date: string;
    description: string;
    expense: number;
    id: string;
    income: number;
    proof: string | null;
    type: "IN" | "OUT";
    deleted_at: string | null;
    deleted_by: string | null;
}

export interface GetTransactionsResponse {
    meta: {
        total: number;
    }
    data: Transaction[];
}

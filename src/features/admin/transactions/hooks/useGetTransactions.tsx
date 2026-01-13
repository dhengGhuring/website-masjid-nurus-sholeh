"use client";

import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { GetTransactionsResponse } from "../types";

interface UseGetTransactionsProps {
    p_type: string | null;
    p_category_id: string | null;
    p_start_date: string | null;
    p_end_date: string | null;
    p_limit: number;
    p_offset: number;
}

import { useEffect } from "react";
import { useToast } from "@/hooks/useToast";

export const useGetTransactions = ({ p_type, p_category_id, p_start_date, p_end_date, p_limit, p_offset }: UseGetTransactionsProps) => {
    const supabase = createClient();
    const { error: toastError } = useToast();

    const query = useQuery({
        queryKey: ["transactions", "list", { p_type, p_category_id, p_start_date, p_end_date, p_limit, p_offset }],
        queryFn: async () => {
            const { data, error } = await supabase.rpc("get_transactions", {
                p_type,
                p_category_id,
                p_start_date,
                p_end_date,
                p_limit,
                p_offset,
            });

            if (error) {
                throw error;
            }

            return data as GetTransactionsResponse;
        },
    });

    useEffect(() => {
        if (query.error) {
            toastError("Gagal mengambil data", query.error.message);
        }
    }, [query.error, toastError]);

    return query;
}
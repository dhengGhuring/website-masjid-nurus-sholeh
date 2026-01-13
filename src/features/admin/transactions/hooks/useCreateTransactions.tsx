"use client";

import { createClient } from "@/lib/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Transaction } from "../types";
import { useToast } from "@/hooks/useToast";

interface UseCreateTransactionsProps {
    date: string;
    type: "IN" | "OUT";
    amount: number;
    category_id: string;
    description: string;
    proof_url?: string | null;
}

export const useCreateTransactions = () => {
    const supabase = createClient();
    const queryClient = useQueryClient();
    const { success: toastSuccess, error: toastError } = useToast();

    return useMutation({
        mutationFn: async ({
            date,
            type,
            amount,
            category_id,
            description,
            proof_url,
        }: UseCreateTransactionsProps): Promise<Transaction> => {
            const { data, error } = await supabase.rpc("create_transaction", {
                p_date: date,
                p_type: type,
                p_amount: amount,
                p_category_id: category_id,
                p_description: description,
                p_proof_url: proof_url ?? null,
            });

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            toastSuccess("Success", "Transaksi berhasil disimpan");
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
        },
        onError: (error) => {
            toastError("Error", "Gagal menyimpan data");
            console.error(error);
        }
    });
};

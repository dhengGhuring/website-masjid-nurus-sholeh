"use client";

import { createClient } from "@/lib/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/useToast";

export const useUpdateTransaction = () => {
    const supabase = createClient();
    const queryClient = useQueryClient();
    const { success: toastSuccess, error: toastError } = useToast();

    return useMutation({
        mutationFn: async (payload: {
            id: string;
            date?: string;
            type?: "IN" | "OUT";
            amount?: number;
            category_id?: string;
            description?: string;
            proof_url?: string | null;
        }) => {
            const { data, error } = await supabase.rpc("update_transaction", {
                p_id: payload.id,
                p_date: payload.date,
                p_type: payload.type,
                p_amount: payload.amount,
                p_category_id: payload.category_id,
                p_description: payload.description,
                p_proof_url: payload.proof_url
            });

            if (error) throw error;
            return data; // ← return updated transaction row
        },
        onSuccess: () => {
            toastSuccess("Success", "Transaksi berhasil diperbarui");
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
        },
        onError: (error) => {
            toastError("Error", "Gagal memperbarui data");
            console.error(error);
        }
    });
};
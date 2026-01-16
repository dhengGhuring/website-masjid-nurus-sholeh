"use client";

import { createClient } from "@/lib/supabase/client";
import { useMutation } from "@tanstack/react-query";

interface UseBindProofToTransactionProps {
    transactionId: string;
    proofUrl: string;
}

export const useBindProofToTransaction = () => {
    const supabase = createClient();

    return useMutation({
        mutationFn: async ({ transactionId, proofUrl }: UseBindProofToTransactionProps) => {
            const { data, error } = await supabase.rpc("attach_transaction_proof", {
                p_transaction_id: transactionId,
                p_proof_url: proofUrl
            });
            if (error) throw error;
            return data;
        }
    })
}
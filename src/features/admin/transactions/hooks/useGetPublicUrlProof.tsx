"use client";

import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface UseGetPublicUrlProofProps {
    filePath: string;
}

export const useGetPublicUrlProof = ({ filePath }: UseGetPublicUrlProofProps) => {
    const supabase = createClient();

    return useQuery({
        queryKey: ["get-public-url-proof", filePath],
        queryFn: () => {
            const { data } = supabase.storage.from("transaction-proofs").getPublicUrl(filePath);
            return data.publicUrl;
        }
    })
}

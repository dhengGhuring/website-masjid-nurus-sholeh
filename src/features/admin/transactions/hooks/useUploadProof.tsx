"use client";

import { createClient } from "@/lib/supabase/client";
import { useMutation } from "@tanstack/react-query";

interface UseUploadProofProps {
    file: File;
    filePath: string;
}

export const useUploadProof = () => {
    const supabase = createClient();

    return useMutation({
        mutationFn: async ({ file, filePath }: UseUploadProofProps) => {
            const { data, error } = await supabase.storage.from("transaction-proofs").upload(filePath, file, {
                upsert: true,
            });
            if (error) throw error;

            // Return filePath to be consistent or useful
            return { ...data, filePath };
        }
    })

}
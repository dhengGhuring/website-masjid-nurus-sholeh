import { useEffect, useState } from "react";
import { getSignedProofUrl } from "@/lib/supabase/storage";

export function useTransactionProof(proofPath?: string | null) {
    // Format proofPath to be used in getSignedProofUrl
    const relativePath = proofPath?.includes("transaction-proofs/")
        ? proofPath.split("transaction-proofs/")[1]
        : proofPath;
    const [url, setUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let active = true;

        async function load() {
            if (!relativePath) {
                setUrl(null);
                return;
            }

            setLoading(true);
            const signedUrl = await getSignedProofUrl(relativePath);
            if (active) {
                setUrl(signedUrl);
                setLoading(false);
            }
        }

        load();
        return () => {
            active = false;
        };
    }, [relativePath]);

    return { url, loading };
}

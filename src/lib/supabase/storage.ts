import { createClient } from "@/lib/supabase/client";

const BUCKET_NAME = "transaction-proofs";
const SIGNED_URL_EXPIRE = 60 * 5; // 5 menit

export async function getSignedProofUrl(
    proofPath: string | null
): Promise<string | null> {
    if (!proofPath) return null;

    const supabase = createClient();

    const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .createSignedUrl(proofPath, SIGNED_URL_EXPIRE);

    if (error) {
        console.error("Failed to create signed URL:", error);
        return null;
    }

    return data.signedUrl;
}
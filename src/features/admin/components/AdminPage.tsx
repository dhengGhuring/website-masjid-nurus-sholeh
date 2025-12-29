"use client";

import { Button } from '@heroui/react'
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export const AdminPage = () => {
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    };

    return (
        <div>
            <h1>Admin Page</h1>
            <Button onPress={handleLogout}>Logout</Button>
        </div>
    )
}

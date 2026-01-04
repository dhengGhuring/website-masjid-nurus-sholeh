"use client";

import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { HomePageSummaryResponse } from "../types";

export const useHomePageSummary = ({ month, year }: { month: number | null, year: number }) => {
    const supabase = createClient();

    return useQuery({
        queryKey: ["home-page-summary", month, year],
        queryFn: async () => {
            const { data, error } = await supabase.rpc("get_homepage_summary", { p_month: month || null, p_year: year });

            if (error) {
                throw error;
            }

            return data as HomePageSummaryResponse;
        }
    })
}
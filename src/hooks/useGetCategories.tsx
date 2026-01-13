"use client";

import { createClient } from "@/lib/supabase/client";
import { Categories } from "@/types/categoriesType";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
    const supabase = createClient();

    return useQuery({
        queryKey: ["get_categories"],
        queryFn: async () => {
            const { data, error } = await supabase.rpc("get_categories");

            if (error) {
                throw error;
            }

            return data.data as Categories[];
        },
    });
}
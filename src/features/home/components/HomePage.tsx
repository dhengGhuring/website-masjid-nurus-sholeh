"use client";

import { supabase } from '@/lib/supabase/client';
import React from 'react'

export const HomePage = () => {
    const login = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: "adminmasjid@masjidnurussholeh.com",
            password: "password123"
        })

        if (error) {
            console.error(error.message)
        } else {
            console.log("Login berhasil", data)
        }
    }
    return (
        <div>
            <button onClick={login}>Login</button>
        </div>
    )
}

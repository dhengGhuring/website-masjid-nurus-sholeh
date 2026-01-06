"use client";

import { Link } from "@heroui/react";
import React from "react";

export const Footer = () => {
    return (
        <footer className="w-full border-t border-divider py-8 mt-20">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-small text-muted-foreground">
                    &copy; 2024 Masjid Nurus Sholeh. Transparansi untuk Keberkahan.
                </p>
                <div className="flex gap-6">
                    <Link href="#" size="sm" className="text-muted-foreground hover:text-foreground">
                        Tentang Kami
                    </Link>
                    <Link href="#" size="sm" className="text-muted-foreground hover:text-foreground">
                        Kontak
                    </Link>
                </div>
            </div>
        </footer>
    );
};

"use client";

import React from 'react';
import { StatsCard } from '@/features/layouts/components/StatsCard';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { FinanceChart } from './FinanceChart';
import { TransactionHistory } from './TransactionHistory';
import { Footer } from '@/features/layouts/components/Footer';

export const HomePage = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <div className="flex-grow">
                {/* Hero Section */}
                <div className="w-full bg-[image:var(--image-gradient-hero)] border-b border-divider">
                    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
                                Laporan Keuangan Masjid
                            </h1>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Transparansi dan akuntabilitas pengelolaan keuangan masjid untuk seluruh jamaah.
                                Semua data diperbarui secara berkala sebagai bentuk pertanggungjawaban publik.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10 w-full mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatsCard
                            title="Saldo Saat Ini"
                            value="Rp 125.500.000"
                            icon={Wallet}
                            type="balance"
                        />
                        <StatsCard
                            title="Total Pemasukan (Bulan Ini)"
                            value="Rp 67.000.000"
                            trend="↑ 12%"
                            trendDescription="dari bulan lalu"
                            trendType="positive"
                            icon={TrendingUp}
                            type="income"
                        />
                        <StatsCard
                            title="Total Pengeluaran (Bulan Ini)"
                            value="Rp 45.000.000"
                            trend="↓ 5%"
                            trendDescription="dari bulan lalu"
                            trendType="negative"
                            icon={TrendingDown}
                            type="expense"
                        />
                    </div>
                </div>

                {/* Charts Section */}
                <div className="max-w-7xl mx-auto px-6 w-full mb-16">
                    <FinanceChart />
                </div>

                {/* Transaction History Section */}
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <TransactionHistory />
                </div>
            </div>

            <Footer />
        </div>
    )
}

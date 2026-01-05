"use client";

import React from 'react';
import { StatsCard } from '@/features/layouts/components/StatsCard';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { FinanceChart } from './FinanceChart';
import { TransactionHistory } from './TransactionHistory';
import { Footer } from '@/features/layouts/components/Footer';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { useHomePageSummary } from '../hooks/useHomePageSummary';
import { Spinner } from '@heroui/react';

export const HomePage = () => {
    // state month dan year untuk useHomePageSummary
    // Initialize with current month (1-12)
    const [month, setMonth] = React.useState<number | null>(new Date().getMonth() + 1);
    const [year, setYear] = React.useState<number>(new Date().getFullYear());

    // Fetch data from Supabase
    const { data: homePageSummary, isLoading } = useHomePageSummary({ month, year });

    // Hitung trend
    const currentIncome = homePageSummary?.cards?.income?.current || 0
    const previousIncome = homePageSummary?.cards?.income?.previous || 0
    const trendIncome = ((currentIncome - previousIncome) / previousIncome) * 100
    // Menggunakan isFinite untuk menangani NaN dan Infinity
    const trendIncomeFormatted = isFinite(trendIncome) ? trendIncome.toFixed(2) : "0.00"

    const currentExpense = homePageSummary?.cards?.expense?.current || 0
    const previousExpense = homePageSummary?.cards?.expense?.previous || 0
    const trendExpense = ((currentExpense - previousExpense) / previousExpense) * 100
    // Menggunakan isFinite untuk menangani NaN dan Infinity
    const trendExpenseFormatted = isFinite(trendExpense) ? trendExpense.toFixed(2) : "0.00"

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <div className="grow">
                {/* Hero Section */}
                <div className="w-full bg-(image:--image-gradient-hero) border-b border-divider">
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
                            value={isLoading ? <Spinner /> : formatCurrency(homePageSummary?.cards?.balance || 0)}
                            icon={Wallet}
                            type="balance"
                        />
                        <StatsCard
                            title="Total Pemasukan (Bulan Ini)"
                            value={isLoading ? <Spinner /> : formatCurrency(homePageSummary?.cards?.income?.current || 0)}
                            trend={isLoading ? <Spinner /> : `${trendIncomeFormatted}%`}
                            trendDescription="dari bulan lalu"
                            trendType="positive"
                            icon={TrendingUp}
                            type="income"
                        />
                        <StatsCard
                            title="Total Pengeluaran (Bulan Ini)"
                            value={isLoading ? <Spinner /> : formatCurrency(homePageSummary?.cards?.expense?.current || 0)}
                            trend={isLoading ? <Spinner /> : `${trendExpenseFormatted}%`}
                            trendDescription="dari bulan lalu"
                            trendType="negative"
                            icon={TrendingDown}
                            type="expense"
                        />
                    </div>
                </div>

                {/* Charts Section */}
                <div className="max-w-7xl mx-auto px-6 w-full mb-16">
                    <FinanceChart isLoading={isLoading} grafik={homePageSummary?.chart || []} />
                </div>

                {/* Transaction History Section */}
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <TransactionHistory
                        isLoading={isLoading}
                        transactions={homePageSummary?.table || []}
                        setMonthFilter={setMonth}
                        setYearFilter={setYear}
                        selectedMonth={month}
                        selectedYear={year}
                    />
                </div>
            </div>

            <Footer />
        </div>
    )
}

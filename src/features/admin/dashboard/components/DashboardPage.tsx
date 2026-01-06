"use client";

import React from 'react';
import { Sidebar } from '@/features/layouts/components/Sidebar';
import { StatsCard } from '@/features/layouts/components/StatsCard';
import { FinanceChart } from '@/features/layouts/components/FinanceChart';
import { TransactionHistory } from '@/features/layouts/components/TransactionHistory';
import { Wallet, TrendingUp, TrendingDown, ChevronLeft } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/formatCurrency';
import { useHomePageSummary } from '@/features/home/hooks/useHomePageSummary';
import { Spinner, Button } from '@heroui/react';
import Link from 'next/link';

export const AdminDashboardPage = () => {
    const [month, setMonth] = React.useState<number | null>(new Date().getMonth() + 1);
    const [year, setYear] = React.useState<number>(new Date().getFullYear());

    const { data: homePageSummary, isLoading } = useHomePageSummary({ month, year });

    const currentIncome = homePageSummary?.cards?.income?.current || 0
    const previousIncome = homePageSummary?.cards?.income?.previous || 0
    const trendIncome = ((currentIncome - previousIncome) / previousIncome) * 100
    const trendIncomeFormatted = isFinite(trendIncome) ? trendIncome.toFixed(2) : "0.00"

    const currentExpense = homePageSummary?.cards?.expense?.current || 0
    const previousExpense = homePageSummary?.cards?.expense?.previous || 0
    const trendExpense = ((currentExpense - previousExpense) / previousExpense) * 100
    const trendExpenseFormatted = isFinite(trendExpense) ? trendExpense.toFixed(2) : "0.00"

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            <Sidebar />

            <main className="flex-1 p-8 overflow-y-auto">
                {/* Header */}
                <div className="mb-8">
                    {/* Breadcrumb-ish or Back button if needed, but per design just title */}
                    <h1 className="text-2xl font-bold text-gray-800">Beranda Admin</h1>
                    <p className="text-gray-500">Assalamualaikum! Kayfa haluka? Berikut ringkasan keuangan masjid.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatsCard
                        title="Saldo Saat Ini"
                        value={isLoading ? <Spinner /> : formatCurrency(homePageSummary?.cards?.balance || 0)}
                        icon={Wallet}
                        type="balance"
                    />
                    <StatsCard
                        title="Pemasukan Bulan Ini"
                        value={isLoading ? <Spinner /> : formatCurrency(homePageSummary?.cards?.income?.current || 0)}
                        trend={isLoading ? <Spinner /> : `${trendIncomeFormatted}%`}
                        trendDescription="dari bulan lalu"
                        trendType="positive"
                        icon={TrendingUp}
                        type="income"
                    />
                    <StatsCard
                        title="Pengeluaran Bulan Ini"
                        value={isLoading ? <Spinner /> : formatCurrency(homePageSummary?.cards?.expense?.current || 0)}
                        trend={isLoading ? <Spinner /> : `${trendExpenseFormatted}%`}
                        trendDescription="dari bulan lalu"
                        trendType="negative"
                        icon={TrendingDown}
                        type="expense"
                    />
                </div>

                {/* Charts Section */}
                <div className="mb-8">
                    <FinanceChart isLoading={isLoading} grafik={homePageSummary?.chart || []} />
                </div>

                {/* Transaction History Section */}
                <div>
                    <TransactionHistory
                        isLoading={isLoading}
                        transactions={homePageSummary?.table || []}
                        setMonthFilter={setMonth}
                        setYearFilter={setYear}
                        selectedMonth={month}
                        selectedYear={year}
                        isOnAdminPage
                    />
                </div>
            </main>
        </div>
    );
};

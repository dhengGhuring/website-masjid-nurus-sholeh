"use client";

import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { Card, CardBody, Spinner } from "@heroui/react";
import { formatCurrency } from "@/lib/utils/formatCurrency";

interface FinanceChartData {
    grafik: {
        name: string;
        income: number;
        expense: number;
    }[];
    isLoading: boolean;
}

const formatYAxis = (value: number) => {
    if (value >= 1000000) {
        return `${value / 1000000}jt`;
    }
    return `${value}`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-100 min-w-[200px]">
                <p className="font-bold text-foreground mb-3 text-lg">{label}</p>
                <div className="space-y-2">
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                            <div
                                className={`w-2 h-2 rounded-full ${entry.dataKey === "income" ? "bg-success" : "bg-danger"
                                    }`}
                            />
                            <span className="text-sm text-muted-foreground capitalize w-24">
                                {entry.dataKey === "income" ? "Pemasukan" : "Pengeluaran"}
                            </span>
                            <span
                                className={`text-sm font-semibold ${entry.dataKey === "income" ? "text-success" : "text-danger"
                                    }`}
                            >
                                : {formatCurrency(entry.value)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

export const FinanceChart = ({ grafik, isLoading }: FinanceChartData) => {
    return (
        <Card className="shadow-sm border border-divider" radius="lg">
            <CardBody className={`p-6 ${isLoading ? "h-[400px]" : ""}`}>
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-foreground">Grafik Keuangan</h3>
                    <p className="text-sm text-muted-foreground">
                        Perbandingan pemasukan dan pengeluaran 6 bulan terakhir
                    </p>
                </div>
                {isLoading && (
                    <div className="flex items-center justify-center h-[400px] w-full">
                        <Spinner />
                    </div>
                )}
                {!isLoading && grafik.length === 0 && (
                    <div className="flex items-center justify-center h-[400px] w-full">
                        <p className="text-muted-foreground">Belum ada Grafik Keuangan</p>
                    </div>
                )}
                {!isLoading && grafik.length > 0 && (
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={grafik}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                                barGap={8}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                    tickFormatter={formatYAxis}
                                />
                                <Tooltip
                                    content={<CustomTooltip />}
                                    cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                                />
                                <Legend
                                    wrapperStyle={{ paddingTop: '20px' }}
                                    iconType="rect"
                                    formatter={(value) => (
                                        <span className="text-sm text-muted-foreground ml-1">
                                            {value === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                                        </span>
                                    )}
                                />
                                <Bar
                                    dataKey="income"
                                    fill="var(--income)"
                                    radius={[4, 4, 0, 0]}
                                    maxBarSize={50}
                                />
                                <Bar
                                    dataKey="expense"
                                    fill="var(--expense)"
                                    radius={[4, 4, 0, 0]}
                                    maxBarSize={50}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </CardBody>
        </Card>
    );
};

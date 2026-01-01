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
import { Card, CardBody } from "@heroui/react";

const data = [
    { name: "Jan", income: 45000000, expense: 32000000 },
    { name: "Feb", income: 52000000, expense: 38000000 },
    { name: "Mar", income: 48000000, expense: 42000000 },
    { name: "Apr", income: 61000000, expense: 35000000 },
    { name: "Mei", income: 55000000, expense: 40000000 },
    { name: "Jun", income: 67000000, expense: 45000000 },
];

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

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

export const FinanceChart = () => {
    return (
        <Card className="shadow-sm border border-divider" radius="lg">
            <CardBody className="p-6">
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-foreground">Grafik Keuangan</h3>
                    <p className="text-sm text-muted-foreground">
                        Perbandingan pemasukan dan pengeluaran 6 bulan terakhir
                    </p>
                </div>

                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
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
            </CardBody>
        </Card>
    );
};

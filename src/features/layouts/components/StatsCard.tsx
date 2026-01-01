import { Card, CardBody } from "@heroui/react";
import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string;
    trend?: string;
    trendDescription?: string;
    trendType?: "positive" | "negative";
    icon: LucideIcon;
    type: "balance" | "income" | "expense";
}

export const StatsCard = ({
    title,
    value,
    trend,
    trendDescription,
    trendType,
    icon: Icon,
    type,
}: StatsCardProps) => {
    const getBorderColor = () => {
        switch (type) {
            case "balance":
                return "border-l-primary"; // Using primary green
            case "income":
                return "border-l-success"; // Using success for income
            case "expense":
                return "border-l-danger"; // Using danger for expense
            default:
                return "border-l-primary";
        }
    };

    const getIconBg = () => {
        switch (type) {
            case "balance":
                return "bg-primary-50 text-primary";
            case "income":
                return "bg-success-50 text-success";
            case "expense":
                return "bg-danger-50 text-danger";
            default:
                return "bg-default-100 text-default-500";
        }
    }

    const getTrendColor = () => {
        if (trendType === 'positive') return 'text-success';
        if (trendType === 'negative') return 'text-danger';
        return 'text-muted-foreground';
    }

    return (
        <Card className={`border-l-4 ${getBorderColor()} shadow-sm hover:shadow-md transition-shadow`} radius="sm">
            <CardBody className="p-4 flex flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <h3 className="text-2xl font-bold text-foreground tracking-tight">{value}</h3>

                    {(trend || trendDescription) && (
                        <div className="flex items-center gap-1 text-xs">
                            <span className={`${getTrendColor()} font-medium`}>{trend}</span>
                            <span className="text-muted-foreground">{trendDescription}</span>
                        </div>
                    )}
                </div>

                <div className={`p-3 rounded-lg ${getIconBg()}`}>
                    <Icon size={24} />
                </div>
            </CardBody>
        </Card>
    );
};

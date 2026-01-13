import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    onClose: (id: string) => void;
    duration?: number;
}

const toastConfig = {
    success: {
        icon: CheckCircle,
        bgColor: 'bg-[#E8F5E9]', // Light green
        borderColor: 'border-[#2E9E5F]', // Green from user config
        iconColor: 'text-[#2E9E5F]',
        textColor: 'text-[#1B2E25]',
    },
    error: {
        icon: XCircle,
        bgColor: 'bg-[#FFEBEE]', // Light red
        borderColor: 'border-[#E53935]', // Red
        iconColor: 'text-[#E53935]',
        textColor: 'text-[#1B2E25]',
    },
    warning: {
        icon: AlertCircle,
        bgColor: 'bg-[#FFF8E1]', // Light amber/yellow
        borderColor: 'border-[#F57C00]', // Orange/Amber
        iconColor: 'text-[#F57C00]',
        textColor: 'text-[#1B2E25]',
    },
    info: {
        icon: Info,
        bgColor: 'bg-[#E1F5FE]', // Light blue
        borderColor: 'border-[#0288D1]', // Blue
        iconColor: 'text-[#0288D1]',
        textColor: 'text-[#1B2E25]',
    },
};

export const Toast: React.FC<ToastProps> = ({ id, type, title, message, onClose, duration = 3000 }) => {
    const config = toastConfig[type];
    const Icon = config.icon;

    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                onClose(id);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [id, duration, onClose]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className={`flex items-start gap-3 p-4 rounded-lg border shadow-sm w-full max-w-sm relative ${config.bgColor} ${config.borderColor}`}
        >
            <div className={`mt-0.5 shrink-0 ${config.iconColor}`}>
                <Icon size={20} />
            </div>
            <div className="flex-1 mr-4">
                <h4 className={`font-semibold text-sm ${config.textColor}`}>
                    {title}
                </h4>
                {message && (
                    <p className={`text-sm mt-1 opacity-90 ${config.textColor}`}>
                        {message}
                    </p>
                )}
            </div>
            <button
                onClick={() => onClose(id)}
                className={`absolute top-4 right-4 p-0.5 rounded-full hover:bg-black/5 transition-colors ${config.iconColor}`}
            >
                <X size={14} />
            </button>
        </motion.div>
    );
};

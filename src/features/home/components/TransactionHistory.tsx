"use client";

import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
    Select,
    SelectItem,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Image,
    Card,
} from "@heroui/react";
import { ChevronDown, Search, Download, Image as ImageIcon, Calendar } from "lucide-react";

const columns = [
    { name: "Tanggal", uid: "date" },
    { name: "Keterangan", uid: "description" },
    { name: "Kategori", uid: "category" },
    { name: "Pemasukan", uid: "income" },
    { name: "Pengeluaran", uid: "expense" },
    { name: "Saldo", uid: "balance" },
    { name: "Bukti", uid: "proof" },
];

const transactions = [
    {
        id: 1,
        date: "27 Des 2024",
        description: "Infaq Jumat",
        category: "Infaq",
        categoryColor: "default",
        income: 5500000,
        expense: 0,
        balance: 125500000,
        proof: "/docs/images/fruit-1.jpeg", // Placeholder
    },
    {
        id: 2,
        date: "26 Des 2024",
        description: "Pembayaran Listrik",
        category: "Operasional",
        categoryColor: "secondary",
        income: 0,
        expense: 1200000,
        balance: 120000000,
        proof: "/docs/images/fruit-2.jpeg",
    },
    {
        id: 3,
        date: "25 Des 2024",
        description: "Donasi Jamaah",
        category: "Donasi",
        categoryColor: "primary",
        income: 10000000,
        expense: 0,
        balance: 121200000,
        proof: null,
    },
    {
        id: 4,
        date: "24 Des 2024",
        description: "Pembelian Perlengkapan",
        category: "Inventaris",
        categoryColor: "secondary",
        income: 0,
        expense: 2500000,
        balance: 111200000,
        proof: "/docs/images/fruit-3.jpeg",
    },
    {
        id: 5,
        date: "23 Des 2024",
        description: "Zakat Fitrah",
        category: "Zakat",
        categoryColor: "default",
        income: 15000000,
        expense: 0,
        balance: 113700000,
        proof: null,
    },
];

const categoryColorMap: Record<string, "default" | "primary" | "secondary" | "success" | "warning" | "danger"> = {
    Infaq: "success",
    Operasional: "default",
    Donasi: "primary",
    Inventaris: "warning",
    Zakat: "success",
};

const formatCurrency = (value: number) => {
    if (value === 0) return "-";
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export const TransactionHistory = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedProof, setSelectedProof] = React.useState<string | null>(null);

    const handleViewProof = (proofUrl: string) => {
        setSelectedProof(proofUrl);
        onOpen();
    }

    const renderCell = React.useCallback((transaction: any, columnKey: React.Key) => {
        const cellValue = transaction[columnKey as keyof typeof transaction];

        switch (columnKey) {
            case "category":
                return (
                    <Chip className="capitalize" color={categoryColorMap[transaction.category]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "income":
                return (
                    <span className={transaction.income > 0 ? "text-success font-medium" : "text-muted-foreground"}>
                        {formatCurrency(transaction.income)}
                    </span>
                );
            case "expense":
                return (
                    <span className={transaction.expense > 0 ? "text-danger font-medium" : "text-muted-foreground"}>
                        {formatCurrency(transaction.expense)}
                    </span>
                );
            case "balance":
                return (
                    <span className="font-semibold text-foreground">
                        {formatCurrency(transaction.balance)}
                    </span>
                );
            case "proof":
                return transaction.proof ? (
                    <div className="cursor-pointer text-success hover:text-success-600 transition-colors" onClick={() => handleViewProof(transaction.proof)}>
                        <ImageIcon size={18} />
                    </div>
                ) : (
                    <span className="text-muted-foreground">-</span>
                );
            case "date":
                return (
                    <span className="text-foreground font-medium whitespace-nowrap">
                        {cellValue}
                    </span>
                )
            default:
                return cellValue;
        }
    }, []);

    return (
        <div className="w-full space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h3 className="text-xl font-bold text-foreground">Riwayat Transaksi</h3>
                    <p className="text-sm text-muted-foreground">
                        Daftar transaksi keuangan masjid
                    </p>
                </div>
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    <Select
                        placeholder="Bulan"
                        className="w-32"
                        defaultSelectedKeys={["desember"]}
                        size="sm"
                        startContent={<Calendar size={14} />}
                    >
                        <SelectItem key="desember">Desember</SelectItem>
                        <SelectItem key="november">November</SelectItem>
                    </Select>
                    <Select
                        placeholder="Tahun"
                        className="w-24"
                        defaultSelectedKeys={["2024"]}
                        size="sm"
                    >
                        <SelectItem key="2024">2024</SelectItem>
                        <SelectItem key="2023">2023</SelectItem>
                    </Select>
                    <Button
                        startContent={<Download size={16} />}
                        variant="bordered"
                        className="font-medium"
                        size="sm" // Matches select size
                    >
                        Download PDF
                    </Button>
                </div>
            </div>

            <Card className="shadow-sm border border-divider overflow-x-auto" radius="lg">
                <Table
                    aria-label="Transaction history table"
                    removeWrapper
                    className="p-2 min-w-[800px]"
                    classNames={{
                        th: "bg-transparent text-default-500 font-medium",
                        td: "py-3"
                    }}
                >
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.uid} align={column.uid === "proof" ? "center" : "start"}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={transactions}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" backdrop="blur">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Bukti Transaksi</ModalHeader>
                            <ModalBody className="pb-8 items-center">
                                {selectedProof ? (
                                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                                        {/* In real app, use Next.js Image with fill, but for now standard img tag for external urls or placeholders if needed */}
                                        <img
                                            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop"
                                            alt="Bukti Transaksi"
                                            className="object-contain max-h-[400px] w-full"
                                        />
                                        {/* Using a placeholder image from unsplash that looks like finance/documents since local paths provided in array don't exist */}
                                    </div>
                                ) : (
                                    <p>Tidak ada bukti tersedia.</p>
                                )}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  SelectItem,
  DateRangePicker,
} from "@heroui/react";
import { Plus, Search } from "lucide-react";
import { HomepageTransactionRow } from "@/features/home/types";
import { TransactionTable } from "./TransactionTable";
import { AddTransactionModal } from "./AddTransactionModal";
import { DeleteTransactionModal } from "./DeleteTransactionModal";
import { Sidebar } from "@/features/layouts/components/Sidebar";
import { useGetTransactions } from "../hooks/useGetTransactions";
import { useGetCategories } from "@/hooks/useGetCategories";
import { Transaction } from "../types";
import { useSoftDeleteTransaction } from "../hooks/useSoftDeleteTransaction";

// Daftar Type
const typeOptions = [
  { value: "", label: "Semua Jenis" },
  { value: "IN", label: "Pemasukan" },
  { value: "OUT", label: "Pengeluaran" },
];

export const TransactionsPage = () => {
  // Filter States
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<any>(null);

  // Format dates for API
  const startDate = dateRange?.start
    ? `${dateRange.start.year}-${String(dateRange.start.month).padStart(
        2,
        "0"
      )}-${String(dateRange.start.day).padStart(2, "0")}`
    : null;
  const endDate = dateRange?.end
    ? `${dateRange.end.year}-${String(dateRange.end.month).padStart(
        2,
        "0"
      )}-${String(dateRange.end.day).padStart(2, "0")}`
    : null;

  // Fetch Transactions
  const { data: transactions, isLoading } = useGetTransactions({
    p_type: selectedType,
    p_category_id: selectedCategory,
    p_start_date: startDate,
    p_end_date: endDate,
    p_limit: 10,
    p_offset: 0,
  });
  // Fetch Categories
  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategories();

  // Format Categories for Select
  const formattedCategories = [
    { value: "", label: "Semua Kategori" },
    ...(categories?.map((category) => ({
      value: category.id,
      label: category.name,
    })) || []),
  ];

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] =
    useState<Transaction | null>(null);
  const [transactionToEdit, setTransactionToEdit] =
    useState<Transaction | null>(null);

  const handleAddTransaction = () => {
    setIsAddModalOpen(false);
  };

  const handleEditTransaction = () => {
    // setTransactions(transactions.map(t => t.id === updatedTransaction.id ? updatedTransaction : t));
    setTransactionToEdit(null);
    setIsAddModalOpen(false); // Close modal if used for edit
  };

  const softDeleteTransaction = useSoftDeleteTransaction();

  const handleDeleteTransaction = async (id: string) => {
    try {
      await softDeleteTransaction.mutateAsync(id);
      setTransactionToDelete(null);
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  };

  const openEditModal = (transaction: Transaction) => {
    setTransactionToEdit(transaction);
    setIsAddModalOpen(true);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Manajemen Transaksi
            </h1>
            <p className="text-muted-foreground">
              Kelola semua transaksi keuangan masjid
            </p>
          </div>
          <Button
            className="bg-emerald-600 text-white font-medium"
            startContent={<Plus size={20} />}
            onPress={() => {
              setTransactionToEdit(null);
              setIsAddModalOpen(true);
            }}
          >
            Tambah Transaksi
          </Button>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center my-5">
          <Select
            placeholder="Semua Jenis"
            className="w-[140px]"
            size="sm"
            selectedKeys={selectedType ? [selectedType] : []}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "") {
                setSelectedType(null);
              } else {
                setSelectedType(val);
              }
            }}
          >
            {typeOptions.map((option) => (
              <SelectItem key={option.value}>{option.label}</SelectItem>
            ))}
          </Select>
          <Select
            placeholder="Semua Kategori"
            className="w-[160px]"
            size="sm"
            selectedKeys={selectedCategory ? [selectedCategory] : []}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "") {
                setSelectedCategory(null);
              } else {
                setSelectedCategory(val);
              }
            }}
            isLoading={isLoadingCategories}
          >
            {formattedCategories?.map((category) => (
              <SelectItem key={category.value}>{category.label}</SelectItem>
            ))}
          </Select>
          <div className="flex items-center gap-2">
            <DateRangePicker
              label="Periode"
              className="max-w-xs"
              size="sm"
              labelPlacement="outside-left"
              value={dateRange}
              onChange={setDateRange}
            />
            {dateRange && (
              <Button
                size="sm"
                variant="light"
                color="danger"
                onPress={() => setDateRange(null)}
                className="min-w-fit px-2"
              >
                Reset
              </Button>
            )}
          </div>
        </div>

        <TransactionTable
          transactions={
            transactions?.data.filter(
              (transaction) => transaction.deleted_at === null
            ) || []
          }
          isLoading={isLoading}
          onEdit={openEditModal}
          onDelete={setTransactionToDelete}
        />

        <AddTransactionModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={
            transactionToEdit ? handleEditTransaction : handleAddTransaction
          }
          initialData={transactionToEdit}
          listCategories={
            categories?.map((category) => ({
              value: category.id,
              label: category.name,
              type: category.type,
            })) || []
          }
        />

        <DeleteTransactionModal
          isOpen={!!transactionToDelete}
          onClose={() => setTransactionToDelete(null)}
          title={transactionToDelete?.description}
          onConfirm={() =>
            transactionToDelete &&
            handleDeleteTransaction(transactionToDelete.id)
          }
          isLoading={softDeleteTransaction.isPending}
        />
      </main>
    </div>
  );
};

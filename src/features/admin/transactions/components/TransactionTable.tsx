"use client";

import React, { useCallback, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Spinner,
  Button,
  Card,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/react";
import { Image as ImageIcon } from "lucide-react";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { Transaction } from "../types";
import { useTransactionProof } from "@/hooks/useTransactionProof";

interface TransactionTableProps {
  transactions: Transaction[];
  isLoading: boolean;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

const columns = [
  { name: "Tanggal", uid: "date" },
  { name: "Keterangan", uid: "description" },
  { name: "Kategori", uid: "category" },
  { name: "Pemasukan", uid: "income" },
  { name: "Pengeluaran", uid: "expense" },
  { name: "Saldo", uid: "balance" },
  { name: "Bukti", uid: "proof" },
  { name: "Aksi", uid: "actions" },
];

const categoryColorMap: Record<
  string,
  "default" | "primary" | "secondary" | "success" | "warning" | "danger"
> = {
  Infaq: "success",
  Operasional: "default",
  Donasi: "primary",
  Inventaris: "warning",
  Zakat: "success",
};

export const TransactionTable = ({
  transactions,
  isLoading,
  onEdit,
  onDelete,
}: TransactionTableProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedProof, setSelectedProof] = useState<string | null>(null);
  const { url: signedProofUrl, loading: signedProofLoading } =
    useTransactionProof(selectedProof);

  const handleViewProof = (proofPath: string) => {
    setSelectedProof(proofPath);
    onOpen();
  };

  const renderCell = useCallback(
    (transaction: any, columnKey: React.Key) => {
      const cellValue = transaction[columnKey as keyof typeof transaction];

      switch (columnKey) {
        case "category":
          return (
            <Chip
              className="capitalize"
              color={categoryColorMap[transaction.category]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "income":
          return (
            <span
              className={
                transaction.income > 0
                  ? "text-success font-medium"
                  : "text-muted-foreground"
              }
            >
              {formatCurrency(transaction.income)}
            </span>
          );
        case "expense":
          return (
            <span
              className={
                transaction.expense > 0
                  ? "text-danger font-medium"
                  : "text-muted-foreground"
              }
            >
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
            <div
              className="cursor-pointer hover:bg-success/10 p-2 rounded-xl text-success hover:text-success-600 transition-colors flex justify-center"
              onClick={() => handleViewProof(transaction.proof)}
            >
              <ImageIcon size={18} />
            </div>
          ) : (
            <div className="flex justify-center">
              <span className="text-muted-foreground">-</span>
            </div>
          );
        case "actions":
          return (
            <div className="flex gap-2 items-center">
              <Button
                size="sm"
                color="primary"
                onPress={() => onEdit(transaction)}
                className="text-sm font-medium"
              >
                Edit
              </Button>
              <Button
                size="sm"
                color="danger"
                onPress={() => onDelete(transaction)}
                className="text-sm font-medium"
              >
                Hapus
              </Button>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [onEdit, onDelete]
  );

  return (
    <>
      <Card
        className="shadow-sm border border-divider overflow-x-auto"
        radius="lg"
      >
        {isLoading && (
          <div className="p-4 flex justify-center">
            <Spinner />
          </div>
        )}
        {!isLoading && transactions.length === 0 && (
          <div className="flex items-center justify-center h-[200px] w-full">
            <p className="text-muted-foreground">Belum ada transaksi</p>
          </div>
        )}
        {!isLoading && transactions.length > 0 && (
          <Table
            aria-label="Transaction table"
            removeWrapper
            className="p-2 min-w-[800px] overflow-x-auto"
            classNames={{
              th: "bg-transparent text-default-500 font-medium",
              td: "py-3 border-b border-divider/50 last:border-none",
              base: "overflow-scroll",
            }}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={
                    column.uid === "proof" || column.uid === "actions"
                      ? "center"
                      : "start"
                  }
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={transactions}>
              {(item) => (
                <TableRow key={item.id} className="hover:bg-success/10">
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </Card>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Bukti Transaksi
              </ModalHeader>
              <ModalBody className="pb-8 items-center">
                {signedProofLoading || !signedProofUrl ? (
                  <div className="flex items-center justify-center">
                    <Spinner />
                  </div>
                ) : (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img
                      src={signedProofUrl}
                      alt="Bukti Transaksi"
                      className="object-contain max-h-[400px] w-full"
                    />
                  </div>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

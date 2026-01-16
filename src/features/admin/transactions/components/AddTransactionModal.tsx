"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  DatePicker,
  DateValue,
  Spinner,
} from "@heroui/react";
import { Upload, Trash } from "lucide-react";
import { Transaction } from "../types";
import { parseDate, getLocalTimeZone, today } from "@internationalized/date";
import { useCreateTransactions } from "../hooks/useCreateTransactions";
import { useUploadProof } from "../hooks/useUploadProof";
import { useBindProofToTransaction } from "../hooks/useBindProofToTransaction";
import { useUpdateTransaction } from "../hooks/useUpdateTransaction";
import { pathUploadFile } from "@/lib/utils/pathUploadFile";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { createClient } from "@/lib/supabase/client";
import { useTransactionProof } from "@/hooks/useTransactionProof";
import { Toast } from "@/components/ui/Toast";
import { useToast } from "@/context/ToastContext";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: Transaction | null;
  listCategories: { value: string; label: string; type: string }[];
}

export const AddTransactionModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  listCategories,
}: AddTransactionModalProps) => {
  const proofInputRef = React.useRef<HTMLInputElement>(null);
  const [type, setType] = React.useState<"Pemasukan" | "Pengeluaran">(
    "Pemasukan"
  );
  const [date, setDate] = React.useState<DateValue | null>(null);
  const [category, setCategory] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [proof, setProof] = React.useState<File | null>(null);
  const [proofPreview, setProofPreview] = React.useState<string | null>(null);
  const [isProofDeleted, setIsProofDeleted] = React.useState(false);
  const { success: toastSuccess, error: toastError } = useToast();
  const queryClient = useQueryClient();

  // Filter categories based on selected type
  const filteredCategories = React.useMemo(() => {
    const targetType = type === "Pemasukan" ? "IN" : "OUT";
    return listCategories.filter((c) => c.type === targetType);
  }, [listCategories, type]);

  // Reset or validate category when type changes
  useEffect(() => {
    if (!category) return;

    const currentCategory = listCategories.find((c) => c.value === category);
    const targetType = type === "Pemasukan" ? "IN" : "OUT";

    // If the currently selected category doesn't match the new type, reset it
    if (currentCategory && currentCategory.type !== targetType) {
      setCategory("");
    }
  }, [type, category, listCategories]);

  // Always fetch the signed URL if initialData exists, but we might choose not to display it
  const { url: signedProofUrl, loading: signedProofLoading } =
    useTransactionProof(initialData?.proof);

  // Determine what image to show
  // 1. If user selected a new file -> show proofPreview
  // 2. If no new file, but we have initial proof AND it wasn't deleted -> show signedProofUrl
  // 3. Otherwise -> show nothing (upload placeholder)
  const displayProofUrl =
    proofPreview || (!isProofDeleted ? signedProofUrl : null);
  const shouldShowPreview = !!displayProofUrl && !signedProofLoading;

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setType(initialData.type === "IN" ? "Pemasukan" : "Pengeluaran");

        // Handle Date Parsing
        try {
          if (initialData.date) {
            if (/^\d{4}-\d{2}-\d{2}$/.test(initialData.date)) {
              setDate(parseDate(initialData.date));
            } else {
              const legacyDate = new Date(initialData.date);
              if (!isNaN(legacyDate.getTime())) {
                const year = legacyDate.getFullYear();
                const month = String(legacyDate.getMonth() + 1).padStart(
                  2,
                  "0"
                );
                const day = String(legacyDate.getDate()).padStart(2, "0");
                const localIsoDate = `${year}-${month}-${day}`;
                const parsed = parseDate(localIsoDate);
                setDate(parsed);
              } else {
                setDate(null);
              }
            }
          }
        } catch (e) {
          console.error("Failed to parse date", e);
          setDate(null);
        }

        const categoryValue = listCategories.find(
          (category) => category.label === initialData.category
        )?.value;

        setCategory(categoryValue || "");
        // Format initial amount
        const initialAmount =
          initialData.income > 0 ? initialData.income : initialData.expense;
        setAmount(formatCurrency(initialAmount));
        setDescription(initialData.description);

        // Reset states for proof
        setProof(null);
        setProofPreview(null);
        setIsProofDeleted(false);
      } else {
        setType("Pemasukan");
        // eslint-disable-next-line
        // @ts-ignore
        setDate(today(getLocalTimeZone()));
        setCategory("");
        setAmount("");
        setDescription("");
        setProof(null);
        setProofPreview(null);
        setIsProofDeleted(false);
      }
    }
  }, [isOpen, initialData]);

  const handleAmountChange = (value: string) => {
    // Remove non-digit characters
    const cleanValue = value.replace(/\D/g, "");

    if (cleanValue === "") {
      setAmount("");
      return;
    }

    const numericValue = parseInt(cleanValue, 10);
    setAmount(formatCurrency(numericValue));
  };

  const createTransaction = useCreateTransactions({
    skipToast: true,
    skipInvalidate: true,
  });
  const updateTransaction = useUpdateTransaction({
    skipToast: true,
    skipInvalidate: true,
  });
  const uploadProof = useUploadProof();
  const bindProof = useBindProofToTransaction();
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Added validation for category
    if (!category) {
      toastError("Error", "Kategori tidak boleh kosong");
      setIsSubmitting(false);
      return;
    }

    try {
      const formattedDate = date ? date.toString() : "";
      let currentTransactionId = initialData?.id;

      // Clean amount string to get number
      const cleanAmount = amount.replace(/\D/g, "");
      const numericAmount = Number(cleanAmount);

      // 1. Create or Update Transaction Data
      if (initialData && currentTransactionId) {
        await updateTransaction.mutateAsync({
          id: currentTransactionId,
          date: formattedDate,
          type: type === "Pemasukan" ? "IN" : "OUT",
          amount: numericAmount,
          category_id: category,
          description: description,
          // If proof is deleted and NO new proof is selected, we should explicitly set it to null
          // If new proof is selected, we'll update it in step 4/5
          ...(isProofDeleted && !proof ? { proof_url: null } : {}),
        });
      } else {
        const newTransaction = await createTransaction.mutateAsync({
          date: formattedDate,
          type: type === "Pemasukan" ? "IN" : "OUT",
          amount: numericAmount,
          category_id: category,
          description: description,
          proof_url: null,
        });
        currentTransactionId = newTransaction.id;
      }

      let finalProofUrl = initialData?.proof || null;
      if (isProofDeleted && !proof) {
        finalProofUrl = null;
      }

      // 2. Upload Proof if NEW file exists
      if (proof && currentTransactionId) {
        const tDate = new Date(formattedDate);
        const year = tDate.getFullYear();
        const month = String(tDate.getMonth() + 1).padStart(2, "0");
        const fileExt = proof.name.split(".").pop();
        const fileName = `${currentTransactionId}.${fileExt}`;
        const filePath = `${year}/${month}/${fileName}`;
        await uploadProof.mutateAsync({
          file: proof,
          filePath: filePath,
        });
        // 3. Get Public URL
        const { data: publicUrlData } = supabase.storage
          .from("transaction-proofs")
          .getPublicUrl(filePath);
        finalProofUrl = publicUrlData.publicUrl;
        // 4. Bind Proof to Transaction
        if (finalProofUrl) {
          if (initialData) {
            await updateTransaction.mutateAsync({
              id: currentTransactionId,
              proof_url: finalProofUrl,
            });
          } else {
            await bindProof.mutateAsync({
              transactionId: currentTransactionId,
              proofUrl: finalProofUrl,
            });
          }
        }
      }

      // Construct final data for local UI update if needed
      const finalData = {
        id: currentTransactionId,
        date: formattedDate,
        type: type === "Pemasukan" ? "IN" : "OUT",
        amount: numericAmount,
        category_id: category,
        description: description,
        proof_url: finalProofUrl,
      };

      onSubmit(finalData);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toastSuccess("Success", "Transaksi berhasil disimpan");
      onClose();
    } catch (error) {
      toastError("Error", "Gagal menyimpan data");
      console.error("Failed to save transaction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveProof = () => {
    if (proof) {
      // Removing a newly selected file
      setProof(null);
      setProofPreview(null);
      if (proofInputRef.current) {
        proofInputRef.current.value = "";
      }
    } else if (initialData?.proof) {
      // Removing a previously saved proof
      setIsProofDeleted(true);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      size="lg"
      backdrop="blur"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {initialData ? "Edit Transaksi" : "Tambah Transaksi Baru"}
            </ModalHeader>
            <ModalBody className="gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Jenis Transaksi
                </label>
                <div className="flex bg-default-100 rounded-lg p-1 gap-1">
                  <Button
                    onPress={() => setType("Pemasukan")}
                    className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      type === "Pemasukan"
                        ? "bg-emerald-500 text-white shadow-sm"
                        : "text-default-500 hover:text-default-700"
                    }`}
                  >
                    Pemasukan
                  </Button>
                  <Button
                    onPress={() => setType("Pengeluaran")}
                    className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      type === "Pengeluaran"
                        ? "bg-rose-500 text-white shadow-sm"
                        : "text-default-500 hover:text-default-700"
                    }`}
                  >
                    Pengeluaran
                  </Button>
                </div>
              </div>

              <DatePicker
                label="Tanggal"
                labelPlacement="outside"
                value={date}
                onChange={setDate}
                isRequired
              />

              <Select
                label="Kategori"
                placeholder="Pilih kategori"
                labelPlacement="outside"
                selectedKeys={category ? [category] : []}
                onChange={(e) => setCategory(e.target.value)}
                isRequired
              >
                {filteredCategories.map((category) => (
                  <SelectItem key={category.value}>{category.label}</SelectItem>
                ))}
              </Select>

              <Input
                label="Jumlah (Rp)"
                type="text"
                placeholder="0"
                labelPlacement="outside"
                value={amount}
                onValueChange={handleAmountChange}
              />

              <Textarea
                label="Keterangan"
                placeholder="Deskripsi transaksi..."
                labelPlacement="outside"
                value={description}
                onValueChange={setDescription}
              />

              <div>
                <p className="text-sm font-medium mb-2">
                  Bukti Transaksi (Opsional)
                </p>
                <input
                  type="file"
                  ref={proofInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setProof(file);
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        const result = e.target?.result as string;
                        setProofPreview(result);
                      };
                      reader.readAsDataURL(file);
                      // Ensure we sort of "undelete" if they upload a new one,
                      // though the logic displayProofUrl = proofPreview || ... already handles priority
                    }
                  }}
                />

                {signedProofLoading &&
                !proofPreview &&
                initialData?.proof &&
                !isProofDeleted ? (
                  <div className="w-full aspect-video flex items-center justify-center bg-gray-100 rounded-lg border border-divider">
                    <Spinner />
                  </div>
                ) : shouldShowPreview ? (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 border border-divider">
                    <img
                      src={displayProofUrl!}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                    <Button
                      isIconOnly
                      color="danger"
                      size="sm"
                      variant="flat"
                      className="absolute top-2 right-2 z-10"
                      onPress={handleRemoveProof}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-default-300 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-default-50 transition-colors"
                    onClick={() => proofInputRef.current?.click()}
                  >
                    <Upload size={24} className="text-default-400 mb-2" />
                    <p className="text-sm text-default-500">
                      Klik untuk upload gambar kwitansi
                      <br />
                      JPG, PNG, atau WEBP (Maks. 5MB)
                    </p>
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Batal
              </Button>
              <Button
                className="bg-emerald-600 text-white"
                onPress={handleSubmit}
                isLoading={isSubmitting}
              >
                Simpan
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

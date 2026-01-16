"use client";

import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";

interface DeleteTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    isLoading: boolean;
}

export const DeleteTransactionModal = ({ isOpen, onClose, onConfirm, title, isLoading }: DeleteTransactionModalProps) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} size="sm" backdrop="blur">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Hapus Transaksi?</ModalHeader>
                        <ModalBody>
                            <p className="text-sm text-gray-500">
                                Apakah Anda yakin ingin menghapus transaksi <span className="font-bold text-gray-800">"{title}"</span>? Transaksi akan dipindahkan ke sampah dan akan dihapus permanen setelah 30 hari.
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="light" onPress={onClose}>
                                Batal
                            </Button>
                            <Button color="danger" onPress={onConfirm} isLoading={isLoading}>
                                Hapus
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { HomepageTransactionRow } from "@/features/home/types";

export function exportTransactionsPdf(
    data: HomepageTransactionRow[],
    dateExported: string
) {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(14);
    doc.text(`Laporan Riwayat Transaksi Masjid Nurus Sholeh - ${dateExported}`, 14, 15);

    // Table
    autoTable(doc, {
        startY: 25,
        head: [[
            "Tanggal",
            "Keterangan",
            "Kategori",
            "Pemasukan",
            "Pengeluaran",
            "Saldo"
        ]],
        body: data.map(item => [
            item.date,
            item.description,
            item.category,
            formatCurrency(item.income),
            formatCurrency(item.expense),
            formatCurrency(item.balance),
        ]),
    });

    doc.save("laporan-transaksi.pdf");
}

function formatCurrency(value: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value);
}

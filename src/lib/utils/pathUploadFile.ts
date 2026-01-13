// Upload File Path formatnya harus ada tahun/bulan/transaksiId.jpg

export const pathUploadFile = (fileName: string) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}/${month}/${fileName}`;
}

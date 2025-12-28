import { HomePage } from "@/features/home/components/HomePage";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Masjid Nurus Sholeh",

  description: "Website kelola keuangan masjid",

  openGraph: {
    title: "Masjid Nurus Sholeh",
    description: "Website kelola keuangan masjid",
    type: "website",
    siteName: "Masjid Nurus Sholeh",
    url: "https://masjidnurussholeh.com",
    images: [
      {
        url: "https://masjidnurussholeh.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Masjid Nurus Sholeh",
      },
    ],
    locale: "id_ID",
  }
}

export default function Page() {
  return (
    <HomePage />
  );
}

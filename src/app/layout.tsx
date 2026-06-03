import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Suspense } from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VetPet Galleria | India's Premium Pet Supplies & Healthcare",
  description: "VetPet Galleria is India's premium pet eCommerce platform offering veterinary-approved pet food, treats, healthcare, grooming essentials, and toys for dogs, cats, birds, fish, and small pets.",
  keywords: "pet food, pet healthcare, vet products, dog food, cat food, premium pet toys, grooming essentials, bird supplies, india pet shop",
  authors: [{ name: "VetPet Galleria India Team" }],
  openGraph: {
    title: "VetPet Galleria | India's Premium Pet Supplies & Healthcare",
    description: "Your trusted destination for premium veterinary-approved pet food, health, and grooming supplies in India.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-light text-brand-dark font-body">
        <ShopProvider>
          <Suspense fallback={<div className="h-20 bg-white border-b border-gray-100" />}>
            <Header />
          </Suspense>
          <main className="flex-grow">{children}</main>
          <Footer />
        </ShopProvider>
      </body>
    </html>
  );
}

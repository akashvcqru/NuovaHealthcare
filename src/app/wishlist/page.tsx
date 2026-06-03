"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import ProductCard from "@/components/ui/ProductCard";
import { ChevronRight, Heart, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const { wishlist } = useShop();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-brand-light min-h-[60vh] flex flex-col items-center justify-center p-8">
        <div className="w-10 h-10 border-4 border-brand-secondary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="bg-brand-light min-h-[60vh] flex flex-col items-center justify-center p-8 text-center gap-6">
        <div className="w-20 h-20 bg-white border border-gray-150 rounded-full flex items-center justify-center text-3xl shadow-sm">
          ❤️
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-brand-primary">
            Your Wishlist is Empty
          </h1>
          <p className="text-sm text-gray-505 max-w-sm">
            Save premium diets, treats, and clinical healthcare items to your favorites to review or purchase them later.
          </p>
        </div>
        <Link
          href="/products"
          className="bg-brand-primary text-white font-bold text-sm px-8 py-3.5 rounded-full hover:bg-brand-primary-hover shadow-md hover:scale-105 transition-all flex items-center gap-2"
        >
          Browse Products
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-light min-h-screen pb-16 md:pb-24">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        <div className="flex items-center gap-1.5 text-xs text-gray-505 font-semibold uppercase tracking-wider">
          <Link href="/" className="hover:text-brand-secondary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-brand-primary">My Favorites</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col gap-8">
        <div className="border-b border-gray-200 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h1 className="font-heading font-bold text-2xl text-brand-primary">
              Saved Favorites
            </h1>
          </div>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {wishlist.length} {wishlist.length === 1 ? "product" : "products"} saved
          </span>
        </div>

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

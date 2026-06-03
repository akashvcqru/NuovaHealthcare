"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { useShop } from "@/context/ShopContext";
import Rating from "./Rating";
import { Heart, Plus, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [showSizeSelector, setShowSizeSelector] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  const isLiked = mounted && isInWishlist(product.id);

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // If product has sizes and we haven't selected one yet, show selector
    if (product.sizes && product.sizes.length > 1 && !showSizeSelector) {
      setShowSizeSelector(true);
      return;
    }
    
    addToCart(product, 1, selectedSize);
    setAdded(true);
    setShowSizeSelector(false);
    setTimeout(() => setAdded(false), 2000);
  };

  const selectSizeAndAdd = (size: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSize(size);
    addToCart(product, 1, size);
    setAdded(true);
    setShowSizeSelector(false);
    setTimeout(() => setAdded(false), 2000);
  };

  // Calculate discount percentage
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-[20px] border border-gray-100 p-4 transition-all duration-300 hover:shadow-premium hover:-translate-y-1.5 flex flex-col justify-between h-full">
      
      {/* Upper Area: Wishlist & Badge & Image */}
      <div className="relative w-full aspect-square bg-gray-50 rounded-[16px] overflow-hidden mb-4">
        
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {discountPercent > 0 && (
            <span className="bg-brand-secondary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {discountPercent}% OFF
            </span>
          )}
          {product.isNew && (
            <span className="bg-brand-accent text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              NEW
            </span>
          )}
          {product.isHealthcare && (
            <span className="bg-brand-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              💊 Clinical
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center border shadow-sm transition-all duration-300 ${
            isLiked 
              ? "bg-rose-50 border-rose-100 text-rose-500 scale-110" 
              : "bg-white border-gray-100 text-gray-400 hover:text-rose-500 hover:bg-rose-50"
          }`}
          aria-label="Toggle Wishlist"
        >
          <Heart className={`w-4.5 h-4.5 ${isLiked ? "fill-rose-500" : ""}`} />
        </button>

        {/* Product Image */}
        <Link href={`/products/${product.id}`} className="block w-full h-full relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority={false}
          />
        </Link>

        {/* Size Selection Overlay (Slides Up) */}
        {showSizeSelector && product.sizes && (
          <div className="absolute inset-0 bg-brand-primary/95 backdrop-blur-sm flex flex-col justify-center items-center p-4 z-20 animate-fade-in-up">
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowSizeSelector(false); }}
              className="absolute top-2 right-2 text-white/70 hover:text-white p-1"
            >
              Cancel
            </button>
            <span className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Select Package Size
            </span>
            <div className="flex flex-wrap gap-2 justify-center">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => selectSizeAndAdd(size, e)}
                  className={`text-xs font-bold px-3 py-2 rounded-lg border transition-all ${
                    selectedSize === size 
                      ? "bg-white text-brand-primary border-white" 
                      : "bg-transparent text-white border-white/20 hover:border-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Details & Action Area */}
      <div className="flex flex-col flex-grow">
        
        {/* Brand & Pet info */}
        <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1">
          <span>{product.brand}</span>
          <span className="bg-brand-light text-brand-primary px-1.5 py-0.5 rounded">
            {product.petType}
          </span>
        </div>

        {/* Product Title */}
        <Link href={`/products/${product.id}`} className="block mb-2">
          <h3 className="font-heading font-bold text-base text-brand-primary group-hover:text-brand-secondary transition-colors duration-300 line-clamp-2 h-12 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-2 mb-3">
          <Rating value={product.rating} size={14} />
          <span className="text-xs text-gray-400">({product.reviewsCount})</span>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-lg text-brand-primary leading-none">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through mt-1">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCartClick}
            disabled={!product.inStock}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              !product.inStock 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : added 
                ? "bg-brand-accent text-white scale-105" 
                : "bg-brand-secondary text-white hover:bg-brand-secondary-hover shadow-md hover:scale-105"
            }`}
            aria-label="Add to Cart"
          >
            {added ? (
              <Check className="w-5 h-5 stroke-[3px] animate-scale-in" />
            ) : (
              <Plus className="w-5 h-5 stroke-[3px]" />
            )}
          </button>
        </div>

      </div>

    </div>
  );
}

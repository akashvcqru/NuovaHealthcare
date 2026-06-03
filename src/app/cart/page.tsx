"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import { 
  Minus, 
  Plus, 
  Trash2, 
  ChevronRight, 
  Tag, 
  Info, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function CartPage() {
  const { 
    cart, 
    coupon, 
    removeFromCart, 
    updateCartQuantity, 
    applyCoupon, 
    removeCoupon,
    getCartSubtotal,
    getDiscountAmount,
    getShippingFee,
    getTaxAmount,
    getCartTotal
  } = useShop();

  const [couponInput, setCouponInput] = useState("");
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      const result = applyCoupon(couponInput);
      setCouponFeedback(result);
      if (result.success) {
        setCouponInput("");
      }
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponFeedback(null);
  };

  const subtotal = getCartSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();
  const tax = getTaxAmount();
  const total = getCartTotal();

  if (!mounted) {
    return (
      <div className="bg-brand-light min-h-[60vh] flex flex-col items-center justify-center p-8">
        <div className="w-10 h-10 border-4 border-brand-secondary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-brand-light min-h-[60vh] flex flex-col items-center justify-center p-8 text-center gap-6">
        <div className="w-20 h-20 bg-white border border-gray-150 rounded-full flex items-center justify-center text-3xl shadow-sm">
          🛒
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-brand-primary">
            Your Cart is Empty
          </h1>
          <p className="text-sm text-gray-505 max-w-sm">
            Looks like you haven't added any premium pet supplies or clinical wellness items to your cart yet.
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
        <div className="flex items-center gap-1.5 text-xs text-gray-550 font-semibold uppercase tracking-wider">
          <Link href="/" className="hover:text-brand-secondary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-brand-primary">Shopping Cart</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Cart Items List */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white border border-gray-100 p-6 rounded-[24px] shadow-sm flex flex-col gap-6">
            <h1 className="font-heading font-bold text-2xl text-brand-primary border-b border-gray-100 pb-4">
              Your Selection ({cart.length} items)
            </h1>

            <div className="flex flex-col gap-6 divide-y divide-gray-100">
              {cart.map((item, index) => {
                const itemTotal = (item.product.price * item.quantity).toFixed(2);
                return (
                  <div 
                    key={`${item.product.id}-${item.selectedSize}`} 
                    className={`flex flex-col sm:flex-row items-center gap-6 justify-between ${
                      index > 0 ? "pt-6" : ""
                    }`}
                  >
                    {/* Item Image and Title */}
                    <div className="flex items-center gap-4 w-full sm:w-1/2">
                      <div className="relative w-20 h-20 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400">
                          {item.product.brand}
                        </span>
                        <Link href={`/products/${item.product.id}`} className="hover:text-brand-secondary transition-colors">
                          <h3 className="font-heading font-bold text-sm sm:text-base text-brand-primary line-clamp-2 leading-tight">
                            {item.product.name}
                          </h3>
                        </Link>
                        {item.selectedSize && (
                          <span className="bg-brand-light text-brand-primary text-[10px] font-bold px-2 py-0.5 rounded w-fit uppercase">
                            Size: {item.selectedSize}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between border border-gray-200 rounded-lg p-1.5 bg-brand-light w-28 sm:w-24">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                        className="w-6 h-6 rounded bg-white flex items-center justify-center text-brand-primary hover:bg-gray-100 transition-colors border border-gray-150"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold text-xs text-brand-primary text-center w-6">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                        className="w-6 h-6 rounded bg-white flex items-center justify-center text-brand-primary hover:bg-gray-100 transition-colors border border-gray-150"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Price and delete button */}
                    <div className="flex items-center gap-6 justify-between sm:justify-end w-full sm:w-auto">
                      <div className="flex flex-col items-start sm:items-end">
                        <span className="font-heading font-bold text-base text-brand-primary">
                          ₹{itemTotal}
                        </span>
                        <span className="text-xs text-gray-400">
                          (₹{item.product.price} each)
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                        className="p-2 hover:bg-rose-50 text-gray-400 hover:text-rose-500 rounded-lg transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Right Column: Order Summary & Coupon */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Coupon Input Code */}
          <div className="bg-white border border-gray-100 p-6 rounded-[24px] shadow-sm flex flex-col gap-4">
            <h3 className="font-heading font-bold text-base text-brand-primary flex items-center gap-2">
              <Tag className="w-4 h-4 text-brand-secondary" />
              Promo Coupons
            </h3>
            
            {coupon ? (
              <div className="bg-brand-secondary/15 border border-brand-secondary/30 rounded-xl p-3.5 flex justify-between items-center animate-scale-in">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Coupon Applied</span>
                  <span className="font-mono text-sm font-bold text-brand-primary">{coupon.code}</span>
                </div>
                <button 
                  onClick={handleRemoveCoupon}
                  className="text-xs font-bold text-rose-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. WELCOME10"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 bg-brand-light border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-secondary uppercase font-semibold placeholder:normal-case"
                />
                <button
                  type="submit"
                  className="bg-brand-primary text-white font-bold text-xs px-4 rounded-xl hover:bg-brand-primary-hover transition-colors shadow-sm"
                >
                  Apply
                </button>
              </form>
            )}

            {couponFeedback && (
              <p className={`text-[11px] font-semibold animate-scale-in ${
                couponFeedback.success ? "text-brand-accent" : "text-rose-500"
              }`}>
                {couponFeedback.message}
              </p>
            )}
          </div>

          {/* Checkout Totals Summary */}
          <div className="bg-white border border-gray-100 p-6 rounded-[24px] shadow-sm flex flex-col gap-6">
            <h3 className="font-heading font-bold text-base text-brand-primary border-b border-gray-100 pb-3">
              Order Summary
            </h3>

            <div className="flex flex-col gap-3 text-sm text-gray-600 border-b border-gray-100 pb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-brand-primary">₹{subtotal.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-brand-accent">
                  <span>Coupon Discount</span>
                  <span className="font-bold">-₹{discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  <span>Shipping Fee</span>
                  <span title="Free on orders over ₹3,000">
                    <Info className="w-3.5 h-3.5 text-gray-400" />
                  </span>
                </span>
                <span className="font-bold text-brand-primary">
                  {shipping === 0 ? <strong className="text-brand-accent">Free</strong> : `₹${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span className="font-bold text-brand-primary">₹{tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline font-heading font-extrabold text-xl text-brand-primary">
              <span>Order Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            {/* Checkouts CTA */}
            <Link
              href="/checkout"
              className="bg-brand-primary text-white text-center font-bold text-sm py-4 rounded-xl hover:bg-brand-primary-hover shadow-md hover:scale-102 transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-2 justify-center text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-brand-accent" />
              <span>Secure Encrypted Checkout</span>
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
}

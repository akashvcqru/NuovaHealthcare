"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { categories } from "@/data/categories";
import {
  Send,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 border-t-4 border-brand-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

        {/* Value Propositions / Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-brand-secondary">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-semibold text-lg">Free Express Delivery</h4>
            <p className="text-sm text-gray-400">On all orders over ₹3,000. Carefully packed in biodegradable boxes.</p>
          </div>
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-brand-secondary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-semibold text-lg">100% Vet Approved</h4>
            <p className="text-sm text-gray-400">Every single health supplement and diet product undergoes vet screening.</p>
          </div>
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-brand-secondary">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-semibold text-lg">Easy 30-Day Returns</h4>
            <p className="text-sm text-gray-400">Hassle-free return policy. Pickups arranged directly from your doorstep.</p>
          </div>
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-brand-secondary">
              <Heart className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-semibold text-lg">Premium Pet Care Club</h4>
            <p className="text-sm text-gray-400">Earn loyalty points on every purchase and redeem them for free vet consults.</p>
          </div>
        </div>

        {/* Middle Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12 border-b border-white/10">

          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Logo showText={true} className="invert brightness-0" />
            <p className="text-sm text-gray-400 max-w-sm">
              VetPet Galleria is an international award-winning veterinary-focused eCommerce platform. We source only premium, clinical-grade nutrition and healthcare products to ensure your pets live their happiest, healthiest lives.
            </p>
            <div className="flex items-center gap-4 text-gray-400">
              <Link href="https://facebook.com" aria-label="Facebook" className="hover:text-brand-secondary transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" /></svg>
              </Link>
              <Link href="https://instagram.com" aria-label="Instagram" className="hover:text-brand-secondary transition-colors">
                <svg className="w-5 h-5 fill-none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </Link>
              <Link href="https://twitter.com" aria-label="Twitter" className="hover:text-brand-secondary transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </Link>
              <Link href="https://youtube.com" aria-label="Youtube" className="hover:text-brand-secondary transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold tracking-wider text-brand-secondary uppercase">Quick Links</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-gray-400">
              <li><Link href="/products" className="hover:text-white transition-colors">Shop All Products</Link></li>
              <li><Link href="/products?filter=new" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link href="/products?filter=healthcare" className="hover:text-white transition-colors">Healthcare Shop</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Pet Care Articles</Link></li>
              <li><Link href="/profile" className="hover:text-white transition-colors">My Profile Account</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold tracking-wider text-brand-secondary uppercase">Customer Care</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">Help Center & FAQ</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Track Your Order</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact Veterinarian</Link></li>
            </ul>
          </div>

          {/* Column 4: Categories */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold tracking-wider text-brand-secondary uppercase">Popular Categories</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-gray-400">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/categories/${cat.slug}`} className="hover:text-white transition-colors flex items-center gap-1.5">
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Newsletter Section & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 text-xs text-gray-400">

          {/* Newsletter Box */}
          <div className="w-full md:w-auto flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-white">Join the VetPet Newsletter</h4>
            <p className="text-xs text-gray-400">Get updates on veterinarian advice, seasonal products, and VIP discount coupons.</p>
            <form onSubmit={handleSubscribe} className="flex max-w-md w-full relative">
              <input
                type="email"
                placeholder="Enter your pet parent email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-4 pr-12 py-2.5 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:border-brand-secondary text-white text-xs placeholder:text-gray-500"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 w-10 bg-brand-secondary text-brand-dark rounded-full flex items-center justify-center hover:bg-brand-secondary-hover transition-colors"
                aria-label="Subscribe"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            {subscribed && (
              <span className="text-brand-accent text-xs font-semibold animate-scale-in">
                ✓ Check your inbox! We just sent a 15% discount code.
              </span>
            )}
          </div>

          {/* Copyright & Pay Badges */}
          <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right">
            <p>© {new Date().getFullYear()} VetPet Galleria Inc. All Rights Reserved.</p>
            <p>Designed with ❤️ for premium pet health and wellness.</p>

            {/* Accepted Payments mock */}
            <div className="flex items-center gap-2 mt-1 opacity-70">
              <div className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider">UPI</div>
              <div className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider">RuPay</div>
              <div className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider">Visa</div>
              <div className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider">Mastercard</div>
              <div className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider">Net Banking</div>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}

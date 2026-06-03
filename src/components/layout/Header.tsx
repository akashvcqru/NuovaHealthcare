"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import Logo from "@/components/ui/Logo";
import { categories, petsList } from "@/data/categories";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Phone,
  ShieldCheck,
  Sparkles
} from "lucide-react";

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart, wishlist, user } = useShop();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<"categories" | "pets" | null>(null);
  const [mounted, setMounted] = useState(false);

  // Set mounted status on client-side mount to prevent hydration mismatch
  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  // Track scroll position to trigger sticky layout
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update search input when url search param changes
  useEffect(() => {
    const query = searchParams.get("search") || "";
    if (searchQuery !== query) {
      setSearchQuery(query);
    }
  }, [searchParams, searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/products");
    }
  };

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistItemsCount = wishlist.length;

  return (
    <header className="w-full z-50">
      {/* Top Announcement Bar */}
      <div className="bg-brand-dark text-white text-xs py-1.5 px-4 sm:px-6 md:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-brand-secondary font-medium">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse-subtle" />
            <span>Grand Opening Offer: Use code <strong className="text-white">WELCOME10</strong> for 10% off!</span>
          </div>

          <div className="flex items-center gap-5 text-gray-300">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-brand-secondary" />
              <span>Emergency Hotline: 1800-123-CARE</span>
            </span>
            <span className="hidden md:flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-brand-accent" />
              <span>100% Vet-Approved Products</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Branding & Navigation Header */}
      <div
        className={`bg-white transition-all duration-300 w-full ${isSticky
            ? "fixed top-0 left-0 shadow-premium py-1.5 animate-scale-in border-b border-gray-100"
            : "relative py-3 border-b border-gray-100"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between gap-4">

          {/* Logo */}
          <Logo variant="header" />

          {/* Centered Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-lg relative"
          >
            <input
              type="text"
              placeholder="Search premium food, medical supplies, treats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-5 pr-12 py-2.5 bg-brand-light text-brand-dark rounded-full border border-gray-200 focus:outline-none focus:border-brand-secondary focus:bg-white transition-all text-sm placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 w-10 bg-brand-primary text-white rounded-full flex items-center justify-center hover:bg-brand-primary-hover transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Interaction Icons (Wishlist, Cart, Profile) */}
          <div className="flex items-center gap-4 sm:gap-6">

            {/* Search Toggle for Mobile */}
            <button
              className="p-2 text-brand-dark hover:bg-brand-light rounded-full md:hidden transition-colors"
              onClick={() => router.push("/products")}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Profile */}
            <Link
              href="/profile"
              className="flex items-center gap-1.5 p-1.5 text-brand-dark hover:bg-brand-light rounded-lg transition-colors group"
            >
              <User className="w-5 h-5 text-brand-primary group-hover:scale-105 transition-transform" />
              <div className="hidden lg:block text-left text-xs">
                <span className="text-gray-400 font-medium">Hello, </span>
                <span className="font-semibold text-brand-primary">
                  {mounted && user ? user.name.split(" ")[0] : "Sign In"}
                </span>
              </div>
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 text-brand-dark hover:bg-brand-light rounded-full transition-colors group"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 text-brand-primary group-hover:scale-110 transition-transform" />
              {mounted && wishlistItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white">
                  {wishlistItemsCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-brand-dark hover:bg-brand-light rounded-full transition-colors group"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 text-brand-primary group-hover:scale-110 transition-transform" />
              {mounted && cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-secondary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              className="p-2 text-brand-dark hover:bg-brand-light rounded-full md:hidden transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>

          </div>
        </div>

        {/* Categories Bar & Mega Menus (Desktop Only) */}
        <div className="hidden md:block border-t border-gray-100 mt-2.5 pt-2">
          <div className="max-w-7xl mx-auto px-8 flex items-center justify-center relative">
            <nav className="flex items-center gap-16">

              {/* Categories Link with Mega Menu trigger */}
              <div
                onMouseEnter={() => setActiveMegaMenu("categories")}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button
                  className="flex items-center gap-1.5 text-sm font-semibold py-2 text-brand-primary hover:text-brand-secondary transition-colors"
                >
                  Shop Categories
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMegaMenu === "categories" ? "rotate-180" : ""}`} />
                </button>

                {/* Categories Mega Menu Box */}
                {activeMegaMenu === "categories" && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-100 rounded-[20px] shadow-premium p-8 mt-1.5 z-50 grid grid-cols-5 gap-8 animate-scale-in">
                    {categories.map((cat) => (
                      <div key={cat.slug} className="flex flex-col">
                        <Link
                          href={`/categories/${cat.slug}`}
                          className="font-heading font-bold text-base text-brand-primary hover:text-brand-secondary transition-colors border-b border-gray-100 pb-1.5 mb-2 flex items-center gap-2"
                        >
                          <span>{cat.icon}</span>
                          <span>{cat.name}</span>
                        </Link>
                        <div className="flex flex-col gap-1.5">
                          {cat.subcategories.map((sub) => (
                            <Link
                              key={sub.slug}
                              href={`/products?subcategory=${sub.slug}`}
                              className="text-xs text-gray-500 hover:text-brand-primary transition-colors pl-6"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Shop By Pet Trigger */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMegaMenu("pets")}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button
                  className="flex items-center gap-1.5 text-sm font-semibold py-2 text-brand-primary hover:text-brand-secondary transition-colors"
                >
                  Shop By Pet
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMegaMenu === "pets" ? "rotate-180" : ""}`} />
                </button>

                {/* Pets Mega Menu Box */}
                {activeMegaMenu === "pets" && (
                  <div className="absolute top-full left-0 w-[240px] bg-white border border-gray-100 rounded-[18px] shadow-premium p-4 mt-1 z-50 flex flex-col gap-1 animate-scale-in">
                    {petsList.map((pet) => (
                      <Link
                        key={pet.id}
                        href={`/products?pet=${pet.id}`}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-brand-light hover:text-brand-primary transition-colors font-medium"
                      >
                        <span className="text-lg">{pet.icon}</span>
                        <span>{pet.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/products?filter=healthcare" className="text-sm font-semibold py-2 text-brand-primary hover:text-brand-secondary transition-colors flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse"></span>
                Pet Healthcare
              </Link>
              <Link href="/products?filter=new" className="text-sm font-semibold py-2 text-brand-primary hover:text-brand-secondary transition-colors">
                New Arrivals
              </Link>
              <Link href="/blog" className="text-sm font-semibold py-2 text-brand-primary hover:text-brand-secondary transition-colors">
                Pet Care Blog
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-50 flex justify-end md:hidden">
          <div className="w-[300px] bg-white h-full p-6 shadow-premium flex flex-col justify-between animate-scale-in">
            <div>
              <div className="flex justify-between items-center mb-6">
                <Logo variant="header" />
                <button
                  className="p-2 hover:bg-brand-light rounded-full text-brand-dark transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Search Bar */}
              <form onSubmit={handleSearchSubmit} className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 bg-brand-light text-brand-dark rounded-full border border-gray-200 focus:outline-none focus:border-brand-secondary focus:bg-white transition-all text-xs"
                />
                <button type="submit" className="absolute right-3 top-2 text-gray-400">
                  <Search className="w-4 h-4" />
                </button>
              </form>

              {/* Navigation Links */}
              <div className="flex flex-col gap-4 font-semibold text-brand-primary">
                <Link
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm border-b border-gray-100 pb-2 hover:text-brand-secondary"
                >
                  Shop All Products
                </Link>

                <span className="text-xs text-gray-400 font-bold uppercase mt-2">Categories</span>
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs text-gray-600 pl-3 hover:text-brand-secondary flex items-center gap-2"
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </Link>
                ))}

                <span className="text-xs text-gray-400 font-bold uppercase mt-2">Shop by Pet</span>
                <div className="grid grid-cols-2 gap-2 pl-3">
                  {petsList.map((pet) => (
                    <Link
                      key={pet.id}
                      href={`/products?pet=${pet.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs text-gray-600 hover:text-brand-secondary flex items-center gap-1.5"
                    >
                      <span>{pet.icon}</span>
                      <span>{pet.name}</span>
                    </Link>
                  ))}
                </div>

                <span className="text-xs text-gray-400 font-bold uppercase mt-2">Resources</span>
                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm pl-3 text-gray-600 hover:text-brand-secondary"
                >
                  Pet Care Blog
                </Link>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 flex flex-col gap-2 text-xs text-gray-500">
              <p>📍 Mumbai, Maharashtra, India</p>
              <p>📞 support@vetpetgalleria.in</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

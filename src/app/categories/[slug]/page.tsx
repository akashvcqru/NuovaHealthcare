import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { ChevronRight, LayoutGrid, ArrowRight } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="bg-brand-light min-h-screen pb-16 md:pb-24">
      {/* Category Hero Header */}
      <section className="relative w-full h-[280px] md:h-[360px] bg-brand-primary overflow-hidden flex items-center">
        <Image
          src={category.image}
          alt={category.name}
          fill
          priority
          className="object-cover opacity-30 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/40 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 w-full text-white">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-gray-300 mb-4 uppercase tracking-widest font-semibold">
            <Link href="/" className="hover:text-brand-secondary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Categories</span>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <span className="text-4xl bg-white/10 p-3 rounded-2xl backdrop-blur-sm">{category.icon}</span>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl">
              {category.name}
            </h1>
          </div>
          <p className="text-sm sm:text-base text-gray-200 max-w-xl leading-relaxed">
            {category.description}
          </p>
        </div>
      </section>

      {/* Subcategories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-12 md:mt-16 flex flex-col gap-8">
        <div className="border-b border-gray-200 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-brand-secondary" />
            <h2 className="font-heading font-bold text-2xl text-brand-primary">
              Explore Subcategories
            </h2>
          </div>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {category.subcategories.length} subcategories available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {category.subcategories.map((sub) => (
            <Link
              key={sub.slug}
              href={`/products?subcategory=${sub.slug}`}
              className="group bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full justify-between"
            >
              <div className="relative w-full h-48 bg-gray-50 overflow-hidden">
                <Image
                  src={sub.image}
                  alt={sub.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="font-heading font-bold text-xl text-brand-primary group-hover:text-brand-secondary transition-colors duration-300">
                    {sub.name}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                    {sub.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-brand-secondary group-hover:text-brand-secondary-hover transition-colors">
                  <span>Browse Products</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

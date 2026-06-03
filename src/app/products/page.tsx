"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { products } from "@/data/products";
import { categories, petsList } from "@/data/categories";
import ProductCard from "@/components/ui/ProductCard";
import { 
  ChevronRight, 
  SlidersHorizontal, 
  ArrowUpDown, 
  X
} from "lucide-react";

// Collect all unique brands dynamically
const uniqueBrands = Array.from(new Set(products.map((p) => p.brand)));

function ProductsListContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPet, setSelectedPet] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number>(10000); // max is ₹10000
  const [minRating, setMinRating] = useState<number | null>(null);
  const [specialFilter, setSpecialFilter] = useState<"all" | "healthcare" | "new" | "featured">("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  
  // Mobile Filter Drawer Toggle
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Synced state read from URL parameters
  useEffect(() => {
    const search = searchParams.get("search");
    const pet = searchParams.get("pet");
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");
    const filter = searchParams.get("filter");

    if (search) setSearchQuery(search);
    else setSearchQuery("");

    if (pet) setSelectedPet(pet);
    else setSelectedPet(null);

    if (category) setSelectedCategory(category);
    else setSelectedCategory(null);

    if (subcategory) setSelectedSubcategory(subcategory);
    else setSelectedSubcategory(null);

    if (filter === "healthcare") setSpecialFilter("healthcare");
    else if (filter === "new") setSpecialFilter("new");
    else if (filter === "featured") setSpecialFilter("featured");
    else setSpecialFilter("all");
  }, [searchParams]);

  // Clean all filters
  const resetFilters = () => {
    setSelectedPet(null);
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSelectedBrand(null);
    setPriceRange(10000);
    setMinRating(null);
    setSpecialFilter("all");
    setSortBy("featured");
    router.push("/products");
  };

  // Perform client-side filtering
  const filteredProducts = products
    .filter((product) => {
      // 1. Text Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesTags = product.tags?.some((t) => t.toLowerCase().includes(query)) || false;
        if (!matchesName && !matchesBrand && !matchesDesc && !matchesTags) return false;
      }
      
      // 2. Pet Type filter
      if (selectedPet && product.petType !== selectedPet) return false;
      
      // 3. Category filter
      if (selectedCategory && product.category !== selectedCategory) return false;
      
      // 4. Subcategory filter
      if (selectedSubcategory && product.subcategory !== selectedSubcategory) return false;
      
      // 5. Brand filter
      if (selectedBrand && product.brand !== selectedBrand) return false;
      
      // 6. Max Price filter
      if (product.price > priceRange) return false;
      
      // 7. Minimum Rating filter
      if (minRating && product.rating < minRating) return false;
      
      // 8. Special collections filter
      if (specialFilter === "healthcare" && !product.isHealthcare) return false;
      if (specialFilter === "new" && !product.isNew) return false;
      if (specialFilter === "featured" && !product.isFeatured) return false;

      return true;
    })
    // Apply Sorting logic
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      
      // Default: featured
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });

  const activeFiltersCount = 
    (selectedPet ? 1 : 0) + 
    (selectedCategory ? 1 : 0) + 
    (selectedSubcategory ? 1 : 0) + 
    (selectedBrand ? 1 : 0) + 
    (priceRange < 10000 ? 1 : 0) + 
    (minRating ? 1 : 0) + 
    (specialFilter !== "all" ? 1 : 0);

  return (
    <div className="bg-brand-light min-h-screen pb-16 md:pb-24">
      
      {/* Breadcrumbs Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold uppercase tracking-wider">
          <Link href="/" className="hover:text-brand-secondary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-brand-primary">Shop Directory</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDEBAR FILTERS (Desktop Only) */}
        <aside className="hidden lg:flex flex-col gap-6 bg-white border border-gray-100 p-6 rounded-[24px] shadow-sm h-fit">
          <div className="flex justify-between items-center pb-4 border-b border-gray-150">
            <h3 className="font-heading font-bold text-lg text-brand-primary flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-brand-secondary" />
              Filters
            </h3>
            {activeFiltersCount > 0 && (
              <button 
                onClick={resetFilters}
                className="text-xs font-semibold text-rose-500 hover:underline"
              >
                Clear All ({activeFiltersCount})
              </button>
            )}
          </div>

          {/* Filter 1: Shop Collection */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-brand-primary uppercase tracking-widest">Collections</h4>
            <div className="flex flex-col gap-2 text-sm">
              {[
                { id: "all", name: "All Products" },
                { id: "healthcare", name: "🛡️ Healthcare Shop" },
                { id: "new", name: "✨ New Arrivals" },
                { id: "featured", name: "⭐ Best Sellers" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSpecialFilter(item.id as any)}
                  className={`text-left px-3 py-2 rounded-lg transition-colors font-medium ${
                    specialFilter === item.id 
                      ? "bg-brand-primary text-white" 
                      : "text-gray-600 hover:bg-brand-light"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Filter 2: Pet Species */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-brand-primary uppercase tracking-widest">Shop By Pet</h4>
            <div className="flex flex-wrap gap-2">
              {petsList.map((pet) => (
                <button
                  key={pet.id}
                  onClick={() => setSelectedPet(selectedPet === pet.id ? null : pet.id)}
                  className={`text-xs font-bold px-3.5 py-2 rounded-full border transition-all flex items-center gap-1.5 ${
                    selectedPet === pet.id 
                      ? "bg-brand-secondary text-brand-dark border-brand-secondary shadow-sm" 
                      : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <span>{pet.icon}</span>
                  <span>{pet.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filter 3: Category */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-brand-primary uppercase tracking-widest">Category</h4>
            <div className="flex flex-col gap-1.5 text-sm">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => {
                    setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug);
                    setSelectedSubcategory(null); // clear subcategory when category changes
                  }}
                  className={`text-left px-3 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    selectedCategory === cat.slug 
                      ? "bg-brand-light text-brand-primary font-bold" 
                      : "text-gray-600 hover:bg-brand-light font-medium"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-xs text-gray-400 font-normal">
                    {products.filter(p => p.category === cat.slug).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Subcategories (only if category is chosen) */}
          {selectedCategory && (
            <div className="flex flex-col gap-3 animate-fade-in-up">
              <h4 className="text-xs font-bold text-brand-primary uppercase tracking-widest">Subcategories</h4>
              <div className="flex flex-col gap-1.5 text-sm pl-2 border-l-2 border-brand-secondary">
                {categories.find(c => c.slug === selectedCategory)?.subcategories.map((sub) => (
                  <button
                    key={sub.slug}
                    onClick={() => setSelectedSubcategory(selectedSubcategory === sub.slug ? null : sub.slug)}
                    className={`text-left px-3 py-1.5 rounded-lg transition-colors text-xs font-semibold ${
                      selectedSubcategory === sub.slug
                        ? "text-brand-secondary"
                        : "text-gray-500 hover:text-brand-primary"
                    }`}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Filter 4: Brand */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-brand-primary uppercase tracking-widest">Brands</h4>
            <div className="flex flex-col gap-1.5 text-sm">
              {uniqueBrands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                  className={`text-left px-3 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    selectedBrand === brand 
                      ? "bg-brand-light text-brand-primary font-bold" 
                      : "text-gray-600 hover:bg-brand-light font-medium"
                  }`}
                >
                  <span>{brand}</span>
                  <span className="text-xs text-gray-400 font-normal">
                    {products.filter(p => p.brand === brand).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Filter 5: Price */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-brand-primary uppercase tracking-widest">Max Price</h4>
              <span className="text-sm font-bold text-brand-primary">₹{priceRange}</span>
            </div>
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-brand-secondary cursor-pointer h-1.5 bg-gray-200 rounded-full appearance-none"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-bold">
              <span>₹100</span>
              <span>₹5,000</span>
              <span>₹10,000+</span>
            </div>
          </div>

          {/* Filter 6: Rating */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-brand-primary uppercase tracking-widest">Min Rating</h4>
            <div className="flex flex-col gap-1.5 text-sm">
              {[4.8, 4.5, 4.0].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(minRating === rating ? null : rating)}
                  className={`text-left px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 ${
                    minRating === rating 
                      ? "bg-brand-light text-brand-primary font-bold" 
                      : "text-gray-600 hover:bg-brand-light font-medium"
                  }`}
                >
                  <span className="text-yellow-400">★</span>
                  <span>{rating}+ Stars</span>
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* MAIN PRODUCT GRID COLUMN */}
        <section className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Top Bar Sort & Stats */}
          <div className="bg-white border border-gray-100 p-4 rounded-[20px] shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-col text-center sm:text-left gap-1">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Search Results</span>
              <h2 className="text-base font-heading font-extrabold text-brand-primary">
                Found <span className="text-brand-secondary">{filteredProducts.length}</span> premium products
              </h2>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {/* Mobile Filter Toggle Button */}
              <button 
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden bg-brand-light border border-gray-200 text-brand-primary px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4 text-brand-secondary" />
                Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </button>

              {/* Sorting Selector */}
              <div className="flex items-center gap-2 bg-brand-light px-3 py-2 rounded-full border border-gray-200">
                <ArrowUpDown className="w-3.5 h-3.5 text-brand-secondary" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-bold text-brand-primary focus:outline-none cursor-pointer"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filters Display Badges */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 bg-white/50 p-3 rounded-xl border border-dashed border-gray-200">
              <span className="text-xs text-gray-400 font-bold">Active:</span>
              {selectedPet && (
                <span className="inline-flex items-center gap-1 bg-white border border-gray-200 text-xs px-2.5 py-1 rounded-full font-bold text-brand-primary">
                  <span>Pet: {selectedPet}</span>
                  <X className="w-3 h-3 text-gray-400 hover:text-rose-500 cursor-pointer" onClick={() => setSelectedPet(null)} />
                </span>
              )}
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 bg-white border border-gray-200 text-xs px-2.5 py-1 rounded-full font-bold text-brand-primary">
                  <span>Category: {selectedCategory}</span>
                  <X className="w-3 h-3 text-gray-400 hover:text-rose-500 cursor-pointer" onClick={() => { setSelectedCategory(null); setSelectedSubcategory(null); }} />
                </span>
              )}
              {selectedSubcategory && (
                <span className="inline-flex items-center gap-1 bg-white border border-gray-200 text-xs px-2.5 py-1 rounded-full font-bold text-brand-primary">
                  <span>Subcategory: {selectedSubcategory}</span>
                  <X className="w-3 h-3 text-gray-400 hover:text-rose-500 cursor-pointer" onClick={() => setSelectedSubcategory(null)} />
                </span>
              )}
              {selectedBrand && (
                <span className="inline-flex items-center gap-1 bg-white border border-gray-200 text-xs px-2.5 py-1 rounded-full font-bold text-brand-primary">
                  <span>Brand: {selectedBrand}</span>
                  <X className="w-3 h-3 text-gray-400 hover:text-rose-500 cursor-pointer" onClick={() => setSelectedBrand(null)} />
                </span>
              )}
              {priceRange < 10000 && (
                <span className="inline-flex items-center gap-1 bg-white border border-gray-200 text-xs px-2.5 py-1 rounded-full font-bold text-brand-primary">
                  <span>Price: &le; ₹{priceRange}</span>
                  <X className="w-3 h-3 text-gray-400 hover:text-rose-500 cursor-pointer" onClick={() => setPriceRange(10000)} />
                </span>
              )}
              {minRating && (
                <span className="inline-flex items-center gap-1 bg-white border border-gray-200 text-xs px-2.5 py-1 rounded-full font-bold text-brand-primary">
                  <span>Rating: {minRating}+ ★</span>
                  <X className="w-3 h-3 text-gray-400 hover:text-rose-500 cursor-pointer" onClick={() => setMinRating(null)} />
                </span>
              )}
              {specialFilter !== "all" && (
                <span className="inline-flex items-center gap-1 bg-white border border-gray-200 text-xs px-2.5 py-1 rounded-full font-bold text-brand-primary">
                  <span>Collection: {specialFilter}</span>
                  <X className="w-3 h-3 text-gray-400 hover:text-rose-500 cursor-pointer" onClick={() => setSpecialFilter("all")} />
                </span>
              )}
            </div>
          )}

          {/* Grid list of Products */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white border border-gray-100 rounded-[24px] shadow-sm flex flex-col items-center justify-center p-8 gap-4">
              <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center text-2xl font-serif">
                🫙
              </div>
              <h3 className="font-heading font-bold text-xl text-brand-primary">No products match your filters</h3>
              <p className="text-sm text-gray-500 max-w-sm">
                Try widening your price range, clearing some active filter tags, or searching for alternative terms.
              </p>
              <button
                onClick={resetFilters}
                className="bg-brand-primary text-white font-bold text-xs px-6 py-3 rounded-full hover:bg-brand-primary-hover shadow-md transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}

        </section>

      </div>

      {/* MOBILE FILTERS SLIDE-OVER DRAWER SHEET */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-50 flex justify-start lg:hidden">
          <div className="w-[300px] bg-white h-full p-6 shadow-premium flex flex-col justify-between overflow-y-auto animate-scale-in">
            
            {/* Header */}
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-150 mb-6">
                <h3 className="font-heading font-bold text-lg text-brand-primary flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-brand-secondary" />
                  Filters
                </h3>
                <button 
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1.5 hover:bg-brand-light rounded-full text-brand-dark transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Collections */}
              <div className="flex flex-col gap-3 mb-6">
                <h4 className="text-xs font-bold text-brand-primary uppercase tracking-widest">Collections</h4>
                <div className="flex flex-col gap-1.5 text-xs">
                  {[
                    { id: "all", name: "All Products" },
                    { id: "healthcare", name: "🛡️ Healthcare Shop" },
                    { id: "new", name: "✨ New Arrivals" },
                    { id: "featured", name: "⭐ Best Sellers" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSpecialFilter(item.id as any)}
                      className={`text-left px-3 py-2 rounded-lg transition-colors font-medium ${
                        specialFilter === item.id 
                          ? "bg-brand-primary text-white" 
                          : "text-gray-600 hover:bg-brand-light"
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pets */}
              <div className="flex flex-col gap-3 mb-6">
                <h4 className="text-xs font-bold text-brand-primary uppercase tracking-widest">Shop By Pet</h4>
                <div className="flex flex-wrap gap-1.5">
                  {petsList.map((pet) => (
                    <button
                      key={pet.id}
                      onClick={() => setSelectedPet(selectedPet === pet.id ? null : pet.id)}
                      className={`text-[10px] font-bold px-3 py-1.5 rounded-full border transition-all flex items-center gap-1 ${
                        selectedPet === pet.id 
                          ? "bg-brand-secondary text-brand-dark border-brand-secondary" 
                          : "bg-white text-gray-500 border-gray-200"
                      }`}
                    >
                      <span>{pet.icon}</span>
                      <span>{pet.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="flex flex-col gap-3 mb-6">
                <h4 className="text-xs font-bold text-brand-primary uppercase tracking-widest">Category</h4>
                <div className="flex flex-col gap-1.5 text-xs">
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => {
                        setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug);
                        setSelectedSubcategory(null);
                      }}
                      className={`text-left px-3 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                        selectedCategory === cat.slug 
                          ? "bg-brand-light text-brand-primary font-bold" 
                          : "text-gray-600 hover:bg-brand-light font-medium"
                      }`}
                    >
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price slider */}
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-brand-primary uppercase tracking-widest">Max Price</h4>
                  <span className="text-xs font-bold text-brand-primary">₹{priceRange}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-brand-secondary cursor-pointer"
                />
              </div>
            </div>

            <div className="border-t border-gray-150 pt-4 flex flex-col gap-2">
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="w-full border border-rose-200 text-rose-500 font-bold text-xs py-2.5 rounded-full hover:bg-rose-50 transition-all"
                >
                  Reset All Filters
                </button>
              )}
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full bg-brand-primary text-white font-bold text-xs py-2.5 rounded-full hover:bg-brand-primary-hover shadow-sm transition-all"
              >
                Apply & Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-brand-light flex items-center justify-center p-8">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-brand-secondary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Loading premium products catalog...</p>
          </div>
        </div>
      }
    >
      <ProductsListContent />
    </Suspense>
  );
}

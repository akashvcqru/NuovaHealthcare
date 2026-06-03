"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import { products } from "@/data/products";
import Rating from "@/components/ui/Rating";
import ProductCard from "@/components/ui/ProductCard";
import { 
  ChevronRight, 
  Heart, 
  ShoppingCart, 
  Minus, 
  Plus, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  CheckCircle,
  Sparkles,
  Info
} from "lucide-react";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params);
  
  // Find product
  const [product, setProduct] = useState(() => products.find((p) => p.id === id));
  
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    addToRecentlyViewed, 
    recentlyViewed 
  } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [activeTab, setActiveTab] = useState<"details" | "specs" | "reviews">("details");
  const [addedToCart, setAddedToCart] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  // Review Form States
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    // Re-evaluate product state if ID changes
    const foundProduct = products.find((p) => p.id === id);
    setProduct(foundProduct);
    
    if (foundProduct) {
      // Set default size
      setSelectedSize(foundProduct.sizes?.[0] || "");
      // Reset quantity
      setQuantity(1);
      // Reset review submissions
      setReviewSubmitted(false);
      // Add to recently viewed list
      addToRecentlyViewed(foundProduct);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!product) {
    notFound();
  }

  const isLiked = mounted && isInWishlist(product.id);
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewName.trim() && reviewComment.trim()) {
      const newReview = {
        id: `rev-${Date.now()}`,
        userName: reviewName.trim(),
        rating: reviewRating,
        comment: reviewComment.trim(),
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        verified: true
      };

      // Update product reviews state locally
      const updatedReviews = [newReview, ...product.reviews];
      const newReviewsCount = product.reviewsCount + 1;
      const newRating = parseFloat(
        (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
      );

      const updatedProduct = {
        ...product,
        reviews: updatedReviews,
        reviewsCount: newReviewsCount,
        rating: newRating
      };

      setProduct(updatedProduct);
      
      // Update in master products list array if persisted globally, but for local view this is enough
      setReviewSubmitted(true);
      setReviewName("");
      setReviewComment("");
    }
  };

  // Find related products in same category/subcategory
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.subcategory === product.subcategory || p.category === product.category))
    .slice(0, 4);

  return (
    <div className="bg-brand-light min-h-screen pb-16 md:pb-24">
      
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        <div className="flex items-center gap-1.5 text-xs text-gray-505 font-semibold uppercase tracking-wider">
          <Link href="/" className="hover:text-brand-secondary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <Link href="/products" className="hover:text-brand-secondary transition-colors">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-brand-primary line-clamp-1">{product.name}</span>
        </div>
      </div>

      {/* Main Product Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white border border-gray-100 p-6 md:p-8 rounded-[24px] shadow-sm">
        
        {/* Left Column: Image Area */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="relative w-full aspect-square bg-gray-50 rounded-[20px] overflow-hidden border border-gray-100 shadow-inner">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-brand-secondary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                {discountPercent}% OFF
              </span>
            )}
            {product.isHealthcare && (
              <span className="absolute top-4 right-4 bg-brand-primary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                🛡️ Clinically Approved
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Pricing & Options */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand-secondary">
              {product.brand} • {product.petType}s
            </span>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-brand-primary leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <Rating value={product.rating} size={16} />
              <span className="text-sm font-semibold text-brand-primary leading-none">
                {product.rating} / 5.0
              </span>
              <span className="text-xs text-gray-400">({product.reviewsCount} verified reviews)</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-4 py-4 border-y border-gray-100">
            <span className="font-heading font-extrabold text-3xl text-brand-primary">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              product.inStock 
                ? "bg-brand-accent/15 text-brand-accent border border-brand-accent/20" 
                : "bg-rose-50 text-rose-500 border border-rose-100"
            }`}>
              {product.inStock ? "✓ In Stock" : "🫙 Out of Stock"}
            </span>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed">
            {product.description}
          </p>

          {/* Package Size Picker */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-brand-primary uppercase tracking-wider flex items-center gap-1.5">
                <span>Select Package Size</span>
                <Info className="w-3.5 h-3.5 text-gray-400" />
              </span>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`text-xs font-bold px-4 py-2.5 rounded-xl border transition-all ${
                      selectedSize === size
                        ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add actions (Quantity & Cart Buttons) */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            {/* Quantity adjust */}
            <div className="flex items-center justify-between border border-gray-200 rounded-xl p-2.5 w-full sm:w-32 bg-brand-light">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-brand-primary hover:bg-gray-100 transition-colors border border-gray-200"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold text-sm text-brand-primary w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-brand-primary hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Actions */}
            <div className="flex flex-1 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 font-bold text-sm py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  !product.inStock
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border"
                    : addedToCart
                    ? "bg-brand-accent text-white shadow-md scale-102"
                    : "bg-brand-secondary text-white hover:bg-brand-secondary-hover shadow-md hover:scale-102"
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                {addedToCart ? "Added to Cart!" : "Add to Cart"}
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`w-12 rounded-xl border flex items-center justify-center transition-all ${
                  isLiked
                    ? "bg-rose-50 border-rose-100 text-rose-500"
                    : "bg-white border-gray-200 text-gray-400 hover:text-rose-500 hover:bg-rose-50"
                }`}
                aria-label="Toggle Wishlist"
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-rose-500" : ""}`} />
              </button>
            </div>
          </div>

          {/* Quick trust metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100 text-xs text-gray-400 font-semibold">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-brand-secondary" />
              <span>Free delivery &ge; ₹3,000</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-accent" />
              <span>Vet Approved Formula</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-brand-secondary" />
              <span>Hassle-free Returns</span>
            </div>
          </div>

        </div>

      </section>

      {/* Tabs Layout (Specifications & Reviews) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-12">
        <div className="bg-white border border-gray-100 rounded-[24px] shadow-sm overflow-hidden">
          {/* Tab buttons */}
          <div className="flex border-b border-gray-100 bg-brand-light/50">
            <button
              onClick={() => setActiveTab("details")}
              className={`px-6 py-4 font-heading font-bold text-sm sm:text-base border-b-2 transition-all ${
                activeTab === "details"
                  ? "border-brand-secondary text-brand-primary bg-white"
                  : "border-transparent text-gray-500 hover:text-brand-primary"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`px-6 py-4 font-heading font-bold text-sm sm:text-base border-b-2 transition-all ${
                activeTab === "specs"
                  ? "border-brand-secondary text-brand-primary bg-white"
                  : "border-transparent text-gray-500 hover:text-brand-primary"
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-6 py-4 font-heading font-bold text-sm sm:text-base border-b-2 transition-all ${
                activeTab === "reviews"
                  ? "border-brand-secondary text-brand-primary bg-white"
                  : "border-transparent text-gray-500 hover:text-brand-primary"
              }`}
            >
              Reviews ({product.reviewsCount})
            </button>
          </div>

          {/* Tab content boxes */}
          <div className="p-6 md:p-8">
            
            {/* Description Tab */}
            {activeTab === "details" && (
              <div className="prose max-w-none text-sm text-gray-500 leading-relaxed flex flex-col gap-4">
                <p>{product.description}</p>
                <h4 className="font-heading font-bold text-brand-primary text-base mt-2">Core Health Benefits</h4>
                <ul className="list-disc pl-5 flex flex-col gap-1 text-xs">
                  <li>Formulated by professional veterinarians and animal dieticians.</li>
                  <li>Sourced from human-grade ingredients and wild catch targets.</li>
                  <li>Ensures optimal vitamin absorbency and metabolic health.</li>
                </ul>
              </div>
            )}

            {/* Specs Tab */}
            {activeTab === "specs" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400">
                      <th className="py-2.5 font-bold uppercase tracking-wider w-1/3">Feature</th>
                      <th className="py-2.5 font-bold uppercase tracking-wider">Details</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 divide-y divide-gray-50">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <tr key={key}>
                        <td className="py-3 font-bold text-brand-primary">{key}</td>
                        <td className="py-3">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Reviews List */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  {product.reviews.map((rev) => (
                    <div key={rev.id} className="pb-6 border-b border-gray-150 last:border-0 flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-brand-primary">{rev.userName}</span>
                          {rev.verified && (
                            <span className="bg-brand-accent/15 text-brand-accent text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 border border-brand-accent/10">
                              <CheckCircle className="w-2.5 h-2.5" />
                              Verified Buyer
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-400 font-medium">{rev.date}</span>
                      </div>
                      <Rating value={rev.rating} size={12} />
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Write Review Form */}
                <div className="lg:col-span-5 bg-brand-light p-6 rounded-2xl border border-gray-150 h-fit">
                  <h3 className="font-heading font-bold text-base text-brand-primary mb-3">
                    Write a Review
                  </h3>
                  
                  {reviewSubmitted ? (
                    <div className="bg-white border border-brand-accent/20 p-4 rounded-xl text-center flex flex-col items-center gap-2">
                      <CheckCircle className="w-8 h-8 text-brand-accent" />
                      <h4 className="font-bold text-brand-primary text-sm">Review Submitted!</h4>
                      <p className="text-xs text-gray-500">Thank you for sharing your experience with our pet parent community.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-brand-primary uppercase">Your Name</label>
                        <input
                          type="text"
                          required
                          value={reviewName}
                          onChange={(e) => setReviewName(e.target.value)}
                          placeholder="e.g. Rachel S."
                          className="bg-white border border-gray-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-brand-secondary"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-brand-primary uppercase">Rating Score</label>
                        <select
                          value={reviewRating}
                          onChange={(e) => setReviewRating(Number(e.target.value))}
                          className="bg-white border border-gray-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-brand-secondary font-bold text-brand-primary cursor-pointer"
                        >
                          <option value="5">5 Stars (Excellent)</option>
                          <option value="4">4 Stars (Good)</option>
                          <option value="3">3 Stars (Average)</option>
                          <option value="2">2 Stars (Poor)</option>
                          <option value="1">1 Star (Very Poor)</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-brand-primary uppercase">Comment</label>
                        <textarea
                          required
                          rows={3}
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          placeholder="How did your pet like this product? Share details..."
                          className="bg-white border border-gray-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-brand-secondary resize-none"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="bg-brand-primary text-white font-bold text-xs py-2.5 rounded-full hover:bg-brand-primary-hover shadow-sm transition-all"
                      >
                        Submit Review
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-16 flex flex-col gap-6">
          <h2 className="font-heading font-bold text-2xl text-brand-primary border-b border-gray-200 pb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-secondary" />
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed Products Section */}
      {mounted && recentlyViewed.length > 1 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-16 flex flex-col gap-6">
          <h2 className="font-heading font-bold text-2xl text-brand-primary border-b border-gray-200 pb-3 flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-brand-secondary" />
            Recently Viewed
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentlyViewed
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </section>
      )}

    </div>
  );
}

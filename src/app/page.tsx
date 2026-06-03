"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import { categories, petsList } from "@/data/categories";
import { blogs } from "@/data/blogs";
import ProductCard from "@/components/ui/ProductCard";
import { 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Award,
  Sparkles,
  Stethoscope,
  CheckCircle2,
  Clock,
  ChevronRight,
  ChevronLeft,
  Tag
} from "lucide-react";

const slides = [
  {
    subtitle: "Veterinarian Recommended Care",
    titleStart: "Premium Nutrition",
    titleHighlight: "& Clinical Wellness",
    titleEnd: "for Your Beloved Pets",
    paragraph: "Your trusted partner in veterinary pet healthcare. Shop from our curated collection of premium grain-free foods, clinical joint supplements, and organic grooming essentials.",
    btn1Text: "Shop All Products",
    btn1Link: "/products",
    btn2Text: "Healthcare Collection",
    btn2Link: "/products?filter=healthcare",
    btn2Icon: "stethoscope",
    stats: [
      { value: "15k+", label: "Happy Pets", colorClass: "text-brand-accent" },
      { value: "100%", label: "Vet Approved", colorClass: "text-brand-secondary" },
      { value: "4.9/5", label: "Reviews Rating", colorClass: "text-white" }
    ],
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800",
    alt: "Happy dog smiling",
    badgeTitle: "Quality Certification",
    badgeDesc: "Manufactured under rigid safety standards."
  },
  {
    subtitle: "Exclusive Indian Pet Store",
    titleStart: "Premium Pet Supplies",
    titleHighlight: "& Toys",
    titleEnd: "",
    paragraph: "Discover interactive toys, comfortable memory-foam beds, and daily grooming essentials. Give your pets the happy, healthy, and active lifestyle they deserve.",
    btn1Text: "Explore New Arrivals",
    btn1Link: "/products?filter=new",
    btn2Text: "Shop Accessories",
    btn2Link: "/products?subcategory=toys",
    btn2Icon: "sparkles",
    stats: [
      { value: "10k+", label: "Toys Sold", colorClass: "text-brand-accent" },
      { value: "Fast", label: "India Delivery", colorClass: "text-brand-secondary" },
      { value: "Premium", label: "Vet Selected", colorClass: "text-white" }
    ],
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800",
    alt: "Playful kitten looking up",
    badgeTitle: "Premium Selections",
    badgeDesc: "100% curated for pet fun and safety."
  },
  {
    subtitle: "Nutritious & Delicious Meals",
    titleStart: "Healthy Grain-Free",
    titleHighlight: "Food & Treats",
    titleEnd: "for Daily Energy",
    paragraph: "Keep their tails wagging with our wide range of premium vet-approved foods, freeze-dried treats, and chewables. Free delivery on all orders above ₹3,000.",
    btn1Text: "Shop Pet Food",
    btn1Link: "/products?subcategory=dog-food",
    btn2Text: "View Active Deals",
    btn2Link: "/products",
    btn2Icon: "tag",
    stats: [
      { value: "₹3,000+", label: "Free Shipping", colorClass: "text-brand-accent" },
      { value: "100%", label: "Vet Formulated", colorClass: "text-brand-secondary" },
      { value: "Natural", label: "Zero Fillers", colorClass: "text-white" }
    ],
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=800",
    alt: "Dog eating food",
    badgeTitle: "100% Vet Approved",
    badgeDesc: "Formulated for optimal pet digestion."
  }
];

export default function Homepage() {
  const [activeNewArrivalTab, setActiveNewArrivalTab] = useState<"all" | "dog" | "cat">("all");
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  
  // Filter products for sections
  const bestSellers = products.filter(p => p.isFeatured).slice(0, 4);
  
  const newArrivals = products
    .filter(p => p.isNew)
    .filter(p => {
      if (activeNewArrivalTab === "all") return true;
      return p.petType === activeNewArrivalTab;
    })
    .slice(0, 4);

  const healthcareCollection = products.filter(p => p.isHealthcare).slice(0, 4);

  return (
    <div className="w-full bg-brand-light flex flex-col gap-16 md:gap-24 pb-16 md:pb-24 overflow-hidden">
      
      {/* SECTION 1: Hero Banner (Slideshow Carousel) */}
      <section className="relative w-full h-[620px] sm:h-[680px] lg:h-[620px] bg-brand-primary hero-gradient overflow-hidden flex items-center pt-8 md:pt-0">
        {/* Background decorative circles */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] aspect-square rounded-full bg-brand-secondary/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] aspect-square rounded-full bg-brand-accent/10 blur-3xl pointer-events-none" />

        {/* Slides container */}
        <div className="w-full h-full relative">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out flex items-center ${
                  isActive ? "opacity-100 z-20 pointer-events-auto scale-100" : "opacity-0 z-10 pointer-events-none scale-[0.98]"
                }`}
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center relative w-full">
                  {/* Left Column: Heading and Text */}
                  <div className={`lg:col-span-7 flex flex-col gap-6 text-white text-center lg:text-left lg:min-h-[540px] transition-all duration-700 delay-200 transform ${
                    isActive ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`}>
                    <div className="inline-flex items-center gap-2 self-center lg:self-start bg-white/10 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-secondary leading-none">
                      <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse-subtle flex-shrink-0" />
                      <span className="leading-none">{slide.subtitle}</span>
                    </div>
                    
                    <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl leading-tight">
                      {slide.titleStart} <br />
                      <span className="text-brand-secondary">{slide.titleHighlight}</span>
                      {slide.titleEnd && (
                        <>
                          <br />
                          {slide.titleEnd}
                        </>
                      )}
                    </h1>
                    
                    <p className="text-sm sm:text-base text-gray-200 max-w-xl leading-relaxed mx-auto lg:mx-0 lg:h-[80px]">
                      {slide.paragraph}
                    </p>
                    
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                      <Link 
                        href={slide.btn1Link}
                        className="bg-brand-secondary text-brand-dark px-8 py-3.5 rounded-full font-bold text-sm hover:bg-brand-secondary-hover hover:scale-105 shadow-lg transition-all flex items-center gap-2"
                      >
                        {slide.btn1Text}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link 
                        href={slide.btn2Link}
                        className="bg-transparent border border-white/30 text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-white/10 hover:border-white transition-all flex items-center gap-2"
                      >
                        {slide.btn2Icon === "stethoscope" && <Stethoscope className="w-4 h-4 text-brand-secondary" />}
                        {slide.btn2Icon === "sparkles" && <Sparkles className="w-4 h-4 text-brand-secondary" />}
                        {slide.btn2Icon === "tag" && <Tag className="w-4 h-4 text-brand-secondary" />}
                        {slide.btn2Text}
                      </Link>
                    </div>

                    {/* Quick stats banner */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 max-w-md mx-auto lg:mx-0 lg:mt-auto">
                      {slide.stats.map((stat, statIdx) => (
                        <div key={statIdx} className="text-center lg:text-left">
                          <p className={`font-heading font-bold text-xl sm:text-2xl ${stat.colorClass}`}>{stat.value}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Hero Image Banner */}
                  <div className={`lg:col-span-5 relative w-full h-[320px] sm:h-[420px] lg:h-[460px] transition-all duration-700 delay-300 transform ${
                    isActive ? "scale-100 opacity-100" : "scale-95 opacity-0"
                  }`}>
                    {/* Soft decorative shadow background */}
                    <div className="absolute inset-4 bg-brand-secondary/20 rounded-[28px] blur-xl transform rotate-3" />
                    <div className="absolute inset-0 bg-white/5 rounded-[24px] border border-white/10 overflow-hidden shadow-2xl backdrop-blur-sm">
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        priority={index === 0}
                        className="object-cover"
                      />
                      {/* Trust Badge Layer Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 bg-brand-dark/80 backdrop-blur-md p-4 rounded-[16px] border border-white/10 flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand-secondary rounded-full flex items-center justify-center text-brand-dark">
                          <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">{slide.badgeTitle}</h4>
                          <p className="text-[10px] text-gray-400">{slide.badgeDesc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Side Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 text-white transition-all hover:scale-110 hidden md:flex items-center justify-center cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 text-white transition-all hover:scale-110 hidden md:flex items-center justify-center cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Bottom Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentSlide 
                  ? "bg-brand-secondary w-8" 
                  : "bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* SECTION 2: Shop by Pet Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full flex flex-col gap-8">
        <div className="text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-brand-primary mb-2">
            Shop by Pet
          </h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Choose your furry or feathered friend to browse tailored diets and accessories.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {petsList.map((pet) => (
            <Link 
              key={pet.id}
              href={`/products?pet=${pet.id}`}
              className="group flex flex-col items-center gap-4 bg-white border border-gray-100 p-6 rounded-[20px] shadow-sm hover:shadow-premium hover:border-brand-secondary transition-all text-center"
            >
              <div className="w-20 h-20 rounded-full bg-brand-light flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                <Image
                  src={pet.image}
                  alt={pet.name}
                  fill
                  className="object-cover opacity-20 group-hover:opacity-40 transition-opacity"
                />
                <span className="relative z-10 group-hover:rotate-12 transition-transform">{pet.icon}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-base text-brand-primary group-hover:text-brand-secondary transition-colors">
                  {pet.name}
                </span>
                <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase mt-0.5">
                  Browse Shop
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 3: Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-brand-primary mb-1">
              Featured Categories
            </h2>
            <p className="text-sm text-gray-500">
              Browse veterinary products by solution and product class.
            </p>
          </div>
          <Link 
            href="/products"
            className="text-xs font-bold text-brand-secondary uppercase tracking-wider hover:text-brand-primary transition-colors flex items-center gap-1 group"
          >
            <span>View All Products</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.slice(0, 5).map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group relative h-72 rounded-[20px] overflow-hidden shadow-sm hover:shadow-premium transition-all"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-75 group-hover:brightness-[0.70]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-transparent to-transparent flex flex-col justify-end p-5">
                <span className="text-3xl mb-2">{cat.icon}</span>
                <h3 className="font-heading font-bold text-lg text-white group-hover:text-brand-secondary transition-colors leading-tight mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 4: Best Selling Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full flex flex-col gap-8">
        <div className="text-center">
          <div className="inline-block bg-brand-secondary/10 px-3 py-1 rounded-full text-[10px] font-bold text-brand-secondary uppercase tracking-widest mb-2">
            ⭐ Top Rated Staples
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-brand-primary mb-1">
            Best Selling Products
          </h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            These clinic staples and food favorites are loved by pet parents worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION 5: New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-brand-primary mb-1">
              New Arrivals
            </h2>
            <p className="text-sm text-gray-500">
              The latest additions of premium brands and health solutions.
            </p>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2 bg-white border border-gray-150 p-1.5 rounded-full">
            <button
              onClick={() => setActiveNewArrivalTab("all")}
              className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${
                activeNewArrivalTab === "all"
                  ? "bg-brand-primary text-white shadow-sm"
                  : "bg-transparent text-gray-500 hover:text-brand-primary"
              }`}
            >
              All Pets
            </button>
            <button
              onClick={() => setActiveNewArrivalTab("dog")}
              className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${
                activeNewArrivalTab === "dog"
                  ? "bg-brand-primary text-white shadow-sm"
                  : "bg-transparent text-gray-500 hover:text-brand-primary"
              }`}
            >
              Dogs 🐕
            </button>
            <button
              onClick={() => setActiveNewArrivalTab("cat")}
              className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${
                activeNewArrivalTab === "cat"
                  ? "bg-brand-primary text-white shadow-sm"
                  : "bg-transparent text-gray-500 hover:text-brand-primary"
              }`}
            >
              Cats 🐈
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.length > 0 ? (
            newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-400 bg-white border border-gray-100 rounded-[20px]">
              No new arrivals listed for this category currently. Check back soon!
            </div>
          )}
        </div>
      </section>

      {/* SECTION 6: Premium Pet Brands */}
      <section className="bg-white border-y border-gray-100 py-10 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col gap-8">
          <p className="text-center text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
            Authorized Premium Brand Distributor
          </p>
          
          <div className="relative w-full overflow-hidden py-2">
            {/* Gradient overlays to fade out content at the edges for premium aesthetic */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            {/* Brand Logo Ticker Container */}
            <div className="flex w-max animate-ticker gap-16 md:gap-24 items-center">
              {/* Duplicate the array to create a seamless infinite loop */}
              {[
                "Royal Canin", "Orijen", "Frontline", "FURminator", "Inaba Churu", "Oxbow",
                "Royal Canin", "Orijen", "Frontline", "FURminator", "Inaba Churu", "Oxbow"
              ].map((brand, index) => (
                <div 
                  key={`${brand}-${index}`}
                  className="font-heading font-extrabold text-2xl md:text-3xl text-gray-400 hover:text-brand-primary transition-colors cursor-default select-none tracking-tight transform hover:scale-105 transition-transform duration-300 flex-shrink-0"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Pet Healthcare Collection */}
      <section className="w-full bg-brand-primary text-white py-16 md:py-24 healthcare-gradient relative overflow-hidden">
        <div className="absolute top-[-30%] right-[-10%] w-[60%] aspect-square rounded-full bg-brand-secondary/10 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Healthcare Description & Banner Details */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 self-center lg:self-start bg-brand-secondary/20 border border-brand-secondary/30 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-secondary">
              <Stethoscope className="w-3.5 h-3.5 text-brand-secondary" />
              <span>Veterinary Care Line</span>
            </div>
            
            <h2 className="font-heading font-bold text-3xl md:text-4xl leading-tight">
              Clinical Quality <br />
              Healthcare Solutions
            </h2>
            
            <p className="text-sm text-gray-300 max-w-md mx-auto lg:mx-0 leading-relaxed">
              Maintain your pet's joints, coats, and digestive tract under the supervision of specialists. Explore vaccines, flea & tick repelling topicals, and joint chewables.
            </p>
            
            <div className="flex flex-col gap-3 max-w-sm mx-auto lg:mx-0 text-left text-sm text-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-accent flex-shrink-0" />
                <span>Premium joint formulas (Glucosamine, MSM)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-accent flex-shrink-0" />
                <span>FDA & EPA approved tick protection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-accent flex-shrink-0" />
                <span>Soap-free natural dermatological shampoos</span>
              </div>
            </div>

            <Link 
              href="/products?filter=healthcare"
              className="bg-brand-secondary text-brand-dark px-8 py-3.5 rounded-full font-bold text-sm hover:bg-brand-secondary-hover hover:scale-105 transition-all shadow-md self-center lg:self-start flex items-center gap-2 mt-2"
            >
              Shop Healthcare Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Healthcare Product Showcase Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-brand-dark">
            {healthcareCollection.slice(0, 2).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: Featured Offers & Discounts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Promo Card 1 */}
          <div className="bg-brand-secondary/15 rounded-[24px] border border-brand-secondary/20 p-8 md:p-10 flex flex-col justify-between items-start relative overflow-hidden min-h-[220px]">
            <div className="absolute right-0 bottom-0 w-[45%] h-full opacity-10 flex items-center justify-center text-[180px] select-none pointer-events-none">
              💊
            </div>
            <div className="flex flex-col gap-3 relative z-10">
              <span className="bg-brand-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider inline-block self-start">
                Healthcare Offer
              </span>
              <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-brand-primary">
                15% OFF Supplements & Meds
              </h3>
              <p className="text-sm text-brand-primary/80 max-w-sm">
                Get an extra 15% discount on vet prescribed healthcare items and dental chews.
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-6 relative z-10 w-full justify-between sm:justify-start">
              <div className="bg-white border border-brand-secondary/30 px-4 py-2 rounded-lg font-mono text-sm font-bold text-brand-primary">
                Code: PETCARE15
              </div>
              <Link 
                href="/products?filter=healthcare"
                className="text-xs font-bold text-brand-primary hover:text-brand-primary-hover flex items-center gap-1 group"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Promo Card 2 */}
          <div className="bg-brand-accent/15 rounded-[24px] border border-brand-accent/20 p-8 md:p-10 flex flex-col justify-between items-start relative overflow-hidden min-h-[220px]">
            <div className="absolute right-0 bottom-0 w-[45%] h-full opacity-10 flex items-center justify-center text-[180px] select-none pointer-events-none">
              🎁
            </div>
            <div className="flex flex-col gap-3 relative z-10">
              <span className="bg-brand-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider inline-block self-start">
                Welcome Offer
              </span>
              <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-brand-primary">
                First Purchase Bonus
              </h3>
              <p className="text-sm text-brand-primary/80 max-w-sm">
                Unlock 10% off site-wide on your first order. Appies to all pet accessories, toys, and foods.
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-6 relative z-10 w-full justify-between sm:justify-start">
              <div className="bg-white border border-brand-accent/30 px-4 py-2 rounded-lg font-mono text-sm font-bold text-brand-primary">
                Code: WELCOME10
              </div>
              <Link 
                href="/products"
                className="text-xs font-bold text-brand-primary hover:text-brand-primary-hover flex items-center gap-1 group"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 9: Why Choose Us */}
      <section className="bg-white py-16 md:py-24 border-y border-gray-100 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full flex flex-col gap-12">
          <div className="text-center max-w-md mx-auto flex flex-col gap-2">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-brand-primary">
              Why Pet Parents Trust Us
            </h2>
            <p className="text-sm text-gray-500">
              We design every part of the purchase flow to guarantee speed, satisfaction, and veterinary integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-light p-8 rounded-[24px] flex flex-col gap-4 items-center text-center">
              <div className="w-16 h-16 bg-brand-primary text-white rounded-full flex items-center justify-center">
                <Stethoscope className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-xl text-brand-primary">Registered Vet Network</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We partner with accredited practicing veterinarians to verify our medical inventories, dosages, ingredients, and healthcare manuals.
              </p>
            </div>
            <div className="bg-brand-light p-8 rounded-[24px] flex flex-col gap-4 items-center text-center">
              <div className="w-16 h-16 bg-brand-secondary text-brand-dark rounded-full flex items-center justify-center">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-xl text-brand-primary">Temperature Controlled Logistics</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Vitamins, liquid treatments, and premium foods are shipped in heat-regulated packaging to retain structural integrity and absolute freshness.
              </p>
            </div>
            <div className="bg-brand-light p-8 rounded-[24px] flex flex-col gap-4 items-center text-center">
              <div className="w-16 h-16 bg-brand-accent text-white rounded-full flex items-center justify-center">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-xl text-brand-primary">Global Award Winner</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Awarded the "Outstanding Pet Care & Healthcare Retailer" trophy consecutively for three years. Trusted by over 150,000 households.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full flex flex-col gap-12">
        <div className="text-center">
          <div className="inline-block bg-brand-accent/10 px-3 py-1 rounded-full text-[10px] font-bold text-brand-accent uppercase tracking-widest mb-2">
            💬 Customer Success Stories
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-brand-primary mb-1">
            Loved by Pet Parents
          </h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Read real feedback from our loyal community of pet owners and veterinary advocates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "The low-fat gastro diet completely healed my Golden Retriever's stomach issues within a week. I cannot recommend VetPet Galleria enough for their fast delivery and vet-checked products.",
              name: "Eleanor Vance",
              pet: "Owner of Cooper (Golden Retriever)",
              rating: 5
            },
            {
              quote: "Finding high-quality, grain-free premium meals for chinchillas is usually a chore. Finding them with same-day temperature-regulated logistics is a miracle. Incredible service!",
              name: "David K.",
              pet: "Owner of Pip & Squeak (Chinchillas)",
              rating: 5
            },
            {
              quote: "Their registered vet hotline answered my flea dosage question at 11 PM on a Sunday. Frontline treatment arrived early next morning. Truly outstanding support.",
              name: "Dr. Rachel Green",
              pet: "Owner of Luna (Ragdoll Cat)",
              rating: 5
            }
          ].map((test, idx) => (
            <div key={idx} className="bg-white border border-gray-100 p-8 rounded-[24px] shadow-sm flex flex-col justify-between gap-6 relative">
              <span className="absolute top-4 right-6 text-brand-secondary/15 text-6xl font-serif select-none">“</span>
              <p className="text-sm text-gray-500 italic relative z-10 leading-relaxed">
                "{test.quote}"
              </p>
              <div className="flex flex-col gap-1 pt-4 border-t border-gray-50">
                <span className="font-heading font-bold text-brand-primary text-base leading-tight">
                  {test.name}
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  {test.pet}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 11: Pet Care Blog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full flex flex-col gap-12">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-brand-primary mb-1">
              Pet Care Blog
            </h2>
            <p className="text-sm text-gray-500">
              Stay updated with professional veterinarian insights, nutritional guides, and pet behaviors.
            </p>
          </div>
          <Link 
            href="/blog"
            className="text-xs font-bold text-brand-secondary uppercase tracking-wider hover:text-brand-primary transition-colors flex items-center gap-1 group"
          >
            <span>Read All Articles</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article 
              key={blog.id} 
              className="bg-white border border-gray-100 rounded-[24px] overflow-hidden shadow-sm hover:shadow-premium group flex flex-col h-full transition-all duration-300"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-xs text-brand-secondary font-bold uppercase tracking-wider">
                    <span>{blog.category}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                    <span className="text-gray-400 font-semibold">{blog.date}</span>
                  </div>
                  <Link href={`/blog`}>
                    <h3 className="font-heading font-bold text-lg text-brand-primary group-hover:text-brand-secondary transition-colors duration-300 line-clamp-2 leading-snug">
                      {blog.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-50 text-xs text-gray-400 font-semibold">
                  <span>By {blog.author.split(",")[0]}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-300" />
                    {blog.readTime}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}

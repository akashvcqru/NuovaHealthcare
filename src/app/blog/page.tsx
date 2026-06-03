"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogs } from "@/data/blogs";
import { 
  ChevronRight, 
  Clock, 
  Calendar, 
  User, 
  BookOpen, 
  ChevronLeft,
  Share2
} from "lucide-react";
import { BlogPost } from "@/types";

export default function BlogHubPage() {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  // Share article mock
  const handleShare = () => {
    alert("Staging link copied to clipboard!");
  };

  // If reading an article, render full-text reader
  if (selectedBlog) {
    return (
      <div className="bg-brand-light min-h-screen pb-16 md:pb-24 animate-scale-in">
        {/* Header Breadcrumbs */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-1.5 text-xs text-gray-505 font-semibold uppercase tracking-wider mb-4">
            <Link href="/" className="hover:text-brand-secondary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <button 
              onClick={() => setSelectedBlog(null)} 
              className="hover:text-brand-secondary transition-colors uppercase font-semibold"
            >
              Blog
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-brand-primary line-clamp-1">{selectedBlog.title}</span>
          </div>

          <button
            onClick={() => setSelectedBlog(null)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-secondary hover:text-brand-secondary-hover underline mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Articles
          </button>
        </div>

        {/* Article Body */}
        <article className="max-w-4xl mx-auto bg-white border border-gray-100 rounded-[28px] overflow-hidden shadow-premium">
          {/* Top cover image */}
          <div className="relative h-64 sm:h-[400px] w-full bg-gray-50">
            <Image
              src={selectedBlog.image}
              alt={selectedBlog.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="p-6 sm:p-10 flex flex-col gap-6">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-550 font-semibold uppercase tracking-wider border-b border-gray-100 pb-5">
              <span className="bg-brand-secondary/15 text-brand-secondary px-2.5 py-1 rounded-md">
                {selectedBlog.category}
              </span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{selectedBlog.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-gray-400" />
                <span>{selectedBlog.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{selectedBlog.readTime}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-brand-primary leading-tight">
              {selectedBlog.title}
            </h1>

            {/* Rich content (rendered with margins/formatting) */}
            <div className="prose prose-sm max-w-none text-gray-505 leading-relaxed flex flex-col gap-4 text-sm whitespace-pre-line border-b border-gray-100 pb-8 font-sans">
              {selectedBlog.content}
            </div>

            {/* Footer options */}
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setSelectedBlog(null)}
                className="bg-brand-light text-brand-primary font-bold text-xs px-5 py-2.5 rounded-full hover:bg-brand-secondary hover:text-white transition-all border border-gray-200"
              >
                ← Back to Blog
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 bg-brand-light hover:bg-brand-light/80 text-brand-primary rounded-full transition-colors flex items-center justify-center border border-gray-200"
                aria-label="Share article"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        </article>
      </div>
    );
  }

  // Else, render the articles list grid
  return (
    <div className="bg-brand-light min-h-screen pb-16 md:pb-24">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
        <div className="flex items-center gap-1.5 text-xs text-gray-505 font-semibold uppercase tracking-wider">
          <Link href="/" className="hover:text-brand-secondary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-brand-primary">Pet Care Blog</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col gap-8">
        
        {/* Title */}
        <div className="border-b border-gray-200 pb-5 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-secondary" />
            <h1 className="font-heading font-bold text-2xl text-brand-primary">
              Nuova Healthcare Blog
            </h1>
          </div>
          <p className="text-xs text-gray-500 max-w-sm text-center sm:text-right font-medium">
            Clinical insights, nutrition schedules, and pet grooming strategies verified by medical experts.
          </p>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article 
              key={blog.id} 
              className="bg-white border border-gray-100 rounded-[24px] overflow-hidden shadow-sm hover:shadow-premium group flex flex-col h-full transition-all duration-300"
            >
              <div className="relative h-48 w-full overflow-hidden bg-gray-50">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-[10px] text-brand-secondary font-bold uppercase tracking-wider">
                    <span>{blog.category}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                    <span className="text-gray-400 font-semibold">{blog.date}</span>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedBlog(blog)}
                    className="text-left"
                  >
                    <h3 className="font-heading font-bold text-lg text-brand-primary group-hover:text-brand-secondary transition-colors duration-300 line-clamp-2 leading-snug">
                      {blog.title}
                    </h3>
                  </button>
                  
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

      </div>
    </div>
  );
}

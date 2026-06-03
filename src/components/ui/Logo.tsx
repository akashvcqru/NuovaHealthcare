import React from "react";
import Link from "next/link";

interface LogoProps {
  showText?: boolean;
  className?: string;
  variant?: "header" | "footer" | "default";
}

export default function Logo({ showText = true, className = "", variant = "default" }: LogoProps) {
  if (variant === "header") {
    return (
      <Link href="/" className={`flex items-center gap-3 group ${className}`}>
        {/* Logo Image used as-is, strictly for the header, no SVG */}
        <div className="relative flex items-center justify-start py-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="VetPet Galleria Logo"
            className="h-11 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
    );
  }

  return (
    <Link href="/" className={`flex items-center gap-3 group ${className}`}>
      {/* Premium SVG Icon */}
      <div className="relative w-10 h-10 flex-shrink-0">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full transform transition-transform duration-500 group-hover:rotate-12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Shield/Heart contour in light teal */}
          <path
            d="M50 88C50 88 12 60 12 36C12 20 25 12 38 12C45 12 48 16 50 18C52 16 55 12 62 12C75 12 88 20 88 36C88 60 50 88 50 88Z"
            stroke="#2ECAB2"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-20"
          />

          {/* Medical Cross merged with Paw Center in Navy Blue */}
          <path
            d="M44 38H56V50H68V62H56V74H44V62H32V50H44V38Z"
            fill="#01375B"
            className="transition-colors duration-300 group-hover:fill-brand-primary-hover"
          />

          {/* Paw Pads/Dots in Accent Green and Secondary Teal */}
          <circle cx="28" cy="30" r="8" fill="#2ECAB2" />
          <circle cx="72" cy="30" r="8" fill="#2ECAB2" />

          {/* Fresh Green leaf overlay on the top center representing organic care */}
          <path
            d="M50 18C44 26 48 34 50 36C52 34 56 26 50 18Z"
            fill="#3DCB63"
            className="animate-pulse-subtle"
          />

          {/* Small accent dot in the center of the cross */}
          <circle cx="50" cy="56" r="3" fill="#ffffff" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col select-none">
          <span className="font-heading font-bold text-xl leading-tight text-brand-primary transition-colors duration-300 group-hover:text-brand-primary-hover">
            VetPet
          </span>
          <span className="text-[10px] font-sans tracking-[0.25em] font-semibold text-brand-secondary uppercase leading-none">
            Galleria
          </span>
        </div>
      )}
    </Link>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import {
  Sun,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  Award,
  Globe,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#04241D] text-white/80 pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Brand Presentation */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 group mb-6">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#138A62] to-[#073D32] flex items-center justify-center shadow-lg border border-[#F4B942]/30">
                <Sun className="w-6 h-6 text-[#F4B942]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-black text-2xl tracking-tight text-white leading-none">
                    BHARAT
                  </span>
                  <span className="font-extrabold text-2xl tracking-tight text-[#F4B942] leading-none">
                    SOLAR
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-emerald-300 mt-1">
                  Energising Tomorrow
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed max-w-sm mb-6">
              BHARAT SOLAR is an enterprise renewable energy leader delivering Tier-1 solar modules, mega utility grid parks, and turnkey industrial EPC solutions across India.
            </p>

            {/* Social pills */}
            <div className="flex items-center space-x-2.5 text-xs font-bold text-[#F4B942]">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F4B942] hover:text-[#073D32] flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                in
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F4B942] hover:text-[#073D32] flex items-center justify-center transition-colors"
                aria-label="X / Twitter"
              >
                𝕏
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F4B942] hover:text-[#073D32] flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                yt
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F4B942] hover:text-[#073D32] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                fb
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4B942] mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-emerald-100/70">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About BHARAT SOLAR
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Landmark Projects
                </a>
              </li>
              <li>
                <a href="#sustainability" className="hover:text-white transition-colors">
                  ESG &amp; Sustainability
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Investor Relations
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Careers &amp; Leadership
                </a>
              </li>
            </ul>
          </div>

          {/* Our Solutions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4B942] mb-5">
              Our Solutions
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-emerald-100/70">
              <li>
                <a href="#solutions" className="hover:text-white transition-colors">
                  Residential Rooftop
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-white transition-colors">
                  Commercial Rooftop
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-white transition-colors">
                  Industrial Captive Solar
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-white transition-colors">
                  Utility Power Plants
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-white transition-colors">
                  Turnkey Solar EPC
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4B942] mb-5">
              Contact Details
            </h4>
            <div className="space-y-3 text-xs text-emerald-100/70">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F4B942] flex-shrink-0 mt-0.5" />
                <span>BKC Commercial Complex, Bandra (E), Mumbai 400051</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F4B942] flex-shrink-0" />
                <span>1800-209-SOLAR (Toll-Free)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F4B942] flex-shrink-0" />
                <span>inquiry@bharatsolar.com</span>
              </div>
              <div className="pt-2 text-[11px] text-white/50">
                CIN: L40106MH2008PLC182040
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Accreditation Strip */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-emerald-200/50 gap-4">
          <div className="flex items-center gap-6">
            <span>&copy; 2026 BHARAT SOLAR ENERGY LIMITED. All rights reserved.</span>
            <span className="hidden sm:inline">|</span>
            <span className="text-[#F4B942]">ISO 9001:2015 &bull; ALMM Approved</span>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Whistleblower Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

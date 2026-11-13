"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sun,
  ChevronDown,
  Menu,
  X,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  Zap,
  Building2,
  Factory,
  Home,
  Cpu,
} from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<"products" | "solutions" | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      setActiveMenu(null);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const solutionsList = [
    {
      title: "Residential Solar",
      desc: "Grid-tied rooftop solar with PM Surya Ghar subsidy support",
      icon: Home,
      href: "#solution-residential",
      tag: "Rooftop Solar",
    },
    {
      title: "Commercial Solar",
      desc: "Carports & rooftop solutions for colleges & IT tech parks",
      icon: Building2,
      href: "#solution-commercial",
      tag: "Peak Shaving",
    },
    {
      title: "Industrial Solar",
      desc: "Captive high-voltage power for heavy manufacturing units",
      icon: Factory,
      href: "#solution-industrial",
      tag: "Open Access",
    },
    {
      title: "Utility Scale Plants",
      desc: "Multi-megawatt solar grid parks with transmission switchyards",
      icon: Zap,
      href: "#solution-utility",
      tag: "100+ MW",
    },
    {
      title: "Turnkey EPC Services",
      desc: "Comprehensive engineering, soil testing, CEIG & commissioning",
      icon: ShieldCheck,
      href: "#solution-epc",
      tag: "Full Turnkey",
    },
    {
      title: "Solar Manufacturing",
      desc: "Automated 16BB N-Type TOPCon & Mono PERC fabrication",
      icon: Cpu,
      href: "#solution-manufacturing",
      tag: "Make in India",
    },
  ];

  const productsList = [
    {
      title: "TOPCon Solar Modules",
      specs: "580W - 620W N-Type",
      desc: "Higher bifaciality & low temperature coefficient for Indian summers",
      href: "#product-topcon",
      efficiency: "22.6% Yield",
    },
    {
      title: "Mono PERC High Output",
      specs: "540W - 555W Multi-Busbar",
      desc: "Cost-effective half-cut monocrystalline cells with anti-PID protection",
      href: "#product-monoperc",
      efficiency: "21.6% Yield",
    },
    {
      title: "Bifacial Dual-Glass Panels",
      specs: "650W+ High Output",
      desc: "Captures ambient albedo from both sides, up to 30% rear generation gain",
      href: "#product-bifacial",
      efficiency: "25.4% Max",
    },
    {
      title: "Solar Grid-Tied Inverters",
      specs: "3 kW to 350 kW Strings",
      desc: "Intelligent multi-MPPT inverters with built-in Wi-Fi cloud data loggers",
      href: "#product-inverters",
      efficiency: "98.8% Peak",
    },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Corporate Strip */}
      <div
        className={`bg-[#04241D] text-white/80 text-xs px-4 sm:px-8 border-b border-white/10 hidden md:block overflow-hidden transition-all duration-300 ${
          scrolled ? "max-h-0 py-0 opacity-0 border-none" : "max-h-12 py-2 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-white/90">
              <span className="w-2 h-2 rounded-full bg-[#138A62] animate-pulse" />
              India&apos;s Leading Renewable Energy EPC &amp; Module Manufacturer
            </span>
            <span className="text-white/40">|</span>
            <span className="text-white/70">CIN: L40106MH2008PLC182040</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="tel:18002091234" className="hover:text-[#138A62] transition-colors flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-[#138A62]" />
              Toll-Free: 1800-209-SOLAR
            </a>
            <span className="text-white/40">|</span>
            <a href="#contact" className="hover:text-[#138A62] transition-colors">
              Investor Relations
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header
        className={`w-full transition-all duration-300 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 ${
          scrolled ? "py-3 shadow-md" : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#138A62] to-[#073D32] flex items-center justify-center shadow-md border border-[#138A62]/30 group-hover:scale-105 transition-transform">
                <Sun className="w-6 h-6 text-[#F4B942]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-black text-xl tracking-tight leading-none text-[#073D32]">
                    BHARAT
                  </span>
                  <span className="font-extrabold text-xl tracking-tight text-[#138A62] leading-none">
                    SOLAR
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-widest font-semibold text-[#138A62] mt-0.5">
                  Energising Tomorrow
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-7">
              <Link
                href="/"
                className="text-sm font-semibold text-[#073D32] hover:text-[#138A62] transition-colors"
              >
                Home
              </Link>

              <a
                href="#about"
                className="text-sm font-semibold text-[#182521] hover:text-[#138A62] transition-colors"
              >
                About Us
              </a>

              {/* Products Trigger */}
              <div
                className="relative py-2"
                onMouseEnter={() => setActiveMenu("products")}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveMenu(activeMenu === "products" ? null : "products")
                  }
                  className={`text-sm font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                    activeMenu === "products"
                      ? "text-[#138A62]"
                      : "text-[#182521] hover:text-[#138A62]"
                  }`}
                >
                  Products
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeMenu === "products" ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Solutions Trigger */}
              <div
                className="relative py-2"
                onMouseEnter={() => setActiveMenu("solutions")}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveMenu(activeMenu === "solutions" ? null : "solutions")
                  }
                  className={`text-sm font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                    activeMenu === "solutions"
                      ? "text-[#138A62]"
                      : "text-[#182521] hover:text-[#138A62]"
                  }`}
                >
                  Solutions
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeMenu === "solutions" ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              <a
                href="#projects"
                className="text-sm font-semibold text-[#182521] hover:text-[#138A62] transition-colors"
              >
                Projects
              </a>

              <a
                href="#sustainability"
                className="text-sm font-semibold text-[#182521] hover:text-[#138A62] transition-colors"
              >
                Sustainability
              </a>

              <a
                href="#contact"
                className="text-sm font-semibold text-[#182521] hover:text-[#138A62] transition-colors"
              >
                Contact Us
              </a>
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 bg-[#138A62] hover:bg-[#073D32] text-white shadow-md hover:shadow-lg"
              >
                Get a Quote
              </a>
            </div>

            {/* Mobile Hamburger */}
            <div className="lg:hidden flex items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-[#073D32] hover:bg-gray-100 transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* PRODUCTS MEGA-MENU */}
        {activeMenu === "products" && (
          <div
            className="hidden lg:block bg-white border-t border-gray-100 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#138A62]" />
                  <span className="text-xs font-black uppercase tracking-wider text-[#073D32]">
                    Solar Hardware &amp; Module Technology
                  </span>
                </div>
                <a
                  href="#products"
                  onClick={() => setActiveMenu(null)}
                  className="text-xs font-bold text-[#138A62] hover:underline flex items-center gap-1"
                >
                  View Complete Catalog &rarr;
                </a>
              </div>

              <div className="grid grid-cols-4 gap-6">
                {productsList.map((p, idx) => (
                  <a
                    key={idx}
                    href={p.href}
                    onClick={() => setActiveMenu(null)}
                    className="group p-5 rounded-2xl bg-[#F5F8F5] border border-gray-100 hover:border-[#138A62] hover:bg-white hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-black text-[#138A62] bg-white px-2.5 py-1 rounded-full border border-gray-200">
                          {p.efficiency}
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#138A62] group-hover:translate-x-1 transition-all" />
                      </div>
                      <h4 className="text-sm font-bold text-[#073D32] group-hover:text-[#138A62] transition-colors mb-1">
                        {p.title}
                      </h4>
                      <div className="text-[11px] font-mono font-bold text-[#138A62] mb-2">
                        {p.specs}
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SOLUTIONS MEGA-MENU */}
        {activeMenu === "solutions" && (
          <div
            className="hidden lg:block bg-white border-t border-gray-100 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#138A62]" />
                  <span className="text-xs font-black uppercase tracking-wider text-[#073D32]">
                    Turnkey Clean Energy Execution Segments
                  </span>
                </div>
                <a
                  href="#solutions"
                  onClick={() => setActiveMenu(null)}
                  className="text-xs font-bold text-[#138A62] hover:underline flex items-center gap-1"
                >
                  Explore All 6 Solutions &rarr;
                </a>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {solutionsList.map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={idx}
                      href={s.href}
                      onClick={() => setActiveMenu(null)}
                      className="group p-5 rounded-2xl bg-[#F5F8F5] border border-gray-100 hover:border-[#138A62] hover:bg-white hover:shadow-xl transition-all flex items-start gap-4"
                    >
                      <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-[#073D32] shadow-sm group-hover:bg-[#138A62] group-hover:text-white transition-colors flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-bold text-[#073D32] group-hover:text-[#138A62] transition-colors">
                            {s.title}
                          </h4>
                          <span className="text-[10px] font-bold text-gray-500 bg-white px-2 py-0.5 rounded-md border border-gray-100">
                            {s.tag}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {s.desc}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-100 px-6 pt-4 pb-8 shadow-2xl animate-in slide-in-from-top duration-300 max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col space-y-4">
              <a
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-bold text-[#073D32] py-1 border-b border-gray-100"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-gray-700 py-1 border-b border-gray-100"
              >
                About Us
              </a>

              <div className="py-1 border-b border-gray-100">
                <span className="text-xs font-bold text-[#138A62] uppercase tracking-wider block mb-2">
                  Products
                </span>
                <div className="pl-2 space-y-2">
                  {productsList.map((p, idx) => (
                    <a
                      key={idx}
                      href={p.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm text-gray-700 hover:text-[#073D32]"
                    >
                      &bull; {p.title}
                    </a>
                  ))}
                </div>
              </div>

              <div className="py-1 border-b border-gray-100">
                <span className="text-xs font-bold text-[#138A62] uppercase tracking-wider block mb-2">
                  Solutions
                </span>
                <div className="pl-2 space-y-2">
                  {solutionsList.map((s, idx) => (
                    <a
                      key={idx}
                      href={s.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm text-gray-700 hover:text-[#073D32]"
                    >
                      &bull; {s.title}
                    </a>
                  ))}
                </div>
              </div>

              <a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-gray-700 py-1 border-b border-gray-100"
              >
                Featured Projects
              </a>
              <a
                href="#sustainability"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-gray-700 py-1 border-b border-gray-100"
              >
                Impact &amp; Sustainability
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-gray-700 py-1 border-b border-gray-100"
              >
                Contact Us
              </a>
              <div className="pt-2">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-full bg-[#138A62] text-white font-bold text-center block text-sm shadow-md"
                >
                  Get a Free Quote
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Home,
  Building2,
  Factory,
  Zap,
  ShieldCheck,
  Cpu,
  ArrowRight,
} from "lucide-react";

export default function Solutions() {
  const solutions = [
    {
      id: "solution-residential",
      title: "Residential Solar",
      category: "ROOFTOP ECOSYSTEM",
      description:
        "High-efficiency grid-tied solar rooftop systems for Indian villas and apartments, with zero-hassle net-metering and PM Surya Ghar Muft Bijli Yojana subsidy support.",
      image: "/images/sol-residential.jpg",
      icon: Home,
      features: ["Net-Metering Support", "PM Surya Ghar Subsidy", "Mobile Generation App"],
    },
    {
      id: "solution-commercial",
      title: "Commercial Solar",
      category: "ENTERPRISE & CAMPUS",
      description:
        "Scalable rooftop and solar carport solutions tailored for corporate parks, hospitals, shopping malls, and universities to slash operational peak-demand tariff costs.",
      image: "/images/sol-commercial.jpg",
      icon: Building2,
      features: ["Up to 60% Bill Reduction", "Accelerated Depreciation (AD)", "Capex & Opex Models"],
    },
    {
      id: "solution-industrial",
      title: "Industrial Solar",
      category: "HEAVY CONSUMPTION",
      description:
        "Rugged, high-capacity installations engineered for textiles, steel fabrication, chemicals, and FMCG warehouses demanding uninterrupted, clean day-time power.",
      image: "/images/sol-industrial.jpg",
      icon: Factory,
      features: ["High KVA Handling", "Power Quality Stabilization", "Zero Carbon Compliance"],
    },
    {
      id: "solution-utility",
      title: "Utility Scale Solar",
      category: "GRID-TIED PARKS",
      description:
        "Multi-megawatt solar generation plants supplying clean bulk electricity directly to central and state transmission utilities across India's interstate transmission network.",
      image: "/images/sol-utility.jpg",
      icon: Zap,
      features: ["33kV - 400kV Substation EPC", "Land Procurement & Approvals", "Scada-Controlled Tracking"],
    },
    {
      id: "solution-epc",
      title: "Solar EPC Solutions",
      category: "TURNKEY DELIVERY",
      description:
        "End-to-end engineering, procurement, construction, and commissioning with stringent structural civil engineering, geotechnical testing, and lifetime O&M.",
      image: "/images/sol-epc.jpg",
      icon: ShieldCheck,
      features: ["Single-Point Accountability", "Rapid Commissioning", "Predictable PR Guarantees"],
    },
    {
      id: "solution-manufacturing",
      title: "Solar Panel Manufacturing",
      category: "MAKE IN INDIA",
      description:
        "State-of-the-art automated manufacturing of N-Type TOPCon and Mono PERC bifacial glass-to-glass solar modules featuring 16-busbar micro-crack prevention.",
      image: "/images/sol-factory.jpg",
      icon: Cpu,
      features: ["Up to 22.8% Efficiency", "30-Year Performance Warranty", "ALMM Registered Models"],
    },
  ];

  return (
    <section id="solutions" className="py-24 bg-[#F5F8F5] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#138A62] text-xs font-bold uppercase tracking-wider mb-4 border border-[#138A62]/20">
              <Zap className="w-4 h-4 text-[#F4B942]" />
              Integrated Clean Energy Matrix
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#073D32] leading-tight">
              Our Turnkey Solar Solutions.
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-gray-600 leading-relaxed">
            From single kilowatt rooftop arrays to gigawatt-scale national grid installations, BHARAT SOLAR delivers precision engineering tailored to India&apos;s unique climatic zones.
          </p>
        </div>

        {/* 6 Grid Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                id={item.id}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-[#138A62] hover:shadow-2xl transition-all duration-300 flex flex-col scroll-mt-28"
              >
                {/* Image Container */}
                <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#073D32]/90 backdrop-blur-md text-[10px] font-bold tracking-wider text-[#F4B942] uppercase">
                    {item.category}
                  </div>

                  {/* Circular Icon Accent */}
                  <div className="absolute bottom-4 right-4 w-11 h-11 rounded-2xl bg-white flex items-center justify-center text-[#073D32] shadow-lg group-hover:bg-[#F4B942] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#073D32] group-hover:text-[#138A62] transition-colors mb-3">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Features list */}
                    <div className="space-y-2 mb-6">
                      {item.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#138A62]" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Link */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#073D32] group-hover:text-[#138A62] transition-colors"
                    >
                      Explore Solution
                      <ArrowRight className="w-4 h-4 text-[#F4B942] group-hover:translate-x-1 transition-transform" />
                    </a>
                    <span className="text-[11px] font-mono text-gray-400">
                      Tier-1 Standard
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

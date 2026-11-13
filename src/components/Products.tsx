"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Cpu, Zap, BatteryCharging, Wrench, Shield, ArrowRight } from "lucide-react";

export default function Products() {
  const products = [
    {
      id: "product-topcon",
      title: "TOPCon Solar Modules",
      power: "580W - 620W N-Type",
      efficiency: "22.6% Efficiency",
      warranty: "15-Year Product / 30-Year Yield",
      description:
        "Next-generation tunnel oxide passivated contact technology offering lower temperature coefficients (-0.30%/°C) and superior degradation resistance.",
      features: ["Zero LID (Light Induced Degradation)", "Low Temperature Coefficient", "Enhanced Weak Light Performance"],
      icon: Zap,
    },
    {
      id: "product-monoperc",
      title: "Mono PERC Solar Panels",
      power: "540W - 555W Peak",
      efficiency: "21.6% Efficiency",
      warranty: "12-Year Product / 27-Year Yield",
      description:
        "High-density multi-busbar monocrystalline PERC half-cut cells delivering high yield performance even during low-light cloudy winter conditions.",
      features: ["Half-Cut Cell Architecture", "Anti-PID Resistance", "High Snow & Wind Load Ready"],
      icon: Cpu,
    },
    {
      id: "product-bifacial",
      title: "Bifacial Solar Modules",
      power: "650W+ Dual-Glass",
      efficiency: "Up to 25.4% (With Bifacial Gain)",
      warranty: "30-Year Linear Power Warranty",
      description:
        "Double-glass frameless or framed architecture capturing ambient sunlight from both sides, maximizing generation on desert sand, white rooftops, and water bodies.",
      features: ["Up to 30% Additional Rear Yield", "Class-A Fire Rating", "Microcrack-Proof Dual Glass"],
      icon: Shield,
    },
    {
      id: "product-inverters",
      title: "Solar Inverters (On-Grid & Hybrid)",
      power: "3 kW to 350 kW Strings",
      efficiency: "98.8% Peak Efficiency",
      warranty: "5 to 10 Year Standard Warranty",
      description:
        "Intelligent transformerless multi-MPPT inverters equipped with integrated DC disconnects, arc-fault circuit protection (AFCI), and Wi-Fi cloud data loggers.",
      features: ["Multi-MPPT Optimization", "Built-In Rapid Shutdown", "Real-Time Mobile App Analytics"],
      icon: Wrench,
    },
    {
      id: "product-bess",
      title: "Solar BESS Lithium Batteries",
      power: "5 kWh to 2 MWh Utility BESS",
      efficiency: "95% Round-Trip Efficiency",
      warranty: "10-Year / 6,000 Cycles Warranty",
      description:
        "Safe Lithium Iron Phosphate (LiFePO4) energy storage systems providing emergency backup, peak shaving, and solar self-consumption for homes and factories.",
      features: ["Modular Expansion Capability", "Smart BMS Health Monitoring", "Liquid & Air Cooled Options"],
      icon: BatteryCharging,
    },
    {
      id: "product-accessories",
      title: "Engineered Solar Accessories",
      power: "Galvanized Structures & Balance of System",
      efficiency: "100% MNRE Compliant",
      warranty: "25-Year Structural Longevity",
      description:
        "Hot-dip galvanized mounting structures (HDG 80 microns), UV-resistant solar DC cables (4 sq mm / 6 sq mm), MC4 IP68 connectors, and surge protection devices.",
      features: ["High Corrosion Resistance", "170 km/h Wind Speed Withstand", "Plug-and-Play Quick Terminals"],
      icon: Shield,
    },
  ];

  return (
    <section id="products" className="py-24 bg-[#F5F8F5] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#138A62] text-xs font-bold uppercase tracking-wider mb-4 border border-[#138A62]/20">
            <Cpu className="w-4 h-4 text-[#F4B942]" />
            Make in India Hardware Catalog
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#073D32] leading-tight mb-6">
            Tier-1 Certified Solar Products.
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Engineered in India to world standards. Rigorously tested under 3X IEC stress tests to guarantee decades of uncompromising clean generation.
          </p>
        </div>

        {/* 6 Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                id={item.id}
                className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-[#138A62] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group scroll-mt-28"
              >
                <div>
                  {/* Top Badge Strip */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#073D32]/5 flex items-center justify-center text-[#073D32] group-hover:bg-[#073D32] group-hover:text-[#F4B942] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-black text-[#138A62] bg-[#F5F8F5] px-3 py-1 rounded-full border border-[#138A62]/20">
                      {item.efficiency}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#073D32] group-hover:text-[#138A62] transition-colors mb-1">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono font-bold text-[#D49822] mb-3">
                    {item.power}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Bullet features */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-gray-100">
                    {item.features.map((f, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#138A62]" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom details action */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-[10px] text-gray-500 font-medium">
                    {item.warranty}
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#073D32] hover:text-[#138A62]"
                  >
                    View Details
                    <ArrowRight className="w-3.5 h-3.5 text-[#F4B942]" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

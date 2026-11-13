"use client";

import React from "react";
import { Leaf, Zap, CloudOff, Trees, Home, ArrowRight } from "lucide-react";

export default function Sustainability() {
  const impactStats = [
    {
      icon: Zap,
      value: "840+ GWh",
      label: "Clean Energy Generated",
      desc: "Delivered to national and state power grids cleanly without burning fossil fuels.",
    },
    {
      icon: CloudOff,
      value: "680,000+ MT",
      label: "CO₂ Emissions Reduced",
      desc: "Mitigating greenhouse gas footprints across major Indian metropolitan centers.",
    },
    {
      icon: Home,
      value: "185,000+",
      label: "Homes Powered Equivalent",
      desc: "Providing reliable electricity offset for rural & urban Indian families.",
    },
    {
      icon: Trees,
      value: "1.1+ Million",
      label: "Trees Equivalent Saved",
      desc: "Comparable environmental carbon sequestration over system lifecycle operations.",
    },
  ];

  return (
    <section id="sustainability" className="py-24 bg-[#073D32] text-white relative overflow-hidden">
      {/* Background Graphic Leaves */}
      <div className="absolute right-0 bottom-0 pointer-events-none opacity-5 translate-x-1/4 translate-y-1/4">
        <Leaf className="w-[700px] h-[700px] text-white" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#F4B942] text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
            <Leaf className="w-4 h-4 text-[#F4B942]" />
            National Decarbonisation Impact
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight mb-6">
            Every Solar Panel Makes a Difference.
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed">
            By shifting India&apos;s energy matrix toward renewable solar energy, we are building economic resilience, energy security, and ecological stewardship for future generations.
          </p>
        </div>

        {/* 4 Large Impact Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
          {impactStats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/15 hover:border-[#F4B942]/50 hover:bg-white/15 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#F4B942] text-[#073D32] flex items-center justify-center mb-6 shadow-lg">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono mb-2">
                    {item.value}
                  </div>
                  <h3 className="text-base font-bold text-[#F4B942] mb-2">
                    {item.label}
                  </h3>
                  <p className="text-xs text-emerald-100/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 text-[11px] text-emerald-200/50 font-mono">
                  *Illustrative ESG Cumulative Yield
                </div>
              </div>
            );
          })}
        </div>

        {/* ESG Commitment Callout */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#138A62]/40 via-white/5 to-[#138A62]/40 border border-white/20 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold text-white mb-2">
              Committed to India&apos;s 2070 Net-Zero Emission Pledge
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              Our manufacturing facilities run on 100% green captive solar power with zero liquid discharge (ZLD) effluent recycling plants.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F4B942] text-[#073D32] font-black text-xs uppercase tracking-wider hover:brightness-110 transition-all flex-shrink-0 shadow-lg"
          >
            Download Sustainability Report
            <ArrowRight className="w-4 h-4 text-[#073D32]" />
          </a>
        </div>
      </div>
    </section>
  );
}


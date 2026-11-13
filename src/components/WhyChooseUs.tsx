"use client";

import React from "react";
import {
  Cpu,
  Layers,
  Users2,
  Compass,
  Headphones,
  Leaf,
  CheckCircle2,
} from "lucide-react";

export default function WhyChooseUs() {
  const advantages = [
    {
      icon: Cpu,
      title: "Advanced Solar Technology",
      description:
        "Utilizing state-of-the-art N-Type TOPCon and heterojunction cell architecture providing industry-leading temperature coefficients for India's extreme summers.",
    },
    {
      icon: Layers,
      title: "High-Efficiency Solar Panels",
      description:
        "Modules delivering up to 22.8% conversion efficiency with bifacial gain of 25%+ from ground albedo reflection on rocky and desert terrain.",
    },
    {
      icon: Users2,
      title: "Expert Installation Team",
      description:
        "Hundreds of certified solar engineers, high-voltage civil structural specialists, and MNRE-trained master technicians ensuring zero-compromise safety.",
    },
    {
      icon: Compass,
      title: "End-to-End EPC Solutions",
      description:
        "From satellite 3D shadow analysis, soil testing, statutory CEIG/DISCOM approvals, to substation erection and synchronized grid connectivity.",
    },
    {
      icon: Headphones,
      title: "Reliable After-Sales Support",
      description:
        "Pan-India service teams offering 24/7 IoT SCADA plant monitoring, drone thermographic inspection, and rapid 48-hour on-site resolution guarantees.",
    },
    {
      icon: Leaf,
      title: "Sustainable Energy Commitment",
      description:
        "Committed to responsible circular life cycles, zero-landfill module recycling protocols, and contributing to India's 500 GW non-fossil target by 2030.",
    },
  ];

  return (
    <section className="py-24 bg-[#073D32] text-white relative overflow-hidden">
      {/* Subtle Pattern & Accent Blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#138A62]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F4B942]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#F4B942] text-xs font-bold uppercase tracking-wider mb-4 border border-white/15">
            <CheckCircle2 className="w-4 h-4 text-[#F4B942]" />
            Corporate Excellence
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight mb-6">
            Why India Trusts BHARAT SOLAR.
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed">
            We unite rigorous engineering discipline, sovereign supply-chain security, and relentless customer advocacy to make solar power India&apos;s most dependable asset.
          </p>
        </div>

        {/* 6 Advantage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-[#F4B942]/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#138A62]/30 border border-[#138A62]/50 flex items-center justify-center text-[#F4B942] group-hover:scale-110 group-hover:bg-[#F4B942] group-hover:text-[#073D32] transition-all mb-6">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#F4B942] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-emerald-100/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-emerald-200/60 font-mono">
                  <span>Advantage #{idx + 1}</span>
                  <span className="text-[#F4B942]">ISO Compliant</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


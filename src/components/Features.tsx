"use client";

import React, { useState } from "react";
import { ChevronDown, ArrowRight, Leaf, Shield, Sparkles } from "lucide-react";

export default function Features() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const features = [
    {
      title: "Local Climate. Local Thinking.",
      content:
        "Every installation is calibrated to microclimate sun trajectory, humidity gradients, precipitation intensity, and regional building codes for optimum thermodynamic balance.",
    },
    {
      title: "Thoughtful Materials. Upfront.",
      content:
        "We source non-toxic underlayments, low-embodied carbon metals, and tier-1 photovoltaic cells manufactured using certified renewable hydropower and wind.",
    },
    {
      title: "Better by Design.",
      content:
        "Seamless ventilation channels reduce thermal bridging, preventing summer attic heat traps and protecting the longevity of your interior climate control.",
    },
  ];

  return (
    <section id="features" className="relative bg-[#0d2a1b] text-white py-24 overflow-hidden">
      {/* Background oversized decorative typography */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none select-none overflow-hidden opacity-5 flex justify-center">
        <span className="text-[120px] sm:text-[180px] md:text-[230px] font-black tracking-tighter leading-none whitespace-nowrap text-white">
          BETTER BY NATURE
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-bold tracking-widest text-[#cbf348] uppercase">
                ENGINEERED EXCELLENCE
              </span>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#cbf348]">
                <Leaf className="w-4 h-4" />
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
              A good roof protects.
              <br />
              A better roof <span className="text-[#cbf348]">gives back.</span>
            </h2>

            <p className="text-sm sm:text-base text-emerald-100/75 leading-relaxed mb-8 max-w-lg">
              Traditional roofs are passive expenses vulnerable to deterioration. Our integrated green and solar architecture transforms your roof into an active ecological asset that pays for itself.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#cbf348] hover:text-white transition-colors group"
            >
              Discover our engineering standards
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Right Column: Expandable feature items */}
          <div className="lg:col-span-6 space-y-4">
            {features.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="border-b border-white/15 pb-4 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full py-3 flex items-center justify-between text-left group"
                  >
                    <span className="text-lg sm:text-xl font-semibold text-white/95 group-hover:text-[#cbf348] transition-colors">
                      {item.title}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center border border-white/20 text-white/70 transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-[#cbf348] text-[#0d2a1b] border-transparent" : "group-hover:border-white/40"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="pt-2 pb-3 text-sm text-emerald-100/70 leading-relaxed pr-6 animate-in fade-in duration-300">
                      {item.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


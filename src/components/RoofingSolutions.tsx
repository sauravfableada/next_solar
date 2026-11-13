"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Sun, Sprout, ShieldCheck } from "lucide-react";

export default function RoofingSolutions() {
  const solutions = [
    {
      category: "PHOTOVOLTAIC",
      title: "Solar Roof Tiles",
      description:
        "Seamless architectural glass solar shingles that blend invisibly with traditional tile while generating peak clean electricity all year.",
      image: "/images/solar-tiles.jpg",
      icon: Sun,
      badge: "01",
    },
    {
      category: "ECOSYSTEM",
      title: "Living Green Roofs",
      description:
        "Extensive sedum and drought-tolerant vegetated roofing systems providing natural thermal insulation and urban stormwater retention.",
      image: "/images/green-roof.jpg",
      icon: Sprout,
      badge: "02",
    },
    {
      category: "DURABILITY",
      title: "Efficient Metal Roofing",
      description:
        "Ultra-lightweight 100% recyclable standing seam metal roofs treated with solar-reflective pigments that bounce 70% of infrared heat away.",
      image: "/images/metal-roof.jpg",
      icon: ShieldCheck,
      badge: "03",
    },
  ];

  return (
    <section id="solutions" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header and subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <span className="text-xs font-bold tracking-widest text-[#2c6e43] uppercase mb-3 block">
            SUSTAINABILITY & EFFICIENCY
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#112d1b] leading-tight">
            Three ways to roof.
            <br />
            <span className="text-[#1b4d2e]">One greener future.</span>
          </h2>
        </div>
        <p className="max-w-md text-sm sm:text-base text-[#4c6655] leading-relaxed">
          From solar generation to natural insulation, our certified systems merge aesthetic architectural elegance with quantifiable carbon offsets.
        </p>
      </div>

      {/* 3 Equal-Width Solution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {solutions.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="group bg-white rounded-2xl overflow-hidden border border-[#e2ebe0] hover:border-[#1d5935] hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image with overlay badge */}
              <div className="relative h-64 w-full overflow-hidden bg-[#eef4ec]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-xs font-bold text-[#143e26]">
                  {item.badge}
                </div>
                <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#1c5332] shadow-md group-hover:bg-[#cbf348] group-hover:text-[#0b2416] transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold tracking-wider text-[#356e49] uppercase">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold text-[#112e1c] mt-1 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#506c5a] leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#edf3ec] flex items-center justify-between">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#143e26] group-hover:text-[#2c7e4b] transition-colors"
                  >
                    Learn more
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  <span className="text-[11px] text-gray-400 font-medium">
                    25-Year Warranty
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

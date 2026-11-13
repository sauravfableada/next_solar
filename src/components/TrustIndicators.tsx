"use client";

import React from "react";
import { Leaf, Award, Recycle } from "lucide-react";

export default function TrustIndicators() {
  const indicators = [
    {
      icon: Leaf,
      title: "Sustainability with purpose.",
      desc: "Responsibly sourced solar and regenerative roofing materials with verified cradle-to-cradle lifecycle.",
    },
    {
      icon: Award,
      title: "Built with care and quality.",
      desc: "Engineered to withstand category 4 hurricane winds, heavy snow loads, and 40+ years of durability.",
    },
    {
      icon: Recycle,
      title: "Designed for the environment.",
      desc: "Closed-loop manufacturing that lowers lifetime household carbon output by over 74 metric tons.",
    },
  ];

  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#e5ece2]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#e2ece0]">
        {indicators.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`flex items-start gap-4 ${
                idx !== 0 ? "md:pl-8 pt-6 md:pt-0" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-[#ecf6eb] flex-shrink-0 flex items-center justify-center text-[#18532f]">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-[#12311f] mb-1">
                  {item.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#506857] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


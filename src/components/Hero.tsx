"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const stats = [
    {
      value: "25.8 GW",
      label: "Solar Module Manufacturing capacity globally",
      iconSrc: "/images/solar_cell.svg",
      animClass: "animate-float-icon-1",
    },
    {
      value: "5.4 GW",
      label: "Solar Cell Manufacturing",
      iconSrc: "/images/solar_module.svg",
      animClass: "animate-float-icon-2",
    },
    {
      value: "24+",
      label: "Countries modules supplied",
      iconSrc: "/images/country_icon.svg",
      animClass: "animate-float-icon-3",
    },
    {
      value: "40",
      label: "Quarters of Tier 1 Leadership",
      iconSrc: "/images/tier_1.png",
      animClass: "animate-float-icon-4",
      isTierImg: true,
    },
  ];

  return (
    <section className="relative bg-[#ebf8f5] pt-32 sm:pt-36 md:pt-40 pb-20 overflow-hidden">
      {/* Background radial soft cyan/emerald gradients */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-emerald-100/70 via-teal-100/40 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-teal-100/40 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          {/* Left Column: Heading and Narrative */}
          <div className="lg:col-span-6 z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-bold text-[#1f4e3d] leading-[1.14] tracking-tight mb-5">
              Accelerating Global
              <br />
              <span className="text-[#138a62]">Energy Transition</span>
            </h1>

            <p className="text-base sm:text-lg text-[#3f6354] font-normal leading-relaxed mb-9 max-w-xl">
              Cleaner, brighter future, one Renewable Energy solution at a time.
            </p>

            <div className="mb-8">
              <a
                href="#solutions"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#138a62] hover:bg-[#073d32] text-white font-semibold text-sm tracking-wide shadow-lg shadow-[#138a62]/25 hover:shadow-xl transition-all transform hover:-translate-y-0.5 group"
              >
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </span>
                <span>Explore More</span>
              </a>
            </div>
          </div>

          {/* Right Column: Rotating 3D Earth Globe with Solar Panels */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-[340px] sm:w-[460px] md:w-[540px] lg:w-[600px] aspect-square flex items-center justify-center">
              {/* Outer delicate concentric circular orbital rings matching reference screenshot */}
              <div className="absolute inset-[-8%] rounded-full border border-emerald-300/40 animate-pulse-ring pointer-events-none" />
              <div className="absolute inset-[-1%] rounded-full border border-dashed border-emerald-400/50 pointer-events-none" />

              {/* The Rotating 3D Earth Globe with Solar Modules */}
              <div className="relative w-[92%] h-[92%] animate-spin-globe select-none cursor-pointer">
                <Image
                  src="/images/waaree-earth.webp"
                  alt="3D Planet Earth with Solar Panels rotating"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_20px_40px_rgba(19,138,98,0.3)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Flat Stats Section directly on background (Only Icons Float) */}
        <div className="mt-12 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-emerald-200/80 max-w-4xl">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-4 ${
                  idx !== 0 ? "sm:pl-6 pt-4 sm:pt-0" : ""
                }`}
              >
                {/* Floating Icon Container */}
                <div
                  className={`w-13 h-13 flex-shrink-0 flex items-center justify-center ${stat.animClass}`}
                >
                  <div className="relative w-12 h-12">
                    <Image
                      src={stat.iconSrc}
                      alt={stat.label}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Static Text and Numbers */}
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#1f4e3d] font-sans tracking-tight leading-none mb-1">
                    {stat.value}
                  </div>
                  <p className="text-xs text-[#3e6253] leading-snug font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

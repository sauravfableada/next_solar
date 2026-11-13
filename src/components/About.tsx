"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Award, Users, Zap, MapPin, ArrowRight } from "lucide-react";

export default function About() {
  const highlights = [
    {
      value: "15+",
      unit: "Years",
      title: "Years of Experience",
      desc: "Delivering solar infrastructure projects and module innovations since 2009.",
    },
    {
      value: "10,000+",
      unit: "Clients",
      title: "Happy Customers",
      desc: "Across domestic rooftops, commercial complexes, and industrial warehouses.",
    },
    {
      value: "500+",
      unit: "MW",
      title: "Installed Capacity",
      desc: "Cumulative utility & distributed solar generating gigawatt-hours annually.",
    },
    {
      value: "25+",
      unit: "States",
      title: "States Served",
      desc: "Comprehensive engineering, procurement, and EPC execution pan-India.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Side: Images & Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 min-h-[440px] sm:min-h-[520px]">
              <Image
                src="/images/solar-manufacturing.jpg"
                alt="State-of-the-art robotic solar module automated manufacturing plant"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04241D]/90 via-transparent to-transparent" />

              {/* Inset Information Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-gray-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#138A62] uppercase tracking-wider">
                    Make in India Milestone
                  </div>
                  <div className="text-lg font-black text-[#073D32]">
                    Gigawatt-Scale Automated Line
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5">
                    100% IEC, BIS &amp; ALMM certified smart robotics
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#F4B942] flex items-center justify-center text-[#073D32] flex-shrink-0 font-bold">
                  GW+
                </div>
              </div>
            </div>

            {/* Decorative Gold Corner Accent */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-[#F4B942] rounded-tl-3xl pointer-events-none" />
          </div>

          {/* Right Side: Corporate Narrative */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F8F5] text-[#138A62] text-xs font-bold uppercase tracking-wider mb-4 border border-[#138A62]/20">
              <Award className="w-4 h-4 text-[#F4B942]" />
              Pioneering Indian Solar Engineering
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#073D32] leading-tight mb-6">
              Building a Sustainable Future Through{" "}
              <span className="text-[#138A62] underline decoration-[#F4B942] decoration-4 underline-offset-8">
                Solar Innovation.
              </span>
            </h2>

            <p className="text-base text-gray-700 leading-relaxed mb-6">
              BHARAT SOLAR is an integrated clean energy pioneer committed to driving India&apos;s net-zero transition. Backed by world-class German automated cell-stringing machinery, rigorous quality labs, and decades of turnkey EPC experience, we deliver robust energy independence for industries, institutions, and residences across the subcontinent.
            </p>

            <p className="text-sm text-gray-600 leading-relaxed mb-8">
              From the arid plains of Rajasthan to the industrial clusters of Gujarat, Maharashtra, and Tamil Nadu, our Tier-1 solar modules and utility substations maximize power yields under extreme tropical temperatures and monsoon environments.
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-10">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#138A62] flex-shrink-0" />
                <span className="text-sm font-semibold text-[#073D32]">Approved List of Models &amp; Manufacturers (ALMM)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#138A62] flex-shrink-0" />
                <span className="text-sm font-semibold text-[#073D32]">Bureau of Indian Standards (BIS) Certified</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#138A62] flex-shrink-0" />
                <span className="text-sm font-semibold text-[#073D32]">ISO 9001, 14001 &amp; 45001 Compliant Facilities</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#138A62] flex-shrink-0" />
                <span className="text-sm font-semibold text-[#073D32]">Pan-India After-Sales &amp; O&amp;M Service Network</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#073D32] hover:bg-[#0C5446] text-white font-bold text-sm tracking-wide transition-all shadow-md group"
              >
                Learn More About Our Heritage
                <ArrowRight className="w-4 h-4 text-[#F4B942] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Dynamic Statistics Strip with Demo Tag */}
        <div className="mt-20 pt-10 border-t border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Key Operational Milestones *(Demonstrative Corporate Metrics)
            </span>
            <span className="text-xs font-semibold text-[#138A62] bg-[#F5F8F5] px-3 py-1 rounded-full border border-[#138A62]/20">
              Verified ISO Quality
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#F5F8F5] p-6 rounded-2xl border border-gray-100 hover:border-[#138A62] transition-colors"
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-black text-[#073D32] font-mono">
                    {item.value}
                  </span>
                  <span className="text-xs font-bold text-[#F4B942] uppercase tracking-wider">
                    {item.unit}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#182521] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


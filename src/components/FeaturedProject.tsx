"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";

export default function FeaturedProject() {
  const projects = [
    {
      number: "01",
      title: "Clean energy. Clean lines.",
      location: "Boulder Alpine Residence, Colorado",
      description:
        "Full roof integration combining 14.8 kW sleek solar shingles with architectural black standing seam metal. Designed to endure harsh mountain blizzards while generating 108% of the estate's annual energy needs.",
      specs: [
        { label: "Solar Capacity", value: "14.8 kW Peak" },
        { label: "Annual Generation", value: "19,450 kWh" },
        { label: "Offset Value", value: "$3,420 / year" },
        { label: "Roof Lifetime", value: "50+ Years" },
      ],
      image: "/images/project-1.jpg",
    },
    {
      number: "02",
      title: "Living canopy. Urban sanctuary.",
      location: "Hudson Valley Bio-Estate, New York",
      description:
        "Multi-tier sedum green roof combined with micro-inverter photovoltaic arrays. Absorbs 85% of rainwater runoff while reducing cooling loads by 34% through natural evapotranspiration.",
      specs: [
        { label: "Sedum Coverage", value: "2,400 sq.ft" },
        { label: "Solar Output", value: "9.6 kW" },
        { label: "Thermal Savings", value: "34% Cooler" },
        { label: "Stormwater Hold", value: "18,000 Gallons" },
      ],
      image: "/images/project-2.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProject = projects[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="project" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-[#2c6e43] uppercase mb-2 block">
            FEATURED INSTALLATIONS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#112d1b] leading-tight">
            Good roofs.
            <br />
            <span className="text-[#194b2d]">Great possibilities.</span>
          </h2>
        </div>
        <p className="max-w-md text-sm text-[#4c6655] leading-relaxed">
          Explore real-world case studies where cutting-edge green roofing and solar engineering meet refined modern architecture.
        </p>
      </div>

      {/* Main Feature Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Large image container */}
        <div className="lg:col-span-7 relative rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[460px] shadow-lg border border-[#e5ebe2]">
          <Image
            src={currentProject.image}
            alt={currentProject.title}
            fill
            className="object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Location badge on bottom left */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
              <MapPin className="w-4 h-4 text-[#cbf348]" />
              <span>{currentProject.location}</span>
            </div>
            <span className="text-xs tracking-wider uppercase text-white/70 font-mono">
              PROJECT {currentProject.number} / 0{projects.length}
            </span>
          </div>
        </div>

        {/* Right Side: Information Panel */}
        <div className="lg:col-span-5 bg-[#f3f7f0] rounded-3xl p-8 sm:p-10 flex flex-col justify-between border border-[#e2ece0]">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-4xl font-extrabold text-[#1f5634] font-mono">
                {currentProject.number}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-[#cadac5] bg-white hover:bg-[#1a4b2e] hover:text-white transition-colors flex items-center justify-center text-[#1a4b2e]"
                  aria-label="Previous project"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-[#cadac5] bg-white hover:bg-[#1a4b2e] hover:text-white transition-colors flex items-center justify-center text-[#1a4b2e]"
                  aria-label="Next project"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#102d1b] mb-4">
              {currentProject.title}
            </h3>

            <p className="text-sm text-[#486352] leading-relaxed mb-8">
              {currentProject.description}
            </p>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#d8e5d4]">
              {currentProject.specs.map((spec, i) => (
                <div key={i} className="bg-white/80 rounded-xl p-3 border border-[#dfeade]">
                  <div className="text-[11px] uppercase tracking-wider text-[#587361] font-semibold">
                    {spec.label}
                  </div>
                  <div className="text-sm font-bold text-[#143d25] mt-0.5">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#143e26] hover:text-[#256c3f] transition-colors"
            >
              Consult with this project architect
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

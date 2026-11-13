"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Zap, ArrowRight, Layers, ArrowUpRight } from "lucide-react";

export default function Projects() {
  const [activeTab, setActiveTab] = useState("All");

  const categories = ["All", "Solar Power Plants", "Industrial", "Commercial", "Residential"];

  const projects = [
    {
      title: "Pavagada Mega Solar Park Extension",
      category: "Solar Power Plants",
      location: "Tumkur, Karnataka",
      capacity: "120 MW AC",
      image: "/images/proj-karnataka.jpg",
      details: "High-voltage 220kV pooling switchyard with single-axis tracking and bifacial modules.",
    },
    {
      title: "Bhadla Desert Utility Installation",
      category: "Solar Power Plants",
      location: "Jodhpur, Rajasthan",
      capacity: "75 MW Peak",
      image: "/images/proj-rajasthan.jpg",
      details: "Engineered with anti-soiling robotic dry-cleaning for dust storms and peak irradiation.",
    },
    {
      title: "Automotive Manufacturing Microgrid",
      category: "Industrial",
      location: "Chakan, Maharashtra",
      capacity: "8.4 MW Rooftop",
      image: "/images/proj-maharashtra.jpg",
      details: "Turnkey standing seam industrial rooftop integration across 6 manufacturing bays.",
    },
    {
      title: "Petrochemical Complex Rooftop Array",
      category: "Industrial",
      location: "Dahej, Gujarat",
      capacity: "14.2 MW",
      image: "/images/proj-gujarat.jpg",
      details: "Corrosion-resistant anodized aluminium mounting engineered for coastal chemical atmosphere.",
    },
    {
      title: "Smart IT Corporate Tech Park",
      category: "Commercial",
      location: "Whitefield, Bengaluru",
      capacity: "2.8 MW",
      image: "/images/sol-commercial.jpg",
      details: "Architectural solar carport with integrated EV fast charging stations.",
    },
    {
      title: "Luxury Eco-Villa Gated Township",
      category: "Residential",
      location: "Alibaug, Maharashtra",
      capacity: "1.2 MW Distributed",
      image: "/images/sol-residential.jpg",
      details: "50+ bespoke residential net-metered installations with lithium-ion BESS battery backups.",
    },
  ];

  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  return (
    <section id="projects" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F8F5] text-[#138A62] text-xs font-bold uppercase tracking-wider mb-4 border border-[#138A62]/20">
              <Layers className="w-4 h-4 text-[#F4B942]" />
              Pan-India Execution Track Record
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#073D32] leading-tight">
              Featured Landmark Projects.
            </h2>
          </div>
          <p className="max-w-md text-sm text-gray-600 leading-relaxed">
            From the deserts of Rajasthan to India&apos;s most demanding manufacturing hubs, explore our proven engineering capability.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === tab
                  ? "bg-[#073D32] text-[#F4B942] shadow-md"
                  : "bg-[#F5F8F5] text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-[#138A62] hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Project Image */}
              <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Capacity badge */}
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#073D32]/90 backdrop-blur-md border border-white/20 text-xs font-black text-[#F4B942] font-mono flex items-center gap-1.5 shadow-md">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  {item.capacity}
                </div>

                {/* Category tag */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-[#073D32] uppercase tracking-wider">
                  {item.category}
                </div>

                {/* Location indicator */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white text-xs font-semibold">
                  <MapPin className="w-4 h-4 text-[#F4B942]" />
                  <span>{item.location}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#073D32] group-hover:text-[#138A62] transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-6">
                    {item.details}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#138A62]">
                    Commissioned &amp; Grid-Synced
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#073D32] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-14">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#073D32] hover:bg-[#0C5446] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg"
          >
            <span>View All National Projects Portfolio</span>
            <ArrowRight className="w-4 h-4 text-[#F4B942]" />
          </a>
        </div>
      </div>
    </section>
  );
}


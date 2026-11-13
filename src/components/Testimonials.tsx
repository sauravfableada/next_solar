"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, Building2, User } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Rajeshwar Sengupta",
      role: "VP Infrastructure & Plant Operations",
      company: "Apex Precision Castings Ltd., Pune",
      category: "Industrial Solar Client",
      rating: 5,
      content:
        "Switching our 3.2 MW casting unit to BHARAT SOLAR's industrial rooftop solution reduced our monthly DISCOM power tariffs by over 42%. The turnkey engineering, safety standards, and CEIG approvals were delivered ahead of schedule.",
    },
    {
      name: "Sunil K. Agarwal",
      role: "Managing Director",
      company: "Heritage Cotton Textiles, Surat",
      category: "Commercial Solar Client",
      rating: 5,
      content:
        "The TOPCon bifacial modules installed by BHARAT SOLAR perform exceptionally even during humid Gujarat monsoons. The IoT SCADA app gives our energy managers realtime string-level generation monitoring 24/7.",
    },
    {
      name: "Col. Sanjeev Varma (Retd.)",
      role: "Resident Association Secretary",
      company: "Silver Springs Eco-Township, Bengaluru",
      category: "Residential Rooftop Client",
      rating: 5,
      content:
        "Under the PM Surya Ghar initiative, BHARAT SOLAR installed solar on 120 residential villas in our township. Clean documentation, zero-delay net-metering synchronization, and friendly engineers throughout.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setCurrentIndex((c) => (c + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F8F5] text-[#138A62] text-xs font-bold uppercase tracking-wider mb-4 border border-[#138A62]/20">
              <Quote className="w-4 h-4 text-[#F4B942]" />
              Enterprise Endorsements
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#073D32] leading-tight">
              What Our Partners Say.
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              className="w-12 h-12 rounded-full border border-gray-200 bg-white hover:bg-[#073D32] hover:text-white transition-colors flex items-center justify-center text-[#073D32] shadow-sm"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="w-12 h-12 rounded-full border border-gray-200 bg-white hover:bg-[#073D32] hover:text-white transition-colors flex items-center justify-center text-[#073D32] shadow-sm"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonial Active Display Card */}
        <div className="bg-[#F5F8F5] rounded-3xl p-8 sm:p-14 border border-gray-200 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-1 mb-6">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#F4B942] text-[#F4B942]" />
            ))}
            <span className="text-xs font-bold text-gray-400 ml-2">
              (5.0 / 5.0 Rating)
            </span>
          </div>

          <p className="text-lg sm:text-2xl font-serif text-[#182521] leading-relaxed italic mb-10 max-w-4xl">
            &ldquo;{current.content}&rdquo;
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-8 border-t border-gray-200 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#073D32] flex items-center justify-center text-[#F4B942] font-black text-xl shadow-md">
                {current.name[0]}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#073D32]">
                  {current.name}
                </h3>
                <p className="text-xs text-gray-600">
                  {current.role} &bull; <strong>{current.company}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white text-[11px] font-bold text-[#138A62] border border-[#138A62]/20">
                {current.category}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                [Demo Customer Testimony]
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

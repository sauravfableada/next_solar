"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(0);

  const faqs = [
    {
      question: "How much does a new roof cost?",
      answer:
        "Costs vary based on roof geometry, square footage, and chosen system (photovoltaic shingles, sedum green roof, or standing seam metal). However, federal solar tax credits (30%), state rebates, and zero-down financing typically make your monthly solar roof payment lower than your current electric bill from day one.",
    },
    {
      question: "Do solar roofs work in cloudy weather?",
      answer:
        "Yes. High-efficiency monocrystalline solar shingles capture both direct sunlight and diffuse ambient radiation through cloud cover, generating 30% to 60% of peak capacity even on overcast Pacific Northwest or Northern European winter days.",
    },
    {
      question: "Can I replace my existing roof?",
      answer:
        "Absolutely. Our team safely tears off your existing asphalt or tile roof, reinforces roof decking where needed, installs triple-layer weatherproofing membrane, and cleanly integrates the new green or solar roofing system.",
    },
    {
      question: "What is the lifespan of a metal roof?",
      answer:
        "Our standing seam architectural metal roofs carry a 50+ year expected lifespan with minimal maintenance. Unlike asphalt shingles that degrade every 12 to 15 years, our coated metal panels are fire-resistant, hail-proof, and 100% recyclable.",
    },
    {
      question: "Will a new roof improve my home's value?",
      answer:
        "Yes. Studies from the National Renewable Energy Laboratory and appraisal data show homes with solar and high-efficiency roofs sell up to 4.1% faster and command a $20,000 to $45,000 premium over comparable homes with aging traditional roofs.",
    },
    {
      question: "What happens during installation?",
      answer:
        "A typical installation takes between 3 to 6 days. Our certified craftsmen install underlayment, run conduit, lay precision solar tiles or metal panels, connect your inverter and battery storage, and coordinate local utility interconnection and city inspections.",
    },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#e6eee3]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Side */}
        <div className="lg:col-span-5">
          <span className="text-xs font-bold tracking-widest text-[#246b3c] uppercase mb-2 block">
            COMMON QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#102d1b] leading-tight mb-6">
            Curious?
            <br />
            <span className="text-[#1a512f]">Let&apos;s clear things up.</span>
          </h2>
          <p className="text-sm text-[#4d6a58] leading-relaxed mb-6">
            Everything you need to know about switching to clean, architectural green roofing. Can&apos;t find your question? Our solar roofing consultants are ready to help.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center text-xs uppercase font-bold tracking-wider text-[#143f27] hover:underline"
          >
            Speak with an energy specialist &rarr;
          </a>
        </div>

        {/* Right Side: Accordion */}
        <div className="lg:col-span-7 divide-y divide-[#e1eae0]">
          {faqs.map((faq, idx) => {
            const isOpen = openItem === idx;
            return (
              <div key={idx} className="py-5">
                <button
                  type="button"
                  onClick={() => setOpenItem(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <span className="text-base sm:text-lg font-semibold text-[#143220] group-hover:text-[#1e6137] transition-colors pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                      isOpen
                        ? "bg-[#184d2e] text-white"
                        : "bg-[#edf5ec] text-[#184d2e] group-hover:bg-[#dcecd9]"
                    }`}
                  >
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-3 pb-2 text-sm text-[#4d6957] leading-relaxed pr-8 animate-in fade-in duration-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


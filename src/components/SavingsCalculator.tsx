"use client";

import React, { useState } from "react";
import { CheckCircle2, ArrowRight, DollarSign, Calculator } from "lucide-react";

export default function SavingsCalculator() {
  const [monthlyBill, setMonthlyBill] = useState(240);
  const [savingsPercentage, setSavingsPercentage] = useState(75);
  const [roofArea, setRoofArea] = useState(2200);

  // Dynamic calculations
  const monthlySavings = (monthlyBill * (savingsPercentage / 100));
  const annualSavings = Math.round(monthlySavings * 12);
  const twentyFiveYearSavings = Math.round(annualSavings * 25 * 1.03); // factoring modest utility inflation
  const estimatedTaxCredit = Math.round((roofArea * 18) * 0.3); // federal clean energy credit approximation

  return (
    <section id="calculator" className="bg-[#f0f6ed] py-24 border-y border-[#e1ece0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Informational Points */}
          <div className="lg:col-span-6">
            <span className="text-xs font-bold tracking-widest text-[#236b3b] uppercase mb-2 block">
              FINANCIAL INTELLIGENCE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#102c1b] leading-tight mb-8">
              A greener roof.
              <br />
              <span className="text-[#1a512f]">A clearer path to savings.</span>
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#dcecd8] flex items-center justify-center text-[#18532f] flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#11311f] mb-1">
                    Roof improvements, made clearer.
                  </h3>
                  <p className="text-sm text-[#4d6957] leading-relaxed">
                    Compare lifetime energy yields directly against standard shingle re-roofing costs. Solar integration qualifies for federal and local clean energy incentives.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#dcecd8] flex items-center justify-center text-[#18532f] flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#11311f] mb-1">
                    Make the full part of the plan.
                  </h3>
                  <p className="text-sm text-[#4d6957] leading-relaxed">
                    Prevent future re-roofing expenses by installing solar tiles or recyclable metal roofing simultaneously with a guaranteed single-point warranty.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#dcecd8] flex items-center justify-center text-[#18532f] flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#11311f] mb-1">
                    Consider financing. Keep the full picture.
                  </h3>
                  <p className="text-sm text-[#4d6957] leading-relaxed">
                    0% down sustainable financing terms available. Replace fluctuating electric utility charges with predictable, fixed low monthly solar roof equity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Calculator Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-xl border border-[#d8e5d4] relative">
              <div className="flex items-center justify-between pb-6 border-b border-[#eef4ec]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#eaf4e8] text-[#1b502e] flex items-center justify-center">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0f2c1b]">
                      What could a green roof save on your bill?
                    </h3>
                    <p className="text-xs text-[#526d5b]">
                      Adjust the sliders below to estimate your return on investment
                    </p>
                  </div>
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-6 pt-6">
                {/* Slider 1: Monthly Bill */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold text-[#183925] mb-2">
                    <span>Average Monthly Electric Bill</span>
                    <span className="text-[#154627] font-bold text-base">
                      ${monthlyBill} / mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="800"
                    step="10"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                    className="w-full h-2 bg-[#e2ede0] rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-gray-400 mt-1 font-mono">
                    <span>$80</span>
                    <span>$400</span>
                    <span>$800</span>
                  </div>
                </div>

                {/* Slider 2: Estimated Energy Offset % */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold text-[#183925] mb-2">
                    <span>Estimated Solar Coverage / Offset</span>
                    <span className="text-[#154627] font-bold text-base">
                      {savingsPercentage}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    step="5"
                    value={savingsPercentage}
                    onChange={(e) => setSavingsPercentage(Number(e.target.value))}
                    className="w-full h-2 bg-[#e2ede0] rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-gray-400 mt-1 font-mono">
                    <span>30%</span>
                    <span>65%</span>
                    <span>100% Net Zero</span>
                  </div>
                </div>

                {/* Slider 3: Roof Square Footage */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold text-[#183925] mb-2">
                    <span>Estimated Roof Size (sq. ft.)</span>
                    <span className="text-[#154627] font-bold text-base">
                      {roofArea.toLocaleString()} sq.ft
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="5000"
                    step="100"
                    value={roofArea}
                    onChange={(e) => setRoofArea(Number(e.target.value))}
                    className="w-full h-2 bg-[#e2ede0] rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-gray-400 mt-1 font-mono">
                    <span>1,000 sq.ft</span>
                    <span>3,000 sq.ft</span>
                    <span>5,000 sq.ft</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Calculation Output Banner */}
              <div className="mt-8 p-5 rounded-2xl bg-[#f4f9f2] border border-[#dce9d9]">
                <div className="text-xs uppercase font-bold tracking-wider text-[#2d6340]">
                  Projected Annual Electricity Savings
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#0e311b] mt-1 mb-2 font-mono flex items-baseline gap-2">
                  <span>${annualSavings.toLocaleString()}</span>
                  <span className="text-xs text-[#52705c] font-normal font-sans">
                    / year savings
                  </span>
                </div>
                <div className="text-xs text-[#577261] flex items-center justify-between pt-2 border-t border-[#e2ede0]">
                  <span>25-Year Cumulative: <strong>${twentyFiveYearSavings.toLocaleString()}</strong></span>
                  <span>Est. Federal Credit: <strong>${estimatedTaxCredit.toLocaleString()}</strong></span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-6">
                <a
                  href="#contact"
                  className="w-full py-3.5 px-6 rounded-full bg-[#143e26] hover:bg-[#1c5333] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
                >
                  Get a personalized estimate
                  <ArrowRight className="w-4 h-4 text-[#cbf348]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


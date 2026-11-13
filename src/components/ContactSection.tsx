"use client";

import React, { useState } from "react";
import { Check, Send, CheckCircle2, Leaf } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    postalCode: "",
    propertyType: "Single Family Home",
    roofingInterest: "Solar Roof Tiles",
    projectTimeline: "1-3 Months",
    additionalInfo: "",
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.postalCode) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }
    if (!formData.consent) {
      setErrorMsg("Please accept the terms to proceed.");
      return;
    }
    setErrorMsg("");
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative bg-[#0d2a1b] text-white py-24 overflow-hidden">
      {/* Decorative leaf watermarks */}
      <div className="absolute right-0 bottom-0 pointer-events-none opacity-5 translate-x-1/3 translate-y-1/3">
        <Leaf className="w-[600px] h-[600px] text-white" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Side: Pitch and Benefits */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold tracking-widest text-[#cbf348] uppercase mb-3 block">
              GET IN TOUCH
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-6">
              Let&apos;s build
              <br />
              <span className="text-[#cbf348]">something greener.</span>
            </h2>

            <p className="text-sm sm:text-base text-emerald-100/75 leading-relaxed mb-8">
              Take the first step toward self-sufficiency and zero carbon emissions. Receive a detailed custom satellite roof blueprint, production modeling, and guaranteed pricing estimate.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#cbf348] text-[#0d2a1b] flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-sm text-white/90 font-medium">
                  Complimentary 3D satellite solar irradiance assessment
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#cbf348] text-[#0d2a1b] flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-sm text-white/90 font-medium">
                  Guaranteed fixed-price quotes with zero hidden surprises
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#cbf348] text-[#0d2a1b] flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-sm text-white/90 font-medium">
                  Assistance with all local municipal permits &amp; 30% tax credits
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <p className="text-xs text-white/70">
                &ldquo;Our GreenPeak estimate was completely transparent. The 3D render preview was exact to the millimeter.&rdquo;
              </p>
              <p className="text-[11px] font-semibold text-[#cbf348] mt-2">
                &mdash; Verified Architectural Review 2026
              </p>
            </div>
          </div>

          {/* Right Side: Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-7 sm:p-10 text-[#143220] shadow-2xl">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#112f1d]">
                    Thank you for reaching out!
                  </h3>
                  <p className="text-sm text-[#4d6b58] max-w-md mx-auto">
                    We have received your details. One of our senior green roofing specialists will prepare your satellite assessment and contact you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#143e26] text-white text-xs font-semibold uppercase tracking-wider"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#11311f] mb-1">
                      Request Your Free Custom Estimate
                    </h3>
                    <p className="text-xs text-[#52705d] mb-5">
                      No commitment required. Fast 24-hour turnaround.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 text-xs bg-red-50 text-red-600 rounded-lg border border-red-200">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1f422e] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Elena Vance"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-[#d2dfd0] text-sm focus:outline-none focus:ring-2 focus:ring-[#194c2d] focus:border-transparent bg-[#fbfdfb]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1f422e] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="elena@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-[#d2dfd0] text-sm focus:outline-none focus:ring-2 focus:ring-[#194c2d] focus:border-transparent bg-[#fbfdfb]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1f422e] mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(555) 234-5678"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-[#d2dfd0] text-sm focus:outline-none focus:ring-2 focus:ring-[#194c2d] focus:border-transparent bg-[#fbfdfb]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1f422e] mb-1.5">
                        Postal Code / Location *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="80302"
                        value={formData.postalCode}
                        onChange={(e) =>
                          setFormData({ ...formData, postalCode: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-[#d2dfd0] text-sm focus:outline-none focus:ring-2 focus:ring-[#194c2d] focus:border-transparent bg-[#fbfdfb]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1f422e] mb-1.5">
                        Property Type
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) =>
                          setFormData({ ...formData, propertyType: e.target.value })
                        }
                        className="w-full px-3 py-2.5 rounded-xl border border-[#d2dfd0] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#194c2d] bg-[#fbfdfb]"
                      >
                        <option>Single Family Home</option>
                        <option>Modern Villa / Estate</option>
                        <option>Commercial Property</option>
                        <option>Multi-Unit Residential</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1f422e] mb-1.5">
                        Roofing Interest
                      </label>
                      <select
                        value={formData.roofingInterest}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            roofingInterest: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2.5 rounded-xl border border-[#d2dfd0] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#194c2d] bg-[#fbfdfb]"
                      >
                        <option>Solar Roof Tiles</option>
                        <option>Living Green Roofs</option>
                        <option>Efficient Metal Roofing</option>
                        <option>Hybrid Solar + Living Roof</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1f422e] mb-1.5">
                        Project Timeline
                      </label>
                      <select
                        value={formData.projectTimeline}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            projectTimeline: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2.5 rounded-xl border border-[#d2dfd0] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#194c2d] bg-[#fbfdfb]"
                      >
                        <option>Immediately (&lt; 1 month)</option>
                        <option>1-3 Months</option>
                        <option>3-6 Months</option>
                        <option>Planning / Research</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1f422e] mb-1.5">
                      Additional Information (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your home, current roof condition, or energy goals..."
                      value={formData.additionalInfo}
                      onChange={(e) =>
                        setFormData({ ...formData, additionalInfo: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-[#d2dfd0] text-sm focus:outline-none focus:ring-2 focus:ring-[#194c2d] bg-[#fbfdfb]"
                    />
                  </div>

                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={formData.consent}
                      onChange={(e) =>
                        setFormData({ ...formData, consent: e.target.checked })
                      }
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-[#143e26] focus:ring-[#143e26]"
                    />
                    <label htmlFor="consent" className="text-xs text-[#526f5d]">
                      I agree to receive communications regarding my solar roof estimate. GreenPeak respects your privacy and will never share your personal information.
                    </label>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-full bg-[#143e26] hover:bg-[#1a5132] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
                    >
                      <Send className="w-4 h-4 text-[#cbf348]" />
                      Submit Request
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    interest: "Commercial Solar Rooftop",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      setErrorMsg("Please fill in the required fields (Name, Email, Phone).");
      return;
    }
    setErrorMsg("");
    setSubmitted(true);
  };

  return (
    <>
      {/* 12. Call To Action Banner */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/solar-cta.jpg"
            alt="Vast green solar energy farm in India"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#073D32]/85 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-white">
            Ready to Make the Switch to Solar?
          </h2>
          <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            Let&apos;s build a cleaner, greener, and more sustainable future together. Speak with our certified solar project engineering team today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact-form"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#F4B942] text-[#073D32] font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-xl transition-all"
            >
              Get a Free Quote
            </a>
            <a
              href="tel:18002091234"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md font-bold text-xs uppercase tracking-wider transition-all"
            >
              Call 1800-209-SOLAR
            </a>
          </div>
        </div>
      </section>

      {/* 13. Contact Section */}
      <section id="contact" className="py-24 bg-[#F5F8F5] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Side: Corporate Offices & Channels */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#138A62] text-xs font-bold uppercase tracking-wider mb-4 border border-[#138A62]/20">
                <MapPin className="w-4 h-4 text-[#F4B942]" />
                National Headquarters &amp; Regional Presence
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-[#073D32] leading-tight mb-6">
                Consult With India&apos;s Clean Energy Specialists.
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed mb-8">
                Whether you need a rooftop feasibility assessment, EPC tender bid, or institutional financing structure, our solar experts are at your service across all states.
              </p>

              {/* Office Details */}
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-white text-[#073D32] shadow-sm flex items-center justify-center flex-shrink-0 border border-gray-100">
                    <MapPin className="w-5 h-5 text-[#138A62]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#073D32]">
                      Registered Corporate Office
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed mt-1">
                      BHARAT SOLAR Tower, Plot No. 42, Bandra-Kurla Complex (BKC), Bandra East, Mumbai, Maharashtra 400051, India.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-white text-[#073D32] shadow-sm flex items-center justify-center flex-shrink-0 border border-gray-100">
                    <Phone className="w-5 h-5 text-[#138A62]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#073D32]">
                      Direct Telephone &amp; Toll Free
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Toll Free: <strong>1800 209 76527</strong> (9:00 AM - 7:00 PM IST)
                      <br />
                      Corporate Line: +91 (022) 6789 4000
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-white text-[#073D32] shadow-sm flex items-center justify-center flex-shrink-0 border border-gray-100">
                    <Mail className="w-5 h-5 text-[#138A62]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#073D32]">
                      Electronic Mail &amp; Inquiries
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      epc.inquiry@bharatsolar.com &bull; corporate@bharatsolar.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Google Maps Placeholder Card */}
              <div className="rounded-3xl overflow-hidden border border-gray-200 bg-white p-4 shadow-sm">
                <div className="relative h-44 w-full rounded-2xl bg-gray-200 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-gray-200 opacity-70" />
                  <div className="relative z-10 text-center px-4">
                    <MapPin className="w-8 h-8 text-[#073D32] mx-auto mb-1 animate-bounce" />
                    <span className="text-xs font-bold text-[#073D32] block">
                      BKC Commercial District &bull; Mumbai Hub
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">
                      19.0657° N, 72.8687° E
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Professional Contact Form */}
            <div id="contact-form" className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100">
                <h3 className="text-2xl font-black text-[#073D32] mb-2">
                  Request a Project Quote &amp; Feasibility Study
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-8">
                  Fill in your requirements. Our technical sales engineers will contact you with 3D solar yield modeling and tariff paybacks within 24 business hours.
                </p>

                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#138A62] mx-auto flex items-center justify-center shadow-inner">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-black text-[#073D32]">
                      Inquiry Received Successfully!
                    </h4>
                    <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting BHARAT SOLAR. Reference ID <strong>#BS-{Math.floor(100000 + Math.random() * 900000)}</strong> has been generated for your query. An engineer will follow up shortly.
                    </p>
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 max-w-md mx-auto">
                      <strong>Note:</strong> Frontend demo submission simulation complete. Ready for CRM / API endpoint attachment.
                    </div>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-full bg-[#073D32] text-[#F4B942] text-xs font-bold uppercase tracking-wider"
                    >
                      Submit Another Query
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMsg && (
                      <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                        {errorMsg}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#073D32] uppercase tracking-wider mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Vikramaditya Sharma"
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#138A62] bg-[#F5F8F5]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#073D32] uppercase tracking-wider mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="vikram@company.in"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#138A62] bg-[#F5F8F5]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#073D32] uppercase tracking-wider mb-1.5">
                          Phone Number (+91) *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#138A62] bg-[#F5F8F5]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#073D32] uppercase tracking-wider mb-1.5">
                          Company / Organization Name
                        </label>
                        <input
                          type="text"
                          placeholder="Sharma Industries Pvt. Ltd."
                          value={formData.companyName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              companyName: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#138A62] bg-[#F5F8F5]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#073D32] uppercase tracking-wider mb-1.5">
                        Interested In Solution / Product
                      </label>
                      <select
                        value={formData.interest}
                        onChange={(e) =>
                          setFormData({ ...formData, interest: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#138A62] bg-[#F5F8F5]"
                      >
                        <option>Commercial Solar Rooftop</option>
                        <option>Industrial Captive / Open Access Solar</option>
                        <option>Utility Scale Solar EPC (MW+)</option>
                        <option>Residential Rooftop (PM Surya Ghar)</option>
                        <option>TOPCon &amp; Bifacial Module Procurement</option>
                        <option>Operation &amp; Maintenance (O&amp;M) Services</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#073D32] uppercase tracking-wider mb-1.5">
                        Project Scope &amp; Site Details
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Mention your estimated sanctioned load (kVA/MW), roof/land area (sq ft / acres), location in India..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#138A62] bg-[#F5F8F5]"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-4 px-8 rounded-full bg-[#073D32] hover:bg-[#0C5446] text-[#F4B942] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all"
                      >
                        <Send className="w-4 h-4 text-[#F4B942]" />
                        Submit Request for Solar Consultation
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


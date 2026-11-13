"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import {
  ArrowLeft,
  X,
  Upload,
  Plus,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link2,
  Image as ImageIcon,
} from "lucide-react";

export default function TemplateEditorPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Template Info
  const [templateName, setTemplateName] = useState("Test");

  // Section Toggles
  const [showCompanyInfo, setShowCompanyInfo] = useState(true);
  const [showOriginalBOM, setShowOriginalBOM] = useState(true);
  const [showTechnicalSpecs, setShowTechnicalSpecs] = useState(true);
  const [showComponents, setShowComponents] = useState(true);
  const [showEstimateComment, setShowEstimateComment] = useState(true);
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(true);
  const [showBankDetails, setShowBankDetails] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  // Company Details
  const [companyDescription, setCompanyDescription] = useState(
    "We are a leading solar EPC and renewable energy technology provider dedicated to clean energy generation."
  );
  const [plantCapacityInstalled, setPlantCapacityInstalled] = useState("10 MW+ Installed");
  const [happyCustomers, setHappyCustomers] = useState("500+ Happy Clients");
  const [citiesCovered, setCitiesCovered] = useState("25+ Cities");

  // Price Execution breakdown rows
  const [priceRows, setPriceRows] = useState([
    { id: 1, title: "1st Part", amount: "50%" },
  ]);

  const handleAddPriceRow = () => {
    setPriceRows([
      ...priceRows,
      { id: Date.now(), title: "Next Part", amount: "25%" },
    ]);
  };

  const handleRemovePriceRow = (id: number) => {
    setPriceRows(priceRows.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f4f7fe] dark:bg-[#0b1437] flex text-slate-800 dark:text-slate-100">
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeItem="Manage Estimates"
        activeSubItem="Templates"
      />

      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <AdminHeader
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />

        <main className="p-6 md:p-8 space-y-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#1b2559] dark:text-white">
                Manage PDF Template
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Customize layout, company information, and proposal sections.
              </p>
            </div>
            <Link
              href="/estimates/templates"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </Link>
          </div>

          {/* Master Form Card */}
          <div className="bg-white dark:bg-[#111c44] p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xs space-y-8 max-w-5xl">
            {/* Template Name & Header Image */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  🏷️ Template Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="w-full max-w-md px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  🖼️ Header Image (Top Page)
                </label>
                <div className="relative inline-block border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden p-1 bg-slate-50 dark:bg-slate-800">
                  <div className="w-64 h-24 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-lg flex items-center justify-center text-white/70 text-xs font-semibold">
                    [ Solar Farm Header Banner ]
                  </div>
                  <button
                    type="button"
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs shadow-md"
                  >
                    ×
                  </button>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold cursor-pointer hover:bg-slate-50">
                    <Upload className="w-3.5 h-3.5 text-slate-400" />
                    <span>Choose File</span>
                    <input type="file" className="hidden" />
                  </label>
                  <span className="text-xs text-slate-400">No file chosen</span>
                </div>
              </div>
            </div>

            {/* SECTION 1: Company Information */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  <span>🏢 Company Information</span>
                </div>
                <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer text-slate-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={showCompanyInfo}
                    onChange={(e) => setShowCompanyInfo(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                  <span>Active Section</span>
                </label>
              </div>

              {showCompanyInfo && (
                <div className="space-y-4 pl-2 border-l-2 border-emerald-500/30">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Company Description
                    </label>
                    {/* Rich text formatting bar */}
                    <div className="border border-slate-200 dark:border-slate-700 rounded-t-xl bg-slate-50 dark:bg-slate-800/60 p-2 flex items-center gap-1 flex-wrap text-slate-600 dark:text-slate-300">
                      <button type="button" className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700"><Bold className="w-3.5 h-3.5" /></button>
                      <button type="button" className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700"><Italic className="w-3.5 h-3.5" /></button>
                      <button type="button" className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700"><Underline className="w-3.5 h-3.5" /></button>
                      <button type="button" className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700"><Strikethrough className="w-3.5 h-3.5" /></button>
                      <span className="w-px h-4 bg-slate-300 mx-1"></span>
                      <button type="button" className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700"><AlignLeft className="w-3.5 h-3.5" /></button>
                      <button type="button" className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700"><AlignCenter className="w-3.5 h-3.5" /></button>
                      <button type="button" className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700"><AlignRight className="w-3.5 h-3.5" /></button>
                      <span className="w-px h-4 bg-slate-300 mx-1"></span>
                      <button type="button" className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700"><List className="w-3.5 h-3.5" /></button>
                      <button type="button" className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700"><ListOrdered className="w-3.5 h-3.5" /></button>
                      <button type="button" className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700"><Link2 className="w-3.5 h-3.5" /></button>
                      <button type="button" className="p-1.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700"><ImageIcon className="w-3.5 h-3.5" /></button>
                    </div>
                    <textarea
                      rows={3}
                      value={companyDescription}
                      onChange={(e) => setCompanyDescription(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border-x border-b border-slate-200 dark:border-slate-700 rounded-b-xl focus:outline-none"
                    />
                  </div>

                  {/* Highlights Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                        ⚡ Plant Capacity Installed
                      </label>
                      <input
                        type="text"
                        value={plantCapacityInstalled}
                        onChange={(e) => setPlantCapacityInstalled(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                        👥 Happy Customers
                      </label>
                      <input
                        type="text"
                        value={happyCustomers}
                        onChange={(e) => setHappyCustomers(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                        📍 Cities
                      </label>
                      <input
                        type="text"
                        value={citiesCovered}
                        onChange={(e) => setCitiesCovered(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Project Showcase Images */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    {[1, 2, 3].map((num) => (
                      <div key={num} className="border border-slate-200 dark:border-slate-700 rounded-xl p-3 space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                          <span>Project {num}</span>
                          <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs cursor-pointer">×</span>
                        </div>
                        <div className="h-20 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 text-xs">
                          [ Project Image {num} ]
                        </div>
                        <button type="button" className="w-full py-1 text-[11px] font-semibold border border-dashed border-emerald-500 text-emerald-600 rounded-lg hover:bg-emerald-50">
                          Upload Image
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* SECTION 2: Original BOM */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                <span>✂️ Original BOM</span>
              </div>
              <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer text-slate-600 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={showOriginalBOM}
                  onChange={(e) => setShowOriginalBOM(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600"
                />
                <span>Active Section</span>
              </label>
            </div>

            {/* SECTION 3: Technical Specs */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  <span>⚙️ Technical Specs</span>
                </div>
                <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer text-slate-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={showTechnicalSpecs}
                    onChange={(e) => setShowTechnicalSpecs(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                  <span>Active Section</span>
                </label>
              </div>
            </div>

            {/* SECTION 4: Components */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  <span>🧩 Components</span>
                </div>
                <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer text-slate-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={showComponents}
                    onChange={(e) => setShowComponents(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                  <span>Active Section</span>
                </label>
              </div>
            </div>

            {/* SECTION 5: Estimate Comment */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                <span>💬 Estimate Comment</span>
              </div>
              <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer text-slate-600 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={showEstimateComment}
                  onChange={(e) => setShowEstimateComment(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600"
                />
                <span>Active Section</span>
              </label>
            </div>

            {/* SECTION 6: Price and Terms */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  <span>💵 Price and Terms</span>
                </div>
                <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer text-slate-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={showTermsAndConditions}
                    onChange={(e) => setShowTermsAndConditions(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                  <span>Active Section</span>
                </label>
              </div>

              {showTermsAndConditions && (
                <div className="space-y-4 pl-2 border-l-2 border-emerald-500/30">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Price execution breakdown
                    </label>
                    <div className="space-y-2">
                      {priceRows.map((row) => (
                        <div key={row.id} className="flex items-center gap-3">
                          <input
                            type="text"
                            value={row.title}
                            placeholder="Part title"
                            className="flex-1 px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                          />
                          <input
                            type="text"
                            value={row.amount}
                            placeholder="Percentage / Amount"
                            className="w-32 px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                          />
                          {priceRows.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemovePriceRow(row.id)}
                              className="text-rose-500 hover:text-rose-700 text-xs font-bold px-2"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleAddPriceRow}
                      className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Add Row</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* SECTION 7: Bank Details */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  <span>🏦 Bank Details</span>
                </div>
                <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer text-slate-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={showBankDetails}
                    onChange={(e) => setShowBankDetails(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                  <span>Active Section</span>
                </label>
              </div>
            </div>

            {/* SECTION 8: Footer */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  <span>📄 Footer</span>
                </div>
                <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer text-slate-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={showFooter}
                    onChange={(e) => setShowFooter(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                  <span>Active Section</span>
                </label>
              </div>
            </div>

            {/* Footer Form Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
              <Link
                href="/estimates/templates"
                className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50"
              >
                Cancel
              </Link>
              <button
                type="button"
                onClick={() => alert("Template saved successfully!")}
                className="px-6 py-2.5 rounded-xl bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold transition-colors shadow-2xs"
              >
                Save Template
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


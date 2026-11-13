"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import {
  ArrowLeft,
  Eye,
  Plus,
  X,
} from "lucide-react";

interface BomItem {
  id: string;
  bomId: string;
  bomName: string;
  description: string;
  make: string;
  hsnSac: string;
  qty: number;
  rate: number;
  tax: number;
  amount: number;
}

export default function EditEstimatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const estimateId = resolvedParams.id;

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [pricingMethod, setPricingMethod] = useState<"base" | "bom">("bom");

  // Form Fields prefilled based on screenshot
  const [estimateNo] = useState("000001");
  const [customer, setCustomer] = useState("test customer");
  const [estimateName, setEstimateName] = useState("#01EST-test customer");
  const [referenceNo, setReferenceNo] = useState("");
  const [estimateType, setEstimateType] = useState("Residential");
  const [quantityKw, setQuantityKw] = useState("5.00");
  const [solarMeterCharges, setSolarMeterCharges] = useState("As per Actual");
  const [quotationTemplate, setQuotationTemplate] = useState("test");
  const [solarStructureCharges, setSolarStructureCharges] = useState(false);
  const [createdDate, setCreatedDate] = useState("2026-11-06");
  const [comment, setComment] = useState("");
  const [applyGst, setApplyGst] = useState(false);
  const [discount, setDiscount] = useState<number>(0);
  const [subsidy, setSubsidy] = useState<number>(0);

  const [termsAndConditions, setTermsAndConditions] = useState(
    "- GST Charges - As applicable at the time of billing.\n- Meter charges extra as actual as per GEB (for 3phase consumer)\n- Any other work; out of the scope or change in given planning will be handled through mutual agreement."
  );

  const [bomItems, setBomItems] = useState<BomItem[]>([
    {
      id: "bom-1",
      bomId: "bom-test",
      bomName: "Test",
      description: "",
      make: "",
      hsnSac: "",
      qty: 1,
      rate: 1.0,
      tax: 0,
      amount: 1.0,
    },
  ]);

  // Calculations
  const subtotal = bomItems.reduce((acc, item) => acc + item.qty * item.rate, 0);
  const gstAmount = applyGst ? subtotal * 0.18 : 0;
  const subtotalTaxIncl = subtotal + gstAmount;
  const totalPayable = Math.max(0, subtotalTaxIncl - discount - subsidy);

  const kwOptions = ["3 kW", "5 kW", "7 kW", "8 kW", "10 kW"];

  return (
    <div className="min-h-screen bg-[#f4f7fe] dark:bg-[#0b1437] flex text-slate-800 dark:text-slate-100">
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeItem="Manage Estimates"
        activeSubItem="All Estimates"
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
                Edit Estimate
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Estimate No: {estimateNo}
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Pricing Method Toggle */}
              <div className="inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <span className="text-[11px] font-bold text-slate-500 px-2">Pricing Method</span>
                <button
                  type="button"
                  onClick={() => setPricingMethod("base")}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    pricingMethod === "base"
                      ? "bg-white dark:bg-[#111c44] text-blue-600 shadow-2xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  Base Price
                </button>
                <button
                  type="button"
                  onClick={() => setPricingMethod("bom")}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    pricingMethod === "bom"
                      ? "bg-[#001738] text-white shadow-2xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  BOM Price
                </button>
              </div>

              <Link
                href={`/estimates/${estimateId}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111c44] hover:bg-slate-50 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View</span>
              </Link>

              <Link
                href="/estimates"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </Link>
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white dark:bg-[#111c44] p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xs space-y-6">
            {/* Customer select with + button */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                👤 Select Customer <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                />
                <button
                  type="button"
                  className="w-10 h-10 rounded-xl bg-[#001738] hover:bg-[#00224f] text-white flex items-center justify-center transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Row 1: Estimate Name, Reference#, Estimate Type */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  🏷️ Estimate Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={estimateName}
                  onChange={(e) => setEstimateName(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  🏷️ Reference#
                </label>
                <input
                  type="text"
                  placeholder="Reference#"
                  value={referenceNo}
                  onChange={(e) => setReferenceNo(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  🌿 Estimate Type <span className="text-rose-500">*</span>
                </label>
                <select
                  value={estimateType}
                  onChange={(e) => setEstimateType(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Industrial">Industrial</option>
                </select>
              </div>
            </div>

            {/* Row 2: Quantity (kW), Solar Meter Charges, Quotation Template */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  🏷️ Quantity (kW) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={quantityKw}
                  onChange={(e) => setQuantityKw(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {kwOptions.map((kw) => (
                    <button
                      key={kw}
                      type="button"
                      onClick={() => setQuantityKw(kw.replace(" kW", ""))}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-blue-500"
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  ⚡ Solar Meter Charges <span className="text-rose-500">*</span>
                </label>
                <select
                  value={solarMeterCharges}
                  onChange={(e) => setSolarMeterCharges(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                >
                  <option value="As per Actual">As per Actual</option>
                  <option value="Included">Included</option>
                  <option value="Exempted">Exempted</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    🏷️ Quotation Template <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline">
                    Edit
                  </span>
                </div>
                <input
                  type="text"
                  value={quotationTemplate}
                  onChange={(e) => setQuotationTemplate(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Row 3: Charges & Created Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  🏷️ Charges
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={solarStructureCharges}
                    onChange={(e) => setSolarStructureCharges(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                  />
                  <span>Solar Structure Charges</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  📅 Created Date
                </label>
                <input
                  type="date"
                  value={createdDate}
                  onChange={(e) => setCreatedDate(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                />
              </div>
            </div>

            {/* BOM Section */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#1b2559] dark:text-white">
                <span>✂️</span>
                <span>BOM (Bill Of Material)</span>
              </div>

              <div className="space-y-4">
                {bomItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/40 dark:bg-[#0b1437]/40 space-y-3"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                          & BOM <span className="text-rose-500">*</span>
                        </label>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={item.bomName}
                            onChange={(e) =>
                              setBomItems(
                                bomItems.map((b) =>
                                  b.id === item.id ? { ...b, bomName: e.target.value } : b
                                )
                              )
                            }
                            className="flex-1 px-3 py-2 text-xs bg-white dark:bg-[#111c44] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            className="w-8 h-8 rounded-lg bg-[#001738] text-white flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                          🏭 Make
                        </label>
                        <input
                          type="text"
                          placeholder="Select Make"
                          value={item.make}
                          onChange={(e) =>
                            setBomItems(
                              bomItems.map((b) =>
                                b.id === item.id ? { ...b, make: e.target.value } : b
                              )
                            )
                          }
                          className="w-full px-3 py-2 text-xs bg-white dark:bg-[#111c44] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                          # HSN/SAC
                        </label>
                        <input
                          type="text"
                          placeholder="HSN/SAC Code"
                          value={item.hsnSac}
                          onChange={(e) =>
                            setBomItems(
                              bomItems.map((b) =>
                                b.id === item.id ? { ...b, hsnSac: e.target.value } : b
                              )
                            )
                          }
                          className="w-full px-3 py-2 text-xs bg-white dark:bg-[#111c44] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Qty <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) =>
                            setBomItems(
                              bomItems.map((b) =>
                                b.id === item.id
                                  ? { ...b, qty: Number(e.target.value), amount: Number(e.target.value) * b.rate }
                                  : b
                              )
                            )
                          }
                          className="w-full px-3 py-2 text-xs bg-white dark:bg-[#111c44] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Rate <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) =>
                            setBomItems(
                              bomItems.map((b) =>
                                b.id === item.id
                                  ? { ...b, rate: Number(e.target.value), amount: b.qty * Number(e.target.value) }
                                  : b
                              )
                            )
                          }
                          className="w-full px-3 py-2 text-xs bg-white dark:bg-[#111c44] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                          % Tax
                        </label>
                        <select
                          value={item.tax}
                          onChange={(e) =>
                            setBomItems(
                              bomItems.map((b) =>
                                b.id === item.id ? { ...b, tax: Number(e.target.value) } : b
                              )
                            )
                          }
                          className="w-full px-3 py-2 text-xs bg-white dark:bg-[#111c44] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300"
                        >
                          <option value="0">No Tax</option>
                          <option value="5">5%</option>
                          <option value="12">12%</option>
                          <option value="18">18%</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Amount
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={item.qty * item.rate}
                          className="w-full px-3 py-2 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 cursor-not-allowed font-semibold"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Section: Comment, Attach File, Terms & Totals Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    💬 Comment
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Add any comments..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    📎 Attach File to Estimate
                  </label>
                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-50">
                      <span>Choose File</span>
                      <input type="file" className="hidden" />
                    </label>
                    <span className="text-xs text-slate-400">No file chosen</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Upload one PDF, Word, or Excel file.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    🏷️ Terms & Conditions
                  </label>
                  <textarea
                    rows={4}
                    value={termsAndConditions}
                    onChange={(e) => setTermsAndConditions(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none leading-relaxed text-slate-700 dark:text-slate-300"
                  />
                </div>
              </div>

              {/* Totals Card */}
              <div className="lg:col-span-5 bg-slate-50/50 dark:bg-[#0b1437]/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Subtotal:</span>
                  <span className="font-bold text-slate-800 dark:text-white">
                    {subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={applyGst}
                        onChange={(e) => setApplyGst(e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>Apply GST</span>
                    </label>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      {gstAmount.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">Select BOM tax to apply GST.</p>
                </div>

                <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-200/60 dark:border-slate-800">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Subtotal (Tax Incl.):</span>
                  <span className="font-bold text-slate-800 dark:text-white">
                    {subtotalTaxIncl.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs gap-3">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Discount:</span>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                    className="w-24 px-2 py-1 text-right text-xs bg-white dark:bg-[#111c44] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                  />
                </div>

                <div className="flex justify-between items-center text-xs gap-3">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">Subsidy:</span>
                  <input
                    type="number"
                    value={subsidy}
                    onChange={(e) => setSubsidy(Number(e.target.value) || 0)}
                    className="w-24 px-2 py-1 text-right text-xs bg-white dark:bg-[#111c44] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                  />
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                  <span className="text-sm font-bold text-[#1b2559] dark:text-white">Total Payable:</span>
                  <span className="text-base font-extrabold text-[#1b2559] dark:text-white">
                    {totalPayable.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <Link
                href="/estimates"
                className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="button"
                onClick={() => alert("Estimate updated successfully!")}
                className="px-6 py-2.5 rounded-xl bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold transition-colors shadow-2xs"
              >
                Update
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


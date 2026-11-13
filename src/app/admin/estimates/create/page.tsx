"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import {
  ArrowLeft,
  Plus,
  X,
  Calendar,
  Layers,
  FileSpreadsheet,
  Upload,
  Check,
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

export default function AddEstimatePage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Pricing Method Toggle: "Base Price" or "BOM Price"
  const [pricingMethod, setPricingMethod] = useState<"base" | "bom">("bom");

  // Form Fields
  const [customer, setCustomer] = useState("");
  const [estimateName, setEstimateName] = useState("");
  const [referenceNo, setReferenceNo] = useState("");
  const [estimateType, setEstimateType] = useState("");
  const [quantityKw, setQuantityKw] = useState("");
  const [basePrice, setBasePrice] = useState("0");
  const [solarMeter, setSolarMeter] = useState("As per Actual");
  const [quotationTemplate, setQuotationTemplate] = useState("");
  const [solarStructureCharges, setSolarStructureCharges] = useState(false);
  const [structureChargesAmount, setStructureChargesAmount] = useState("0");
  const [globalTaxRate, setGlobalTaxRate] = useState("No Tax");
  const [createdDate, setCreatedDate] = useState("2026-11-13");
  const [comment, setComment] = useState("");
  const [applyGst, setApplyGst] = useState(false);
  const [discount, setDiscount] = useState<number>(0);
  const [subsidy, setSubsidy] = useState<number>(0);

  const [termsAndConditions, setTermsAndConditions] = useState(
    "- GST Charges - As applicable at the time of billing.\n- Meter charges extra as actual as per GEB (for 3phase consumer)\n- Any other work; out of the scope or change in given planning will be handled through mutual agreement."
  );

  // BOM Items list
  const [bomItems, setBomItems] = useState<BomItem[]>([
    {
      id: "bom-1",
      bomId: "",
      bomName: "",
      description: "",
      make: "",
      hsnSac: "",
      qty: 1,
      rate: 0,
      tax: 0,
      amount: 0,
    },
  ]);

  // Modals state
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerMobile, setNewCustomerMobile] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [showAddressField, setShowAddressField] = useState(false);

  const [isBomModalOpen, setIsBomModalOpen] = useState(false);
  const [newBomName, setNewBomName] = useState("");
  const [newBomMake, setNewBomMake] = useState("");
  const [newBomDescription, setNewBomDescription] = useState("");
  const [newBomHsn, setNewBomHsn] = useState("");
  const [newBomRate, setNewBomRate] = useState("");
  const [newBomTax, setNewBomTax] = useState("No Tax");

  // Calculations
  const bomTotal = bomItems.reduce((acc, item) => acc + item.qty * item.rate, 0);
  const basePriceNum = pricingMethod === "base" ? Number(basePrice) || 0 : 0;
  const subtotal = pricingMethod === "base" ? basePriceNum + bomTotal : bomTotal;
  const gstAmount = applyGst ? subtotal * 0.18 : 0;
  const subtotalTaxIncl = subtotal + gstAmount;
  const totalPayable = Math.max(0, subtotalTaxIncl - discount - subsidy);

  // BOM Actions
  const handleAddMoreBom = () => {
    setBomItems([
      ...bomItems,
      {
        id: `bom-${Date.now()}`,
        bomId: "",
        bomName: "",
        description: "",
        make: "",
        hsnSac: "",
        qty: 1,
        rate: 0,
        tax: 0,
        amount: 0,
      },
    ]);
  };

  const handleRemoveBom = (id: string) => {
    if (bomItems.length <= 1) return;
    setBomItems(bomItems.filter((b) => b.id !== id));
  };

  const handleUpdateBom = (id: string, field: keyof BomItem, value: any) => {
    setBomItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        if (field === "qty" || field === "rate") {
          updated.amount = Number(updated.qty || 0) * Number(updated.rate || 0);
        }
        return updated;
      })
    );
  };

  // Quick kW select
  const kwOptions = ["3 kW", "5 kW", "7 kW", "8 kW", "10 kW"];

  // Save new customer from modal
  const handleSaveCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerName) return;
    setCustomer(newCustomerName);
    setIsCustomerModalOpen(false);
    setNewCustomerName("");
    setNewCustomerMobile("");
    setCustomerAddress("");
  };

  // Save new BOM item from modal
  const handleSaveNewBomModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBomName) return;
    setBomItems((prev) => [
      ...prev,
      {
        id: `bom-${Date.now()}`,
        bomId: `BOM-${Date.now()}`,
        bomName: newBomName,
        description: newBomDescription,
        make: newBomMake,
        hsnSac: newBomHsn,
        qty: 1,
        rate: Number(newBomRate) || 0,
        tax: 0,
        amount: Number(newBomRate) || 0,
      },
    ]);
    setIsBomModalOpen(false);
    setNewBomName("");
    setNewBomMake("");
    setNewBomDescription("");
    setNewBomHsn("");
    setNewBomRate("");
  };

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
                Add Estimate
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Create a new estimate for your customer.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Pricing Method Toggle */}
              <div className="inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <span className="text-[11px] font-bold text-slate-500 px-2">Pricing Method</span>
                <button
                  type="button"
                  onClick={() => setPricingMethod("base")}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    pricingMethod === "base"
                      ? "bg-[#001738] text-white shadow-2xs"
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
                  placeholder="Select Customer"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setIsCustomerModalOpen(true)}
                  className="w-10 h-10 rounded-xl bg-[#001738] hover:bg-[#00224f] text-white flex items-center justify-center transition-colors shadow-2xs"
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
                  placeholder="Enter estimate name"
                  value={estimateName}
                  onChange={(e) => setEstimateName(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Reference#
                </label>
                <input
                  type="text"
                  placeholder="Reference number"
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
                  <option value="">Select Type</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Industrial">Industrial</option>
                </select>
              </div>
            </div>

            {/* Row 2: Quantity (kW), Price (when Base Price) / Solar Meter, Quotation Template */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  🏷️ Quantity (kW) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter kW"
                  value={quantityKw}
                  onChange={(e) => setQuantityKw(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {/* kW quick pills */}
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

              {pricingMethod === "base" ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    💵 Price <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Enter kW to see price suggestions.</p>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    ⚡ Solar Meter <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={solarMeter}
                    onChange={(e) => setSolarMeter(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              )}

              {pricingMethod === "base" ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    ⚡ Solar Meter <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={solarMeter}
                    onChange={(e) => setSolarMeter(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    🏷️ Quotation Template <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={quotationTemplate}
                    onChange={(e) => setQuotationTemplate(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                  >
                    <option value="">Select Template</option>
                    <option value="Standard Proposal">Standard Proposal</option>
                    <option value="Detailed BOM Proposal">Detailed BOM Proposal</option>
                    <option value="Residential Subsidized">Residential Subsidized</option>
                  </select>
                </div>
              )}
            </div>

            {/* If Base Price, Quotation Template, Charges, Tax Rate (Global), Created Date in next row */}
            {pricingMethod === "base" ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    🏷️ Quotation Template <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={quotationTemplate}
                    onChange={(e) => setQuotationTemplate(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                  >
                    <option value="">Select Template</option>
                    <option value="Standard Proposal">Standard Proposal</option>
                    <option value="Detailed BOM Proposal">Detailed BOM Proposal</option>
                    <option value="Residential Subsidized">Residential Subsidized</option>
                  </select>
                </div>

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
                  {solarStructureCharges && (
                    <div className="mt-2">
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                        🏷️ Enter Structure Charges
                      </label>
                      <input
                        type="number"
                        value={structureChargesAmount}
                        onChange={(e) => setStructureChargesAmount(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    🏷️ Tax Rate (Global)
                  </label>
                  <select
                    value={globalTaxRate}
                    onChange={(e) => setGlobalTaxRate(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none text-slate-700 dark:text-slate-300"
                  >
                    <option value="No Tax">No Tax</option>
                    <option value="5%">5%</option>
                    <option value="12%">12%</option>
                    <option value="18%">18%</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    📅 Created Date
                  </label>
                  <input
                    type="date"
                    value={createdDate}
                    onChange={(e) => setCreatedDate(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none text-slate-700 dark:text-slate-300"
                  />
                </div>
              </div>
            ) : (
              /* BOM Price Row: Charges & Created Date */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
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
                  {solarStructureCharges && (
                    <div className="mt-2">
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                        🏷️ Enter Structure Charges
                      </label>
                      <input
                        type="number"
                        value={structureChargesAmount}
                        onChange={(e) => setStructureChargesAmount(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    📅 Created Date
                  </label>
                  <input
                    type="date"
                    value={createdDate}
                    onChange={(e) => setCreatedDate(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none text-slate-700 dark:text-slate-300"
                  />
                </div>
              </div>
            )}

            {/* BOM Section (Bill Of Material) */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#1b2559] dark:text-white">
                <span>✂️</span>
                <span>BOM (Bill Of Material)</span>
              </div>

              {/* BOM Items Blocks */}
              <div className="space-y-4">
                {bomItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/40 dark:bg-[#0b1437]/40 space-y-3"
                  >
                    {/* Delete Item (Red Circle X) */}
                    {bomItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveBom(item.id)}
                        className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-rose-50 border border-rose-200 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors"
                        title="Remove BOM item"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* BOM + Make + HSN/SAC */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                          & BOM <span className="text-rose-500">*</span>
                        </label>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            placeholder="Select BOM"
                            value={item.bomName}
                            onChange={(e) => handleUpdateBom(item.id, "bomName", e.target.value)}
                            className="flex-1 px-3 py-2 text-xs bg-white dark:bg-[#111c44] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => setIsBomModalOpen(true)}
                            className="w-8 h-8 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white flex items-center justify-center transition-colors"
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
                          onChange={(e) => handleUpdateBom(item.id, "make", e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white dark:bg-[#111c44] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Description textarea */}
                    <div>
                      <textarea
                        rows={2}
                        placeholder="Add a description to your item"
                        value={item.description}
                        onChange={(e) => handleUpdateBom(item.id, "description", e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-[#111c44] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                      />
                    </div>

                    {/* Qty, Rate, Tax, Amount depending on Pricing Method */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                          # HSN/SAC
                        </label>
                        <input
                          type="text"
                          placeholder="HSN/SAC Code"
                          value={item.hsnSac}
                          onChange={(e) => handleUpdateBom(item.id, "hsnSac", e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white dark:bg-[#111c44] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Qty <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) => handleUpdateBom(item.id, "qty", Number(e.target.value))}
                          className="w-full px-3 py-2 text-xs bg-white dark:bg-[#111c44] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                        />
                      </div>

                      {pricingMethod === "bom" && (
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Rate <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="number"
                            value={item.rate}
                            onChange={(e) => handleUpdateBom(item.id, "rate", Number(e.target.value))}
                            className="w-full px-3 py-2 text-xs bg-white dark:bg-[#111c44] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                          />
                        </div>
                      )}

                      {pricingMethod === "bom" && (
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                            % Tax
                          </label>
                          <select
                            value={item.tax}
                            onChange={(e) => handleUpdateBom(item.id, "tax", Number(e.target.value))}
                            className="w-full px-3 py-2 text-xs bg-white dark:bg-[#111c44] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                          >
                            <option value="0">No Tax</option>
                            <option value="5">5%</option>
                            <option value="12">12%</option>
                            <option value="18">18%</option>
                          </select>
                        </div>
                      )}

                      {pricingMethod === "bom" && (
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
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add More BOM Button */}
              <button
                type="button"
                onClick={handleAddMoreBom}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add More BOM</span>
              </button>
            </div>

            {/* Bottom Section: Comment, Attach File, Terms & Conditions & Right Side Totals Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              {/* Left Column (Comments, File, Terms) */}
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

              {/* Right Column (Totals Box) */}
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
                  <p className="text-[10px] text-slate-400">
                    {pricingMethod === "base" ? "No global tax selected." : "Select BOM tax to apply GST."}
                  </p>
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
                onClick={() => alert("Estimate created successfully!")}
                className="px-6 py-2.5 rounded-xl bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold transition-colors shadow-2xs"
              >
                Submit
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* MODAL 1: Add New Customer */}
      {isCustomerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111c44] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#001738] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="text-sm font-bold tracking-wide">Add New Customer</h3>
              <button
                onClick={() => setIsCustomerModalOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCustomer} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  👤 Customer Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Customer Name"
                  required
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  📱 Mobile Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  required
                  value={newCustomerMobile}
                  onChange={(e) => setNewCustomerMobile(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {!showAddressField ? (
                <button
                  type="button"
                  onClick={() => setShowAddressField(true)}
                  className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  + Add Address (Optional)
                </button>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    📍 Address
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Enter customer address"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCustomerModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Add New BOM */}
      {isBomModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111c44] rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="bg-[#001738] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
              <h3 className="text-sm font-bold tracking-wide">Add New BOM</h3>
              <button
                onClick={() => setIsBomModalOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveNewBomModal} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    🏷️ BOM Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter BOM name"
                    value={newBomName}
                    onChange={(e) => setNewBomName(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    🏭 Make
                  </label>
                  <input
                    type="text"
                    placeholder="Search or type new Make"
                    value={newBomMake}
                    onChange={(e) => setNewBomMake(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  ≡ Description
                </label>
                <textarea
                  rows={2}
                  placeholder="BOM Description"
                  value={newBomDescription}
                  onChange={(e) => setNewBomDescription(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  🖼️ BOM Image
                </label>
                <div className="flex items-center gap-2">
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-50">
                    <span>Choose File</span>
                    <input type="file" className="hidden" />
                  </label>
                  <span className="text-xs text-slate-400">No file chosen</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Accepted: JPG, PNG, JPEG — Max 5MB</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  # HSN/SAC Code
                </label>
                <input
                  type="text"
                  placeholder="HSN/SAC Code"
                  value={newBomHsn}
                  onChange={(e) => setNewBomHsn(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    💵 Rate <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="Enter unit price"
                    value={newBomRate}
                    onChange={(e) => setNewBomRate(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    🏷️ Tax
                  </label>
                  <select
                    value={newBomTax}
                    onChange={(e) => setNewBomTax(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                  >
                    <option value="No Tax">No Tax</option>
                    <option value="5%">5%</option>
                    <option value="12%">12%</option>
                    <option value="18%">18%</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsBomModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold"
                >
                  Save BOM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

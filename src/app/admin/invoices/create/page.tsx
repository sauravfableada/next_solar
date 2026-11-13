"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import {
  ArrowLeft,
  Plus,
  X,
  Upload,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface InvoiceBomItem {
  id: string;
  bomName: string;
  description: string;
  make: string;
  hsnSac: string;
  qty: number;
  rate: number;
  tax: number;
  amount: number;
}

export default function AddInvoicePage({ isEdit = false }: { isEdit?: boolean }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [pricingMethod, setPricingMethod] = useState<"base" | "bom">("base");

  // Form Fields
  const [customer, setCustomer] = useState(isEdit ? "test customer" : "");
  const [invoiceName, setInvoiceName] = useState(isEdit ? "#01INV-test customer" : "");
  const [referenceNo, setReferenceNo] = useState("");
  const [invoiceType, setInvoiceType] = useState(isEdit ? "Tax Invoice" : "");
  const [quantityKw, setQuantityKw] = useState(isEdit ? "5.00" : "");
  const [basePrice, setBasePrice] = useState(isEdit ? "1.00" : "0");
  const [solarMeter, setSolarMeter] = useState("As per Actual");
  const [invoiceFormat, setInvoiceFormat] = useState(isEdit ? "Standard" : "");
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

  // Table Display Options Toggle & Custom checkboxes (Screenshot 2)
  const [showTableDisplayOptions, setShowTableDisplayOptions] = useState(false);
  const [tableOptions, setTableOptions] = useState({
    rowNumber: true,
    productDescription: true,
    hsnSac: true,
    quantity: true,
    unit: true,
    rate: true,
    taxableAmount: true,
    taxColumns: true,
    itemAmount: true,
  });

  const handleToggleTableOption = (key: keyof typeof tableOptions) => {
    setTableOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // BOM items list
  const [bomItems, setBomItems] = useState<InvoiceBomItem[]>([
    {
      id: "bom-1",
      bomName: isEdit ? "test" : "",
      description: "",
      make: "",
      hsnSac: "",
      qty: 1,
      rate: isEdit ? 1.0 : 0,
      tax: 0,
      amount: isEdit ? 1.0 : 0,
    },
  ]);

  const handleAddMoreBom = () => {
    setBomItems([
      ...bomItems,
      {
        id: `bom-${Date.now()}`,
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

  const handleUpdateBom = (id: string, field: keyof InvoiceBomItem, value: any) => {
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

  // Calculations
  const bomTotal = bomItems.reduce((acc, item) => acc + item.qty * item.rate, 0);
  const basePriceNum = pricingMethod === "base" ? Number(basePrice) || 0 : 0;
  const subtotal = pricingMethod === "base" ? basePriceNum + bomTotal : bomTotal;
  const gstAmount = applyGst ? subtotal * 0.18 : 0;
  const subtotalTaxIncl = subtotal + gstAmount;
  const totalPayable = Math.max(0, subtotalTaxIncl - discount - subsidy);

  return (
    <div className="min-h-screen bg-[#f4f7fe] dark:bg-[#0b1437] flex text-slate-800 dark:text-slate-100">
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeItem="Manage Estimates"
        activeSubItem="All Invoices"
      />

      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-64"
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
                {isEdit ? "Edit Invoice" : "Add Invoice"}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {isEdit ? "Update invoice details for your customer." : "Create a new invoice for your customer."}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Pricing Method Toggle */}
              <div className="inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <span className="text-[11px] font-bold text-slate-500 px-2">Pricing Method</span>
                <button
                  type="button"
                  onClick={() => setPricingMethod("base")}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${pricingMethod === "base"
                      ? "bg-[#001738] text-white shadow-2xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                >
                  Base Price
                </button>
                <button
                  type="button"
                  onClick={() => setPricingMethod("bom")}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${pricingMethod === "bom"
                      ? "bg-[#001738] text-white shadow-2xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                >
                  BOM Price
                </button>
              </div>

              <Link
                href="/invoices"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </Link>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white dark:bg-[#111c44] p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xs space-y-6">
            {/* Customer select */}
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

            {/* Row 1: Invoice Name, Reference#, Invoice Type */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  🏷️ Invoice Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter invoice name"
                  value={invoiceName}
                  onChange={(e) => setInvoiceName(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  🏷️ Reference#
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
                  🌿 Invoice Type <span className="text-rose-500">*</span>
                </label>
                <select
                  value={invoiceType}
                  onChange={(e) => setInvoiceType(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                >
                  <option value="">Select Type</option>
                  <option value="Tax Invoice">Tax Invoice</option>
                  <option value="Proforma">Proforma</option>
                </select>
              </div>
            </div>

            {/* Row 2: Quantity (kW), Price (Base Price only), Solar Meter */}
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
                    🏷️ Invoice Format <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={invoiceFormat}
                    onChange={(e) => setInvoiceFormat(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                  >
                    <option value="">Select Invoice Format</option>
                    <option value="Standard">Standard Format</option>
                    <option value="Detailed">Detailed Format</option>
                  </select>
                </div>
              )}
            </div>

            {/* If pricingMethod === "base", Invoice Format is in next row */}
            {pricingMethod === "base" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    🏷️ Invoice Format <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={invoiceFormat}
                    onChange={(e) => setInvoiceFormat(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                  >
                    <option value="">Select Invoice Format</option>
                    <option value="Standard">Standard Format</option>
                    <option value="Detailed">Detailed Format</option>
                  </select>
                </div>
              </div>
            )}

            {/* Row: Charges, Tax Rate (Global), Created Date */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
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

              {pricingMethod === "base" && (
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
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  📅 Created Date
                </label>
                <input
                  type="date"
                  value={createdDate}
                  onChange={(e) => setCreatedDate(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none"
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
                            className="flex-1 px-3 py-2 text-xs bg-white dark:bg-[#111c44] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
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
                          onChange={(e) => handleUpdateBom(item.id, "make", e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white dark:bg-[#111c44] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <textarea
                        rows={2}
                        placeholder="Add a description to your item"
                        value={item.description}
                        onChange={(e) => handleUpdateBom(item.id, "description", e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-[#111c44] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none resize-none"
                      />
                    </div>

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
                            Amount
                          </label>
                          <input
                            type="text"
                            readOnly
                            value={item.qty * item.rate}
                            className="w-full px-3 py-2 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold cursor-not-allowed"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddMoreBom}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add More BOM</span>
              </button>
            </div>

            {/* Table display options Accordion (Matching Screenshot 2) */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <button
                type="button"
                onClick={() => setShowTableDisplayOptions(!showTableDisplayOptions)}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors"
              >
                <span>Table display options</span>
                {showTableDisplayOptions ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {showTableDisplayOptions && (
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437]/40 space-y-4 animate-in fade-in duration-150">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                      Customize your product table
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Choose what appears on your invoice PDF.
                    </p>
                  </div>

                  <div className="space-y-2 text-xs">
                    <p className="font-bold text-slate-500 text-[11px] uppercase tracking-wider">
                      PDF APPEARANCE
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                        <input
                          type="checkbox"
                          checked={tableOptions.rowNumber}
                          onChange={() => handleToggleTableOption("rowNumber")}
                          className="w-4 h-4 rounded text-blue-600"
                        />
                        <span>Row number</span>
                      </label>
                      <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                        <input
                          type="checkbox"
                          checked={tableOptions.productDescription}
                          onChange={() => handleToggleTableOption("productDescription")}
                          className="w-4 h-4 rounded text-blue-600"
                        />
                        <span>Product description</span>
                      </label>
                      <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                        <input
                          type="checkbox"
                          checked={tableOptions.hsnSac}
                          onChange={() => handleToggleTableOption("hsnSac")}
                          className="w-4 h-4 rounded text-blue-600"
                        />
                        <span>HSN / SAC code</span>
                      </label>
                      <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                        <input
                          type="checkbox"
                          checked={tableOptions.quantity}
                          onChange={() => handleToggleTableOption("quantity")}
                          className="w-4 h-4 rounded text-blue-600"
                        />
                        <span>Quantity</span>
                      </label>
                      <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                        <input
                          type="checkbox"
                          checked={tableOptions.unit}
                          onChange={() => handleToggleTableOption("unit")}
                          className="w-4 h-4 rounded text-blue-600"
                        />
                        <span>Unit</span>
                      </label>
                      <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                        <input
                          type="checkbox"
                          checked={tableOptions.rate}
                          onChange={() => handleToggleTableOption("rate")}
                          className="w-4 h-4 rounded text-blue-600"
                        />
                        <span>Rate</span>
                      </label>
                      <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                        <input
                          type="checkbox"
                          checked={tableOptions.taxableAmount}
                          onChange={() => handleToggleTableOption("taxableAmount")}
                          className="w-4 h-4 rounded text-blue-600"
                        />
                        <span>Taxable amount</span>
                      </label>
                      <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                        <input
                          type="checkbox"
                          checked={tableOptions.taxColumns}
                          onChange={() => handleToggleTableOption("taxColumns")}
                          className="w-4 h-4 rounded text-blue-600"
                        />
                        <span>Tax columns (CGST / SGST / IGST / GST)</span>
                      </label>
                      <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                        <input
                          type="checkbox"
                          checked={tableOptions.itemAmount}
                          onChange={() => handleToggleTableOption("itemAmount")}
                          className="w-4 h-4 rounded text-blue-600"
                        />
                        <span>Item amount</span>
                      </label>
                    </div>
                    <p className="text-[11px] text-slate-400 pt-1">
                      ℹ Product names stay visible. Columns resize automatically; calculations and totals stay the same.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Row: Comments, Attach File, Terms & Totals Card */}
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
                    className="w-full px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    📎 Attach File to Invoice
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
                    className="w-full px-4 py-2.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none resize-none leading-relaxed text-slate-700 dark:text-slate-300"
                  />
                </div>
              </div>

              {/* Totals Summary */}
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
                        className="w-4 h-4 rounded text-blue-600"
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
                href="/invoices"
                className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50"
              >
                Cancel
              </Link>
              <button
                type="button"
                onClick={() => alert(isEdit ? "Invoice updated successfully!" : "Invoice created successfully!")}
                className="px-6 py-2.5 rounded-xl bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold shadow-2xs"
              >
                {isEdit ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


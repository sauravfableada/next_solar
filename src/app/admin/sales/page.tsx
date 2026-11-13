"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Download,
  Calendar,
  User,
  Users,
  Package,
  X,
  Check,
  Inbox,
} from "lucide-react";

interface ProductRow {
  id: string;
  productName: string;
  qty: number;
}

interface SaleRecord {
  id: number;
  srNo: number;
  siteName: string;
  outNo: string;
  outDate: string;
  customerName: string;
  handoverPerson: string;
  products: ProductRow[];
  comment: string;
}

export default function SalesMaterialOutPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Views: 'list' | 'create'
  const [currentView, setCurrentView] = useState<"list" | "create">("list");

  // Form states
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedHandoverPerson, setSelectedHandoverPerson] = useState("");
  const [outDate, setOutDate] = useState("2026-11-13");
  const [productRows, setProductRows] = useState<ProductRow[]>([
    { id: "1", productName: "", qty: 0 },
  ]);
  const [comment, setComment] = useState("");

  // Modals inside form
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [isAddHandoverOpen, setIsAddHandoverOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [activeProductRowIndex, setActiveProductRowIndex] = useState<number | null>(null);

  // Quick Modal Form States
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerPhone, setNewCustomerPhone] = useState("");

  const [newHandoverName, setNewHandoverName] = useState("");
  const [newHandoverPhone, setNewHandoverPhone] = useState("");

  const [newProductName, setNewProductName] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("");
  const [newProductQty, setNewProductQty] = useState(0);

  // Available dropdown options
  const [customerOptions, setCustomerOptions] = useState<string[]>([
    "Test Customer",
    "John Doe Solar",
    "Aarav Enterprises",
  ]);
  const [handoverOptions, setHandoverOptions] = useState<string[]>([
    "Solar CRM",
    "Mukesh Sharma",
    "Suresh Patel",
  ]);
  const [productOptions, setProductOptions] = useState<string[]>([
    "Solar Panel 540W Mono",
    "On-Grid Inverter 5kW",
    "Earthing Rod Copper",
    "ACDB / DCDB Box",
    "Solar Structure 4-Panel",
  ]);

  const handleStartCreate = () => {
    setSelectedCustomer("");
    setSelectedHandoverPerson("");
    setOutDate("2026-11-13");
    setProductRows([{ id: Date.now().toString(), productName: "", qty: 0 }]);
    setComment("");
    setCurrentView("create");
  };

  const handleAddProductRow = () => {
    setProductRows([
      ...productRows,
      { id: Date.now().toString(), productName: "", qty: 0 },
    ]);
  };

  const handleDeleteProductRow = (index: number) => {
    if (productRows.length > 1) {
      setProductRows(productRows.filter((_, i) => i !== index));
    } else {
      setProductRows([{ id: Date.now().toString(), productName: "", qty: 0 }]);
    }
  };

  const handleProductChange = (index: number, field: "productName" | "qty", value: any) => {
    const updated = [...productRows];
    updated[index] = { ...updated[index], [field]: value };
    setProductRows(updated);
  };

  // Submit new Sale / Material OUT
  const handleSaveMaterialOut = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer) {
      alert("Please select a customer");
      return;
    }

    const newSale: SaleRecord = {
      id: Date.now(),
      srNo: sales.length + 1,
      siteName: selectedCustomer,
      outNo: `OUT-${String(sales.length + 1).padStart(4, "0")}`,
      outDate: outDate || "13/11/2026",
      customerName: selectedCustomer,
      handoverPerson: selectedHandoverPerson || "Solar CRM",
      products: productRows.filter((p) => p.productName.trim() !== ""),
      comment: comment,
    };

    setSales([newSale, ...sales]);
    setCurrentView("list");
  };

  // Quick Customer Save
  const handleSaveCustomerModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerName.trim()) return;
    setCustomerOptions([...customerOptions, newCustomerName.trim()]);
    setSelectedCustomer(newCustomerName.trim());
    setNewCustomerName("");
    setNewCustomerPhone("");
    setIsAddCustomerOpen(false);
  };

  // Quick Handover Save
  const handleSaveHandoverModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHandoverName.trim()) return;
    setHandoverOptions([...handoverOptions, newHandoverName.trim()]);
    setSelectedHandoverPerson(newHandoverName.trim());
    setNewHandoverName("");
    setNewHandoverPhone("");
    setIsAddHandoverOpen(false);
  };

  // Quick Product Save
  const handleSaveProductModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;
    setProductOptions([...productOptions, newProductName.trim()]);
    if (activeProductRowIndex !== null && productRows[activeProductRowIndex]) {
      handleProductChange(activeProductRowIndex, "productName", newProductName.trim());
      if (newProductQty > 0) {
        handleProductChange(activeProductRowIndex, "qty", newProductQty);
      }
    }
    setNewProductName("");
    setNewProductCategory("");
    setNewProductQty(0);
    setIsAddProductOpen(false);
  };

  const filteredSales = sales.filter(
    (s) =>
      s.siteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.outNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f4f7fe] dark:bg-[#0b1437] flex text-slate-800 dark:text-slate-100">
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeItem="Manage Inventory"
        activeSubItem="All Material OUT"
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <AdminHeader
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          onSearch={(q) => setSearchQuery(q)}
        />

        <main className="p-6 md:p-8 space-y-6">
          {currentView === "list" ? (
            /* VIEW 1: SALES LIST / MATERIAL OUT LIST (Screenshot 6) */
            <>
              {/* Header Title & Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-[#1b2559] dark:text-white">
                    Manage Sales
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Track all material OUT transactions.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111c44] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium text-sm transition-colors shadow-xs">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                  <button
                    onClick={handleStartCreate}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white font-medium text-sm transition-colors shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Material OUT</span>
                  </button>
                </div>
              </div>

              {/* Table Card */}
              <div className="bg-white dark:bg-[#111c44] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800/80">
                  <h2 className="text-base font-semibold text-[#1b2559] dark:text-white">
                    Sales List
                  </h2>
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search sales..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                    />
                  </div>
                </div>

                {/* Table Header */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#0b1437]/30 text-slate-400 uppercase text-[11px] font-semibold tracking-wider">
                        <th className="py-3 px-6">SR.NO</th>
                        <th className="py-3 px-6">SITE NAME</th>
                        <th className="py-3 px-6">OUT NO</th>
                        <th className="py-3 px-6">OUT DATE</th>
                        <th className="py-3 px-6 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                      {filteredSales.length > 0 ? (
                        filteredSales.map((sale) => (
                          <tr
                            key={sale.id}
                            className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                          >
                            <td className="py-4 px-6 text-slate-600 dark:text-slate-300 font-medium">
                              {sale.srNo}
                            </td>
                            <td className="py-4 px-6 font-semibold text-[#1b2559] dark:text-white">
                              {sale.siteName}
                            </td>
                            <td className="py-4 px-6 text-slate-600 dark:text-slate-300 font-mono">
                              {sale.outNo}
                            </td>
                            <td className="py-4 px-6 text-slate-500 dark:text-slate-400">
                              {sale.outDate}
                            </td>
                            <td className="py-4 px-6 text-right">
                              <button
                                onClick={() =>
                                  setSales(sales.filter((s) => s.id !== sale.id))
                                }
                                className="p-1.5 text-red-400 hover:text-red-600 rounded hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        /* Empty State Illustration exactly matching Screenshot 6 */
                        <tr>
                          <td colSpan={5} className="py-20 text-center">
                            <div className="flex flex-col items-center justify-center">
                              {/* Open Box / Outbox SVG Illustration */}
                              <div className="w-20 h-20 mb-4 flex items-center justify-center text-slate-300 dark:text-slate-600">
                                <svg
                                  className="w-16 h-16 stroke-[1.5]"
                                  viewBox="0 0 64 64"
                                  fill="none"
                                  stroke="currentColor"
                                >
                                  <path
                                    d="M14 28L20 12H44L50 28"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M12 28H24L28 36H36L40 28H52V48C52 50.2091 50.2091 52 48 52H16C13.7909 52 12 50.2091 12 48V28Z"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <p className="text-sm text-slate-400 dark:text-slate-400 font-medium mb-4">
                                No sales found.
                              </p>
                              <button
                                onClick={handleStartCreate}
                                className="px-6 py-2.5 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white text-sm font-semibold transition-colors shadow-sm"
                              >
                                Add Your First Sale
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            /* VIEW 2: MATERIAL OUT CREATE FORM (Screenshots 1, 2, 3, 4, 5) */
            <div className="bg-white dark:bg-[#111c44] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 md:p-8 space-y-6">
              {/* Header Title & Back Button */}
              <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800/80 pb-5">
                <div>
                  <h1 className="text-xl font-bold text-[#1b2559] dark:text-white">
                    Material OUT
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Create a new material OUT entry.
                  </p>
                </div>
                <button
                  onClick={() => setCurrentView("list")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white font-medium text-sm transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSaveMaterialOut} className="space-y-6">
                {/* Row 1: Select Customer, Select Handover Person, OUT Date */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Select Customer */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#1b2559] dark:text-white flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Select Customer</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <select
                        required
                        value={selectedCustomer}
                        onChange={(e) => setSelectedCustomer(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">Select Customer</option>
                        {customerOptions.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => setIsAddCustomerOpen(true)}
                        className="p-2.5 bg-[#001738] text-white rounded-lg hover:bg-[#00224f] transition-colors"
                        title="Add Customer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Select Handover Person */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#1b2559] dark:text-white flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>Select Handover Person</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <select
                        value={selectedHandoverPerson}
                        onChange={(e) => setSelectedHandoverPerson(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">Select Handover Person</option>
                        {handoverOptions.map((h) => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => setIsAddHandoverOpen(true)}
                        className="p-2.5 bg-[#001738] text-white rounded-lg hover:bg-[#00224f] transition-colors"
                        title="Add Handover Person"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* OUT Date */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#1b2559] dark:text-white flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>OUT Date</span>
                    </label>
                    <input
                      type="date"
                      value={outDate}
                      onChange={(e) => setOutDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Product Items Header Section */}
                <div className="pt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                      <h2 className="text-base font-bold text-[#1b2559] dark:text-white">
                        Product Items
                      </h2>
                      <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-blue-600 text-white">
                        {productRows.length}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddProductRow}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Product</span>
                    </button>
                  </div>

                  {/* Dynamic Product Rows matching Screenshot 1 & 5 */}
                  <div className="space-y-4">
                    {productRows.map((row, idx) => (
                      <div
                        key={row.id}
                        className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437]/40 grid grid-cols-1 md:grid-cols-12 gap-4 items-end"
                      >
                        {/* Product Name Select + '+' button */}
                        <div className="md:col-span-7 space-y-2">
                          <label className="text-xs font-semibold text-[#1b2559] dark:text-white flex items-center gap-1.5">
                            <span>Product Name</span>
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="flex items-center gap-2">
                            <select
                              required
                              value={row.productName}
                              onChange={(e) =>
                                handleProductChange(idx, "productName", e.target.value)
                              }
                              className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                              <option value="">Select Product</option>
                              {productOptions.map((p) => (
                                <option key={p} value={p}>
                                  {p}
                                </option>
                              ))}
                            </select>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveProductRowIndex(idx);
                                setIsAddProductOpen(true);
                              }}
                              className="p-2.5 bg-[#001738] text-white rounded-lg hover:bg-[#00224f] transition-colors"
                              title="Add Product Master"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Quantity */}
                        <div className="md:col-span-4 space-y-2">
                          <label className="text-xs font-semibold text-[#1b2559] dark:text-white flex items-center gap-1.5">
                            <span>Qty</span>
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            min="0"
                            required
                            value={row.qty}
                            onChange={(e) =>
                              handleProductChange(
                                idx,
                                "qty",
                                parseInt(e.target.value) || 0
                              )
                            }
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>

                        {/* Delete Row Button */}
                        <div className="md:col-span-1 flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleDeleteProductRow(idx)}
                            className="p-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors flex items-center justify-center w-full md:w-auto"
                            title="Delete Item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comment textarea */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-semibold text-[#1b2559] dark:text-white">
                    Comment
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Add any comments..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y"
                  />
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => setCurrentView("list")}
                    className="px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white text-sm font-semibold transition-colors shadow-sm"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* POPUP 1: Add Customer Modal (Screenshot 2) */}
      {isAddCustomerOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111c44] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-[#1b2559] dark:text-white">
                Add Customer
              </h3>
              <button
                onClick={() => setIsAddCustomerOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCustomerModal} className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1b2559] dark:text-white flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Customer Name</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter customer name"
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1b2559] dark:text-white flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Phone</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Enter phone number"
                  value={newCustomerPhone}
                  onChange={(e) => setNewCustomerPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddCustomerOpen(false)}
                  className="px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white text-sm font-medium transition-colors shadow-sm"
                >
                  Add Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POPUP 2: Add Handover Person Modal (Screenshot 3) */}
      {isAddHandoverOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111c44] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-[#1b2559] dark:text-white">
                Add Handover Person
              </h3>
              <button
                onClick={() => setIsAddHandoverOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveHandoverModal} className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1b2559] dark:text-white flex items-center gap-1.5">
                  <span>Name</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter name"
                  value={newHandoverName}
                  onChange={(e) => setNewHandoverName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1b2559] dark:text-white flex items-center gap-1.5">
                  <span>Phone</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Enter phone number"
                  value={newHandoverPhone}
                  onChange={(e) => setNewHandoverPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddHandoverOpen(false)}
                  className="px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white text-sm font-medium transition-colors shadow-sm"
                >
                  Add Handover Person
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POPUP 3: Add Product Modal (Screenshot 4) */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111c44] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-[#1b2559] dark:text-white">
                Add Product
              </h3>
              <button
                onClick={() => setIsAddProductOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProductModal} className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1b2559] dark:text-white flex items-center gap-1.5">
                  <span>Product Name</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter product name"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1b2559] dark:text-white flex items-center gap-1.5">
                  <span>Category</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Select or Add Category"
                  value={newProductCategory}
                  onChange={(e) => setNewProductCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  Type a category name and press Enter to create it.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1b2559] dark:text-white flex items-center gap-1.5">
                  <span>Quantity</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={newProductQty}
                  onChange={(e) => setNewProductQty(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white text-sm font-medium transition-colors shadow-sm"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


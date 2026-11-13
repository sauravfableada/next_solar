"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import {
  Search,
  Plus,
  Pencil,
  Eye,
  Trash2,
  ChevronLeft,
  Download,
  Filter,
  RotateCcw,
  Calendar,
  Camera,
  Check,
  ChevronDown,
} from "lucide-react";

interface ProductRecord {
  id: number;
  srNo: number;
  productInfo: string;
  category: string;
  qty: number;
  createdAt: string;
}

export default function ManageProductsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Views: 'list' | 'add' | 'edit' | 'view'
  const [currentView, setCurrentView] = useState<"list" | "add" | "edit" | "view">("list");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form Fields (Screenshot 3)
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formQuantity, setFormQuantity] = useState(0);
  const [formStock, setFormStock] = useState("In Stock");
  const [formSerialNo, setFormSerialNo] = useState("");
  const [formStatus, setFormStatus] = useState("Active");
  const [formDescription, setFormDescription] = useState("");

  // Filter Bar state (Screenshot 2)
  const [filterCategory, setFilterCategory] = useState("");
  const [filterQty, setFilterQty] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const categoriesList = [
    "Solar Panels",
    "Inverters",
    "Structures & Mounting",
    "Cables & Electricals",
    "Earthing & Lightning",
    "Batteries",
    "D",
  ];

  const handleStartAdd = () => {
    setEditingId(null);
    setFormName("");
    setFormCategory("");
    setFormQuantity(0);
    setFormStock("In Stock");
    setFormSerialNo("");
    setFormStatus("Active");
    setFormDescription("");
    setCurrentView("add");
  };

  const handleStartEdit = (p: ProductRecord) => {
    setEditingId(p.id);
    setFormName(p.productInfo);
    setFormCategory(p.category);
    setFormQuantity(p.qty);
    setFormStock("In Stock");
    setFormSerialNo("");
    setFormStatus("Active");
    setFormDescription("");
    setCurrentView("edit");
  };

  const handleStartView = (p: ProductRecord) => {
    setEditingId(p.id);
    setFormName(p.productInfo);
    setFormCategory(p.category);
    setFormQuantity(p.qty);
    setFormStock("In Stock");
    setFormSerialNo("");
    setFormStatus("Active");
    setFormDescription("");
    setCurrentView("view");
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (currentView === "add") {
      const newProd: ProductRecord = {
        id: Date.now(),
        srNo: products.length + 1,
        productInfo: formName.trim(),
        category: formCategory || "Solar Panels",
        qty: formQuantity || 0,
        createdAt: "13 Nov 2026, 12:00",
      };
      setProducts([newProd, ...products]);
    } else if (currentView === "edit" && editingId !== null) {
      setProducts(
        products.map((item) =>
          item.id === editingId
            ? {
                ...item,
                productInfo: formName.trim(),
                category: formCategory || item.category,
                qty: formQuantity,
              }
            : item
        )
      );
    }
    setCurrentView("list");
  };

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.productInfo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = !filterCategory || p.category === filterCategory;
    const matchQty = !filterQty || p.qty.toString() === filterQty;
    return matchSearch && matchCategory && matchQty;
  });

  return (
    <div className="min-h-screen bg-[#f4f7fe] dark:bg-[#0b1437] flex text-slate-800 dark:text-slate-100">
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeItem="Manage Inventory"
        activeSubItem="All Products"
      />

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
            /* VIEW 1: PRODUCTS LIST (Screenshot 2) */
            <>
              {/* Header Title & Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-[#1b2559] dark:text-white">
                    Manage Products
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Track product pricing and categories in the CRM.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111c44] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium text-sm transition-colors shadow-xs">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                  <button
                    onClick={handleStartAdd}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white font-medium text-sm transition-colors shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Product</span>
                  </button>
                </div>
              </div>

              {/* Filters Box exactly matching Screenshot 2 */}
              <div className="bg-white dark:bg-[#111c44] rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                  <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                    />
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300">
                      <Filter className="w-3.5 h-3.5" />
                      <span>Filters</span>
                    </span>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <span>Show per page:</span>
                      <select className="px-2 py-1 bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded text-xs">
                        <option value="10">10</option>
                        <option value="25">25</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Filter Controls Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Category
                    </label>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-slate-800 dark:text-slate-100"
                    >
                      <option value="">All category</option>
                      {categoriesList.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Qty
                    </label>
                    <input
                      type="text"
                      placeholder="Search qty"
                      value={filterQty}
                      onChange={(e) => setFilterQty(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 placeholder-slate-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Created At
                    </label>
                    <div className="relative">
                      <Calendar className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="From - To"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 placeholder-slate-400"
                      />
                    </div>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setFilterCategory("");
                        setFilterQty("");
                        setFilterDate("");
                      }}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white text-xs font-medium transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Table Card */}
              <div className="bg-white dark:bg-[#111c44] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#0b1437]/30 text-slate-400 uppercase text-[11px] font-semibold tracking-wider">
                        <th className="py-3 px-6">SR.NO</th>
                        <th className="py-3 px-6">PRODUCT INFO</th>
                        <th className="py-3 px-6">CATEGORY</th>
                        <th className="py-3 px-6">QTY</th>
                        <th className="py-3 px-6">CREATED AT</th>
                        <th className="py-3 px-6 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((p) => (
                          <tr
                            key={p.id}
                            className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                          >
                            <td className="py-4 px-6 text-slate-600 dark:text-slate-300 font-medium">
                              {p.srNo}
                            </td>
                            <td className="py-4 px-6 font-semibold text-[#1b2559] dark:text-white">
                              {p.productInfo}
                            </td>
                            <td className="py-4 px-6 text-slate-600 dark:text-slate-300">
                              {p.category}
                            </td>
                            <td className="py-4 px-6 font-mono text-slate-700 dark:text-slate-200">
                              {p.qty}
                            </td>
                            <td className="py-4 px-6 text-slate-500 dark:text-slate-400">
                              {p.createdAt}
                            </td>
                            <td className="py-4 px-6 text-right">
                              <div className="inline-flex items-center gap-1.5 justify-end">
                                <button
                                  onClick={() => handleStartEdit(p)}
                                  className="p-1.5 text-slate-400 hover:text-[#001738] dark:hover:text-white rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                  title="Edit"
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleStartView(p)}
                                  className="p-1.5 text-slate-400 hover:text-[#001738] dark:hover:text-white rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                  title="View"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() =>
                                    setProducts(products.filter((item) => item.id !== p.id))
                                  }
                                  className="p-1.5 text-red-400 hover:text-red-600 rounded hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        /* Empty State Illustration exactly matching Screenshot 2 */
                        <tr>
                          <td colSpan={6} className="py-20 text-center">
                            <div className="flex flex-col items-center justify-center">
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
                                No products found.
                              </p>
                              <button
                                onClick={handleStartAdd}
                                className="px-6 py-2.5 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white text-sm font-semibold transition-colors shadow-sm"
                              >
                                Add Your First Product
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
            /* VIEW 2: ADD / EDIT / VIEW PRODUCT FORM (Screenshot 3) */
            <div className="bg-white dark:bg-[#111c44] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 md:p-8 space-y-6">
              {/* Form Header */}
              <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800/80 pb-5">
                <div>
                  <h1 className="text-xl font-bold text-[#1b2559] dark:text-white">
                    {currentView === "add"
                      ? "Add Product"
                      : currentView === "edit"
                      ? "Edit Product"
                      : "Product Details"}
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {currentView === "add"
                      ? "Create a new product entry."
                      : currentView === "edit"
                      ? "Update the product details and inventory pricing."
                      : "View full product specifications and stock status."}
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
              <form onSubmit={handleSaveProduct} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#1b2559] dark:text-white">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      disabled={currentView === "view"}
                      placeholder="Product Name"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-75 disabled:bg-slate-50 dark:disabled:bg-slate-800/50"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#1b2559] dark:text-white">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        required
                        disabled={currentView === "view"}
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="w-full appearance-none px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-75 disabled:bg-slate-50 dark:disabled:bg-slate-800/50"
                      >
                        <option value="">Select Category</option>
                        {categoriesList.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#1b2559] dark:text-white">
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      required
                      disabled={currentView === "view"}
                      value={formQuantity}
                      onChange={(e) => setFormQuantity(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-75 disabled:bg-slate-50 dark:disabled:bg-slate-800/50"
                    />
                  </div>

                  {/* Stock */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#1b2559] dark:text-white">
                      Stock
                    </label>
                    <div className="relative">
                      <select
                        disabled={currentView === "view"}
                        value={formStock}
                        onChange={(e) => setFormStock(e.target.value)}
                        className="w-full appearance-none px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-75 disabled:bg-slate-50 dark:disabled:bg-slate-800/50"
                      >
                        <option value="In Stock">In Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Serial No with Scan button */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#1b2559] dark:text-white">
                      Serial No
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        disabled={currentView === "view"}
                        placeholder="Scan barcode or type manually"
                        value={formSerialNo}
                        onChange={(e) => setFormSerialNo(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-75 disabled:bg-slate-50 dark:disabled:bg-slate-800/50"
                      />
                      {currentView !== "view" && (
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold transition-colors shadow-sm"
                        >
                          <Camera className="w-4 h-4" />
                          <span>Scan</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#1b2559] dark:text-white">
                      Status
                    </label>
                    <div className="relative">
                      <select
                        disabled={currentView === "view"}
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value)}
                        className="w-full appearance-none px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-75 disabled:bg-slate-50 dark:disabled:bg-slate-800/50"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#1b2559] dark:text-white">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    disabled={currentView === "view"}
                    placeholder="Product description"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y disabled:opacity-75 disabled:bg-slate-50 dark:disabled:bg-slate-800/50"
                  />
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => setCurrentView("list")}
                    className="px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    {currentView === "view" ? "Close" : "Cancel"}
                  </button>
                  {currentView !== "view" && (
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white text-sm font-semibold transition-colors shadow-sm"
                    >
                      {currentView === "edit" ? "Update Product" : "Submit"}
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}


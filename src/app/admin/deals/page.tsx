"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { useTheme } from "@/context/ThemeContext";
import {
  Search,
  ChevronDown,
  Menu,
  Briefcase,
  FileSpreadsheet,
  Headphones,
  Bell,
  Sun,
  Moon,
  Plus,
  Download,
  Filter,
  Eye,
  Edit2,
  Trash2,
  Calendar,
  RotateCcw,
  User,
  History,
  Globe,
  Settings,
  ArrowLeft,
  CheckCircle2,
  Phone,
  Tag,
  Clock,
  FileText,
  X,
  CreditCard,
  Building,
  DollarSign,
  HelpCircle,
  AlertCircle,
} from "lucide-react";

interface Deal {
  id: number;
  customerName: string;
  phone: string;
  email: string;
  whatsapp: string;
  invoiceName: string;
  invoiceAmount: string;
  invoiceValue: number;
  timeLine: string;
  createdBy: string;
  createdAt: string;
  status: "Active" | "Paused" | "Closed";
  type: string;
  customerReceived: string;
  customerPending: string;
  bankReceived: string;
  bankPending: string;
  fundingType?: string;
  advanceDownPayment?: string;
  notes?: string;
}

export default function DealsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { isDarkMode } = useTheme();

  // View modes: "list" | "create" | "detail"
  const [viewMode, setViewMode] = useState<"list" | "create" | "detail">("list");
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  // Manage Payments Modal (Screenshots 4, 5, 6)
  const [showPaymentsModal, setShowPaymentsModal] = useState(false);

  // Payment form states
  const [fundingType, setFundingType] = useState("Customer funded");
  const [downPayment, setDownPayment] = useState("0");
  const [savingType, setSavingType] = useState("Funding plan only");
  const [financeNotes, setFinanceNotes] = useState("");

  // Filters
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCustomer, setFilterCustomer] = useState("All customer name");
  const [filterCreator, setFilterCreator] = useState("All creators");
  const [filterCreatedAt, setFilterCreatedAt] = useState("");
  const [filterStatus, setFilterStatus] = useState("All status");

  // Deals Dataset matching Screenshot 1 & 3
  const [deals, setDeals] = useState<Deal[]>([
    {
      id: 1,
      customerName: "Test Customer",
      phone: "9870543210",
      email: "testcustomer@gmail.com",
      whatsapp: "9870543210",
      invoiceName: "#01INV-Test Customer",
      invoiceAmount: "₹2.00",
      invoiceValue: 2.0,
      timeLine: "5 days",
      createdBy: "Solar CRM",
      createdAt: "6 Nov 2026 03:53 PM",
      status: "Paused",
      type: "Individual",
      customerReceived: "0.00 INR",
      customerPending: "2.00 INR",
      bankReceived: "0.00 INR",
      bankPending: "0.00 INR",
      fundingType: "Customer funded",
      advanceDownPayment: "0",
    },
  ]);

  // Form State for Add Deal (Screenshot 2)
  const [formData, setFormData] = useState({
    customer: "Test Customer",
    invoice: "#01INV-Test Customer",
    invoiceAmount: "2.00",
    timelineValue: "5",
    timelineUnit: "Days",
    dealStatus: "Pending",
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customer || !formData.invoiceAmount) {
      showToast("Please fill in customer and invoice amount!");
      return;
    }

    const newDeal: Deal = {
      id: deals.length + 1,
      customerName: formData.customer,
      phone: "9870543210",
      email: "testcustomer@gmail.com",
      whatsapp: "9870543210",
      invoiceName: formData.invoice || `#0${deals.length + 1}INV-${formData.customer}`,
      invoiceAmount: `₹${parseFloat(formData.invoiceAmount || "0").toFixed(2)}`,
      invoiceValue: parseFloat(formData.invoiceAmount || "0"),
      timeLine: `${formData.timelineValue} ${formData.timelineUnit.toLowerCase()}`,
      createdBy: "Solar CRM",
      createdAt: "12 Nov 2026 06:10 PM",
      status: "Active",
      type: "Individual",
      customerReceived: "0.00 INR",
      customerPending: `${parseFloat(formData.invoiceAmount || "0").toFixed(2)} INR`,
      bankReceived: "0.00 INR",
      bankPending: "0.00 INR",
    };

    setDeals([newDeal, ...deals]);
    showToast("Deal created successfully!");
    setViewMode("list");
  };

  const handleSaveFinanceDetails = () => {
    showToast("Finance details saved successfully!");
    setShowPaymentsModal(false);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setFilterCustomer("All customer name");
    setFilterCreator("All creators");
    setFilterCreatedAt("");
    setFilterStatus("All status");
  };

  const filteredDeals = deals.filter((item) => {
    if (searchQuery && !item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) && !item.invoiceName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filterStatus !== "All status" && item.status !== filterStatus) {
      return false;
    }
    return true;
  });

  return (
    <div
      className={`min-h-screen flex font-sans antialiased transition-colors duration-300 ${
        isDarkMode ? "bg-[#0b1329] text-slate-100" : "bg-[#f1f5f9] text-[#1e293b]"
      }`}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center space-x-2 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          INVOICE FINANCE & PAYMENTS MODAL (Screenshots 4, 5, 6)
         ========================================================================= */}
      {showPaymentsModal && selectedDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-white dark:bg-[#101b33] border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl p-6 md:p-8 shadow-2xl space-y-6 relative my-8 max-h-[90vh] overflow-y-auto scrollbar-thin">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Invoice finance & payments
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {selectedDeal.customerName.toLowerCase()} | {selectedDeal.invoiceName.toLowerCase()} | INV-00001 | INR
                </p>
              </div>
              <button
                onClick={() => setShowPaymentsModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 8 Stats Metric Cards (Screenshot 4) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-medium">Invoice total</span>
                <span className="text-base font-bold text-slate-800 dark:text-slate-100 mt-1 block">
                  {selectedDeal.invoiceValue.toFixed(2)}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-medium">Customer received</span>
                <span className="text-base font-bold text-slate-800 dark:text-slate-100 mt-1 block">
                  0.00
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-medium">Bank received</span>
                <span className="text-base font-bold text-slate-800 dark:text-slate-100 mt-1 block">
                  0.00
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-medium">Total outstanding</span>
                <span className="text-base font-bold text-slate-800 dark:text-slate-100 mt-1 block">
                  {selectedDeal.invoiceValue.toFixed(2)}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-medium">Customer pending</span>
                <span className="text-base font-bold text-slate-800 dark:text-slate-100 mt-1 block">
                  {selectedDeal.invoiceValue.toFixed(2)}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-medium">Bank pending</span>
                <span className="text-base font-bold text-slate-800 dark:text-slate-100 mt-1 block">
                  0.00
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-medium">Bank funded share</span>
                <span className="text-base font-bold text-slate-800 dark:text-slate-100 mt-1 block">
                  0.00
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block font-medium">Earlier paid / unallocated</span>
                <span className="text-base font-bold text-slate-800 dark:text-slate-100 mt-1 block">
                  0.00
                </span>
              </div>
            </div>

            {/* Section 1: Who will pay this invoice? */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                1. Who will pay this invoice?
              </h4>
              <p className="text-[11px] text-slate-500">
                Set the customer contribution and bank loan separately. Each can be received in multiple installments.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                    Funding type
                  </label>
                  <select
                    value={fundingType}
                    onChange={(e) => setFundingType(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
                  >
                    <option value="Customer funded">Customer funded</option>
                    <option value="Bank funded">Bank funded</option>
                    <option value="Partial bank loan">Partial bank loan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                    Planned customer advance / down payment
                  </label>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    A plan only. Record actual receipts below.
                  </span>
                </div>
              </div>
            </div>

            {/* Section 2: Record an actual payment */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                2. Record an actual payment
              </h4>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  What are you saving?
                </label>
                <select
                  value={savingType}
                  onChange={(e) => setSavingType(e.target.value)}
                  className="w-full md:w-1/2 h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
                >
                  <option value="Funding plan only">Funding plan only</option>
                  <option value="Actual payment receipt">Actual payment receipt</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                  Remarks / finance notes
                </label>
                <textarea
                  rows={2}
                  value={financeNotes}
                  onChange={(e) => setFinanceNotes(e.target.value)}
                  placeholder="Enter remarks or notes"
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Only actual receipts reduce the balance. Loan approval and the funding plan do not count as money received.
                </span>
              </div>
            </div>

            {/* Funding breakdown (INR) (Screenshot 5) */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Funding breakdown <span className="text-slate-400 font-normal">(INR)</span>
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl border-l-4 border-blue-500 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-500 block">Total customer contribution</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100 block mt-1">2.00</span>
                </div>
                <div className="p-3 rounded-xl border-l-4 border-blue-500 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-500 block">Total bank loan</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100 block mt-1">0.00</span>
                </div>
                <div className="p-3 rounded-xl border-l-4 border-blue-500 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-500 block">Still due from customer</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100 block mt-1">2.00</span>
                </div>
                <div className="p-3 rounded-xl border-l-4 border-blue-500 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-500 block">Still due from bank</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100 block mt-1">0.00</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 block pt-1">
                Invoice status after saving: Unpaid. Bank installments can be recorded again whenever received.
              </span>
            </div>

            {/* Payment ledger */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Payment ledger
              </h4>
              <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50 dark:bg-slate-800/50">
                      <th className="py-2 px-3">DATE</th>
                      <th className="py-2 px-3">SOURCE</th>
                      <th className="py-2 px-3">AMOUNT</th>
                      <th className="py-2 px-3">METHOD / REFERENCE</th>
                      <th className="py-2 px-3">RECORD</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={5} className="py-4 text-center text-slate-400 text-xs">
                        No receipts recorded yet.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Finance audit history (Screenshot 6) */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                <span>Finance audit history</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 pl-5">
                No finance changes recorded yet.
              </p>
            </div>

            {/* Modal Footer Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => showToast("Receivables report generated!")}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Receivables report
              </button>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowPaymentsModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSaveFinanceDetails}
                  className="px-6 py-2.5 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Save finance details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LEFT SIDEBAR */}
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeItem="Manage Deals"
      />

      {/* MAIN WORKSPACE */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        {/* TOP HEADER */}
        <AdminHeader sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />

        {/* WORKSPACE BODY */}
        <div className="p-6 md:p-8 space-y-6 flex-1">
          {/* =========================================================================
              VIEW 1: MANAGE DEALS LIST (Screenshot 1)
             ========================================================================= */}
          {viewMode === "list" && (
            <div className="space-y-6">
              {/* Header Title + Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold tracking-tight">Manage Deals</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Track sales opportunities and deal progress.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-2 transition cursor-pointer">
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Export</span>
                  </button>
                  <button
                    onClick={() => setViewMode("create")}
                    className="px-5 py-2.5 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-md transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Deal</span>
                  </button>
                </div>
              </div>

              {/* White Container Card */}
              <div
                className={`rounded-2xl border p-6 space-y-6 shadow-sm transition-colors ${
                  isDarkMode ? "bg-[#101b33] border-slate-800" : "bg-white border-slate-200/80"
                }`}
              >
                {/* Search Bar & Filters Switcher */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search deals..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                      />
                    </div>
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className={`px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
                        showFilters
                          ? "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white"
                          : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <Filter className="w-3.5 h-3.5 text-slate-500" />
                      <span>Filters</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 self-end">
                    <span className="text-xs text-slate-500">Show per page:</span>
                    <select className="border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs bg-white dark:bg-slate-800 outline-none">
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                    </select>
                  </div>
                </div>

                {/* Filters Row (Screenshot 1) */}
                {showFilters && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2 pb-3 border-t border-b border-slate-100 dark:border-slate-800/80 items-end">
                    {/* Customer Name */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                        Customer Name
                      </label>
                      <select
                        value={filterCustomer}
                        onChange={(e) => setFilterCustomer(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
                      >
                        <option>All customer name</option>
                        <option>Test Customer</option>
                        <option>Test Lead</option>
                      </select>
                    </div>

                    {/* Created By */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                        Created By
                      </label>
                      <select
                        value={filterCreator}
                        onChange={(e) => setFilterCreator(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
                      >
                        <option>All creators</option>
                        <option>Solar CRM</option>
                      </select>
                    </div>

                    {/* Created At */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                        Created At
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="From - To"
                          value={filterCreatedAt}
                          onChange={(e) => setFilterCreatedAt(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
                        />
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                        Status
                      </label>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
                      >
                        <option>All status</option>
                        <option>Active</option>
                        <option>Paused</option>
                        <option>Closed</option>
                      </select>
                    </div>

                    {/* Clear Button */}
                    <div>
                      <button
                        onClick={clearFilters}
                        className="w-full py-2.5 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Clear</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Deals Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <th className="py-3 px-3">SR.NO</th>
                        <th className="py-3 px-3">CUSTOMER NAME</th>
                        <th className="py-3 px-3">INVOICE NAME</th>
                        <th className="py-3 px-3">CREATED BY</th>
                        <th className="py-3 px-3">INVOICE AMOUNT</th>
                        <th className="py-3 px-3">STATUS</th>
                        <th className="py-3 px-3 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      {filteredDeals.map((item, index) => (
                        <tr
                          key={item.id}
                          className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition"
                        >
                          <td className="py-4 px-3 font-medium text-slate-500">{index + 1}</td>
                          <td className="py-4 px-3">
                            <div>
                              <span className="font-bold text-slate-800 dark:text-slate-100 block">
                                {item.customerName}
                              </span>
                              <span className="text-[11px] font-semibold text-blue-600 block mt-0.5">
                                {item.phone}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-3 font-medium text-slate-700 dark:text-slate-300">
                            {item.invoiceName}
                          </td>
                          <td className="py-4 px-3 text-slate-600 dark:text-slate-300">
                            {item.createdBy}
                          </td>
                          <td className="py-4 px-3 font-semibold text-slate-800 dark:text-slate-100">
                            {item.invoiceAmount}
                          </td>
                          <td className="py-4 px-3">
                            <div className="inline-flex items-center justify-between gap-2 px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-[11px] font-medium min-w-[90px]">
                              <span>{item.status}</span>
                              <ChevronDown className="w-3 h-3 text-amber-600" />
                            </div>
                          </td>
                          <td className="py-4 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => {
                                  setSelectedDeal(item);
                                  setViewMode("detail");
                                }}
                                title="View Details"
                                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedDeal(item);
                                  setShowPaymentsModal(true);
                                }}
                                title="Manage Payments"
                                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                              >
                                <CreditCard className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  setFormData({
                                    customer: item.customerName,
                                    invoice: item.invoiceName,
                                    invoiceAmount: item.invoiceValue.toString(),
                                    timelineValue: "5",
                                    timelineUnit: "Days",
                                    dealStatus: item.status,
                                  });
                                  setViewMode("create");
                                }}
                                title="Edit"
                                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  setDeals(deals.filter((d) => d.id !== item.id));
                                  showToast("Deal deleted!");
                                }}
                                title="Delete"
                                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
                  <span>Showing 1 to {filteredDeals.length} of {filteredDeals.length} results</span>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-300 cursor-not-allowed">
                      Previous
                    </button>
                    <button className="w-7 h-7 rounded-lg bg-[#0f172a] text-white font-bold flex items-center justify-center">
                      1
                    </button>
                    <button className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-300 cursor-not-allowed">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 2: ADD DEAL (Screenshot 2)
             ========================================================================= */}
          {viewMode === "create" && (
            <div className="space-y-6">
              {/* Header Title + Back */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold tracking-tight">Add Deal</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Create a new deal for an existing customer.
                  </p>
                </div>
                <button
                  onClick={() => setViewMode("list")}
                  className="px-4 py-2 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              </div>

              {/* Form Card */}
              <form
                onSubmit={handleCreateDeal}
                className={`rounded-2xl border p-6 md:p-8 space-y-6 shadow-sm transition-colors ${
                  isDarkMode ? "bg-[#101b33] border-slate-800" : "bg-white border-slate-200/80"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Customer * */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Customer</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <select
                        value={formData.customer}
                        onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                        required
                        className="flex-1 h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                      >
                        <option value="Test Customer">Test Customer</option>
                        <option value="Test Lead">Test Lead</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => showToast("Add customer popup opened!")}
                        className="w-11 h-11 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white flex items-center justify-center font-bold text-base cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Invoice */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <Tag className="w-3.5 h-3.5 text-slate-400" />
                      <span>Invoice</span>
                    </label>
                    <select
                      value={formData.invoice}
                      onChange={(e) => setFormData({ ...formData, invoice: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                    >
                      <option value="#01INV-Test Customer">#01INV-Test Customer</option>
                      <option value="#02INV-Test Customer">#02INV-Test Customer</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Invoice Amount * */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span>Invoice Amount</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter invoice amount"
                      value={formData.invoiceAmount}
                      onChange={(e) => setFormData({ ...formData, invoiceAmount: e.target.value })}
                      required
                      className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Time Line * */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Time Line</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Enter timeline value (e.g. 5)"
                        value={formData.timelineValue}
                        onChange={(e) => setFormData({ ...formData, timelineValue: e.target.value })}
                        required
                        className="flex-1 h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                      />
                      <select
                        value={formData.timelineUnit}
                        onChange={(e) => setFormData({ ...formData, timelineUnit: e.target.value })}
                        className="w-28 h-11 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
                      >
                        <option>Days</option>
                        <option>Weeks</option>
                        <option>Months</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Deal Status * */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <Tag className="w-3.5 h-3.5 text-slate-400" />
                      <span>Deal Status</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.dealStatus}
                      onChange={(e) => setFormData({ ...formData, dealStatus: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                    >
                      <option>Pending</option>
                      <option>Active</option>
                      <option>Paused</option>
                      <option>Closed</option>
                    </select>
                  </div>

                  {/* Signature (Optional) */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span>Signature (Optional)</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <label className="flex-1 flex items-center border border-slate-300 dark:border-slate-700 rounded-xl px-3 h-11 bg-white dark:bg-slate-800 cursor-pointer">
                        <span className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold mr-3">
                          Choose File
                        </span>
                        <span className="text-xs text-slate-400">No file chosen</span>
                        <input type="file" className="hidden" />
                      </label>
                      <div className="w-16 h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800" />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Leave blank to use the default signature from Settings.
                    </span>
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className="px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-2.5 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-bold shadow-md transition cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* =========================================================================
              VIEW 3: DEAL DETAILS (Screenshot 3)
             ========================================================================= */}
          {viewMode === "detail" && selectedDeal && (
            <div className="space-y-6">
              {/* Top Banner: Invoice finance & collections */}
              <div
                className={`rounded-2xl border p-6 space-y-4 shadow-sm transition-colors ${
                  isDarkMode ? "bg-[#101b33] border-slate-800" : "bg-white border-slate-200/80"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      Invoice finance & collections
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {selectedDeal.invoiceName} · INV-00001 · Pending
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPaymentsModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition cursor-pointer self-start sm:self-auto"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Manage payments</span>
                  </button>
                </div>

                {/* 4 Overview Mini Cards (Screenshot 3 top row) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 block font-medium">Customer received</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1 block">
                      {selectedDeal.customerReceived}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
                    <span className="text-[10px] text-amber-700 dark:text-amber-400 block font-medium">Customer pending</span>
                    <span className="text-sm font-bold text-amber-800 dark:text-amber-300 mt-1 block">
                      {selectedDeal.customerPending}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 block font-medium">Bank received</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1 block">
                      {selectedDeal.bankReceived}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
                    <span className="text-[10px] text-amber-700 dark:text-amber-400 block font-medium">Bank pending</span>
                    <span className="text-sm font-bold text-amber-800 dark:text-amber-300 mt-1 block">
                      {selectedDeal.bankPending}
                    </span>
                  </div>
                </div>
              </div>

              {/* Deal Details Card (Screenshot 3 main table) */}
              <div
                className={`rounded-2xl border p-6 md:p-8 space-y-6 shadow-sm transition-colors ${
                  isDarkMode ? "bg-[#101b33] border-slate-800" : "bg-white border-slate-200/80"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                      Deal Details
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Complete information about this deal
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setFormData({
                          customer: selectedDeal.customerName,
                          invoice: selectedDeal.invoiceName,
                          invoiceAmount: selectedDeal.invoiceValue.toString(),
                          timelineValue: "5",
                          timelineUnit: "Days",
                          dealStatus: selectedDeal.status,
                        });
                        setViewMode("create");
                      }}
                      className="px-4 py-2 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => showToast("Downloading PDF invoice...")}
                      className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-50 transition cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className="px-4 py-2 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-12">
                  {/* Created By */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <User className="w-4 h-4 text-slate-500" />
                      <span>Created By:</span>
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-300">
                      {selectedDeal.createdBy}
                    </span>
                  </div>

                  {/* Created At */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span>Created At:</span>
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      {selectedDeal.createdAt}
                    </span>
                  </div>

                  {/* Email */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <FileText className="w-4 h-4 text-slate-500" />
                      <span>Email:</span>
                    </span>
                    <span className="text-xs text-blue-600 dark:text-blue-400">
                      {selectedDeal.email}
                    </span>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <Phone className="w-4 h-4 text-slate-500" />
                      <span>Phone:</span>
                    </span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {selectedDeal.phone}
                    </span>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <Phone className="w-4 h-4 text-emerald-500" />
                      <span>WhatsApp:</span>
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-300">
                      {selectedDeal.whatsapp}
                    </span>
                  </div>

                  {/* Date of Birth */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span>Date of Birth:</span>
                    </span>
                    <span className="text-xs text-slate-400">--</span>
                  </div>

                  {/* Anniversary */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span>Anniversary:</span>
                    </span>
                    <span className="text-xs text-slate-400">--</span>
                  </div>

                  {/* Website */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <Globe className="w-4 h-4 text-slate-500" />
                      <span>Website:</span>
                    </span>
                    <span className="text-xs text-slate-400">--</span>
                  </div>

                  {/* Tax Number */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <Tag className="w-4 h-4 text-slate-500" />
                      <span>Tax Number:</span>
                    </span>
                    <span className="text-xs text-slate-400">--</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <Building className="w-4 h-4 text-slate-500" />
                      <span>Location:</span>
                    </span>
                    <span className="text-xs text-slate-400">--</span>
                  </div>

                  {/* Company */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <Building className="w-4 h-4 text-slate-500" />
                      <span>Company:</span>
                    </span>
                    <span className="text-xs text-slate-400">--</span>
                  </div>

                  {/* Type */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <Tag className="w-4 h-4 text-slate-500" />
                      <span>Type:</span>
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-300">{selectedDeal.type}</span>
                  </div>

                  {/* Invoice Name */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <FileText className="w-4 h-4 text-slate-500" />
                      <span>Invoice Name:</span>
                    </span>
                    <span className="text-xs text-slate-700 dark:text-slate-200 font-semibold">
                      {selectedDeal.invoiceName}
                    </span>
                  </div>

                  {/* Invoice Value */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <DollarSign className="w-4 h-4 text-slate-500" />
                      <span>Invoice Value:</span>
                    </span>
                    <span className="text-xs text-slate-800 dark:text-slate-100 font-bold">
                      {selectedDeal.invoiceValue.toFixed(2)} INR
                    </span>
                  </div>

                  {/* Time Line */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span>Time Line:</span>
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-300">{selectedDeal.timeLine}</span>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <Tag className="w-4 h-4 text-slate-500" />
                      <span>Status:</span>
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-white shadow-sm">
                      {selectedDeal.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Copyright */}
          <footer className="pt-8 text-center text-xs text-slate-400">
            &copy; 2026 Copyright - Fablead Developers Technolab
          </footer>
        </div>
      </div>
    </div>
  );
}

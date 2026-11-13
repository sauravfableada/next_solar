"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import {
  Search,
  Plus,
  SlidersHorizontal,
  RotateCcw,
  Pencil,
  Eye,
  FileText,
  Download,
  CheckCircle,
  Clock,
  Trash2,
  MessageCircle,
  X,
} from "lucide-react";

interface InvoiceRecord {
  id: string;
  srNo: number;
  customerName: string;
  customerPhone: string;
  invoiceName: string;
  invoiceNo: string;
  invoiceDate: string;
  dueDate: string;
  status: "PENDING" | "PAID" | "PARTIAL";
}

const initialInvoices: InvoiceRecord[] = [
  {
    id: "inv-1",
    srNo: 1,
    customerName: "Test Customer",
    customerPhone: "9870543210",
    invoiceName: "#01INV-Test Customer",
    invoiceNo: "#INV-00001",
    invoiceDate: "06 Nov 2026",
    dueDate: "-",
    status: "PENDING",
  },
];

export default function AllInvoicesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [invoices, setInvoices] = useState<InvoiceRecord[]>(initialInvoices);

  // WhatsApp Share Modal state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedInvoiceForShare, setSelectedInvoiceForShare] = useState<InvoiceRecord | null>(null);
  const [recipientNumber, setRecipientNumber] = useState("");
  const [customMessage, setCustomMessage] = useState("");

  const handleOpenWhatsAppShare = (inv: InvoiceRecord) => {
    setSelectedInvoiceForShare(inv);
    setRecipientNumber(inv.customerPhone);
    setCustomMessage(
      `Dear ${inv.customerName.toLowerCase()},\n\nPlease find attached your invoice INV-00001 for INR 2.00.\n\nPlease review the invoice and let us know if you have any questions or would like to proceed.\n\nThank you,\nFablead Developer Technolab`
    );
    setIsShareModalOpen(true);
  };

  // Filters state
  const [filterInvoiceNo, setFilterInvoiceNo] = useState("");
  const [filterInvoiceType, setFilterInvoiceType] = useState("");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDueDate, setFilterDueDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const handleClearFilters = () => {
    setFilterInvoiceNo("");
    setFilterInvoiceType("");
    setFilterDateFrom("");
    setFilterDueDate("");
    setFilterStatus("");
    setSearchQuery("");
  };

  const filteredInvoices = invoices.filter((item) => {
    const matchesSearch =
      item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customerPhone.includes(searchQuery) ||
      item.invoiceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNo = !filterInvoiceNo || item.invoiceNo.includes(filterInvoiceNo);
    const matchesStatus = !filterStatus || item.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesNo && matchesStatus;
  });

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
          onSearch={(q) => setSearchQuery(q)}
        />

        <main className="p-6 md:p-8 space-y-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#1b2559] dark:text-white">
                Invoices
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Manage customer billing and payment records.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/invoices/create"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold transition-colors shadow-2xs"
              >
                <Plus className="w-4 h-4" />
                <span>Create Invoice</span>
              </Link>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111c44] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors shadow-2xs">
                <Download className="w-4 h-4 text-slate-500" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Top Summary Cards (Paid Amount & Pending Amount) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Paid Amount */}
            <div className="bg-white dark:bg-[#111c44] p-5 rounded-2xl border-l-4 border-l-emerald-500 border border-slate-100 dark:border-slate-800 shadow-2xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Paid Amount</p>
                <p className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white mt-1">
                  ₹0.00
                </p>
                <p className="text-[11px] text-slate-400 mt-1">Actual receipts and recorded settlements</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>

            {/* Pending Amount */}
            <div className="bg-white dark:bg-[#111c44] p-5 rounded-2xl border-l-4 border-l-amber-500 border border-slate-100 dark:border-slate-800 shadow-2xs flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Pending Amount</p>
                <p className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white mt-1">
                  ₹2.00
                </p>
                <p className="text-[11px] text-slate-400 mt-1">Remaining invoice balances</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 -mt-2">
            Totals for all matching invoices, across every page.
          </p>

          {/* Search & Filters Card */}
          <div className="bg-white dark:bg-[#111c44] p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xs space-y-4">
            {/* Top row: search + filter toggle + show per page */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-xl">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search invoices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                />
              </div>

              <div className="flex items-center gap-3">
                <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                  <span>Filters</span>
                </button>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>Show per page:</span>
                  <select className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-xs font-medium text-slate-700 dark:text-slate-300">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Filter inputs row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Invoice No
                </label>
                <input
                  type="text"
                  placeholder="Search invoice no"
                  value={filterInvoiceNo}
                  onChange={(e) => setFilterInvoiceNo(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Invoice Type
                </label>
                <select
                  value={filterInvoiceType}
                  onChange={(e) => setFilterInvoiceType(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                >
                  <option value="">All invoice t...</option>
                  <option value="Tax Invoice">Tax Invoice</option>
                  <option value="Proforma">Proforma</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Invoice Date
                </label>
                <input
                  type="date"
                  value={filterDateFrom}
                  onChange={(e) => setFilterDateFrom(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={filterDueDate}
                  onChange={(e) => setFilterDueDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                >
                  <option value="">All status</option>
                  <option value="PENDING">PENDING</option>
                  <option value="PAID">PAID</option>
                  <option value="PARTIAL">PARTIAL</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleClearFilters}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>
            </div>
          </div>

          {/* Table Card */}
          <div className="bg-white dark:bg-[#111c44] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/70 dark:bg-[#0b1437]/50 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4 w-14">SR.NO</th>
                    <th className="py-3.5 px-4">CUSTOMER NAME</th>
                    <th className="py-3.5 px-4">INVOICE NAME</th>
                    <th className="py-3.5 px-4">INV. NO. / TYPE</th>
                    <th className="py-3.5 px-4">INVOICE DATE</th>
                    <th className="py-3.5 px-4">DUE DATE</th>
                    <th className="py-3.5 px-4 text-center">STATUS</th>
                    <th className="py-3.5 px-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredInvoices.length > 0 ? (
                    filteredInvoices.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="py-4 px-4 text-slate-500 font-medium">
                          {item.srNo}
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-bold text-slate-800 dark:text-white">
                            {item.customerName}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                              {item.customerPhone}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleOpenWhatsAppShare(item)}
                              className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-300 dark:bg-emerald-950/40 dark:border-emerald-700 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
                              title="Share invoice on WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5 fill-current" />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-slate-700 dark:text-slate-200 font-semibold">
                          {item.invoiceName}
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-blue-600 dark:text-blue-400 font-bold">
                            {item.invoiceNo}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-slate-500">
                          {item.invoiceDate}
                        </td>
                        <td className="py-4 px-4 text-slate-500">
                          {item.dueDate}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800">
                            {item.status} ▾
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="inline-flex items-center gap-1">
                            <Link
                              href={`/invoices/${item.id}`}
                              className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <Link
                              href={`/invoices/edit/${item.id}`}
                              className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4" />
                            </Link>
                            <Link
                              href={`/invoices/${item.id}`}
                              className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                              title="PDF Invoice"
                            >
                              <FileText className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => {
                                if (confirm("Are you sure you want to delete this invoice?")) {
                                  setInvoices(invoices.filter((inv) => inv.id !== item.id));
                                }
                              }}
                              className="p-1.5 text-rose-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center py-12 text-slate-400">
                        No invoices found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination / Results count footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <span>Showing 1 to {filteredInvoices.length} of {filteredInvoices.length} results</span>
              <div className="flex items-center gap-1">
                <button
                  disabled
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 text-xs font-semibold cursor-not-allowed"
                >
                  Previous
                </button>
                <button className="w-8 h-8 rounded-lg bg-[#001738] text-white text-xs font-bold flex items-center justify-center">
                  1
                </button>
                <button
                  disabled
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 text-xs font-semibold cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Share Invoice on WhatsApp Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111c44] rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden border border-slate-100 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-emerald-600">
                <MessageCircle className="w-5 h-5 fill-current" />
                <h3 className="text-base font-bold text-slate-800 dark:text-white">
                  Share invoice
                </h3>
              </div>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437]/40 space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  RECIPIENT
                </p>
                <p className="text-sm font-bold text-slate-800 dark:text-white">
                  {selectedInvoiceForShare?.customerName.toLowerCase()}
                </p>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    WhatsApp number (include country code)
                  </label>
                  <input
                    type="text"
                    value={recipientNumber}
                    onChange={(e) => setRecipientNumber(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#111c44] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  MESSAGE PREVIEW
                </p>
                <div className="border border-emerald-500/70 rounded-xl p-3 bg-white dark:bg-[#0b1437]">
                  <textarea
                    rows={6}
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="w-full text-xs text-slate-700 dark:text-slate-200 focus:outline-none resize-none leading-relaxed"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/40">
              <button
                type="button"
                onClick={() => setIsShareModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  window.open(
                    `https://wa.me/${recipientNumber}?text=${encodeURIComponent(customMessage)}`,
                    "_blank"
                  );
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#075e54] hover:bg-[#128c7e] text-white text-xs font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Open WhatsApp Web</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


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
  Upload,
  Eye,
  FileText,
  Trash2,
  X,
  MessageCircle,
  Download,
  FolderOpen,
} from "lucide-react";

interface EstimateRecord {
  id: string;
  srNo: number;
  customerName: string;
  customerPhone: string;
  estimateName: string;
  estimateNo: string;
  estimateType: string;
  estimateDate: string;
  amount: number;
  status: "Pending" | "Approved" | "Rejected";
}

const initialEstimates: EstimateRecord[] = [
  {
    id: "est-1",
    srNo: 1,
    customerName: "Test Customer",
    customerPhone: "9870543210",
    estimateName: "#01EST-Test Customer",
    estimateNo: "#EST-000001",
    estimateType: "Residential",
    estimateDate: "06 Nov 2026",
    amount: 1,
    status: "Pending",
  },
];

interface ExtraDocItem {
  id: number;
  name: string;
}

export default function AllEstimatesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [estimates, setEstimates] = useState<EstimateRecord[]>(initialEstimates);

  // Status dropdown menu state
  const [openStatusMenuId, setOpenStatusMenuId] = useState<string | null>(null);

  // WhatsApp Share Modal state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedEstimateForShare, setSelectedEstimateForShare] = useState<EstimateRecord | null>(null);
  const [recipientNumber, setRecipientNumber] = useState("");
  const [customMessage, setCustomMessage] = useState("");

  // Customer Documents Upload Modal state
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [selectedEstimateForDoc, setSelectedEstimateForDoc] = useState<EstimateRecord | null>(null);
  const [extraDocs, setExtraDocs] = useState<ExtraDocItem[]>([]);

  // Filters state
  const [filterEstimateNo, setFilterEstimateNo] = useState("");
  const [filterEstimateType, setFilterEstimateType] = useState("");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const handleClearFilters = () => {
    setFilterEstimateNo("");
    setFilterEstimateType("");
    setFilterDateFrom("");
    setFilterStatus("");
    setSearchQuery("");
  };

  const handleDeleteEstimate = (id: string) => {
    if (confirm("Are you sure you want to delete this estimate?")) {
      setEstimates((prev) => prev.filter((est) => est.id !== id));
    }
  };

  const handleStatusChange = (id: string, newStatus: "Pending" | "Approved" | "Rejected") => {
    setEstimates((prev) =>
      prev.map((est) => (est.id === id ? { ...est, status: newStatus } : est))
    );
    setOpenStatusMenuId(null);
  };

  // Open WhatsApp Share Modal
  const handleOpenWhatsAppShare = (est: EstimateRecord) => {
    setSelectedEstimateForShare(est);
    setRecipientNumber(est.customerPhone);
    setCustomMessage(
      `Dear ${est.customerName.toLowerCase()},\n\nPlease find attached your quotation 000001 for INR ${est.amount}.\n\nPlease review the quotation and let us know if you have any questions or would like to proceed.\n\nThank you,\nFablead Developer Technolab`
    );
    setIsShareModalOpen(true);
  };

  // Open Document Upload Modal
  const handleOpenDocModal = (est: EstimateRecord) => {
    setSelectedEstimateForDoc(est);
    setIsDocModalOpen(true);
  };

  const handleAddExtraDoc = () => {
    setExtraDocs([...extraDocs, { id: Date.now(), name: "" }]);
  };

  const handleRemoveExtraDoc = (id: number) => {
    setExtraDocs(extraDocs.filter((d) => d.id !== id));
  };

  const filteredEstimates = estimates.filter((item) => {
    const matchesSearch =
      item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customerPhone.includes(searchQuery) ||
      item.estimateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.estimateNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNo = !filterEstimateNo || item.estimateNo.toLowerCase().includes(filterEstimateNo.toLowerCase());
    const matchesStatus = !filterStatus || item.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesNo && matchesStatus;
  });

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
          onSearch={(q) => setSearchQuery(q)}
        />

        <main className="p-6 md:p-8 space-y-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#1b2559] dark:text-white">
                Manage Estimates
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Track all estimate quotations and proposals.
              </p>
            </div>
            <Link
              href="/estimates/create"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold transition-colors shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Estimate</span>
            </Link>
          </div>

          {/* Search & Filters Card */}
          <div className="bg-white dark:bg-[#111c44] p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xs space-y-4">
            {/* Top row: search + filter toggle + show per page */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-xl">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search estimates..."
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Estimate No
                </label>
                <input
                  type="text"
                  placeholder="Search estimate no"
                  value={filterEstimateNo}
                  onChange={(e) => setFilterEstimateNo(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Estimate Type
                </label>
                <select
                  value={filterEstimateType}
                  onChange={(e) => setFilterEstimateType(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                >
                  <option value="">All estimate type</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Estimate Date
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
                  Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                >
                  <option value="">All status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
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
          <div className="bg-white dark:bg-[#111c44] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-visible">
            <div className="overflow-x-auto overflow-y-visible">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/70 dark:bg-[#0b1437]/50 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4 w-14">SR.NO</th>
                    <th className="py-3.5 px-4">CUSTOMER NAME</th>
                    <th className="py-3.5 px-4">ESTIMATE NAME</th>
                    <th className="py-3.5 px-4">EST. NO. / TYPE</th>
                    <th className="py-3.5 px-4">ESTIMATE DATE</th>
                    <th className="py-3.5 px-4 text-center">STATUS</th>
                    <th className="py-3.5 px-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredEstimates.length > 0 ? (
                    filteredEstimates.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="py-4 px-4 text-slate-500 font-medium">
                          {item.srNo}
                        </td>

                        {/* Customer Name + WhatsApp Button */}
                        <td className="py-4 px-4">
                          <p className="font-bold text-slate-800 dark:text-white">
                            {item.customerName}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[11px] text-blue-600 dark:text-blue-400">
                              {item.customerPhone}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleOpenWhatsAppShare(item)}
                              className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-300 dark:bg-emerald-950/40 dark:border-emerald-700 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
                              title="Share quotation on WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5 fill-current" />
                            </button>
                          </div>
                        </td>

                        <td className="py-4 px-4 text-slate-600 dark:text-slate-300 font-semibold">
                          {item.estimateName}
                        </td>

                        {/* EST. NO / TYPE */}
                        <td className="py-4 px-4">
                          <p className="font-semibold text-slate-800 dark:text-white">
                            {item.estimateNo}
                          </p>
                          <span className="inline-block px-2 py-0.5 mt-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
                            {item.estimateType}
                          </span>
                        </td>

                        <td className="py-4 px-4 text-slate-500">
                          {item.estimateDate}
                        </td>

                        {/* Interactive Status Dropdown Menu (Screenshot 5) */}
                        <td className="py-4 px-4 text-center relative">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenStatusMenuId(
                                openStatusMenuId === item.id ? null : item.id
                              )
                            }
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${
                              item.status === "Approved"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : item.status === "Rejected"
                                ? "bg-rose-50 text-rose-700 border-rose-200"
                                : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800"
                            }`}
                          >
                            <span>{item.status}</span>
                            <span className="text-[10px]">▾</span>
                          </button>

                          {/* Dropdown Menu */}
                          {openStatusMenuId === item.id && (
                            <div className="absolute z-30 left-1/2 -translate-x-1/2 mt-1 w-36 bg-white dark:bg-[#111c44] rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 p-1.5 text-left text-xs animate-in fade-in zoom-in-95 duration-150">
                              <p className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                Change Status
                              </p>
                              <button
                                type="button"
                                onClick={() => handleStatusChange(item.id, "Pending")}
                                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold ${
                                  item.status === "Pending"
                                    ? "bg-[#001738] text-white"
                                    : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                                }`}
                              >
                                Pending
                              </button>
                              <button
                                type="button"
                                onClick={() => handleStatusChange(item.id, "Approved")}
                                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold ${
                                  item.status === "Approved"
                                    ? "bg-[#001738] text-white"
                                    : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                                }`}
                              >
                                Approved
                              </button>
                              <button
                                type="button"
                                onClick={() => handleStatusChange(item.id, "Rejected")}
                                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold ${
                                  item.status === "Rejected"
                                    ? "bg-[#001738] text-white"
                                    : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                                }`}
                              >
                                Rejected
                              </button>
                            </div>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 text-right">
                          <div className="inline-flex items-center gap-1">
                            <Link
                              href={`/estimates/edit/${item.id}`}
                              className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4" />
                            </Link>
                            {/* Upload / Customer Documents Modal Trigger (Screenshot 6) */}
                            <button
                              type="button"
                              onClick={() => handleOpenDocModal(item)}
                              className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                              title="Upload Customer Documents"
                            >
                              <Upload className="w-4 h-4" />
                            </button>
                            <Link
                              href={`/estimates/${item.id}`}
                              className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <Link
                              href={`/estimates/${item.id}`}
                              className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                              title="PDF Proposal"
                            >
                              <FileText className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDeleteEstimate(item.id)}
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
                      <td colSpan={7} className="text-center py-12 text-slate-400">
                        No estimates found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <span>Showing 1 to {filteredEstimates.length} of {filteredEstimates.length} results</span>
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

      {/* MODAL 1: Share Quotation on WhatsApp (Screenshots 2, 3, 4) */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111c44] rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden border border-slate-100 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-emerald-600">
                <MessageCircle className="w-5 h-5 fill-current" />
                <h3 className="text-base font-bold text-slate-800 dark:text-white">
                  Share quotation
                </h3>
              </div>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* Recipient Box */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437]/40 space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  RECIPIENT
                </p>
                <p className="text-sm font-bold text-slate-800 dark:text-white">
                  {selectedEstimateForShare?.customerName.toLowerCase()}
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

              {/* Message Preview Box */}
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  MESSAGE PREVIEW
                </p>
                <div className="relative border border-emerald-500/70 rounded-xl p-3 bg-white dark:bg-[#0b1437]">
                  <textarea
                    rows={6}
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="w-full text-xs text-slate-700 dark:text-slate-200 focus:outline-none resize-none leading-relaxed"
                  />
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
                  <span>Make it personal. You can edit the message above.</span>
                  <span>{customMessage.length} / 4000</span>
                </div>
              </div>

              {/* Attached PDF Box (Screenshot 4) */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-[#0b1437]/40">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-white">
                      000001.pdf
                    </p>
                    <p className="text-[11px] text-slate-400">PDF ready to share</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50"
                >
                  Download PDF
                </button>
              </div>

              {/* Helper notice */}
              <div className="p-3 rounded-xl bg-emerald-50/60 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-300 text-xs leading-relaxed border border-emerald-100 dark:border-emerald-900/40">
                Use &ldquo;Share PDF&rdquo; and choose WhatsApp to share the file and message. For WhatsApp Web, download the PDF, open the chat, and attach the file before sending.
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-[#0b1437]/20">
              <button
                type="button"
                onClick={() => setIsShareModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => alert("Sharing PDF...")}
                className="px-4 py-2 rounded-xl border border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-xs font-semibold"
              >
                Share PDF
              </button>
              <button
                type="button"
                onClick={() => {
                  window.open(
                    `https://wa.me/${recipientNumber}?text=${encodeURIComponent(customMessage)}`,
                    "_blank"
                  );
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#075e54] hover:bg-[#128c7e] text-white text-xs font-semibold shadow-2xs"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Open WhatsApp Web</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Customer Documents Checklist (Screenshots 6, 7, 8) */}
      {isDocModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111c44] rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border border-slate-100 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="bg-[#001738] text-white px-6 py-4 flex items-center justify-between shrink-0">
              <h3 className="text-sm font-bold tracking-wide">Customer Documents</h3>
              <button
                onClick={() => setIsDocModalOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              {/* Checklist Notice Box */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437]/40 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <FolderOpen className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">
                    Customer document checklist
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                    Upload available documents now; you can add the rest later. Select multiple files in each field. PDF, Office documents and images · Up to 10 MB per file.
                  </p>
                </div>
              </div>

              {/* Standard 5 Document Slots */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Aadhar card */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Aadhar card
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Required
                    </span>
                  </div>
                  <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-lg p-1">
                    <label className="px-2.5 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded font-semibold cursor-pointer">
                      Choose Files
                      <input type="file" multiple className="hidden" />
                    </label>
                    <span className="text-xs text-slate-400">No file chosen</span>
                  </div>
                  <p className="text-[10px] text-slate-400">No files selected</p>
                </div>

                {/* 2. PAN card */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      PAN card
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Required
                    </span>
                  </div>
                  <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-lg p-1">
                    <label className="px-2.5 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded font-semibold cursor-pointer">
                      Choose Files
                      <input type="file" multiple className="hidden" />
                    </label>
                    <span className="text-xs text-slate-400">No file chosen</span>
                  </div>
                  <p className="text-[10px] text-slate-400">No files selected</p>
                </div>

                {/* 3. Electricity bill */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Electricity bill
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Required
                    </span>
                  </div>
                  <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-lg p-1">
                    <label className="px-2.5 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded font-semibold cursor-pointer">
                      Choose Files
                      <input type="file" multiple className="hidden" />
                    </label>
                    <span className="text-xs text-slate-400">No file chosen</span>
                  </div>
                  <p className="text-[10px] text-slate-400">No files selected</p>
                </div>

                {/* 4. Bank passbook / cancelled cheque */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Bank passbook / cancelled cheque
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Required
                    </span>
                  </div>
                  <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-lg p-1">
                    <label className="px-2.5 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded font-semibold cursor-pointer">
                      Choose Files
                      <input type="file" multiple className="hidden" />
                    </label>
                    <span className="text-xs text-slate-400">No file chosen</span>
                  </div>
                  <p className="text-[10px] text-slate-400">No files selected</p>
                </div>

                {/* 5. Rooftop images */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Rooftop images
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Required
                    </span>
                  </div>
                  <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-lg p-1">
                    <label className="px-2.5 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded font-semibold cursor-pointer">
                      Choose Files
                      <input type="file" multiple className="hidden" />
                    </label>
                    <span className="text-xs text-slate-400">No file chosen</span>
                  </div>
                  <p className="text-[10px] text-slate-400">No files selected</p>
                </div>
              </div>

              {/* Extra Documents Section (Screenshots 7, 8) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white">
                      Extra documents
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Add a name and attach any supporting files.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddExtraDoc}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add more</span>
                  </button>
                </div>

                {/* Extra Doc dynamic cards */}
                {extraDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-xl border border-blue-400 dark:border-blue-600 bg-blue-50/20 dark:bg-[#0b1437] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Document name
                      </label>
                      <button
                        type="button"
                        onClick={() => handleRemoveExtraDoc(doc.id)}
                        className="text-rose-500 hover:text-rose-700 p-1"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Property ownership proof"
                      className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#111c44] border border-blue-300 dark:border-blue-700 rounded-lg focus:outline-none"
                    />

                    <div>
                      <p className="text-[11px] font-medium text-slate-500 mb-1">Attach files</p>
                      <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-lg p-1 bg-white dark:bg-[#111c44]">
                        <label className="px-2.5 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded font-semibold cursor-pointer">
                          Choose Files
                          <input type="file" multiple className="hidden" />
                        </label>
                        <span className="text-xs text-slate-400">No file chosen</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">No files selected</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Uploaded Documents */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-800 dark:text-white mb-1">
                  Uploaded documents
                </h4>
                <p className="text-xs text-slate-400">No customer documents uploaded yet.</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-[#0b1437]/20 shrink-0">
              <button
                type="button"
                onClick={() => setIsDocModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  alert("Customer documents uploaded successfully!");
                  setIsDocModalOpen(false);
                }}
                className="px-5 py-2 rounded-xl bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold transition-colors"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

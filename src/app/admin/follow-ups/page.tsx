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
  AlertCircle,
  X,
  Target,
} from "lucide-react";

interface FollowUp {
  id: number;
  purpose: string;
  leadName: string;
  phone: string;
  staffName: string;
  createdAt: string;
  followUpDate: string;
  priority: "Low" | "Medium" | "High";
  status: "Completed" | "Pending" | "Cancelled";
  comment?: string;
  lastUpdate?: string;
}

export default function FollowUpsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { isDarkMode } = useTheme();

  // View modes: "list" | "create" | "detail"
  const [viewMode, setViewMode] = useState<"list" | "create" | "detail">("list");
  const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUp | null>(null);

  // Filter drawer toggle
  const [showFilters, setShowFilters] = useState(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCreator, setFilterCreator] = useState("All creators");
  const [filterCreatedAt, setFilterCreatedAt] = useState("");
  const [filterFollowUpDate, setFilterFollowUpDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("All statuses");

  // Add New Lead Modal state (Screenshot 3)
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [modalLeadName, setModalLeadName] = useState("");
  const [modalPhone, setModalPhone] = useState("");
  const [modalAddress, setModalAddress] = useState("");
  const [showModalAddress, setShowModalAddress] = useState(false);

  // Follow Ups Dataset matching Screenshot 1
  const [followUps, setFollowUps] = useState<FollowUp[]>([
    {
      id: 1,
      purpose: "Purpose",
      leadName: "Test Lead",
      phone: "7894561995",
      staffName: "Solar CRM",
      createdAt: "29 Oct 2026 02:55 PM",
      followUpDate: "29 Oct 2026 02:55 PM",
      priority: "Medium",
      status: "Completed",
      comment: "Discuss rooftop solar feasibility and panel requirements.",
      lastUpdate: "06 Nov, 2026 04:21 PM",
    },
  ]);

  // Lead options for selection
  const [availableLeads, setAvailableLeads] = useState<string[]>([
    "Test Lead",
    "Test Customer",
    "Apex Solar Solutions",
  ]);

  // Schedule Follow Up Form State (Screenshot 2)
  const [formData, setFormData] = useState({
    leadName: "Test Lead",
    assignedTo: "Solar CRM",
    purpose: "",
    followUpDate: "",
    priority: "Medium" as "Low" | "Medium" | "High",
    status: "Pending" as "Completed" | "Pending" | "Cancelled",
    comment: "",
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.leadName || !formData.purpose) {
      showToast("Please enter lead name and purpose!");
      return;
    }

    const newItem: FollowUp = {
      id: followUps.length + 1,
      purpose: formData.purpose,
      leadName: formData.leadName,
      phone: "7894561995",
      staffName: formData.assignedTo || "Solar CRM",
      createdAt: "12 Nov 2026 05:51 PM",
      followUpDate: formData.followUpDate || "13 Nov 2026 10:00 AM",
      priority: formData.priority,
      status: formData.status,
      comment: formData.comment,
      lastUpdate: "12 Nov, 2026 05:51 PM",
    };

    setFollowUps([newItem, ...followUps]);
    showToast("Follow Up scheduled successfully!");
    setViewMode("list");
    setFormData({
      leadName: "Test Lead",
      assignedTo: "Solar CRM",
      purpose: "",
      followUpDate: "",
      priority: "Medium",
      status: "Pending",
      comment: "",
    });
  };

  const handleSaveModalLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalLeadName.trim() || !modalPhone.trim()) {
      showToast("Please enter Lead Name and Phone!");
      return;
    }
    setAvailableLeads([...availableLeads, modalLeadName]);
    setFormData({ ...formData, leadName: modalLeadName });
    setShowNewLeadModal(false);
    setModalLeadName("");
    setModalPhone("");
    setModalAddress("");
    showToast(`Lead "${modalLeadName}" added and selected!`);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setFilterCreator("All creators");
    setFilterCreatedAt("");
    setFilterFollowUpDate("");
    setFilterStatus("All statuses");
  };

  const filteredFollowUps = followUps.filter((item) => {
    if (searchQuery && !item.leadName.toLowerCase().includes(searchQuery.toLowerCase()) && !item.purpose.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filterStatus !== "All statuses" && item.status !== filterStatus) {
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

      {/* Quick Add New Lead Modal (Screenshot 3) */}
      {showNewLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white dark:bg-[#101b33] border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md p-6 md:p-8 shadow-2xl space-y-6 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Add New Lead
              </h3>
              <button
                onClick={() => setShowNewLeadModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModalLead} className="space-y-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Lead Name</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Lead Name"
                  value={modalLeadName}
                  onChange={(e) => setModalLeadName(e.target.value)}
                  required
                  className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Phone</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Phone"
                  value={modalPhone}
                  onChange={(e) => setModalPhone(e.target.value)}
                  required
                  className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                />
              </div>

              {!showModalAddress ? (
                <button
                  type="button"
                  onClick={() => setShowModalAddress(true)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 block cursor-pointer"
                >
                  + Add Address (Optional)
                </button>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Address
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Lead Address"
                    value={modalAddress}
                    onChange={(e) => setModalAddress(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewLeadModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LEFT SIDEBAR */}
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeItem="Sales CRM"
        activeSubItem="Manage Follow up"
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
              VIEW 1: MANAGE FOLLOW UPS (Screenshot 1)
             ========================================================================= */}
          {viewMode === "list" && (
            <div className="space-y-6">
              {/* Header Title + Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold tracking-tight">Manage Follow Ups</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Track and manage your follow up tasks.
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
                    <span>Add Follow Up</span>
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
                        placeholder="Search follow ups..."
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

                {/* Filters Row */}
                {showFilters && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2 pb-3 border-t border-b border-slate-100 dark:border-slate-800/80 items-end">
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
                        <option>Admin</option>
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

                    {/* Follow Up Date */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                        Follow Up Date
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="From - To"
                          value={filterFollowUpDate}
                          onChange={(e) => setFilterFollowUpDate(e.target.value)}
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
                        <option>All statuses</option>
                        <option>Completed</option>
                        <option>Pending</option>
                        <option>Cancelled</option>
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

                {/* Follow Ups Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <th className="py-3 px-3">SR.NO</th>
                        <th className="py-3 px-3">PURPOSE & TARGET</th>
                        <th className="py-3 px-3">STAFF NAME</th>
                        <th className="py-3 px-3">CREATED AT</th>
                        <th className="py-3 px-3">FOLLOW UP DATE</th>
                        <th className="py-3 px-3">STATUS</th>
                        <th className="py-3 px-3 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      {filteredFollowUps.map((item, index) => (
                        <tr
                          key={item.id}
                          className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition"
                        >
                          <td className="py-4 px-3 font-medium text-slate-500">{index + 1}</td>
                          <td className="py-4 px-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#0f172a] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                                {item.leadName.charAt(0)}
                              </div>
                              <div>
                                <span className="font-bold text-slate-800 dark:text-slate-100 block">
                                  {item.purpose}
                                </span>
                                <span className="text-[11px] text-slate-500 block">
                                  {item.leadName}
                                </span>
                                <span className="text-[11px] font-semibold text-blue-600 block">
                                  {item.phone}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-3 font-semibold text-slate-700 dark:text-slate-200">
                            {item.staffName}
                          </td>
                          <td className="py-4 px-3 text-slate-500">
                            {item.createdAt}
                          </td>
                          <td className="py-4 px-3 text-slate-500">
                            {item.followUpDate}
                          </td>
                          <td className="py-4 px-3">
                            <div className="inline-flex items-center justify-between gap-2 px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[11px] font-medium min-w-[100px]">
                              <span>{item.status}</span>
                              <ChevronDown className="w-3 h-3 text-emerald-600" />
                            </div>
                          </td>
                          <td className="py-4 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => {
                                  setSelectedFollowUp(item);
                                  setViewMode("detail");
                                }}
                                title="View Details"
                                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  setFormData({
                                    leadName: item.leadName,
                                    assignedTo: item.staffName,
                                    purpose: item.purpose,
                                    followUpDate: item.followUpDate,
                                    priority: item.priority,
                                    status: item.status,
                                    comment: item.comment || "",
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
                                  setFollowUps(followUps.filter((f) => f.id !== item.id));
                                  showToast("Follow Up deleted!");
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
                  <span>Showing 1 to {filteredFollowUps.length} of {filteredFollowUps.length} entries</span>
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
              VIEW 2: SCHEDULE FOLLOW UP (Screenshot 2)
             ========================================================================= */}
          {viewMode === "create" && (
            <div className="space-y-6">
              {/* Header Title + Back */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold tracking-tight">Schedule Follow Up</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Create a new follow up record for a lead or customer.
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
                onSubmit={handleCreateFollowUp}
                className={`rounded-2xl border p-6 md:p-8 space-y-6 shadow-sm transition-colors ${
                  isDarkMode ? "bg-[#101b33] border-slate-800" : "bg-white border-slate-200/80"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Lead Name * with Quick Add Button */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Lead Name</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <select
                        value={formData.leadName}
                        onChange={(e) => setFormData({ ...formData, leadName: e.target.value })}
                        required
                        className="flex-1 h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                      >
                        {availableLeads.map((ld) => (
                          <option key={ld} value={ld}>
                            {ld}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => setShowNewLeadModal(true)}
                        title="Add New Lead"
                        className="w-11 h-11 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white flex items-center justify-center font-bold text-base cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Assigned To * */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Assigned To</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.assignedTo}
                      onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                      required
                      className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Purpose * */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <Tag className="w-3.5 h-3.5 text-slate-400" />
                      <span>Purpose</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter purpose of follow up"
                      value={formData.purpose}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                      required
                      className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Follow Up Date * */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Follow Up Date</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.followUpDate}
                      onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                      required
                      className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Priority * */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                      <span>Priority</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                      className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>

                  {/* Status * */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>Status</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Comment
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Enter any comments or notes"
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                  />
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
              VIEW 3: FOLLOW UP DETAILS (Screenshot 4)
             ========================================================================= */}
          {viewMode === "detail" && selectedFollowUp && (
            <div className="space-y-6">
              {/* Header Title + Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold tracking-tight">Follow Up Details</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Complete information about this scheduled follow up.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setFormData({
                        leadName: selectedFollowUp.leadName,
                        assignedTo: selectedFollowUp.staffName,
                        purpose: selectedFollowUp.purpose,
                        followUpDate: selectedFollowUp.followUpDate,
                        priority: selectedFollowUp.priority,
                        status: selectedFollowUp.status,
                        comment: selectedFollowUp.comment || "",
                      });
                      setViewMode("create");
                    }}
                    className="px-4 py-2 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
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

              {/* Details Card */}
              <div
                className={`rounded-2xl border p-6 md:p-8 space-y-6 shadow-sm transition-colors ${
                  isDarkMode ? "bg-[#101b33] border-slate-800" : "bg-white border-slate-200/80"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                  {/* Purpose */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <Target className="w-4 h-4 text-slate-500" />
                      <span>Purpose:</span>
                    </span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {selectedFollowUp.purpose}
                    </span>
                  </div>

                  {/* Lead/Customer */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <User className="w-4 h-4 text-slate-500" />
                      <span>Lead/Customer:</span>
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-300">
                      {selectedFollowUp.leadName.toLowerCase()}
                    </span>
                  </div>

                  {/* Assigned Staff */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <User className="w-4 h-4 text-slate-500" />
                      <span>Assigned Staff:</span>
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-300">
                      {selectedFollowUp.staffName}
                    </span>
                  </div>

                  {/* Priority */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <AlertCircle className="w-4 h-4 text-slate-500" />
                      <span>Priority:</span>
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-600 text-white shadow-sm">
                      {selectedFollowUp.priority}
                    </span>
                  </div>

                  {/* Follow Up At */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span>Follow Up At:</span>
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      {selectedFollowUp.followUpDate}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-slate-500" />
                      <span>Status:</span>
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-600 text-white shadow-sm">
                      {selectedFollowUp.status}
                    </span>
                  </div>

                  {/* Created By */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <User className="w-4 h-4 text-slate-500" />
                      <span>Created By:</span>
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      {selectedFollowUp.staffName} | {selectedFollowUp.createdAt.split(" ")[0]}
                    </span>
                  </div>

                  {/* Last Update */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <History className="w-4 h-4 text-slate-500" />
                      <span>Last Update:</span>
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      {selectedFollowUp.lastUpdate || "06 Nov, 2026 04:21 PM"}
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

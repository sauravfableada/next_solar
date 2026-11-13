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
  LogOut,
  ArrowLeft,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Building,
  Tag,
  Clock,
  Sparkles,
  FileText,
  Layers,
} from "lucide-react";

interface Lead {
  id: number;
  name: string;
  isConverted: boolean;
  phone: string;
  email: string;
  whatsapp: string;
  createdBy: string;
  createdAt: string;
  status: string;
  leadSource: string;
  companyName: string;
  sicCode: string;
  address: string;
  comments: string;
  assignedTo: string;
  leadStage: string;
}

export default function LeadsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { isDarkMode } = useTheme();

  // View modes: "list" | "create" | "detail"
  const [viewMode, setViewMode] = useState<"list" | "create" | "detail">("list");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Filter drawer/panel toggle
  const [showFilters, setShowFilters] = useState(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("All statuses");
  const [filterSource, setFilterSource] = useState("All sources");
  const [filterCreator, setFilterCreator] = useState("All creators");

  // Leads dataset
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 1,
      name: "Test Lead",
      isConverted: true,
      phone: "7894561995",
      email: "--",
      whatsapp: "7894561995",
      createdBy: "Solar CRM",
      createdAt: "29 Oct 2026, 14:54",
      status: "New",
      leadSource: "--",
      companyName: "--",
      sicCode: "",
      address: "--",
      comments: "",
      assignedTo: "Solar CRM",
      leadStage: "--",
    },
  ]);

  // Add Lead Form State
  const [formData, setFormData] = useState({
    name: "",
    assignedTo: "Solar CRM",
    email: "",
    phone: "",
    whatsapp: "",
    profileImage: "",
    companyName: "",
    sicCode: "",
    leadSource: "",
    leadStatus: "New",
    address: "",
    comments: "",
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyPhone = () => {
    if (formData.phone) {
      setFormData({ ...formData, whatsapp: formData.phone });
      showToast("Phone number copied to WhatsApp!");
    } else {
      showToast("Please enter phone number first!");
    }
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      showToast("Please fill in required fields (Name and Phone)!");
      return;
    }

    const newLeadItem: Lead = {
      id: leads.length + 1,
      name: formData.name,
      isConverted: false,
      phone: formData.phone,
      email: formData.email || "--",
      whatsapp: formData.whatsapp || formData.phone,
      createdBy: "Solar CRM",
      createdAt: "12 Nov 2026, 17:40",
      status: formData.leadStatus || "New",
      leadSource: formData.leadSource || "--",
      companyName: formData.companyName || "--",
      sicCode: formData.sicCode || "",
      address: formData.address || "--",
      comments: formData.comments || "",
      assignedTo: formData.assignedTo || "Solar CRM",
      leadStage: "--",
    };

    setLeads([newLeadItem, ...leads]);
    showToast("Lead created successfully!");
    setViewMode("list");
    setFormData({
      name: "",
      assignedTo: "Solar CRM",
      email: "",
      phone: "",
      whatsapp: "",
      profileImage: "",
      companyName: "",
      sicCode: "",
      leadSource: "",
      leadStatus: "New",
      address: "",
      comments: "",
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setFilterDate("");
    setFilterStatus("All statuses");
    setFilterSource("All sources");
    setFilterCreator("All creators");
  };

  // Filtered leads
  const filteredLeads = leads.filter((item) => {
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) && !item.phone.includes(searchQuery)) {
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

      {/* LEFT SIDEBAR */}
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeItem="Sales CRM"
        activeSubItem="Manage Leads"
      />

      {/* MAIN CONTENT AREA */}
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
              VIEW 1: MANAGE LEADS (Screenshot 1)
             ========================================================================= */}
          {viewMode === "list" && (
            <div className="space-y-6">
              {/* Header Title + Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold tracking-tight">Manage Leads</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Track and manage your sales pipeline and enquiries.
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
                    <span>Add Lead</span>
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
                        placeholder="Search leads..."
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
                          value={filterDate}
                          onChange={(e) => setFilterDate(e.target.value)}
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
                        <option>New</option>
                        <option>In Progress</option>
                        <option>Converted</option>
                      </select>
                    </div>

                    {/* Lead Source */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                        Lead Source
                      </label>
                      <select
                        value={filterSource}
                        onChange={(e) => setFilterSource(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
                      >
                        <option>All sources</option>
                        <option>Website</option>
                        <option>Referral</option>
                        <option>Cold Call</option>
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
                        <option>Admin</option>
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

                {/* Leads Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <th className="py-3 px-3">SR.NO</th>
                        <th className="py-3 px-3">LEAD NAME</th>
                        <th className="py-3 px-3">PHONE NO.</th>
                        <th className="py-3 px-3">CREATED BY</th>
                        <th className="py-3 px-3">CREATED AT</th>
                        <th className="py-3 px-3">STATUS</th>
                        <th className="py-3 px-3 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      {filteredLeads.map((item, index) => (
                        <tr
                          key={item.id}
                          className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition"
                        >
                          <td className="py-4 px-3 font-medium text-slate-500">{index + 1}</td>
                          <td className="py-4 px-3">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-800 dark:text-slate-100">
                                {item.name}
                              </span>
                              {item.isConverted && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                                  <span>Converted</span>
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-3 font-semibold text-blue-600 dark:text-blue-400">
                            {item.phone}
                          </td>
                          <td className="py-4 px-3 text-slate-600 dark:text-slate-300">
                            {item.createdBy}
                          </td>
                          <td className="py-4 px-3 text-slate-500">
                            {item.createdAt}
                          </td>
                          <td className="py-4 px-3">
                            <div className="inline-flex items-center justify-between gap-2 px-3 py-1 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 text-[11px] font-medium min-w-[90px]">
                              <span>{item.status}</span>
                              <ChevronDown className="w-3 h-3 text-sky-500" />
                            </div>
                          </td>
                          <td className="py-4 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => {
                                  setSelectedLead(item);
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
                                    name: item.name,
                                    assignedTo: item.assignedTo,
                                    email: item.email === "--" ? "" : item.email,
                                    phone: item.phone,
                                    whatsapp: item.whatsapp,
                                    profileImage: "",
                                    companyName: item.companyName === "--" ? "" : item.companyName,
                                    sicCode: item.sicCode,
                                    leadSource: item.leadSource === "--" ? "" : item.leadSource,
                                    leadStatus: item.status,
                                    address: item.address === "--" ? "" : item.address,
                                    comments: item.comments,
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
                                  setLeads(leads.filter((l) => l.id !== item.id));
                                  showToast("Lead deleted!");
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

                {/* Table Footer Pagination */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
                  <span>Showing 1 to {filteredLeads.length} of {filteredLeads.length} results</span>
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
              VIEW 2: ADD LEAD (Screenshot 2)
             ========================================================================= */}
          {viewMode === "create" && (
            <div className="space-y-6">
              {/* Header Title + Back */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold tracking-tight">Add Lead</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Create a new lead entry.
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

              {/* Add Lead Form Card */}
              <form
                onSubmit={handleCreateLead}
                className={`rounded-2xl border p-6 md:p-8 space-y-6 shadow-sm transition-colors ${
                  isDarkMode ? "bg-[#101b33] border-slate-800" : "bg-white border-slate-200/80"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name * */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <Tag className="w-3.5 h-3.5 text-slate-500" />
                      <span>Name</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Lead Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Assigned To */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      <span>Assigned To</span>
                    </label>
                    <input
                      type="text"
                      value={formData.assignedTo}
                      onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Email */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      <span>Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Phone * */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      <span>Phone</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* WhatsApp + Copy Phone button */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <Phone className="w-3.5 h-3.5 text-emerald-500" />
                      <span>WhatsApp</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="WhatsApp Number"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="flex-1 h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={handleCopyPhone}
                        className="px-3.5 h-11 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300 text-xs font-semibold whitespace-nowrap cursor-pointer"
                      >
                        Copy Phone
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Profile Image */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      <span>Profile Image</span>
                    </label>
                    <label className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl px-3 h-11 bg-white dark:bg-slate-800 cursor-pointer">
                      <span className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold mr-3">
                        Choose File
                      </span>
                      <span className="text-xs text-slate-400">No file chosen</span>
                      <input type="file" className="hidden" />
                    </label>
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <Building className="w-3.5 h-3.5 text-slate-500" />
                      <span>Company Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* SIC Code */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <Tag className="w-3.5 h-3.5 text-slate-500" />
                      <span>SIC Code</span>
                    </label>
                    <input
                      type="text"
                      placeholder="SIC Code"
                      value={formData.sicCode}
                      onChange={(e) => setFormData({ ...formData, sicCode: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Lead Source */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      <span>Lead Source</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <select
                        value={formData.leadSource}
                        onChange={(e) => setFormData({ ...formData, leadSource: e.target.value })}
                        className="flex-1 h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
                      >
                        <option value="">Select Lead Source</option>
                        <option value="Website">Website</option>
                        <option value="Referral">Referral</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Cold Calling">Cold Calling</option>
                      </select>
                      <button
                        type="button"
                        className="w-11 h-11 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white flex items-center justify-center font-bold text-base cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Lead Status */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      <span>Lead Status</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <select
                        value={formData.leadStatus}
                        onChange={(e) => setFormData({ ...formData, leadStatus: e.target.value })}
                        className="flex-1 h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
                      >
                        <option value="New">New</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Follow-Up Scheduled">Follow-Up Scheduled</option>
                        <option value="Converted">Converted</option>
                      </select>
                      <button
                        type="button"
                        className="w-11 h-11 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white flex items-center justify-center font-bold text-base cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Address */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>Address</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Lead Address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      <span>Comment</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Comments"
                      value={formData.comments}
                      onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                      className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                    />
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
              VIEW 3: LEAD PROFILE / DETAIL (Screenshots 3 & 4)
             ========================================================================= */}
          {viewMode === "detail" && selectedLead && (
            <div className="space-y-6">
              {/* Header Title + Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold tracking-tight">Lead Profile</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {selectedLead.name.toLowerCase()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/admin/customers"
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>View Customer</span>
                  </Link>
                  <button
                    onClick={() => {
                      setFormData({
                        name: selectedLead.name,
                        assignedTo: selectedLead.assignedTo,
                        email: selectedLead.email === "--" ? "" : selectedLead.email,
                        phone: selectedLead.phone,
                        whatsapp: selectedLead.whatsapp,
                        profileImage: "",
                        companyName: selectedLead.companyName === "--" ? "" : selectedLead.companyName,
                        sicCode: selectedLead.sicCode,
                        leadSource: selectedLead.leadSource === "--" ? "" : selectedLead.leadSource,
                        leadStatus: selectedLead.status,
                        address: selectedLead.address === "--" ? "" : selectedLead.address,
                        comments: selectedLead.comments,
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

              {/* Lead Details Card */}
              <div
                className={`rounded-2xl border p-6 md:p-8 space-y-6 shadow-sm transition-colors ${
                  isDarkMode ? "bg-[#101b33] border-slate-800" : "bg-white border-slate-200/80"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-12">
                  {/* Email */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <Mail className="w-4 h-4 text-slate-500" />
                      <span>Email:</span>
                    </span>
                    <span className="text-xs text-slate-500">{selectedLead.email}</span>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <Phone className="w-4 h-4 text-slate-500" />
                      <span>Phone:</span>
                    </span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {selectedLead.phone}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <Tag className="w-4 h-4 text-slate-500" />
                      <span>Status:</span>
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-600 text-white shadow-sm">
                      {selectedLead.status}
                    </span>
                  </div>

                  {/* Lead Source */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <Globe className="w-4 h-4 text-slate-500" />
                      <span>Lead Source:</span>
                    </span>
                    <span className="text-xs text-slate-500">{selectedLead.leadSource}</span>
                  </div>

                  {/* Lead Stage */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <Layers className="w-4 h-4 text-slate-500" />
                      <span>Lead Stage:</span>
                    </span>
                    <span className="text-xs text-slate-500">{selectedLead.leadStage}</span>
                  </div>

                  {/* Company */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <Building className="w-4 h-4 text-slate-500" />
                      <span>Company:</span>
                    </span>
                    <span className="text-xs text-slate-500">{selectedLead.companyName}</span>
                  </div>

                  {/* Created */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span>Created:</span>
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      {selectedLead.createdAt}
                    </span>
                  </div>

                  {/* Address */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <span>Address:</span>
                    </span>
                    <span className="text-xs text-slate-500">{selectedLead.address}</span>
                  </div>
                </div>
              </div>

              {/* Activity Timeline Section (Matching Screenshots 3 & 4) */}
              <div
                className={`rounded-2xl border p-6 md:p-8 space-y-6 shadow-sm transition-colors ${
                  isDarkMode ? "bg-[#101b33] border-slate-800" : "bg-white border-slate-200/80"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Activity Timeline
                  </h3>
                  <button
                    onClick={() => showToast("Activity modal opened!")}
                    className="px-4 py-2 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Activity</span>
                  </button>
                </div>

                <div className="space-y-6 pl-2 border-l-2 border-slate-200 dark:border-slate-800 ml-3">
                  {/* Activity Item 1: Lead Created */}
                  <div className="relative pl-6 space-y-1">
                    <div className="absolute -left-[31px] top-0 w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        Lead Created
                      </span>
                      <span className="text-[10px] text-slate-400">29 Oct, 2026 02:54 PM</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      System automatically initialized the lead profile.
                    </p>
                  </div>

                  {/* Activity Item 2: Follow-Up assigned */}
                  <div className="relative pl-6 space-y-2">
                    <div className="absolute -left-[31px] top-0 w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          Follow-Up{" "}
                        </span>
                        <span className="text-xs text-slate-500">assigned to Solar CRM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                          Pending
                        </span>
                        <button
                          onClick={() => showToast("Edit Follow-Up")}
                          className="p-1 text-slate-400 hover:text-slate-600"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => showToast("Deleted Follow-Up")}
                          className="p-1 text-slate-400 hover:text-red-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>12 Nov, 2026 05:39 PM</span>
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>Next: None scheduled</span>
                    </div>
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

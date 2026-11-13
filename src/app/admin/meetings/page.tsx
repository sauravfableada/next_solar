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
  Video,
  MapPin,
  FileText,
  X,
  Share2,
} from "lucide-react";

interface Meeting {
  id: number;
  customerName: string;
  phone: string;
  staffName: string;
  scheduledOn: string;
  meetingType: string;
  calenderStatus: "Not Synced" | "Synced";
  status: "Completed" | "Scheduled" | "Cancelled";
  agenda?: string;
  location?: string;
  meetingTitle?: string;
  createdBy?: string;
  lastUpdated?: string;
}

export default function MeetingsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { isDarkMode } = useTheme();

  // View modes: "list" | "create" | "detail"
  const [viewMode, setViewMode] = useState<"list" | "create" | "detail">("list");
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  // Filters toggle
  const [showFilters, setShowFilters] = useState(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCustomer, setFilterCustomer] = useState("All customers");
  const [filterCreator, setFilterCreator] = useState("All creators");
  const [filterScheduledOn, setFilterScheduledOn] = useState("");
  const [filterType, setFilterType] = useState("All types");
  const [filterStatus, setFilterStatus] = useState("All statuses");

  // Add New Customer Modal (Screenshot 3)
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);
  const [modalCustomerName, setModalCustomerName] = useState("");
  const [modalMobileNumber, setModalMobileNumber] = useState("");
  const [modalAddress, setModalAddress] = useState("");
  const [showModalAddress, setShowModalAddress] = useState(false);

  // Available customers list
  const [availableCustomers, setAvailableCustomers] = useState<string[]>([
    "Test Customer",
    "Test Lead",
    "Apex Solar Solutions",
  ]);

  // Meetings Dataset matching Screenshot 1
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: 1,
      customerName: "Test Customer",
      phone: "9870543210",
      staffName: "Unassigned",
      scheduledOn: "07 Nov 2026\n03:12 PM",
      meetingType: "--",
      calenderStatus: "Not Synced",
      status: "Completed",
      meetingTitle: "Solar Proposal Discussion",
      agenda: "Review site measurement details and present EPC proposal.",
      location: "--",
      createdBy: "Solar CRM | 06 Nov, 2026",
      lastUpdated: "Solar CRM | 06 Nov, 2026",
    },
  ]);

  // Form State for Add Meeting (Screenshot 2)
  const [formData, setFormData] = useState({
    assignedFor: "Test Customer",
    assignedTo: "Solar CRM",
    meetingTitle: "",
    status: "Scheduled" as "Completed" | "Scheduled" | "Cancelled",
    scheduledOn: "",
    meetingType: "",
    agenda: "",
    address: "",
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.meetingTitle || !formData.assignedFor) {
      showToast("Please enter customer name and meeting title!");
      return;
    }

    const newMeeting: Meeting = {
      id: meetings.length + 1,
      customerName: formData.assignedFor,
      phone: "9870543210",
      staffName: formData.assignedTo || "Unassigned",
      scheduledOn: formData.scheduledOn || "13 Nov 2026 11:00 AM",
      meetingType: formData.meetingType || "--",
      calenderStatus: "Not Synced",
      status: formData.status,
      meetingTitle: formData.meetingTitle,
      agenda: formData.agenda,
      location: formData.address || "--",
      createdBy: "Solar CRM | 12 Nov, 2026",
      lastUpdated: "Solar CRM | 12 Nov, 2026",
    };

    setMeetings([newMeeting, ...meetings]);
    showToast("Meeting scheduled successfully!");
    setViewMode("list");
    setFormData({
      assignedFor: "Test Customer",
      assignedTo: "Solar CRM",
      meetingTitle: "",
      status: "Scheduled",
      scheduledOn: "",
      meetingType: "",
      agenda: "",
      address: "",
    });
  };

  const handleSaveModalCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalCustomerName.trim() || !modalMobileNumber.trim()) {
      showToast("Please fill out Customer Name and Mobile Number!");
      return;
    }
    setAvailableCustomers([...availableCustomers, modalCustomerName]);
    setFormData({ ...formData, assignedFor: modalCustomerName });
    setShowNewCustomerModal(false);
    setModalCustomerName("");
    setModalMobileNumber("");
    setModalAddress("");
    showToast(`Customer "${modalCustomerName}" created and selected!`);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setFilterCustomer("All customers");
    setFilterCreator("All creators");
    setFilterScheduledOn("");
    setFilterType("All types");
    setFilterStatus("All statuses");
  };

  const filteredMeetings = meetings.filter((item) => {
    if (searchQuery && !item.customerName.toLowerCase().includes(searchQuery.toLowerCase())) {
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

      {/* Quick Add New Customer Modal (Screenshot 3) */}
      {showNewCustomerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white dark:bg-[#101b33] border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md p-6 md:p-8 shadow-2xl space-y-6 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Add New Customer
              </h3>
              <button
                onClick={() => setShowNewCustomerModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModalCustomer} className="space-y-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Customer Name</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Customer Name"
                  value={modalCustomerName}
                  onChange={(e) => setModalCustomerName(e.target.value)}
                  required
                  className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Mobile Number</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={modalMobileNumber}
                  onChange={(e) => setModalMobileNumber(e.target.value)}
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
                    placeholder="Customer Address"
                    value={modalAddress}
                    onChange={(e) => setModalAddress(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewCustomerModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Save Customer
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
        activeSubItem="Manage Meetings"
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
              VIEW 1: MANAGE MEETINGS (Screenshot 1)
             ========================================================================= */}
          {viewMode === "list" && (
            <div className="space-y-6">
              {/* Header Title + Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold tracking-tight">Manage Meetings</h1>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => showToast("Google Calendar integration initiated!")}
                    className="px-4 py-2.5 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center gap-2 hover:bg-blue-100/50 transition cursor-pointer"
                  >
                    <span className="font-bold">G</span>
                    <span>Connect Google Calendar</span>
                  </button>
                  <button className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-2 transition cursor-pointer">
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Export</span>
                  </button>
                  <button
                    onClick={() => setViewMode("create")}
                    className="px-5 py-2.5 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-md transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Meeting</span>
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
                        placeholder="Search meetings..."
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 pt-2 pb-3 border-t border-b border-slate-100 dark:border-slate-800/80 items-end">
                    {/* Customer */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                        Customer
                      </label>
                      <select
                        value={filterCustomer}
                        onChange={(e) => setFilterCustomer(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
                      >
                        <option>All customers</option>
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

                    {/* Scheduled On */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                        Scheduled On
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="From - To"
                          value={filterScheduledOn}
                          onChange={(e) => setFilterScheduledOn(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
                        />
                      </div>
                    </div>

                    {/* Meeting Type */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                        Meeting Type
                      </label>
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
                      >
                        <option>All types</option>
                        <option>Online Meeting</option>
                        <option>On-Site Visit</option>
                        <option>Office Consultation</option>
                      </select>
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
                        <option>Scheduled</option>
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

                {/* Meetings Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <th className="py-3 px-3">SR.NO</th>
                        <th className="py-3 px-3">CUSTOMER</th>
                        <th className="py-3 px-3">STAFF</th>
                        <th className="py-3 px-3">SCHEDULED ON</th>
                        <th className="py-3 px-3">MEETING TYPE</th>
                        <th className="py-3 px-3">CALENDER</th>
                        <th className="py-3 px-3">STATUS</th>
                        <th className="py-3 px-3 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      {filteredMeetings.map((item, index) => (
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
                          <td className="py-4 px-3 text-slate-600 dark:text-slate-300">
                            {item.staffName}
                          </td>
                          <td className="py-4 px-3 text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                            {item.scheduledOn}
                          </td>
                          <td className="py-4 px-3 text-slate-500">
                            {item.meetingType}
                          </td>
                          <td className="py-4 px-3">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                              <span>☁</span>
                              <span>{item.calenderStatus}</span>
                            </span>
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
                                  setSelectedMeeting(item);
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
                                    assignedFor: item.customerName,
                                    assignedTo: item.staffName,
                                    meetingTitle: item.meetingTitle || "",
                                    status: item.status,
                                    scheduledOn: "2026-11-07T15:12",
                                    meetingType: item.meetingType === "--" ? "" : item.meetingType,
                                    agenda: item.agenda || "",
                                    address: (item.location === "--" || !item.location) ? "" : item.location,
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
                                  setMeetings(meetings.filter((m) => m.id !== item.id));
                                  showToast("Meeting deleted!");
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
                  <span>Showing 1 to {filteredMeetings.length} of {filteredMeetings.length} results</span>
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
              VIEW 2: ADD MEETING (Screenshot 2)
             ========================================================================= */}
          {viewMode === "create" && (
            <div className="space-y-6">
              {/* Header Title + Back */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold tracking-tight">Add Meeting</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Schedule a new meeting with a customer.
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
                onSubmit={handleCreateMeeting}
                className={`rounded-2xl border p-6 md:p-8 space-y-6 shadow-sm transition-colors ${
                  isDarkMode ? "bg-[#101b33] border-slate-800" : "bg-white border-slate-200/80"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Assigned For * with Quick Add Button */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Assigned For</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <select
                        value={formData.assignedFor}
                        onChange={(e) => setFormData({ ...formData, assignedFor: e.target.value })}
                        required
                        className="flex-1 h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                      >
                        {availableCustomers.map((cust) => (
                          <option key={cust} value={cust}>
                            {cust}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => setShowNewCustomerModal(true)}
                        title="Add New Customer"
                        className="w-11 h-11 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white flex items-center justify-center font-bold text-base cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Assigned To */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Meeting Title * */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <Video className="w-3.5 h-3.5 text-slate-400" />
                      <span>Meeting Title</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter meeting title"
                      value={formData.meetingTitle}
                      onChange={(e) => setFormData({ ...formData, meetingTitle: e.target.value })}
                      required
                      className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Status * */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <Tag className="w-3.5 h-3.5 text-slate-400" />
                      <span>Status</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Scheduled On * */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Scheduled On</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.scheduledOn}
                      onChange={(e) => setFormData({ ...formData, scheduledOn: e.target.value })}
                      required
                      className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Meeting Type */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      <span>Meeting Type</span>
                    </label>
                    <select
                      value={formData.meetingType}
                      onChange={(e) => setFormData({ ...formData, meetingType: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                    >
                      <option value="">Select Meeting Type</option>
                      <option value="Online Video Conference">Online Video Conference</option>
                      <option value="On-Site Assessment">On-Site Assessment</option>
                      <option value="Office Consultation">Office Consultation</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Agenda */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Agenda
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Enter meeting agenda"
                      value={formData.agenda}
                      onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
                      className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Address
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Enter meeting location/address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
              VIEW 3: MEETING DETAILS (Screenshot 4)
             ========================================================================= */}
          {viewMode === "detail" && selectedMeeting && (
            <div className="space-y-6">
              {/* Header Title + Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold tracking-tight">Meeting Details</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Complete information about this scheduled meeting.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setFormData({
                        assignedFor: selectedMeeting.customerName,
                        assignedTo: selectedMeeting.staffName,
                        meetingTitle: selectedMeeting.meetingTitle || "",
                        status: selectedMeeting.status,
                        scheduledOn: "2026-11-07T15:12",
                        meetingType: selectedMeeting.meetingType === "--" ? "" : selectedMeeting.meetingType,
                        agenda: selectedMeeting.agenda || "",
                        address: (selectedMeeting.location === "--" || !selectedMeeting.location) ? "" : selectedMeeting.location,
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
                  {/* Customer */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <User className="w-4 h-4 text-slate-500" />
                      <span>Customer:</span>
                    </span>
                    <span className="text-xs text-slate-700 dark:text-slate-300 font-semibold">
                      {selectedMeeting.customerName.toLowerCase()}
                    </span>
                  </div>

                  {/* Assigned Staff */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <User className="w-4 h-4 text-slate-500" />
                      <span>Assigned Staff:</span>
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-300">
                      {selectedMeeting.staffName}
                    </span>
                  </div>

                  {/* Meeting Type */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <Briefcase className="w-4 h-4 text-slate-500" />
                      <span>Meeting Type:</span>
                    </span>
                    <span className="text-xs text-slate-500">{selectedMeeting.meetingType}</span>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-slate-500" />
                      <span>Status:</span>
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-600 text-white shadow-sm">
                      {selectedMeeting.status}
                    </span>
                  </div>

                  {/* Scheduled At */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span>Scheduled At:</span>
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      {selectedMeeting.scheduledOn.replace("\n", " ")}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <span>Location:</span>
                    </span>
                    <span className="text-xs text-slate-500">{selectedMeeting.location}</span>
                  </div>

                  {/* Created By */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <User className="w-4 h-4 text-slate-500" />
                      <span>Created By:</span>
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      {selectedMeeting.createdBy}
                    </span>
                  </div>

                  {/* Last Updated */}
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                      <History className="w-4 h-4 text-slate-500" />
                      <span>Last Updated:</span>
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      {selectedMeeting.lastUpdated}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Update History */}
              <div
                className={`rounded-2xl border p-6 md:p-8 space-y-4 shadow-sm transition-colors ${
                  isDarkMode ? "bg-[#101b33] border-slate-800" : "bg-white border-slate-200/80"
                }`}
              >
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  Status Update History
                </h3>
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50 dark:bg-slate-800/50">
                        <th className="py-2.5 px-3">#</th>
                        <th className="py-2.5 px-3">STATUS</th>
                        <th className="py-2.5 px-3">COMMENT</th>
                        <th className="py-2.5 px-3">UPDATED BY</th>
                        <th className="py-2.5 px-3">DATE</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={5} className="py-6 text-center text-slate-400">
                          No status updates found.
                        </td>
                      </tr>
                    </tbody>
                  </table>
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

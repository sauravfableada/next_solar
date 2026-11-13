"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { useTheme } from "@/context/ThemeContext";
import {
  Search,
  SlidersHorizontal,
  Download,
  Plus,
  Pencil,
  Eye,
  Trash2,
  Calendar,
  X,
  FileText,
  User,
  Clock,
  Layers,
  ChevronDown,
  RotateCcw,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  FileSpreadsheet,
  Headphones,
  Bell,
  Sun,
  Moon,
  Menu,
  History,
  Globe,
  Settings,
  LogOut,
  PlusCircle,
  Phone
} from "lucide-react";

interface TicketItem {
  id: number;
  ticketName: string;
  customer: string;
  customerPhone?: string;
  assignedTo: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: "OPEN" | "In Progress" | "Resolved" | "Closed";
  createdAt: string;
  description: string;
  history?: {
    id: number;
    status: string;
    comment: string;
    updatedBy: string;
    date: string;
  }[];
}

export default function TicketsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isDarkMode } = useTheme();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Tickets state
  const [tickets, setTasks] = useState<TicketItem[]>([
    {
      id: 1,
      ticketName: "Ticket - Test Customer",
      customer: "Test Customer",
      customerPhone: "9870543210",
      assignedTo: "Solar CRM",
      priority: "MEDIUM",
      status: "OPEN",
      createdAt: "06 Nov 2026",
      description: "-",
      history: []
    }
  ]);

  // View state: "list" | "create" | "details"
  const [currentView, setCurrentView] = useState<"list" | "create" | "details">("list");
  const [selectedTicket, setSelectedTicket] = useState<TicketItem | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCustomer, setFilterCustomer] = useState("");
  const [filterAssignedTo, setFilterAssignedTo] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCreatedAt, setFilterCreatedAt] = useState("");

  // Status dropdown toggle in table row
  const [activeStatusDropdownId, setActiveStatusDropdownId] = useState<number | null>(null);

  // Quick "Add New Customer" modal
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [newCustName, setNewCustName] = useState("");
  const [newCustMobile, setNewCustMobile] = useState("");
  const [newCustAddress, setNewCustAddress] = useState("");
  const [showAddressField, setShowAddressField] = useState(false);

  // Create form state
  const [createForm, setCreateForm] = useState({
    customer: "-- Search Customer --",
    assignedTo: "Solar CRM",
    ticketName: "",
    description: "",
    priority: "Medium",
    status: "Open"
  });

  const clearFilters = () => {
    setSearchQuery("");
    setFilterCustomer("");
    setFilterAssignedTo("");
    setFilterPriority("");
    setFilterStatus("");
    setFilterCreatedAt("");
  };

  const handleUpdateStatus = (ticketId: number, newStatus: TicketItem["status"]) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const newEntry = {
            id: Date.now(),
            status: newStatus,
            comment: `Status updated to ${newStatus}`,
            updatedBy: "Solar CRM",
            date: "12 Nov 2026"
          };
          return {
            ...t,
            status: newStatus,
            history: [...(t.history || []), newEntry]
          };
        }
        return t;
      })
    );
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    setActiveStatusDropdownId(null);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.ticketName.trim()) {
      alert("Please enter Ticket Name");
      return;
    }
    const customerVal =
      createForm.customer === "-- Search Customer --" ? "Test Customer" : createForm.customer;

    const newTicket: TicketItem = {
      id: Date.now(),
      ticketName: createForm.ticketName,
      customer: customerVal,
      assignedTo: createForm.assignedTo || "Solar CRM",
      priority: createForm.priority.toUpperCase() as TicketItem["priority"],
      status: createForm.status.toUpperCase() as TicketItem["status"],
      createdAt: "12 Nov 2026",
      description: createForm.description || "-",
      history: []
    };

    setTasks([newTicket, ...tickets]);
    setCurrentView("list");
    // Reset form
    setCreateForm({
      customer: "-- Search Customer --",
      assignedTo: "Solar CRM",
      ticketName: "",
      description: "",
      priority: "Medium",
      status: "Open"
    });
  };

  const handleSaveCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName.trim()) {
      alert("Please enter customer name");
      return;
    }
    setCreateForm((prev) => ({ ...prev, customer: newCustName }));
    setIsAddCustomerOpen(false);
    setNewCustName("");
    setNewCustMobile("");
    setNewCustAddress("");
    setShowAddressField(false);
  };

  const handleDeleteTicket = (id: number) => {
    if (confirm("Are you sure you want to delete this ticket?")) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
      if (selectedTicket && selectedTicket.id === id) {
        setCurrentView("list");
      }
    }
  };

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      searchQuery === "" ||
      t.ticketName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCust =
      filterCustomer === "" || t.customer.toLowerCase().includes(filterCustomer.toLowerCase());
    const matchesAssignee =
      filterAssignedTo === "" || t.assignedTo.toLowerCase().includes(filterAssignedTo.toLowerCase());
    const matchesPrio =
      filterPriority === "" || t.priority.toLowerCase() === filterPriority.toLowerCase();
    const matchesStat =
      filterStatus === "" || t.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesCust && matchesAssignee && matchesPrio && matchesStat;
  });

  return (
    <div
      className={`min-h-screen flex font-sans antialiased transition-colors duration-300 ${
        isDarkMode ? "bg-[#0b1329] text-slate-100" : "bg-[#f1f5f9] text-[#1e293b]"
      }`}
    >
      {/* Sidebar */}
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeItem="Manage Tickets"
      />

      {/* Main Container */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        {/* Top Header */}
        <AdminHeader sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />

        {/* Content Area */}
        <div className="p-6 max-w-[1600px] w-full mx-auto space-y-5">
          {/* VIEW 1: MANAGE TICKETS LIST */}
          {currentView === "list" && (
            <>
              {/* Header Title & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-[#1e293b] dark:text-white">
                    Manage Tickets
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Track open support requests and customer issues.
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button className="flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold shadow-sm transition">
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Export</span>
                  </button>
                  <button
                    onClick={() => setCurrentView("create")}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold shadow-sm transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Ticket</span>
                  </button>
                </div>
              </div>

              {/* Filters Box */}
              <div className="bg-white dark:bg-[#111c38] border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm space-y-4">
                {/* Search & Filters Toggle */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search tickets..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                      <span>Filters</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>Show per page:</span>
                    <select className="border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 bg-white dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-200 focus:outline-none">
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                    </select>
                  </div>
                </div>

                {/* Filter Inputs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-1 border-t border-slate-100 dark:border-slate-800">
                  {/* Customer */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Customer
                    </label>
                    <input
                      type="text"
                      placeholder="All customers"
                      value={filterCustomer}
                      onChange={(e) => setFilterCustomer(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Assigned To */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Assigned To
                    </label>
                    <input
                      type="text"
                      placeholder="All assignees"
                      value={filterAssignedTo}
                      onChange={(e) => setFilterAssignedTo(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Priority
                    </label>
                    <input
                      type="text"
                      placeholder="All priorities"
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Status
                    </label>
                    <input
                      type="text"
                      placeholder="All statuses"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Created At & Clear Button */}
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Created At
                      </label>
                      <div className="relative">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="From - To"
                          value={filterCreatedAt}
                          onChange={(e) => setFilterCreatedAt(e.target.value)}
                          className="w-full pl-8 pr-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <button
                      onClick={clearFilters}
                      className="px-4 py-1.5 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Tickets Table */}
              <div className="bg-white dark:bg-[#111c38] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        <th className="py-3 px-4">TICKET NAME</th>
                        <th className="py-3 px-4">CUSTOMER</th>
                        <th className="py-3 px-4">ASSIGNED TO</th>
                        <th className="py-3 px-4 text-center">PRIORITY</th>
                        <th className="py-3 px-4 text-center">STATUS</th>
                        <th className="py-3 px-4">CREATED AT</th>
                        <th className="py-3 px-4 text-center">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
                      {filteredTickets.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-10 text-center text-slate-400">
                            No tickets found
                          </td>
                        </tr>
                      ) : (
                        filteredTickets.map((t) => (
                          <tr
                            key={t.id}
                            className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition"
                          >
                            <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                              {t.ticketName}
                            </td>
                            <td className="py-3.5 px-4 font-medium text-slate-800 dark:text-slate-200">
                              {t.customer}
                            </td>
                            <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                              {t.assignedTo}
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <span
                                className={`px-4 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase inline-block ${
                                  t.priority === "MEDIUM"
                                    ? "bg-[#fff3d6] text-[#b45309]"
                                    : t.priority === "HIGH" || t.priority === "URGENT"
                                    ? "bg-rose-100 text-rose-700"
                                    : "bg-slate-100 text-slate-700"
                                }`}
                              >
                                {t.priority}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-center relative">
                              <div className="relative inline-block text-left">
                                <button
                                  onClick={() =>
                                    setActiveStatusDropdownId(
                                      activeStatusDropdownId === t.id ? null : t.id
                                    )
                                  }
                                  className={`px-4 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 ${
                                    t.status === "OPEN"
                                      ? "bg-[#dcfce7] text-[#15803d]"
                                      : t.status === "In Progress"
                                      ? "bg-blue-100 text-blue-700"
                                      : t.status === "Resolved"
                                      ? "bg-purple-100 text-purple-700"
                                      : "bg-slate-200 text-slate-700"
                                  }`}
                                >
                                  <span>{t.status}</span>
                                  <ChevronDown className="w-3 h-3 opacity-60" />
                                </button>

                                {/* Dropdown menu (Screenshot 5) */}
                                {activeStatusDropdownId === t.id && (
                                  <div className="absolute left-0 mt-1.5 w-36 bg-[#0b2447] text-white rounded-lg shadow-xl z-30 py-1.5 text-xs text-left">
                                    <div className="text-[10px] text-slate-400 px-3 py-1 font-semibold uppercase">
                                      Change Status
                                    </div>
                                    <button
                                      onClick={() => handleUpdateStatus(t.id, "OPEN")}
                                      className={`w-full text-left px-3 py-1.5 hover:bg-white/10 ${
                                        t.status === "OPEN" ? "font-bold text-emerald-300" : ""
                                      }`}
                                    >
                                      Open
                                    </button>
                                    <button
                                      onClick={() => handleUpdateStatus(t.id, "In Progress")}
                                      className={`w-full text-left px-3 py-1.5 hover:bg-white/10 ${
                                        t.status === "In Progress" ? "font-bold text-blue-300" : ""
                                      }`}
                                    >
                                      In Progress
                                    </button>
                                    <button
                                      onClick={() => handleUpdateStatus(t.id, "Resolved")}
                                      className={`w-full text-left px-3 py-1.5 hover:bg-white/10 ${
                                        t.status === "Resolved" ? "font-bold text-purple-300" : ""
                                      }`}
                                    >
                                      Resolved
                                    </button>
                                    <button
                                      onClick={() => handleUpdateStatus(t.id, "Closed")}
                                      className={`w-full text-left px-3 py-1.5 hover:bg-white/10 ${
                                        t.status === "Closed" ? "font-bold text-slate-300" : ""
                                      }`}
                                    >
                                      Closed
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                              {t.createdAt}
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => {
                                    setSelectedTicket(t);
                                    setCurrentView("create");
                                    setCreateForm({
                                      customer: t.customer,
                                      assignedTo: t.assignedTo,
                                      ticketName: t.ticketName,
                                      description: t.description,
                                      priority: t.priority,
                                      status: t.status
                                    });
                                  }}
                                  title="Edit"
                                  className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedTicket(t);
                                    setCurrentView("details");
                                  }}
                                  title="View Details"
                                  className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteTicket(t.id)}
                                  title="Delete"
                                  className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer */}
                <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <div>
                    Showing 1 to {filteredTickets.length} of {filteredTickets.length} results
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      disabled
                      className="px-2.5 py-1 text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button className="px-3 py-1 text-white bg-[#0b2447] rounded text-xs font-semibold">
                      1
                    </button>
                    <button
                      disabled
                      className="px-2.5 py-1 text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* VIEW 2: RAISE TICKET (Screenshot 2) */}
          {currentView === "create" && (
            <div className="space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-[#1e293b] dark:text-white">Raise Ticket</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Create a new support request.
                  </p>
                </div>
                <button
                  onClick={() => setCurrentView("list")}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold transition shadow-sm"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              </div>

              {/* Form Card */}
              <form
                onSubmit={handleCreateSubmit}
                className="bg-white dark:bg-[#111c38] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Customer with + button */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        Customer <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={createForm.customer}
                        onChange={(e) => setCreateForm({ ...createForm, customer: e.target.value })}
                        className="flex-1 px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                      >
                        <option>-- Search Customer --</option>
                        <option>Test Customer</option>
                        <option>Solar Customer</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => setIsAddCustomerOpen(true)}
                        className="px-3 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg flex items-center justify-center transition shadow-sm"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Assigned To */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        Assigned To
                      </span>
                    </label>
                    <select
                      value={createForm.assignedTo}
                      onChange={(e) => setCreateForm({ ...createForm, assignedTo: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                    >
                      <option>Solar CRM</option>
                      <option>Admin</option>
                      <option>Support Team</option>
                    </select>
                  </div>

                  {/* Ticket Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        Ticket Name <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter ticket title"
                      value={createForm.ticketName}
                      onChange={(e) => setCreateForm({ ...createForm, ticketName: e.target.value })}
                      required
                      className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Ticket Description */}
                  <div className="row-span-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        Ticket Description
                      </span>
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Enter ticket description"
                      value={createForm.description}
                      onChange={(e) =>
                        setCreateForm({ ...createForm, description: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                        Priority <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <select
                      value={createForm.priority}
                      onChange={(e) => setCreateForm({ ...createForm, priority: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                        Status <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <select
                      value={createForm.status}
                      onChange={(e) => setCreateForm({ ...createForm, status: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                    >
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                      <option>Closed</option>
                    </select>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setCurrentView("list")}
                    className="px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold transition shadow-sm"
                  >
                    Create Ticket
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* VIEW 3: TICKET DETAILS (Screenshot 4) */}
          {currentView === "details" && selectedTicket && (
            <div className="space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-[#1e293b] dark:text-white">
                    Ticket Details
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Complete information about this support ticket
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setCurrentView("create");
                      setCreateForm({
                        customer: selectedTicket.customer,
                        assignedTo: selectedTicket.assignedTo,
                        ticketName: selectedTicket.ticketName,
                        description: selectedTicket.description,
                        priority: selectedTicket.priority,
                        status: selectedTicket.status
                      });
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold transition shadow-sm"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setCurrentView("list")}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold transition shadow-sm"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                </div>
              </div>

              {/* Details Card */}
              <div className="bg-white dark:bg-[#111c38] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-[#1e293b] dark:text-white">
                    {selectedTicket.ticketName}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-xs">
                  {/* Created By */}
                  <div className="flex items-center">
                    <span className="w-36 text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      Created By:
                    </span>
                    <span className="text-slate-800 dark:text-slate-200 font-semibold">
                      Solar CRM
                    </span>
                  </div>

                  {/* Customer Name */}
                  <div className="flex items-center">
                    <span className="w-36 text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      Customer Name:
                    </span>
                    <span className="text-slate-800 dark:text-slate-200 font-semibold">
                      {selectedTicket.customer.toLowerCase()}
                    </span>
                  </div>

                  {/* Created At */}
                  <div className="flex items-center">
                    <span className="w-36 text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Created At:
                    </span>
                    <span className="text-slate-800 dark:text-slate-200 font-semibold">
                      06 Nov 2026 03:59 PM
                    </span>
                  </div>

                  {/* Ticket Description */}
                  <div className="flex items-start">
                    <span className="w-36 text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2 pt-0.5">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      Ticket Description:
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">
                      {selectedTicket.description}
                    </span>
                  </div>

                  {/* Priority */}
                  <div className="flex items-center">
                    <span className="w-36 text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                      <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                      Priority:
                    </span>
                    <span className="px-4 py-1 rounded-full text-[10px] font-bold tracking-wider bg-blue-500 text-white">
                      {selectedTicket.priority}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="flex items-center">
                    <span className="w-36 text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                      Status:
                    </span>
                    <span className="px-4 py-1 rounded-full text-[10px] font-bold tracking-wider bg-[#06b6d4] text-white">
                      {selectedTicket.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Update History Table */}
              <div className="bg-white dark:bg-[#111c38] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                  Status Update History
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] uppercase font-bold text-slate-400">
                        <th className="py-2.5 px-3 w-10">#</th>
                        <th className="py-2.5 px-4">STATUS</th>
                        <th className="py-2.5 px-4">COMMENT</th>
                        <th className="py-2.5 px-4">UPDATED BY</th>
                        <th className="py-2.5 px-4">DATE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                      {!selectedTicket.history || selectedTicket.history.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                            No status updates found.
                          </td>
                        </tr>
                      ) : (
                        selectedTicket.history.map((h, i) => (
                          <tr key={h.id}>
                            <td className="py-3 px-3 text-slate-400">{i + 1}</td>
                            <td className="py-3 px-4 font-semibold">{h.status}</td>
                            <td className="py-3 px-4">{h.comment}</td>
                            <td className="py-3 px-4">{h.updatedBy}</td>
                            <td className="py-3 px-4 text-slate-500">{h.date}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center text-xs text-slate-400 pt-8 pb-4">
            © 2026 Copyright - Fablead Developers Technolab
          </div>
        </div>
      </div>

      {/* MODAL: ADD NEW CUSTOMER (Screenshot 3) */}
      {isAddCustomerOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Add New Customer
              </h2>
              <button
                onClick={() => setIsAddCustomerOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSaveCustomer} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    Customer Name <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter customer name"
                  value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    Mobile Number <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter mobile number"
                  value={newCustMobile}
                  onChange={(e) => setNewCustMobile(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                {!showAddressField ? (
                  <button
                    type="button"
                    onClick={() => setShowAddressField(true)}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>+ Add Address (Optional)</span>
                  </button>
                ) : (
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                      Address
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Enter customer address"
                      value={newCustAddress}
                      onChange={(e) => setNewCustAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddCustomerOpen(false)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold transition shadow-sm"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

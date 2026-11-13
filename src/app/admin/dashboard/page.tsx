"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { useTheme } from "@/context/ThemeContext";
import SolarDocumentsModal from "@/components/SolarDocumentsModal";
import SubsidyBondModal from "@/components/SubsidyBondModal";
import SavedDocumentsModal from "@/components/SavedDocumentsModal";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Boxes,
  FileSpreadsheet,
  GitBranch,
  Package,
  Award,
  ListTodo,
  Database,
  Handshake,
  UserCheck,
  Ticket,
  BarChart3,
  Search,
  Bell,
  Moon,
  Sun,
  Headphones,
  ChevronDown,
  Menu,
  X,
  Calendar,
  LogOut,
  FolderOpen,
  DollarSign,
  TrendingUp,
  User,
  History,
  Globe,
  Settings,
  ChevronRight,
  Clock,
  CheckCircle,
  FileCheck,
  Info,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { isDarkMode } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [dateFilter, setDateFilter] = useState("Month to date");
  const [isSolarModalOpen, setIsSolarModalOpen] = useState(false);
  const [isSubsidyModalOpen, setIsSubsidyModalOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  return (
    <div
      className={`min-h-screen flex font-sans antialiased transition-colors duration-300 ${isDarkMode ? "bg-[#0b1329] text-slate-100" : "bg-[#f1f5f9] text-[#1e293b]"
        }`}
    >
      {/* =========================================================================
          LEFT SIDEBAR (Navy Dark Theme Matching Screenshot)
         ========================================================================= */}
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeItem={activeTab}
        onSelectSubItem={(parent, sub) => {
          setActiveTab(parent);
        }}
      />

      {/* =========================================================================
          MAIN CONTENT AREA
         ========================================================================= */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-64"
          }`}
      >
        <AdminHeader
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />

        {/* =========================================================================
            DASHBOARD VIEW
           ========================================================================= */}
        <main className="p-6 sm:p-8 space-y-6 flex-1">
          {/* Top Document Forms Banner (Matches Screenshot 10) */}
          <div
            className={`rounded-2xl p-5 sm:p-6 border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
              isDarkMode
                ? "bg-[#0f172a] border-slate-800 text-white"
                : "bg-white border-slate-200 text-slate-800"
            }`}
          >
            <div>
              <h2 className="text-lg font-bold">Document Forms</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Prepare solar documents and subsidy bond details.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsSavedModalOpen(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                  isDarkMode
                    ? "border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200"
                    : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-xs"
                }`}
              >
                <FolderOpen className="w-4 h-4 text-slate-500" />
                <span>Saved Documents</span>
              </button>
              <button
                type="button"
                onClick={() => setIsSolarModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#0e274c] hover:bg-[#16386b] text-white shadow-xs transition"
              >
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Solar Documents</span>
              </button>
              <button
                type="button"
                onClick={() => setIsSubsidyModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#0e274c] hover:bg-[#16386b] text-white shadow-xs transition"
              >
                <FileCheck className="w-4 h-4 text-blue-400" />
                <span>Subsidy Bond</span>
              </button>
            </div>
          </div>

          {/* Dashboard Header Bar / Overview */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1
                className={`text-2xl font-black tracking-tight ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Overview
              </h1>
              <p className={`text-xs mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                01 Nov 2026 to 13 Nov 2026. New leads use this period; other KPIs show current totals.
              </p>
            </div>

            {/* Date Range Selector */}
            <div className="flex items-center gap-2">
              <button
                className={`flex items-center gap-1.5 px-3 py-2 border rounded-xl text-xs font-semibold transition ${
                  isDarkMode
                    ? "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                <span>Today&apos;s overview</span>
              </button>
              <div className="relative">
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className={`px-3 py-2 border rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8 transition-colors ${
                    isDarkMode
                      ? "bg-slate-800 border-slate-700 text-slate-200"
                      : "bg-white border-slate-200 text-slate-700"
                  }`}
                >
                  <option>Month to date</option>
                  <option>Today</option>
                  <option>Last 7 Days</option>
                  <option>This Quarter</option>
                  <option>Year to date</option>
                </select>
              </div>
              <button className="px-4 py-2 bg-[#0e274c] hover:bg-[#16386b] text-white text-xs font-bold rounded-xl transition-colors shadow-sm">
                Apply
              </button>
            </div>
          </div>

          {/* 4 Top KPI Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: New Leads */}
            <div
              className={`rounded-2xl p-5 border shadow-sm relative overflow-hidden flex flex-col justify-between transition-colors ${
                isDarkMode ? "bg-[#0f172a] border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              <div>
                <div className="text-xs font-bold text-slate-400">New Leads</div>
                <div
                  className={`text-3xl font-black mt-2 font-mono ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  00
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800 text-[11px] text-slate-400">
                <span>Selected period</span>
                <span className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  ⚡
                </span>
              </div>
            </div>

            {/* Card 2: Open Deals */}
            <div
              className={`rounded-2xl p-5 border shadow-sm relative overflow-hidden flex flex-col justify-between transition-colors ${
                isDarkMode ? "bg-[#0f172a] border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              <div>
                <div className="text-xs font-bold text-slate-400">Open Deals</div>
                <div
                  className={`text-3xl font-black mt-2 font-mono ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  01
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800 text-[11px] text-slate-400">
                <span>Current pipeline</span>
                <span className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                  ✉
                </span>
              </div>
            </div>

            {/* Card 3: Pending Follow-ups */}
            <div
              className={`rounded-2xl p-5 border shadow-sm relative overflow-hidden flex flex-col justify-between transition-colors ${
                isDarkMode ? "bg-[#0f172a] border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              <div>
                <div className="text-xs font-bold text-slate-400">
                  Pending Follow-ups
                </div>
                <div
                  className={`text-3xl font-black mt-2 font-mono ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  00
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800 text-[11px] text-slate-400">
                <span>0 overdue</span>
                <span className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  ⏱
                </span>
              </div>
            </div>

            {/* Card 4: Outstanding Payments */}
            <div
              className={`rounded-2xl p-5 border shadow-sm relative overflow-hidden flex flex-col justify-between transition-colors ${
                isDarkMode ? "bg-[#0f172a] border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              <div>
                <div className="text-xs font-bold text-slate-400">
                  Outstanding Payments
                </div>
                <div
                  className={`text-3xl font-black mt-2 font-mono ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  00
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800 text-[11px] text-slate-400">
                <span>Invoices with an unpaid balance</span>
                <span className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  💼
                </span>
              </div>
            </div>
          </div>

          {/* Secondary Overview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Estimate Overview Box */}
            <div
              className={`rounded-2xl p-6 border shadow-sm transition-colors ${isDarkMode ? "bg-[#0f172a] border-slate-800" : "bg-white border-slate-200"
                }`}
            >
              <div className="flex items-center justify-between mb-5">
                <h3
                  className={`text-base font-bold ${isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                >
                  Estimate Overview
                </h3>
                <button
                  className={`px-3 py-1 rounded-lg border text-xs font-semibold transition-colors ${isDarkMode
                    ? "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                >
                  View All
                </button>
              </div>

              {/* Total Estimate Value Banner */}
              <div className="p-5 rounded-2xl bg-[#0e274c] text-white flex items-center justify-between mb-5 shadow-inner">
                <div>
                  <div className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">
                    TOTAL ESTIMATE VALUE
                  </div>
                  <div className="text-3xl font-black mt-1 font-mono">
                    ₹1.00
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div
                  className={`p-3 rounded-xl border flex justify-between items-center ${isDarkMode
                    ? "bg-slate-800/60 border-slate-700"
                    : "bg-slate-50 border-slate-100"
                    }`}
                >
                  <span className="text-slate-400 font-semibold uppercase">TOTAL</span>
                  <span className={`font-bold font-mono text-sm ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                    1
                  </span>
                </div>
                <div
                  className={`p-3 rounded-xl border flex justify-between items-center ${isDarkMode
                    ? "bg-slate-800/60 border-slate-700"
                    : "bg-slate-50 border-slate-100"
                    }`}
                >
                  <span className="text-slate-400 font-semibold uppercase">THIS MONTH</span>
                  <span className={`font-bold font-mono text-sm ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                    1
                  </span>
                </div>
                <div
                  className={`p-3 rounded-xl border flex justify-between items-center ${isDarkMode
                    ? "bg-slate-800/60 border-slate-700"
                    : "bg-slate-50 border-slate-100"
                    }`}
                >
                  <span className="text-slate-400 font-semibold uppercase">PENDING</span>
                  <span className={`font-bold font-mono text-sm ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                    1
                  </span>
                </div>
                <div
                  className={`p-3 rounded-xl border flex justify-between items-center ${isDarkMode
                    ? "bg-slate-800/60 border-slate-700"
                    : "bg-slate-50 border-slate-100"
                    }`}
                >
                  <span className="text-slate-400 font-semibold uppercase">APPROVED</span>
                  <span className={`font-bold font-mono text-sm ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                    0
                  </span>
                </div>
                <div
                  className={`p-3 rounded-xl border flex justify-between items-center ${isDarkMode
                    ? "bg-slate-800/60 border-slate-700"
                    : "bg-slate-50 border-slate-100"
                    }`}
                >
                  <span className="text-slate-400 font-semibold uppercase">REJECTED</span>
                  <span className={`font-bold font-mono text-sm ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                    0
                  </span>
                </div>
                <div
                  className={`p-3 rounded-xl border flex justify-between items-center ${isDarkMode
                    ? "bg-slate-800/60 border-slate-700"
                    : "bg-slate-50 border-slate-100"
                    }`}
                >
                  <span className="text-slate-400 font-semibold uppercase">COMPLETED</span>
                  <span className={`font-bold font-mono text-sm ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                    0
                  </span>
                </div>
              </div>

              {/* Estimate List item matching image 2 */}
              <div className="mt-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-slate-800 dark:text-slate-200">
                    #01EST-test customer
                  </div>
                  <div className="text-[10px] text-slate-400">
                    test customer · 06 Nov 2026
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xs text-slate-800 dark:text-slate-200 font-mono">
                    ₹1.00
                  </div>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[9px] font-bold uppercase">
                    PENDING
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 mt-3 text-[11px] text-slate-400">
                <Info className="w-3.5 h-3.5" />
                <span>Overview is based on all visible estimates and their current statuses.</span>
              </div>
            </div>

            {/* Lead Conversion Snapshot */}
            <div
              className={`rounded-2xl p-6 border shadow-sm flex flex-col justify-between transition-colors ${isDarkMode ? "bg-[#0f172a] border-slate-800" : "bg-white border-slate-200"
                }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className={`text-base font-bold ${isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                >
                  Lead Conversion Snapshot
                </h3>
                <button
                  className={`px-3 py-1 rounded-lg border text-xs font-semibold transition-colors ${isDarkMode
                    ? "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                >
                  View All
                </button>
              </div>

              {/* Conversion Radial Graph Graphic */}
              <div className="flex flex-col items-center justify-center py-6">
                <div
                  className={`w-32 h-32 rounded-full border-8 border-t-blue-600 flex flex-col items-center justify-center text-center ${isDarkMode ? "border-slate-800" : "border-slate-100"
                    }`}
                >
                  <span
                    className={`text-2xl font-black ${isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                  >
                    0%
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">
                    Conversion
                  </span>
                </div>
              </div>

              <div
                className={`grid grid-cols-2 gap-3 pt-4 border-t text-xs ${isDarkMode ? "border-slate-800" : "border-slate-100"
                  }`}
              >
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 uppercase text-[10px] font-bold block">
                    NEW LEADS
                  </span>
                  <span
                    className={`text-lg font-black font-mono ${isDarkMode ? "text-white" : "text-slate-800"
                      }`}
                  >
                    1
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 uppercase text-[10px] font-bold block">
                    QUALIFIED
                  </span>
                  <span
                    className={`text-lg font-black font-mono ${isDarkMode ? "text-white" : "text-slate-800"
                      }`}
                  >
                    0
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 uppercase text-[10px] font-bold block">
                    ESTIMATES CREATED
                  </span>
                  <span
                    className={`text-lg font-black font-mono ${isDarkMode ? "text-white" : "text-slate-800"
                      }`}
                  >
                    1
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 uppercase text-[10px] font-bold block">
                    APPROVED ESTIMATES
                  </span>
                  <span
                    className={`text-lg font-black font-mono ${isDarkMode ? "text-white" : "text-slate-800"
                      }`}
                  >
                    0
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 mt-3 text-[11px] text-slate-400">
                <Info className="w-3.5 h-3.5" />
                <span>Conversion is calculated from approved estimates against total leads.</span>
              </div>
            </div>
          </div>

          {/* Customer Pipeline Summary & Today's Action List (Matching Images 2 & 3) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Pipeline Summary */}
            <div
              className={`rounded-2xl p-6 border shadow-sm transition-colors ${isDarkMode ? "bg-[#0f172a] border-slate-800" : "bg-white border-slate-200"
                }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3
                  className={`text-base font-bold ${isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                >
                  Customer Pipeline Summary
                </h3>
                <button
                  className={`px-3 py-1 rounded-lg border text-xs font-semibold transition-colors ${isDarkMode
                    ? "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                >
                  View All
                </button>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Current customer counts. Select a stage to open its customer list.
              </p>

              {/* 2-Column Stages Grid matching image 3 */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Document Verification", count: 2, color: "bg-emerald-500" },
                  { name: "New", count: 0, color: "bg-lime-500" },
                  { name: "Registration", count: 0, color: "bg-purple-500" },
                  { name: "Contacted", count: 0, color: "bg-blue-500" },
                  { name: "Meter Charge", count: 0, color: "bg-amber-500" },
                  { name: "Proposal Sent", count: 0, color: "bg-rose-500" },
                  { name: "Finance", count: 0, color: "bg-teal-500" },
                  { name: "Negotiation", count: 0, color: "bg-emerald-500" },
                  { name: "Waiting Floor", count: 0, color: "bg-purple-500" },
                  { name: "Won", count: 0, color: "bg-indigo-500" },
                  { name: "Dispatch", count: 0, color: "bg-emerald-500" },
                  { name: "Lost", count: 0, color: "bg-rose-500" },
                  { name: "Installations", count: 0, color: "bg-blue-500" },
                  { name: "Intimation", count: 0, color: "bg-amber-500" },
                  { name: "Net Metering", count: 0, color: "bg-emerald-500" },
                  { name: "Subsidy", count: 0, color: "bg-purple-500" },
                ].map((stage, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 cursor-pointer flex items-center justify-between transition group"
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <span className={`w-2 h-2 rounded-full ${stage.color} flex-shrink-0`} />
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-500 truncate">
                        {stage.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 pl-2">
                      <span className="text-xs font-bold font-mono text-slate-800 dark:text-slate-200">
                        {stage.count}
                      </span>
                      <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-blue-500" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-slate-400 mt-4">
                0 customers have no stage assigned.
              </div>
            </div>

            {/* Today's Action List */}
            <div
              className={`rounded-2xl p-6 border shadow-sm transition-colors flex flex-col justify-between ${isDarkMode ? "bg-[#0f172a] border-slate-800" : "bg-white border-slate-200"
                }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className={`text-base font-bold ${isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                  >
                    Today&apos;s Action List
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold">
                    1 due
                  </span>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="py-2.5 px-4">ACTION</th>
                        <th className="py-2.5 px-4">TYPE</th>
                        <th className="py-2.5 px-4 text-right">DUE</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-800 dark:text-slate-200">
                            Send proposal
                          </div>
                          <div className="text-[10px] text-slate-400">Task due</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 font-bold text-[10px]">
                            Task
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="text-slate-600 dark:text-slate-300 font-medium">
                            08 Nov, 12:00 AM
                          </div>
                          <span className="text-[10px] text-rose-500 font-bold">
                            Overdue
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-right">
                <span className="text-[11px] text-slate-400">
                  Tasks and follow-ups requiring immediate attention today.
                </span>
              </div>
            </div>
          </div>

          {/* Daily Activity Chart & All Deals (Matching Image 4) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Activity Chart */}
            <div
              className={`rounded-2xl p-6 border shadow-sm transition-colors ${isDarkMode ? "bg-[#0f172a] border-slate-800" : "bg-white border-slate-200"
                }`}
            >
              <div className="flex items-center justify-between mb-1">
                <h3
                  className={`text-base font-bold ${isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                >
                  Daily Activity
                </h3>
                <div className="relative">
                  <select className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold outline-none">
                    <option>Last 30 days</option>
                    <option>Last 7 days</option>
                    <option>This month</option>
                  </select>
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Leads by creation date; follow-ups and meetings by scheduled date.
              </p>

              {/* Chart SVG graphic with tooltip */}
              <div className="relative h-44 w-full">
                <svg className="w-full h-full" viewBox="0 0 500 150">
                  {/* Grid lines */}
                  <line x1="30" y1="20" x2="480" y2="20" stroke="#94a3b8" strokeDasharray="3 3" opacity="0.2" />
                  <line x1="30" y1="80" x2="480" y2="80" stroke="#94a3b8" strokeDasharray="3 3" opacity="0.2" />
                  <line x1="30" y1="130" x2="480" y2="130" stroke="#94a3b8" strokeWidth="1" opacity="0.4" />

                  {/* Left labels */}
                  <text x="15" y="25" fontSize="10" fill="#94a3b8">1</text>
                  <text x="15" y="135" fontSize="10" fill="#94a3b8">0</text>

                  {/* Activity lines */}
                  {/* Blue line: leads created */}
                  <polyline
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2"
                    points="30,130 100,130 180,130 220,20 230,130 350,130 480,130"
                  />
                  {/* Green line: meetings scheduled */}
                  <polyline
                    fill="none"
                    stroke="#059669"
                    strokeWidth="2"
                    points="30,130 200,130 290,20 300,130 400,130 480,130"
                  />

                  {/* Data point dots */}
                  <circle cx="220" cy="20" r="4" fill="#2563eb" />
                  <circle cx="290" cy="20" r="4" fill="#059669" />
                </svg>

                {/* Tooltip Box matching image 4 */}
                <div className="absolute left-[180px] top-[45px] p-2.5 rounded-lg bg-slate-900 text-white text-[10px] shadow-xl space-y-0.5 pointer-events-none">
                  <div className="font-bold border-b border-slate-700 pb-1 mb-1">18 Oct</div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded bg-blue-500" />
                    <span className="text-slate-300">Leads created: 0</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded bg-amber-500" />
                    <span className="text-slate-300">Follow-ups scheduled: 0</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded bg-emerald-500" />
                    <span className="text-slate-300">Meetings scheduled: 0</span>
                  </div>
                </div>
              </div>

              {/* Chart legend */}
              <div className="flex items-center justify-center space-x-6 pt-4 text-xs font-medium text-slate-500">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-blue-600" />
                  <span>Leads created</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span>Follow-ups scheduled</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-600" />
                  <span>Meetings scheduled</span>
                </div>
              </div>
            </div>

            {/* All Deals Card */}
            <div
              className={`rounded-2xl p-6 border shadow-sm transition-colors flex flex-col justify-between ${isDarkMode ? "bg-[#0f172a] border-slate-800" : "bg-white border-slate-200"
                }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className={`text-base font-bold ${isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                  >
                    All Deals
                  </h3>
                  <button
                    className={`px-3 py-1 rounded-lg border text-xs font-semibold transition-colors ${isDarkMode
                      ? "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                  >
                    View All
                  </button>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="py-2.5 px-4">DEALS NAME</th>
                        <th className="py-2.5 px-4">DEAL VALUE</th>
                        <th className="py-2.5 px-4 text-right">STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">
                          #01INV-test customer
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-800 dark:text-slate-200">
                          ₹2.00
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 font-semibold text-[10px]">
                            Paused
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Footer text */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
                © 2026 Copyright - Fablead Developers Technolab
              </div>
            </div>
          </div>

          {/* Module Tab Content */}
          {activeTab !== "Dashboard" && (
            <div
              className={`rounded-2xl p-8 border shadow-sm transition-colors ${isDarkMode ? "bg-[#0f172a] border-slate-800" : "bg-white border-slate-200"
                }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3
                    className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                  >
                    {activeTab} Module
                  </h3>
                  <p className="text-xs text-slate-400">
                    Connected to Laravel backend API: <code>/api/{activeTab.toLowerCase().replace(/\s+/g, '-')}</code>
                  </p>
                </div>
              </div>
              <div
                className={`p-6 rounded-xl border border-dashed text-center ${isDarkMode
                  ? "bg-slate-800/40 border-slate-700"
                  : "bg-slate-50 border-slate-300"
                  }`}
              >
                <span
                  className={`text-xs font-semibold block mb-2 ${isDarkMode ? "text-slate-200" : "text-slate-600"
                    }`}
                >
                  Live database records for <strong>{activeTab}</strong>
                </span>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Configured with Laravel controllers &amp; Eloquent models. Ready for full CRUD operations and client dispatching.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Solar Documents Modal */}
      <SolarDocumentsModal
        isOpen={isSolarModalOpen}
        onClose={() => setIsSolarModalOpen(false)}
      />

      {/* Subsidy Bond Modal */}
      <SubsidyBondModal
        isOpen={isSubsidyModalOpen}
        onClose={() => setIsSubsidyModalOpen(false)}
      />

      {/* Saved Documents Modal */}
      <SavedDocumentsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        onOpenDocument={(doc) => {
          setIsSavedModalOpen(false);
          if (doc.documentType === "Subsidy Bond") {
            setIsSubsidyModalOpen(true);
          } else {
            setIsSolarModalOpen(true);
          }
        }}
      />
    </div>
  );
}

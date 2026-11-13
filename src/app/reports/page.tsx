"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminSidebar from "@/components/AdminSidebar";
import {
  Search,
  SlidersHorizontal,
  Download,
  Calendar,
  RotateCcw,
  Eye,
  ChevronDown,
  Menu,
  Briefcase,
  FileSpreadsheet,
  Headphones,
  Bell,
  Sun,
  Moon,
  User,
  History,
  Globe,
  Settings,
  LogOut,
  BarChart3,
  TrendingUp,
  FileText
} from "lucide-react";

export type ReportType = "customers" | "leads" | "deals" | "tasks" | "followups";

interface ReportsPageProps {
  initialReportType?: ReportType;
}

export default function ReportsPage({ initialReportType = "customers" }: ReportsPageProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Active Report Tab
  const [activeReport, setActiveReport] = useState<ReportType>(initialReportType);

  // Top Chart Bar Filters
  const [selectedYear, setSelectedYear] = useState("2026");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Table Search and Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStaff, setFilterStaff] = useState("");
  const [filterSource, setFilterSource] = useState("");
  const [filterStage, setFilterStage] = useState("");
  const [filterMinAmount, setFilterMinAmount] = useState("");
  const [filterMaxAmount, setFilterMaxAmount] = useState("");
  const [filterDateRange, setFilterDateRange] = useState("");

  const resetTopFilters = () => {
    setSelectedYear("2026");
    setFromDate("");
    setToDate("");
  };

  const clearTableFilters = () => {
    setSearchQuery("");
    setFilterStatus("");
    setFilterType("");
    setFilterStaff("");
    setFilterSource("");
    setFilterStage("");
    setFilterMinAmount("");
    setFilterMaxAmount("");
    setFilterDateRange("");
  };

  // Mock data for each report
  const customersData = [
    {
      id: 1,
      name: "test lead",
      email: "-",
      phone: "7894561995",
      type: "Individual",
      status: "Active"
    },
    {
      id: 2,
      name: "test customer",
      email: "testcustomer@gmail.com",
      phone: "9870543210",
      type: "Individual",
      status: "Active"
    }
  ];

  const leadsData = [
    {
      id: 1,
      name: "test lead",
      isConverted: true,
      leadSource: "-",
      createdBy: "Solar CRM",
      createdAt: "29 Oct 2026, 14:54",
      status: "New"
    }
  ];

  const dealsData = [
    {
      id: 1,
      createdBy: "Solar CRM",
      dealName: "#01INV-test customer",
      stage: "Contacted",
      dealValue: "₹2.00",
      status: "Paused"
    }
  ];

  const tasksData = [
    {
      id: 1,
      taskInfo: "Send proposal",
      projectName: "-",
      taskType: "-",
      status: "Pending",
      dueDate: "08 Nov 2026"
    }
  ];

  const followupsData = [
    {
      id: 1,
      purpose: "Purpose",
      target: "test lead (Lead)",
      followupAt: "29 Oct 2026\n02:55 PM",
      priority: "Medium",
      staff: "Solar CRM",
      status: "Completed"
    }
  ];

  // Active subitem title mapping
  const reportTitles: Record<ReportType, { title: string; subItemName: string }> = {
    customers: { title: "Customers Report", subItemName: "Customer Reports" },
    leads: { title: "Leads Report", subItemName: "Lead Reports" },
    deals: { title: "Deals Report", subItemName: "Deal Reports" },
    tasks: { title: "Tasks Report", subItemName: "Task Reports" },
    followups: { title: "Followups Report", subItemName: "Followup Reports" }
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
        activeItem="Manage Reports"
        activeSubItem={reportTitles[activeReport].subItemName}
      />

      {/* Main Container */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        {/* Top Header */}
        <header
          className={`border-b sticky top-0 z-30 px-6 py-3 flex items-center justify-between shadow-sm transition-colors duration-300 ${
            isDarkMode
              ? "bg-[#0f172a] border-slate-800 text-white"
              : "bg-white border-slate-200 text-[#1e293b]"
          }`}
        >
          {/* Left search */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-slate-400 p-1.5 hover:bg-slate-700/50 rounded-lg lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search anything..."
                className={`w-full pl-9 pr-4 py-2 border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  isDarkMode
                    ? "bg-slate-800/80 border-slate-700 text-white placeholder-slate-400"
                    : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                }`}
              />
            </div>
          </div>

          {/* Right action buttons */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <button
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  isDarkMode
                    ? "border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                <span>CRM</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  isDarkMode
                    ? "border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
                <span>Estimate</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

            <button
              className={`p-2 rounded-xl transition-colors ${
                isDarkMode ? "text-slate-400 hover:bg-slate-800" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <Headphones className="w-4 h-4" />
            </button>
            <button
              className={`relative p-2 rounded-xl transition-colors ${
                isDarkMode ? "text-slate-400 hover:bg-slate-800" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                19
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className={`p-2 rounded-xl transition-all ${
                isDarkMode
                  ? "bg-slate-800 text-amber-400 hover:bg-slate-700 shadow-inner"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4 animate-spin-slow" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Profile Dropdown */}
            <div className="relative pl-2 border-l border-slate-300 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className={`flex items-center space-x-2 pl-2 cursor-pointer focus:outline-none transition-colors ${
                  isDarkMode ? "hover:bg-slate-800" : "hover:bg-slate-100"
                }`}
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-blue-500/40 shadow-sm flex-shrink-0">
                  <Image
                    src="/images/avatar-2.jpg"
                    alt="Solar CRM"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="hidden sm:block text-left">
                  <span
                    className={`text-xs font-semibold block leading-tight ${
                      isDarkMode ? "text-slate-200" : "text-slate-800"
                    }`}
                  >
                    Solar CRM
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    Administrator
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div
                  className={`absolute right-0 top-full mt-2 w-56 rounded-2xl shadow-2xl border py-2 z-50 animate-in fade-in slide-in-from-top-1 ${
                    isDarkMode
                      ? "bg-[#0f172a] border-slate-700 text-slate-200"
                      : "bg-white border-slate-200 text-slate-700"
                  }`}
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <Link
                    href="/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>Profile</span>
                  </Link>
                  <a
                    href="#logs"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    <History className="w-4 h-4 text-slate-400" />
                    <span>Login Logs</span>
                  </a>
                  <a
                    href="#language"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    <Globe className="w-4 h-4 text-slate-400" />
                    <span>Change Language</span>
                  </a>
                  <Link
                    href="/settings"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span>Settings</span>
                  </Link>
                  <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>
                  <Link
                    href="/admin/login"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Logout</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 max-w-[1600px] w-full mx-auto space-y-6">
          {/* Quick Sub-Navigation Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {(["customers", "leads", "deals", "tasks", "followups"] as ReportType[]).map((type) => (
              <button
                key={type}
                onClick={() => {
                  setActiveReport(type);
                  clearTableFilters();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition shadow-xs whitespace-nowrap cursor-pointer ${
                  activeReport === type
                    ? "bg-[#0b2447] text-white"
                    : "bg-white dark:bg-[#111c38] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50"
                }`}
              >
                {type} Report
              </button>
            ))}
          </div>

          {/* CARD 1: CHART SECTION */}
          <div className="bg-white dark:bg-[#111c38] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
            {/* Top Bar with Title and Date Pickers */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <h1 className="text-xl font-bold text-[#1e293b] dark:text-white">
                {reportTitles[activeReport].title}
              </h1>

              {/* Top Filters Bar */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                {/* Year */}
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Year:</span>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                  >
                    <option>2026</option>
                    <option>2025</option>
                    <option>2024</option>
                  </select>
                </div>

                {/* From Date */}
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    From Date:
                  </span>
                  <div className="relative">
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      placeholder="mm/dd/yyyy"
                      className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
                    />
                  </div>
                </div>

                {/* To Date */}
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">To Date:</span>
                  <div className="relative">
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      placeholder="mm/dd/yyyy"
                      className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={resetTopFilters}
                  className="px-5 py-1.5 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg font-semibold transition shadow-sm"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <span
                className={`w-3.5 h-3.5 rounded-full inline-block ${
                  activeReport === "customers"
                    ? "bg-[#14b8a6]"
                    : activeReport === "leads"
                    ? "bg-[#fbcfe8]"
                    : "bg-[#bae6fd]"
                }`}
              ></span>
              <span className="capitalize">
                {activeReport === "customers"
                  ? "Customers Created"
                  : activeReport === "leads"
                  ? "Lead"
                  : activeReport === "deals"
                  ? "Deals"
                  : activeReport === "tasks"
                  ? "Tasks"
                  : "Followups"}
              </span>
            </div>

            {/* SVG Interactive Chart Canvas */}
            <div className="relative h-64 w-full pt-4">
              {/* Y Axis labels */}
              <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[11px] text-slate-400 pr-2">
                <span>{activeReport === "customers" ? "2" : "1"}</span>
                <span>{activeReport === "customers" ? "1" : "0.5"}</span>
                <span>0</span>
              </div>

              {/* Y Axis Title */}
              <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-slate-400 font-semibold tracking-wider">
                Number of {activeReport.charAt(0).toUpperCase() + activeReport.slice(1)}
              </div>

              {/* Chart Body */}
              <div className="ml-8 h-full flex flex-col justify-between">
                <div className="flex-1 relative border-b border-slate-200 dark:border-slate-700">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="border-b border-slate-100 dark:border-slate-800 w-full"></div>
                    <div className="border-b border-slate-100 dark:border-slate-800 w-full"></div>
                    <div className="border-b border-slate-100 dark:border-slate-800 w-full"></div>
                  </div>

                  {/* CUSTOMERS REPORT: Wave SVG Line Chart (Screenshot 1) */}
                  {activeReport === "customers" && (
                    <svg
                      className="absolute inset-0 w-full h-full overflow-visible"
                      preserveAspectRatio="none"
                      viewBox="0 0 1200 200"
                    >
                      <defs>
                        <linearGradient id="customerGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Area */}
                      <path
                        d="M 50 195 L 850 195 Q 950 195 980 20 Q 1010 195 1100 195 L 1150 195 Z"
                        fill="url(#customerGrad)"
                      />
                      {/* Smooth Curve */}
                      <path
                        d="M 50 195 L 850 195 Q 950 195 980 20 Q 1010 195 1100 195 L 1150 195"
                        fill="none"
                        stroke="#14b8a6"
                        strokeWidth="3"
                      />
                      {/* Dots on months */}
                      {[50, 150, 250, 350, 450, 550, 650, 750, 850].map((cx, i) => (
                        <circle key={i} cx={cx} cy="195" r="4" fill="#14b8a6" />
                      ))}
                      {/* Peak dot on Oct */}
                      <circle cx="980" cy="20" r="5" fill="#14b8a6" stroke="#fff" strokeWidth="2" />
                      <circle cx="1150" cy="195" r="4" fill="#14b8a6" />
                    </svg>
                  )}

                  {/* LEADS REPORT: Vertical Bar Chart in Oct (Screenshot 3) */}
                  {activeReport === "leads" && (
                    <div className="absolute inset-0 flex items-end">
                      <div className="grid grid-cols-12 w-full h-full items-end">
                        <div className="col-start-10 col-span-1 h-full flex flex-col justify-end items-center">
                          <div className="w-full bg-[#fbcfe8] border-t-2 border-[#f472b6] h-[95%] rounded-t-sm relative group cursor-pointer">
                            {/* Hover tooltip */}
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 shadow-md border px-2 py-1 rounded text-[10px] whitespace-nowrap">
                              Oct: 1 Lead
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* DEALS REPORT: Vertical Bar in Nov (Screenshot 5) */}
                  {activeReport === "deals" && (
                    <div className="absolute inset-0 flex items-end">
                      <div className="grid grid-cols-12 w-full h-full items-end">
                        <div className="col-start-11 col-span-1 h-full flex flex-col justify-end items-center">
                          <div className="w-full bg-[#bae6fd] border-t-2 border-[#38bdf8] h-[95%] rounded-t-sm relative group cursor-pointer">
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 shadow-md border px-2 py-1 rounded text-[10px] whitespace-nowrap">
                              Nov: 1 Deal
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TASKS REPORT: Vertical Bar in Nov (Screenshot 7) */}
                  {activeReport === "tasks" && (
                    <div className="absolute inset-0 flex items-end">
                      <div className="grid grid-cols-12 w-full h-full items-end">
                        <div className="col-start-11 col-span-1 h-full flex flex-col justify-end items-center">
                          <div className="w-full bg-[#bae6fd] border-t-2 border-[#38bdf8] h-[95%] rounded-t-sm relative group cursor-pointer">
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 shadow-md border px-2 py-1 rounded text-[10px] whitespace-nowrap">
                              Nov: 1 Task
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FOLLOWUPS REPORT: Vertical Bar in Oct (Screenshot 9) */}
                  {activeReport === "followups" && (
                    <div className="absolute inset-0 flex items-end">
                      <div className="grid grid-cols-12 w-full h-full items-end">
                        <div className="col-start-10 col-span-1 h-full flex flex-col justify-end items-center">
                          <div className="w-full bg-[#bae6fd] border-t-2 border-[#38bdf8] h-[95%] rounded-t-sm relative group cursor-pointer">
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 shadow-md border px-2 py-1 rounded text-[10px] whitespace-nowrap">
                              Oct: 1 Followup
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Interactive Tooltip Card on Month (from Screenshot 1) */}
                  {activeReport === "customers" && (
                    <div className="absolute right-16 bottom-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 shadow-lg text-[11px]">
                      <div className="font-bold text-slate-800 dark:text-white">Nov</div>
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 mt-1">
                        <span className="w-2.5 h-2.5 bg-[#14b8a6] rounded-xs inline-block"></span>
                        <span>Customers: 0</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* X Axis Months */}
                <div className="grid grid-cols-12 text-center text-[11px] text-slate-500 dark:text-slate-400 pt-2">
                  {months.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
                <div className="text-center text-[10px] text-slate-400 font-semibold tracking-wider pt-1">
                  Month
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: REPORT DATA TABLE SECTION */}
          <div className="bg-white dark:bg-[#111c38] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
            {/* Table Search & Export Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder={`Search ${activeReport}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                  <span>Filters</span>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 shadow-xs">
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Export</span>
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

            {/* TAB-SPECIFIC FILTERS ROW */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              {/* 1. CUSTOMERS FILTERS (Screenshot 2) */}
              {activeReport === "customers" && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      From - To
                    </label>
                    <div className="relative">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="From - To"
                        value={filterDateRange}
                        onChange={(e) => setFilterDateRange(e.target.value)}
                        className="w-full pl-8 pr-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Status
                    </label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                    >
                      <option>All statuses</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Customer Type
                    </label>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                    >
                      <option>All types</option>
                      <option>Individual</option>
                      <option>Commercial</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={clearTableFilters}
                      className="w-full py-1.5 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 2. LEADS FILTERS (Screenshot 4) */}
              {activeReport === "leads" && (
                <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Created At
                    </label>
                    <input
                      type="text"
                      placeholder="From - To"
                      value={filterDateRange}
                      onChange={(e) => setFilterDateRange(e.target.value)}
                      className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Status
                    </label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                    >
                      <option>All statuses</option>
                      <option>New</option>
                      <option>Contacted</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Lead Source
                    </label>
                    <select
                      value={filterSource}
                      onChange={(e) => setFilterSource(e.target.value)}
                      className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                    >
                      <option>All sources</option>
                      <option>Website</option>
                      <option>Referral</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Lead Stage
                    </label>
                    <select
                      value={filterStage}
                      onChange={(e) => setFilterStage(e.target.value)}
                      className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                    >
                      <option>All stages</option>
                      <option>Document Verification</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Created By
                    </label>
                    <select
                      value={filterStaff}
                      onChange={(e) => setFilterStaff(e.target.value)}
                      className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                    >
                      <option>All creators</option>
                      <option>Solar CRM</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Assigned To
                    </label>
                    <select
                      className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                    >
                      <option>All assignees</option>
                      <option>Solar CRM</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={clearTableFilters}
                      className="w-full py-1.5 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 3. DEALS FILTERS (Screenshot 6) */}
              {activeReport === "deals" && (
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Customer Name
                    </label>
                    <select className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs">
                      <option>All customer name</option>
                      <option>test customer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Created By
                    </label>
                    <select className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs">
                      <option>All staff</option>
                      <option>Solar CRM</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Estimate Amount
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filterMinAmount}
                        onChange={(e) => setFilterMinAmount(e.target.value)}
                        className="w-1/2 px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filterMaxAmount}
                        onChange={(e) => setFilterMaxAmount(e.target.value)}
                        className="w-1/2 px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Status
                    </label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                    >
                      <option>All statuses</option>
                      <option>Paused</option>
                      <option>Active</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={clearTableFilters}
                      className="w-full py-1.5 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 4. TASKS FILTERS (Screenshot 8) */}
              {activeReport === "tasks" && (
                <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Customer Name
                    </label>
                    <select className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs">
                      <option>All customer n</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Staff
                    </label>
                    <select className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs">
                      <option>All staff</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Task Type
                    </label>
                    <select className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs">
                      <option>All task types</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Status
                    </label>
                    <select className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs">
                      <option>All statuses</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Due Date
                    </label>
                    <input
                      type="text"
                      placeholder="From - To"
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={clearTableFilters}
                      className="w-full py-1.5 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 5. FOLLOWUPS FILTERS (Screenshot 10) */}
              {activeReport === "followups" && (
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Staff
                    </label>
                    <select className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs">
                      <option>All staff</option>
                      <option>Solar CRM</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Created At
                    </label>
                    <input
                      type="text"
                      placeholder="From - To"
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Follow Up Date
                    </label>
                    <input
                      type="text"
                      placeholder="From - To"
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Status
                    </label>
                    <select className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs">
                      <option>All statuses</option>
                      <option>Completed</option>
                      <option>Pending</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={clearTableFilters}
                      className="w-full py-1.5 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* TAB-SPECIFIC DATA TABLES */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                {/* 1. CUSTOMERS TABLE */}
                {activeReport === "customers" && (
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 text-[11px] font-bold text-slate-500 uppercase">
                        <th className="py-3 px-4 w-16">SR.NO</th>
                        <th className="py-3 px-4">CUSTOMER NAME</th>
                        <th className="py-3 px-4">EMAIL</th>
                        <th className="py-3 px-4">PHONE</th>
                        <th className="py-3 px-4">TYPE</th>
                        <th className="py-3 px-4">STATUS</th>
                        <th className="py-3 px-4 text-center">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {customersData.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                          <td className="py-3.5 px-4 font-medium text-slate-500">{c.id}</td>
                          <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                            {c.name}
                          </td>
                          <td className="py-3.5 px-4 text-slate-500">{c.email}</td>
                          <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                            {c.phone}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                            {c.type}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#dcfce7] text-[#15803d]">
                              {c.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {/* 2. LEADS TABLE */}
                {activeReport === "leads" && (
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 text-[11px] font-bold text-slate-500 uppercase">
                        <th className="py-3 px-4 w-16">SR.NO</th>
                        <th className="py-3 px-4">LEAD NAME</th>
                        <th className="py-3 px-4">LEAD SOURCE</th>
                        <th className="py-3 px-4">CREATED BY</th>
                        <th className="py-3 px-4">CREATED AT</th>
                        <th className="py-3 px-4">STATUS</th>
                        <th className="py-3 px-4 text-center">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {leadsData.map((l) => (
                        <tr key={l.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                          <td className="py-3.5 px-4 font-medium text-slate-500">{l.id}</td>
                          <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                            <span>{l.name}</span>
                            {l.isConverted && (
                              <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                                🍃 Converted
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-slate-500">{l.leadSource}</td>
                          <td className="py-3.5 px-4 font-medium text-slate-800 dark:text-slate-200">
                            {l.createdBy}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                            {l.createdAt}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#e0f2fe] text-[#0284c7]">
                              {l.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {/* 3. DEALS TABLE */}
                {activeReport === "deals" && (
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 text-[11px] font-bold text-slate-500 uppercase">
                        <th className="py-3 px-4 w-16">SR.NO</th>
                        <th className="py-3 px-4">CREATED BY</th>
                        <th className="py-3 px-4">DEAL NAME</th>
                        <th className="py-3 px-4">STAGE</th>
                        <th className="py-3 px-4">DEAL VALUE</th>
                        <th className="py-3 px-4">STATUS</th>
                        <th className="py-3 px-4 text-center">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {dealsData.map((d) => (
                        <tr key={d.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                          <td className="py-3.5 px-4 font-medium text-slate-500">{d.id}</td>
                          <td className="py-3.5 px-4 font-medium text-slate-800 dark:text-slate-200">
                            {d.createdBy}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                            {d.dealName}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                            {d.stage}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                            {d.dealValue}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#fef3c7] text-[#b45309]">
                              {d.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {/* 4. TASKS TABLE */}
                {activeReport === "tasks" && (
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 text-[11px] font-bold text-slate-500 uppercase">
                        <th className="py-3 px-4 w-16">SR.NO</th>
                        <th className="py-3 px-4">TASK INFO</th>
                        <th className="py-3 px-4">PROJECT NAME</th>
                        <th className="py-3 px-4">TASK TYPE</th>
                        <th className="py-3 px-4">STATUS</th>
                        <th className="py-3 px-4">DUE DATE</th>
                        <th className="py-3 px-4 text-center">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {tasksData.map((t) => (
                        <tr key={t.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                          <td className="py-3.5 px-4 font-medium text-slate-500">{t.id}</td>
                          <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                            {t.taskInfo}
                          </td>
                          <td className="py-3.5 px-4 text-slate-500">{t.projectName}</td>
                          <td className="py-3.5 px-4 text-slate-500">{t.taskType}</td>
                          <td className="py-3.5 px-4">
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#fef3c7] text-[#b45309]">
                              {t.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                            {t.dueDate}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {/* 5. FOLLOWUPS TABLE */}
                {activeReport === "followups" && (
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 text-[11px] font-bold text-slate-500 uppercase">
                        <th className="py-3 px-4">PURPOSE & TARGET</th>
                        <th className="py-3 px-4">FOLLOW UP AT</th>
                        <th className="py-3 px-4 text-center">PRIORITY</th>
                        <th className="py-3 px-4">STAFF</th>
                        <th className="py-3 px-4">STATUS</th>
                        <th className="py-3 px-4 text-center">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {followupsData.map((f) => (
                        <tr key={f.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                          <td className="py-3.5 px-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                              T
                            </div>
                            <div>
                              <div className="font-bold text-slate-800 dark:text-white">
                                {f.purpose}
                              </div>
                              <div className="text-[11px] text-slate-400">{f.target}</div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-medium whitespace-pre-line">
                            {f.followupAt}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-blue-600 text-white">
                              {f.priority}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                            {f.staff}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#dcfce7] text-[#15803d]">
                              {f.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Table Pagination Footer */}
              <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                <div>Showing 1 to 1 of 1 results</div>
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
          </div>

          {/* Footer Note */}
          <div className="text-center text-xs text-slate-400 pt-8 pb-4">
            © 2026 Copyright - Fablead Developers Technolab
          </div>
        </div>
      </div>
    </div>
  );
}

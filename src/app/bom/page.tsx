"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminSidebar from "@/components/AdminSidebar";
import {
  Search,
  SlidersHorizontal,
  Plus,
  Pencil,
  Eye,
  Trash2,
  Calendar,
  X,
  RotateCcw,
  ArrowLeft,
  Briefcase,
  FileSpreadsheet,
  Headphones,
  Bell,
  Sun,
  Moon,
  Menu,
  User,
  History,
  Globe,
  Settings,
  LogOut,
  Zap,
  ChevronDown,
  Layers,
  Sparkles,
  Package,
  Wrench,
  Percent,
  Cpu,
  Shield,
  Ruler,
  Maximize2
} from "lucide-react";

export interface BOMItem {
  id: number;
  srNo: number;
  name: string;
  hsnSac: string;
  make: string;
  technology: string;
  warranty: string;
  price: string;
  taxType: string;
  taxRate: string;
  capacity: string;
  sizeOfPipe: string;
  thickness: string;
  height: string;
  fittingType: string;
  fittingMaterial: string;
  meter: string;
  nosPieces: string;
  image: string;
  description: string;
  createdAt: string;
  createdBy: string;
}

export type BOMSubPage = "all-bom" | "all-make" | "all-warranty" | "all-technology";

interface BOMPageProps {
  initialSubPage?: BOMSubPage;
}

export default function BOMPage({ initialSubPage = "all-bom" }: BOMPageProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Active subpage tab
  const [currentSubPage, setCurrentSubPage] = useState<BOMSubPage>(initialSubPage);

  // Views: "list" | "create" | "details"
  const [currentView, setCurrentView] = useState<"list" | "create" | "details">("list");
  const [selectedBOM, setSelectedBOM] = useState<BOMItem | null>(null);

  // Quick BOM modal
  const [isQuickBOMOpen, setIsQuickBOMOpen] = useState(false);
  const [quickForm, setQuickForm] = useState({
    name: "",
    hsnSac: "",
    make: "",
    price: "0",
    technology: "",
    warranty: ""
  });

  // Master Lists for sub-items
  const [makesList, setMakesList] = useState<string[]>([
    "Tata Power Solar",
    "Loom Solar",
    "Waaree",
    "Havells",
    "Adani Solar"
  ]);
  const [warrantiesList, setWarrantiesList] = useState<string[]>([
    "5 Years",
    "10 Years",
    "12 Years",
    "25 Years Performance"
  ]);
  const [technologiesList, setTechnologiesList] = useState<string[]>([
    "Mono PERC",
    "Polycrystalline",
    "Bifacial",
    "TOPCon",
    "Microinverter"
  ]);

  // Main BOM Items list
  const [bomList, setBOMList] = useState<BOMItem[]>([
    {
      id: 1,
      srNo: 1,
      name: "Test",
      hsnSac: "-",
      make: "-",
      technology: "-",
      warranty: "-",
      price: "0",
      taxType: "Select Tax",
      taxRate: "Select Rate",
      capacity: "-",
      sizeOfPipe: "-",
      thickness: "-",
      height: "-",
      fittingType: "-",
      fittingMaterial: "-",
      meter: "-",
      nosPieces: "-",
      image: "/images/solar-logo.png",
      description: "-",
      createdAt: "06 Nov 2026, 15:16",
      createdBy: "Solar CRM"
    }
  ]);

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMake, setFilterMake] = useState("");
  const [filterTechnology, setFilterTechnology] = useState("");
  const [filterWarranty, setFilterWarranty] = useState("");
  const [filterCreatedAt, setFilterCreatedAt] = useState("");

  // Full Create/Edit Form State
  const [formData, setFormData] = useState({
    name: "",
    make: "Select Make",
    hsnSac: "",
    price: "",
    taxType: "Select Tax",
    taxRate: "Select Rate",
    technology: "Select Technology",
    warranty: "Select Warranty",
    capacity: "",
    sizeOfPipe: "",
    thickness: "",
    height: "",
    fittingType: "",
    fittingMaterial: "",
    meter: "",
    nosPieces: "",
    imageName: "",
    description: ""
  });

  // Quick modals for adding Make / Technology / Warranty inline
  const [inlineModalType, setInlineModalType] = useState<"make" | "technology" | "warranty" | null>(null);
  const [inlineNewValue, setInlineNewValue] = useState("");

  const clearFilters = () => {
    setSearchQuery("");
    setFilterMake("");
    setFilterTechnology("");
    setFilterWarranty("");
    setFilterCreatedAt("");
  };

  // Quick BOM Submit
  const handleQuickBOMSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickForm.name.trim()) {
      alert("Please enter BOM Name");
      return;
    }

    const newItem: BOMItem = {
      id: Date.now(),
      srNo: bomList.length + 1,
      name: quickForm.name,
      hsnSac: quickForm.hsnSac || "-",
      make: quickForm.make || "-",
      technology: quickForm.technology || "-",
      warranty: quickForm.warranty || "-",
      price: quickForm.price || "0",
      taxType: "Select Tax",
      taxRate: "Select Rate",
      capacity: "-",
      sizeOfPipe: "-",
      thickness: "-",
      height: "-",
      fittingType: "-",
      fittingMaterial: "-",
      meter: "-",
      nosPieces: "-",
      image: "/images/solar-logo.png",
      description: "-",
      createdAt: "13 Nov 2026, 10:00",
      createdBy: "Solar CRM"
    };

    setBOMList([newItem, ...bomList]);
    setIsQuickBOMOpen(false);
    setQuickForm({
      name: "",
      hsnSac: "",
      make: "",
      price: "0",
      technology: "",
      warranty: ""
    });
  };

  // Full Add BOM Submit
  const handleFullBOMSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Please enter BOM Name");
      return;
    }

    const newItem: BOMItem = {
      id: Date.now(),
      srNo: bomList.length + 1,
      name: formData.name,
      hsnSac: formData.hsnSac || "-",
      make: formData.make === "Select Make" ? "-" : formData.make,
      technology: formData.technology === "Select Technology" ? "-" : formData.technology,
      warranty: formData.warranty === "Select Warranty" ? "-" : formData.warranty,
      price: formData.price || "0",
      taxType: formData.taxType,
      taxRate: formData.taxRate,
      capacity: formData.capacity || "-",
      sizeOfPipe: formData.sizeOfPipe || "-",
      thickness: formData.thickness || "-",
      height: formData.height || "-",
      fittingType: formData.fittingType || "-",
      fittingMaterial: formData.fittingMaterial || "-",
      meter: formData.meter || "-",
      nosPieces: formData.nosPieces || "-",
      image: "/images/solar-logo.png",
      description: formData.description || "-",
      createdAt: "13 Nov 2026, 10:00",
      createdBy: "Solar CRM"
    };

    setBOMList([newItem, ...bomList]);
    setCurrentView("list");
    // Reset
    setFormData({
      name: "",
      make: "Select Make",
      hsnSac: "",
      price: "",
      taxType: "Select Tax",
      taxRate: "Select Rate",
      technology: "Select Technology",
      warranty: "Select Warranty",
      capacity: "",
      sizeOfPipe: "",
      thickness: "",
      height: "",
      fittingType: "",
      fittingMaterial: "",
      meter: "",
      nosPieces: "",
      imageName: "",
      description: ""
    });
  };

  const handleSaveInlineModal = () => {
    if (!inlineNewValue.trim()) return;
    if (inlineModalType === "make") {
      setMakesList([...makesList, inlineNewValue]);
      setFormData((prev) => ({ ...prev, make: inlineNewValue }));
    } else if (inlineModalType === "technology") {
      setTechnologiesList([...technologiesList, inlineNewValue]);
      setFormData((prev) => ({ ...prev, technology: inlineNewValue }));
    } else if (inlineModalType === "warranty") {
      setWarrantiesList([...warrantiesList, inlineNewValue]);
      setFormData((prev) => ({ ...prev, warranty: inlineNewValue }));
    }
    setInlineModalType(null);
    setInlineNewValue("");
  };

  const handleDeleteBOM = (id: number) => {
    if (confirm("Are you sure you want to delete this BOM?")) {
      setBOMList((prev) => prev.filter((b) => b.id !== id));
      if (selectedBOM && selectedBOM.id === id) {
        setCurrentView("list");
      }
    }
  };

  const filteredBOM = bomList.filter((b) => {
    const matchesSearch =
      searchQuery === "" ||
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.make.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMake =
      filterMake === "" || filterMake === "All make" || b.make.toLowerCase().includes(filterMake.toLowerCase());
    const matchesTech =
      filterTechnology === "" ||
      filterTechnology === "All technology" ||
      b.technology.toLowerCase().includes(filterTechnology.toLowerCase());
    const matchesWarr =
      filterWarranty === "" ||
      filterWarranty === "All warranty" ||
      b.warranty.toLowerCase().includes(filterWarranty.toLowerCase());
    return matchesSearch && matchesMake && matchesTech && matchesWarr;
  });

  const getSubItemTitle = () => {
    switch (currentSubPage) {
      case "all-make":
        return "All Make";
      case "all-warranty":
        return "All Warranty";
      case "all-technology":
        return "All Technology";
      default:
        return "All BOM";
    }
  };

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
        activeItem="Manage BOM"
        activeSubItem={getSubItemTitle()}
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
        <div className="p-6 max-w-[1600px] w-full mx-auto space-y-5">
          {/* VIEW 1: MANAGE BOM LIST (Screenshot 1) */}
          {currentView === "list" && (
            <>
              {/* Header Title & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-[#1e293b] dark:text-white">Manage BOM</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Manage BOM inventory records in Solar CRM.
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setIsQuickBOMOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold shadow-sm transition"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>Quick BOM</span>
                  </button>
                  <button
                    onClick={() => setCurrentView("create")}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold shadow-sm transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add BOM</span>
                  </button>
                </div>
              </div>

              {/* Subpage Tabs (All BOM / All Make / All Warranty / All Technology) */}
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                {[
                  { id: "all-bom", label: "All BOM" },
                  { id: "all-make", label: "All Make" },
                  { id: "all-warranty", label: "All Warranty" },
                  { id: "all-technology", label: "All Technology" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentSubPage(tab.id as BOMSubPage)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                      currentSubPage === tab.id
                        ? "bg-[#0b2447] text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Filters Panel */}
              <div className="bg-white dark:bg-[#111c38] border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search BOM..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100">
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

                {/* Filter Inputs Grid (Screenshot 1) */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-1 border-t border-slate-100 dark:border-slate-800">
                  {/* Make */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Make
                    </label>
                    <select
                      value={filterMake}
                      onChange={(e) => setFilterMake(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                    >
                      <option>All make</option>
                      {makesList.map((m) => (
                        <option key={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  {/* Technology */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Technology
                    </label>
                    <select
                      value={filterTechnology}
                      onChange={(e) => setFilterTechnology(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                    >
                      <option>All technology</option>
                      {technologiesList.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  {/* Warranty */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Warranty
                    </label>
                    <select
                      value={filterWarranty}
                      onChange={(e) => setFilterWarranty(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                    >
                      <option>All warranty</option>
                      {warrantiesList.map((w) => (
                        <option key={w}>{w}</option>
                      ))}
                    </select>
                  </div>

                  {/* Created At & Clear */}
                  <div className="md:col-span-2 flex items-end gap-2">
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
                      className="px-5 py-1.5 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* BOM Table */}
              <div className="bg-white dark:bg-[#111c38] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        <th className="py-3 px-4 w-16">SR.NO</th>
                        <th className="py-3 px-4">NAME</th>
                        <th className="py-3 px-4">HSN/SAC</th>
                        <th className="py-3 px-4">MAKE</th>
                        <th className="py-3 px-4">TECHNOLOGY</th>
                        <th className="py-3 px-4">WARRANTY</th>
                        <th className="py-3 px-4">CREATED AT</th>
                        <th className="py-3 px-4 text-center">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
                      {filteredBOM.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-10 text-center text-slate-400">
                            No BOM records found
                          </td>
                        </tr>
                      ) : (
                        filteredBOM.map((b) => (
                          <tr
                            key={b.id}
                            className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition"
                          >
                            <td className="py-3.5 px-4 font-medium text-slate-500">{b.srNo}</td>
                            <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                              {b.name}
                            </td>
                            <td className="py-3.5 px-4 text-slate-500">{b.hsnSac}</td>
                            <td className="py-3.5 px-4 text-slate-500">{b.make}</td>
                            <td className="py-3.5 px-4 text-slate-500">{b.technology}</td>
                            <td className="py-3.5 px-4 text-slate-500">{b.warranty}</td>
                            <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                              {b.createdAt}
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => {
                                    setSelectedBOM(b);
                                    setFormData({
                                      name: b.name,
                                      make: b.make,
                                      hsnSac: b.hsnSac,
                                      price: b.price,
                                      taxType: b.taxType,
                                      taxRate: b.taxRate,
                                      technology: b.technology,
                                      warranty: b.warranty,
                                      capacity: b.capacity,
                                      sizeOfPipe: b.sizeOfPipe,
                                      thickness: b.thickness,
                                      height: b.height,
                                      fittingType: b.fittingType,
                                      fittingMaterial: b.fittingMaterial,
                                      meter: b.meter,
                                      nosPieces: b.nosPieces,
                                      imageName: "",
                                      description: b.description
                                    });
                                    setCurrentView("create");
                                  }}
                                  title="Edit"
                                  className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedBOM(b);
                                    setCurrentView("details");
                                  }}
                                  title="View Details"
                                  className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteBOM(b.id)}
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
                    Showing 1 to {filteredBOM.length} of {filteredBOM.length} results
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

          {/* VIEW 2: ADD BOM FULL FORM (Screenshots 3 & 4) */}
          {currentView === "create" && (
            <div className="space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-[#1e293b] dark:text-white">Add BOM</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Create a BOM entry in Solar CRM.
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
                onSubmit={handleFullBOMSubmit}
                className="bg-white dark:bg-[#111c38] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6 text-xs"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                        Name <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="BOM name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Make with + button */}
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-slate-400" />
                        Make
                      </span>
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={formData.make}
                        onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                        className="flex-1 px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                      >
                        <option>Select Make</option>
                        {makesList.map((m) => (
                          <option key={m}>{m}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => {
                          setInlineModalType("make");
                          setInlineNewValue("");
                        }}
                        className="px-3 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg flex items-center justify-center transition shadow-sm"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* HSN/SAC Code */}
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <span className="text-slate-400 font-bold">#</span>
                        HSN/SAC Code
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter HSN/SAC code"
                      value={formData.hsnSac}
                      onChange={(e) => setFormData({ ...formData, hsnSac: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <span className="text-slate-400 font-bold">🏷️</span>
                        Price <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter price"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Tax Type */}
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Percent className="w-3.5 h-3.5 text-slate-400" />
                        Tax Type
                      </span>
                    </label>
                    <select
                      value={formData.taxType}
                      onChange={(e) => setFormData({ ...formData, taxType: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                    >
                      <option>Select Tax</option>
                      <option>Inclusive</option>
                      <option>Exclusive</option>
                      <option>Exempted</option>
                    </select>
                  </div>

                  {/* Tax Rate (%) */}
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Percent className="w-3.5 h-3.5 text-slate-400" />
                        Tax Rate (%)
                      </span>
                    </label>
                    <select
                      value={formData.taxRate}
                      onChange={(e) => setFormData({ ...formData, taxRate: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                    >
                      <option>Select Rate</option>
                      <option>5%</option>
                      <option>12%</option>
                      <option>18%</option>
                      <option>28%</option>
                    </select>
                  </div>

                  {/* Technology with + button */}
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-slate-400" />
                        Technology
                      </span>
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={formData.technology}
                        onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
                        className="flex-1 px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                      >
                        <option>Select Technology</option>
                        {technologiesList.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => {
                          setInlineModalType("technology");
                          setInlineNewValue("");
                        }}
                        className="px-3 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg flex items-center justify-center transition shadow-sm"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Warranty with + button */}
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-slate-400" />
                        Warranty
                      </span>
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={formData.warranty}
                        onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                        className="flex-1 px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                      >
                        <option>Select Warranty</option>
                        {warrantiesList.map((w) => (
                          <option key={w}>{w}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => {
                          setInlineModalType("warranty");
                          setInlineNewValue("");
                        }}
                        className="px-3 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg flex items-center justify-center transition shadow-sm"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Capacity */}
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-slate-400" />
                        Capacity
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter capacity"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Size of Pipe */}
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Ruler className="w-3.5 h-3.5 text-slate-400" />
                        Size of Pipe
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter size of pipe"
                      value={formData.sizeOfPipe}
                      onChange={(e) => setFormData({ ...formData, sizeOfPipe: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Thickness */}
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                        Thickness
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter thickness"
                      value={formData.thickness}
                      onChange={(e) => setFormData({ ...formData, thickness: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Height */}
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Ruler className="w-3.5 h-3.5 text-slate-400" />
                        Height
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter height"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Fitting Type */}
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-slate-400" />
                        Fitting Type
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter fitting type"
                      value={formData.fittingType}
                      onChange={(e) => setFormData({ ...formData, fittingType: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Fitting Material */}
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-slate-400" />
                        Fitting Material
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter fitting material"
                      value={formData.fittingMaterial}
                      onChange={(e) => setFormData({ ...formData, fittingMaterial: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Meter */}
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Pencil className="w-3.5 h-3.5 text-slate-400" />
                        Meter
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter meter"
                      value={formData.meter}
                      onChange={(e) => setFormData({ ...formData, meter: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Nos (Pieces) */}
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-slate-400" />
                        Nos (Pieces)
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter pieces count"
                      value={formData.nosPieces}
                      onChange={(e) => setFormData({ ...formData, nosPieces: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Image Upload Area */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="block font-semibold text-slate-700 dark:text-slate-300">
                      Image
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-md border border-slate-300 dark:border-slate-700 text-xs font-medium transition">
                        Choose File
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setFormData({ ...formData, imageName: e.target.files[0].name });
                            }
                          }}
                        />
                      </label>
                      <span className="text-slate-400 text-xs">
                        {formData.imageName || "No file chosen"}
                      </span>
                    </div>

                    {/* Logo/Image Preview */}
                    <div className="w-24 h-24 p-2 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-800">
                      <Image
                        src="/images/solar-logo.png"
                        alt="Preview"
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Pencil className="w-3.5 h-3.5 text-slate-400" />
                        Description
                      </span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Enter BOM description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                </div>

                {/* Form Footer Buttons */}
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
                    className="px-6 py-2 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold transition shadow-sm"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* VIEW 3: BOM DETAILS (Screenshot 5) */}
          {currentView === "details" && selectedBOM && (
            <div className="space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-[#1e293b] dark:text-white">BOM Details</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Complete information about this BOM
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setFormData({
                        name: selectedBOM.name,
                        make: selectedBOM.make,
                        hsnSac: selectedBOM.hsnSac,
                        price: selectedBOM.price,
                        taxType: selectedBOM.taxType,
                        taxRate: selectedBOM.taxRate,
                        technology: selectedBOM.technology,
                        warranty: selectedBOM.warranty,
                        capacity: selectedBOM.capacity,
                        sizeOfPipe: selectedBOM.sizeOfPipe,
                        thickness: selectedBOM.thickness,
                        height: selectedBOM.height,
                        fittingType: selectedBOM.fittingType,
                        fittingMaterial: selectedBOM.fittingMaterial,
                        meter: selectedBOM.meter,
                        nosPieces: selectedBOM.nosPieces,
                        imageName: "",
                        description: selectedBOM.description
                      });
                      setCurrentView("create");
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
              <div className="bg-white dark:bg-[#111c38] border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-sm">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Image Graphic */}
                  <div className="w-44 h-44 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-800 flex-shrink-0">
                    <Image
                      src="/images/solar-logo.png"
                      alt={selectedBOM.name}
                      width={120}
                      height={120}
                      className="object-contain"
                    />
                  </div>

                  {/* Specifications Grid */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-xs">
                    {/* BOM Name */}
                    <div className="flex items-center">
                      <span className="w-36 text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                        BOM Name:
                      </span>
                      <span className="text-slate-800 dark:text-slate-200 font-bold">
                        {selectedBOM.name.toLowerCase()}
                      </span>
                    </div>

                    {/* Created At */}
                    <div className="flex items-center">
                      <span className="w-36 text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        Created At:
                      </span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold">
                        {selectedBOM.createdAt}
                      </span>
                    </div>

                    {/* Created By */}
                    <div className="flex items-center">
                      <span className="w-36 text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        Created By:
                      </span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold">
                        {selectedBOM.createdBy}
                      </span>
                    </div>

                    {/* Warranty */}
                    <div className="flex items-center">
                      <span className="w-36 text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5 text-slate-400" />
                        Warranty:
                      </span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold">
                        {selectedBOM.warranty}
                      </span>
                    </div>

                    {/* Technology */}
                    <div className="flex items-center">
                      <span className="w-36 text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-slate-400" />
                        Technology:
                      </span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold">
                        {selectedBOM.technology}
                      </span>
                    </div>

                    {/* Size of Pipe */}
                    <div className="flex items-center">
                      <span className="w-36 text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                        <Ruler className="w-3.5 h-3.5 text-slate-400" />
                        Size of Pipe:
                      </span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold">
                        {selectedBOM.sizeOfPipe}
                      </span>
                    </div>

                    {/* Capacity */}
                    <div className="flex items-center">
                      <span className="w-36 text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                        <Package className="w-3.5 h-3.5 text-slate-400" />
                        Capacity:
                      </span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold">
                        {selectedBOM.capacity}
                      </span>
                    </div>

                    {/* Height */}
                    <div className="flex items-center">
                      <span className="w-36 text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                        <Ruler className="w-3.5 h-3.5 text-slate-400" />
                        Height:
                      </span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold">
                        {selectedBOM.height}
                      </span>
                    </div>

                    {/* Thickness */}
                    <div className="flex items-center">
                      <span className="w-36 text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                        <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                        Thickness:
                      </span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold">
                        {selectedBOM.thickness}
                      </span>
                    </div>

                    {/* Fitting Material */}
                    <div className="flex items-center">
                      <span className="w-36 text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-slate-400" />
                        Fitting Material:
                      </span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold">
                        {selectedBOM.fittingMaterial}
                      </span>
                    </div>

                    {/* Fitting Type */}
                    <div className="flex items-center">
                      <span className="w-36 text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                        <Wrench className="w-3.5 h-3.5 text-slate-400" />
                        Fitting Type:
                      </span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold">
                        {selectedBOM.fittingType}
                      </span>
                    </div>

                    {/* Make */}
                    <div className="flex items-center">
                      <span className="w-36 text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                        <Wrench className="w-3.5 h-3.5 text-slate-400" />
                        Make:
                      </span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold">
                        {selectedBOM.make}
                      </span>
                    </div>

                    {/* Description */}
                    <div className="flex items-start md:col-span-2">
                      <span className="w-36 text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2 pt-0.5">
                        <Pencil className="w-3.5 h-3.5 text-slate-400" />
                        Description:
                      </span>
                      <span className="text-slate-700 dark:text-slate-300 flex-1 leading-relaxed">
                        {selectedBOM.description}
                      </span>
                    </div>
                  </div>
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

      {/* QUICK BOM MODAL (Screenshot 2) */}
      {isQuickBOMOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="bg-[#0b2447] text-white px-5 py-3.5 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>Quick BOM</span>
                </h2>
                <p className="text-[10px] text-slate-300">
                  Create a BOM quickly with the essential details.
                </p>
              </div>
              <button
                onClick={() => setIsQuickBOMOpen(false)}
                className="text-slate-300 hover:text-white p-1 rounded transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleQuickBOMSubmit} className="p-5 space-y-4 text-xs">
              {/* BOM * */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-slate-400" />
                    BOM <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter new BOM name"
                  value={quickForm.name}
                  onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* HSN/SAC Code */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <span className="text-slate-400 font-bold">#</span>
                    HSN/SAC Code
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter HSN/SAC code"
                  value={quickForm.hsnSac}
                  onChange={(e) => setQuickForm({ ...quickForm, hsnSac: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Make */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-slate-400" />
                    Make
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Search or create Make"
                  value={quickForm.make}
                  onChange={(e) => setQuickForm({ ...quickForm, make: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <span className="text-slate-400 font-bold">₹</span>
                    Price
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="0"
                  value={quickForm.price}
                  onChange={(e) => setQuickForm({ ...quickForm, price: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Technology & Warranty row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-slate-400" />
                      Technology
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Search or create Techn..."
                    value={quickForm.technology}
                    onChange={(e) => setQuickForm({ ...quickForm, technology: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-slate-400" />
                      Warranty
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Search or create Warr..."
                    value={quickForm.warranty}
                    onChange={(e) => setQuickForm({ ...quickForm, warranty: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsQuickBOMOpen(false)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold transition shadow-sm"
                >
                  Add BOM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QUICK INLINE MODAL FOR MAKE / TECHNOLOGY / WARRANTY */}
      {inlineModalType && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-xl shadow-2xl max-w-sm w-full overflow-hidden border border-slate-200 dark:border-slate-800 p-5 space-y-4 text-xs animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold capitalize text-slate-800 dark:text-white">
                Add New {inlineModalType}
              </h3>
              <button
                onClick={() => setInlineModalType(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                {inlineModalType.toUpperCase()} Name
              </label>
              <input
                type="text"
                autoFocus
                placeholder={`Enter new ${inlineModalType}`}
                value={inlineNewValue}
                onChange={(e) => setInlineNewValue(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setInlineModalType(null)}
                className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveInlineModal}
                className="px-4 py-1.5 bg-[#0b2447] text-white rounded-lg text-xs font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

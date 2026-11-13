"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import {
  Search,
  Briefcase,
  FileSpreadsheet,
  Headphones,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  User,
  History,
  Globe,
  Settings,
  LogOut,
  Menu,
  Users,
  UserPlus,
  CheckSquare,
  Handshake,
  Plus,
  Landmark,
  Box,
  X,
  Zap,
  Megaphone,
  PhoneCall,
  LayoutGrid,
} from "lucide-react";

interface AdminHeaderProps {
  sidebarCollapsed?: boolean;
  setSidebarCollapsed?: (collapsed: boolean) => void;
  onSearch?: (query: string) => void;
}

export default function AdminHeader({
  sidebarCollapsed,
  setSidebarCollapsed,
  onSearch,
}: AdminHeaderProps) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [crmDropdownOpen, setCrmDropdownOpen] = useState(false);
  const [estimateDropdownOpen, setEstimateDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isQuickBomOpen, setIsQuickBomOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Quick BOM form state
  const [bomName, setBomName] = useState("");
  const [hsnSacCode, setHsnSacCode] = useState("");
  const [make, setMake] = useState("");
  const [price, setPrice] = useState("");
  const [technology, setTechnology] = useState("");
  const [warranty, setWarranty] = useState("");

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddQuickBom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bomName.trim()) {
      alert("Please enter BOM name");
      return;
    }
    alert(`Quick BOM "${bomName}" added successfully!`);
    setIsQuickBomOpen(false);
    setBomName("");
    setHsnSacCode("");
    setMake("");
    setPrice("");
    setTechnology("");
    setWarranty("");
  };

  const searchableModules = [
    {
      title: "Leads",
      subtitle: "Search leads by name, email, or phone",
      href: "/admin/leads",
      icon: <Megaphone className="w-4 h-4 text-blue-500" />,
      bgColor: "bg-blue-50 dark:bg-blue-950/40",
    },
    {
      title: "Customers",
      subtitle: "Search customers by name, email, or phone",
      href: "/admin/customers",
      icon: <Users className="w-4 h-4 text-emerald-500" />,
      bgColor: "bg-emerald-50 dark:bg-emerald-950/40",
    },
    {
      title: "Tasks",
      subtitle: "Search tasks by title, status, or date",
      href: "/admin/tasks",
      icon: <CheckSquare className="w-4 h-4 text-cyan-500" />,
      bgColor: "bg-cyan-50 dark:bg-cyan-950/40",
    },
    {
      title: "Follow-ups",
      subtitle: "Search follow-ups by purpose, comment, or date",
      href: "/admin/follow-ups",
      icon: <PhoneCall className="w-4 h-4 text-slate-500" />,
      bgColor: "bg-slate-100 dark:bg-slate-800",
    },
    {
      title: "Meetings",
      subtitle: "Search meetings by title, date, or customer",
      href: "/admin/meetings",
      icon: <Handshake className="w-4 h-4 text-emerald-600" />,
      bgColor: "bg-emerald-50 dark:bg-emerald-950/40",
    },
    {
      title: "Partners",
      subtitle: "Search partners by name or details",
      href: "/admin/masters/lead-sources",
      icon: <LayoutGrid className="w-4 h-4 text-indigo-500" />,
      bgColor: "bg-indigo-50 dark:bg-indigo-950/40",
    },
  ];

  const filteredModules = searchableModules.filter(
    (mod) =>
      mod.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      mod.subtitle.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-2.5 bg-white dark:bg-[#111c44] border-b border-slate-200 dark:border-slate-800 transition-colors">
        {/* Left: Mobile menu toggle + Search Bar with Searchable Modules Dropdown (Matches Screenshot) */}
        <div className="flex items-center gap-4">
          {setSidebarCollapsed && (
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-slate-400 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div ref={searchContainerRef} className="relative w-72 md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search anythi..."
              value={searchValue}
              onFocus={() => setSearchFocused(true)}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setSearchFocused(true);
                onSearch?.(e.target.value);
              }}
              className="w-full pl-9 pr-4 py-2 border rounded-xl text-xs bg-slate-50 dark:bg-[#0b1437] border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
            />

            {/* SEARCHABLE MODULES DROPDOWN (Matches Screenshot 1) */}
            {searchFocused && (
              <div className="absolute left-0 top-full mt-2 w-80 sm:w-96 rounded-2xl shadow-2xl border bg-white dark:bg-[#111c44] border-slate-200 dark:border-slate-700 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2.5 bg-slate-50/70 dark:bg-[#0b1437]/60 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 dark:text-slate-400">
                    SEARCHABLE MODULES
                  </span>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-[380px] overflow-y-auto">
                  {filteredModules.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setSearchFocused(false)}
                      className="flex items-center gap-3.5 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition group cursor-pointer"
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${item.bgColor}`}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {item.subtitle}
                        </div>
                      </div>
                    </Link>
                  ))}

                  {filteredModules.length === 0 && (
                    <div className="p-4 text-center text-xs text-slate-400">
                      No matching searchable modules found.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Quick actions, utility icons, profile */}
        <div className="flex items-center gap-2.5 md:gap-3">
          {/* Free Plan Active Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 text-xs font-semibold">
            <span className="text-amber-500 text-xs">👑</span>
            <span className="text-slate-700 dark:text-slate-200">Free Plan</span>
            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 ml-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              ACTIVE
            </span>
          </div>

          {/* CRM Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setCrmDropdownOpen(!crmDropdownOpen);
                setEstimateDropdownOpen(false);
                setUserDropdownOpen(false);
                setSearchFocused(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              <span>CRM</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {crmDropdownOpen && (
              <div
                className="absolute left-0 mt-2 w-48 rounded-2xl shadow-xl border py-2 z-50 bg-white dark:bg-[#111c44] border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 animate-in fade-in slide-in-from-top-1"
                onMouseLeave={() => setCrmDropdownOpen(false)}
              >
                <Link
                  href="/admin/customers"
                  onClick={() => setCrmDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition"
                >
                  <Users className="w-4 h-4 text-blue-500" />
                  <span>Customers</span>
                </Link>
                <Link
                  href="/admin/leads"
                  onClick={() => setCrmDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition"
                >
                  <UserPlus className="w-4 h-4 text-blue-500" />
                  <span>Leads</span>
                </Link>
                <Link
                  href="/admin/tasks"
                  onClick={() => setCrmDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition"
                >
                  <CheckSquare className="w-4 h-4 text-blue-500" />
                  <span>Tasks</span>
                </Link>
                <Link
                  href="/admin/meetings"
                  onClick={() => setCrmDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition"
                >
                  <Handshake className="w-4 h-4 text-blue-500" />
                  <span>Meetings</span>
                </Link>
              </div>
            )}
          </div>

          {/* Estimate Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setEstimateDropdownOpen(!estimateDropdownOpen);
                setCrmDropdownOpen(false);
                setUserDropdownOpen(false);
                setSearchFocused(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
              <span>Estimate</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {estimateDropdownOpen && (
              <div
                className="absolute left-0 mt-2 w-52 rounded-2xl shadow-xl border py-2 z-50 bg-white dark:bg-[#111c44] border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 animate-in fade-in slide-in-from-top-1"
                onMouseLeave={() => setEstimateDropdownOpen(false)}
              >
                <Link
                  href="/admin/estimates/create"
                  onClick={() => setEstimateDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/40 text-[#1b2559] dark:text-white transition"
                >
                  <Plus className="w-4 h-4 text-blue-600" />
                  <span>Add Estimate</span>
                </Link>
                <Link
                  href="/admin/estimates/create?type=bank"
                  onClick={() => setEstimateDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition"
                >
                  <Landmark className="w-4 h-4 text-slate-500" />
                  <span>Add Bank Quotation</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setEstimateDropdownOpen(false);
                    setIsQuickBomOpen(true);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-left transition"
                >
                  <Box className="w-4 h-4 text-slate-500" />
                  <span>Quick BOM</span>
                </button>
              </div>
            )}
          </div>

          {/* Headphones Icon */}
          <button
            className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            title="Support"
          >
            <Headphones className="w-4 h-4" />
          </button>

          {/* Notification Bell with Badge */}
          <button
            className="relative p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 min-w-[15px] h-[15px] px-0.5 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              19
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            title="Toggle Theme"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative pl-2 border-l border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => {
                setUserDropdownOpen(!userDropdownOpen);
                setCrmDropdownOpen(false);
                setEstimateDropdownOpen(false);
                setSearchFocused(false);
              }}
              className="flex items-center space-x-2 pl-2 cursor-pointer focus:outline-none"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-blue-500/40 shadow-xs flex-shrink-0">
                <Image
                  src="/images/avatar-2.jpg"
                  alt="Solar CRM"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="hidden sm:block text-left">
                <span className="text-xs font-semibold block leading-tight text-slate-800 dark:text-slate-100">
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
                className="absolute right-0 top-full mt-2 w-56 rounded-2xl shadow-2xl border py-2 z-50 bg-white dark:bg-[#111c44] border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 animate-in fade-in slide-in-from-top-1"
                onMouseLeave={() => setUserDropdownOpen(false)}
              >
                <Link
                  href="/admin/profile"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/admin/logs"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  <History className="w-4 h-4 text-slate-400" />
                  <span>User Logs</span>
                </Link>
                <a
                  href="#connect-google"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  <Globe className="w-4 h-4 text-slate-400" />
                  <span>Connect Google</span>
                </a>
                <Link
                  href="/admin/settings"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition"
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

      {/* QUICK BOM MODAL */}
      {isQuickBomOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111c44] rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 bg-[#141b2d] text-white">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">Quick BOM</h3>
                  <p className="text-[11px] text-slate-400">
                    Create a BOM quickly with the essential details.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsQuickBomOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleAddQuickBom} className="p-6 space-y-4">
              {/* BOM Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5 text-slate-400" />
                  <span>BOM</span>
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter new BOM name"
                  value={bomName}
                  onChange={(e) => setBomName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                />
              </div>

              {/* HSN/SAC Code */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <span className="text-slate-400 text-xs font-bold">#</span>
                  <span>HSN/SAC Code</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter HSN/SAC code"
                  value={hsnSacCode}
                  onChange={(e) => setHsnSacCode(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                />
              </div>

              {/* Make */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  <span>Make</span>
                </label>
                <input
                  type="text"
                  placeholder="Search or create Make"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                />
              </div>

              {/* Price */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <span className="text-slate-400 text-xs font-bold">₹</span>
                  <span>Price</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter price (optional)"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                />
              </div>

              {/* Technology & Warranty row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <span className="text-slate-400 text-xs">⚙️</span>
                    <span>Technology</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Search or create Techn..."
                    value={technology}
                    onChange={(e) => setTechnology(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <span className="text-slate-400 text-xs">🛡️</span>
                    <span>Warranty</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Search or create Warr..."
                    value={warranty}
                    onChange={(e) => setWarranty(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsQuickBomOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#001738] hover:bg-[#00224f] text-white shadow-sm transition"
                >
                  Add BOM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

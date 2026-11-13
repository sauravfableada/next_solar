"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { useTheme } from "@/context/ThemeContext";
import SolarDocumentsModal from "@/components/SolarDocumentsModal";
import { Sun, Plus, FileText, ArrowRight, FolderOpen, FileCheck } from "lucide-react";
import Link from "next/link";

export default function SolarDocumentsPage() {
  const { isDarkMode } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div
      className={`min-h-screen flex font-sans antialiased transition-colors duration-300 ${
        isDarkMode ? "bg-[#0b1329] text-slate-100" : "bg-[#f1f5f9] text-[#1e293b]"
      }`}
    >
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeItem="Dashboard"
      />

      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <AdminHeader
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />

        <main className="p-6 sm:p-8 space-y-6 flex-1">
          {/* Top Banner Navigation */}
          <div
            className={`rounded-2xl p-6 border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
              isDarkMode
                ? "bg-[#0f172a] border-slate-800 text-white"
                : "bg-white border-slate-200 text-slate-800"
            }`}
          >
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Sun className="w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold">Solar Documents</h1>
              </div>
              <p className="text-xs text-slate-400">
                Consumer, installation and equipment details preparation and export.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0e274c] hover:bg-[#16386b] text-white shadow-xs transition"
              >
                <Plus className="w-4 h-4" />
                <span>Prepare Solar Document</span>
              </button>
            </div>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className={`p-6 rounded-2xl border shadow-sm transition-colors ${
                isDarkMode ? "bg-[#0f172a] border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Consumer Details
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Aadhaar, consumer number, sub-division, billing unit and electrical sanction data.
              </p>
            </div>

            <div
              className={`p-6 rounded-2xl border shadow-sm transition-colors ${
                isDarkMode ? "bg-[#0f172a] border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center mb-4">
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Solar &amp; Inverter
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Panel wattage, module counts, inverter make, capacity and serial numbers list.
              </p>
            </div>

            <div
              className={`p-6 rounded-2xl border shadow-sm transition-colors ${
                isDarkMode ? "bg-[#0f172a] border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mb-4">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Export to Word / PDF
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Generate formatted official documents ready for direct download and mobile sharing.
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Solar Documents Modal */}
      <SolarDocumentsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}


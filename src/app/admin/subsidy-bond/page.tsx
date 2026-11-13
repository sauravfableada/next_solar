"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { useTheme } from "@/context/ThemeContext";
import SubsidyBondModal from "@/components/SubsidyBondModal";
import { FileText, Plus, FileCheck, ArrowRight, Sun, FolderOpen } from "lucide-react";
import Link from "next/link";

export default function SubsidyBondPage() {
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
          <div
            className={`rounded-2xl p-6 border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
              isDarkMode
                ? "bg-[#0f172a] border-slate-800 text-white"
                : "bg-white border-slate-200 text-slate-800"
            }`}
          >
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold">Subsidy Bond</h1>
              </div>
              <p className="text-xs text-slate-400">
                Agreement and consumer details preparation and export.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0e274c] hover:bg-[#16386b] text-white shadow-xs transition"
              >
                <Plus className="w-4 h-4" />
                <span>Prepare Subsidy Bond</span>
              </button>
            </div>
          </div>
        </main>
      </div>

      <SubsidyBondModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}


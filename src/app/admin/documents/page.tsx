"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { useTheme } from "@/context/ThemeContext";
import SavedDocumentsModal from "@/components/SavedDocumentsModal";
import SubsidyBondModal from "@/components/SubsidyBondModal";
import SolarDocumentsModal from "@/components/SolarDocumentsModal";
import { FolderOpen, Plus, FileText, Sun } from "lucide-react";

export default function SavedDocumentsPage() {
  const { isDarkMode } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(true);
  const [isSubsidyModalOpen, setIsSubsidyModalOpen] = useState(false);
  const [isSolarModalOpen, setIsSolarModalOpen] = useState(false);

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
                <div className="w-9 h-9 rounded-xl bg-slate-500/10 text-slate-500 flex items-center justify-center">
                  <FolderOpen className="w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold">Saved Documents</h1>
              </div>
              <p className="text-xs text-slate-400">
                Solar documents and subsidy bonds saved by you.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSavedModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0e274c] hover:bg-[#16386b] text-white shadow-xs transition"
              >
                <FolderOpen className="w-4 h-4" />
                <span>View Saved Documents</span>
              </button>
            </div>
          </div>
        </main>
      </div>

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

      <SubsidyBondModal
        isOpen={isSubsidyModalOpen}
        onClose={() => setIsSubsidyModalOpen(false)}
      />

      <SolarDocumentsModal
        isOpen={isSolarModalOpen}
        onClose={() => setIsSolarModalOpen(false)}
      />
    </div>
  );
}


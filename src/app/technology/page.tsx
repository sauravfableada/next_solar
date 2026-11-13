"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { useTheme } from "@/context/ThemeContext";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
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
  Inbox,
  ChevronDown
} from "lucide-react";

interface TechnologyItem {
  id: number;
  srNo: number;
  name: string;
  description: string;
  createdAt: string;
}

export default function TechnologyPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isDarkMode } = useTheme();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Technologies list (Starts empty as in Screenshot 3: "No technologies found.")
  const [technologies, setTechnologies] = useState<TechnologyItem[]>([]);

  const [searchQuery, setSearchQuery] = useState("");

  // Modal State: "add" | "edit" | null
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [targetTech, setTargetTech] = useState<TechnologyItem | null>(null);

  // Form Fields
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");

  const handleOpenAddModal = () => {
    setModalMode("add");
    setTargetTech(null);
    setFormName("");
    setFormDescription("");
  };

  const handleOpenEditModal = (item: TechnologyItem) => {
    setModalMode("edit");
    setTargetTech(item);
    setFormName(item.name);
    setFormDescription(item.description === "-" ? "" : item.description);
  };

  const handleCloseModal = () => {
    setModalMode(null);
    setTargetTech(null);
    setFormName("");
    setFormDescription("");
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      alert("Please enter technology name");
      return;
    }

    if (modalMode === "add") {
      const newItem: TechnologyItem = {
        id: Date.now(),
        srNo: technologies.length + 1,
        name: formName,
        description: formDescription || "-",
        createdAt: "13 Nov 2026, 10:32"
      };
      setTechnologies([...technologies, newItem]);
    } else if (modalMode === "edit" && targetTech) {
      setTechnologies(
        technologies.map((t) =>
          t.id === targetTech.id
            ? { ...t, name: formName, description: formDescription || "-" }
            : t
        )
      );
    }
    handleCloseModal();
  };

  const handleDeleteTechnology = (id: number) => {
    if (confirm("Are you sure you want to delete this Technology?")) {
      setTechnologies(technologies.filter((t) => t.id !== id));
    }
  };

  const filteredTechnologies = technologies.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        activeSubItem="All Technology"
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
          {/* Header Title & Add Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-[#1e293b] dark:text-white">
                Manage Technology
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Manage technologies in Solar CRM.
              </p>
            </div>
            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold shadow-sm transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Technology</span>
            </button>
          </div>

          {/* Table Container Card (Screenshot 3) */}
          <div className="bg-white dark:bg-[#111c38] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-5 space-y-4">
            {/* Table Header: "All Technologies" label on left, Search on right */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-sm font-bold text-slate-800 dark:text-white">All Technologies</h2>
              <div className="relative w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Table or Empty State (as in Screenshot 3) */}
            {filteredTechnologies.length === 0 ? (
              <div className="py-16 flex flex-col items-center justify-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                  <Inbox className="w-8 h-8" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  No technologies found.
                </p>
                <button
                  onClick={handleOpenAddModal}
                  className="px-4 py-2 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold transition shadow-sm cursor-pointer"
                >
                  Add Technology
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4 w-16">SR.NO</th>
                      <th className="py-3 px-4">TECHNOLOGY NAME</th>
                      <th className="py-3 px-4">DESCRIPTION</th>
                      <th className="py-3 px-4">CREATED AT</th>
                      <th className="py-3 px-4 text-center">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
                    {filteredTechnologies.map((t) => (
                      <tr
                        key={t.id}
                        className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition"
                      >
                        <td className="py-3.5 px-4 font-medium text-slate-500">{t.srNo}</td>
                        <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                          {t.name}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">{t.description}</td>
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                          {t.createdAt}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleOpenEditModal(t)}
                              title="Edit Technology"
                              className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteTechnology(t.id)}
                              title="Delete Technology"
                              className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
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
            )}
          </div>

          {/* Footer Note */}
          <div className="text-center text-xs text-slate-400 pt-8 pb-4">
            © 2026 Copyright - Fablead Developers Technolab
          </div>
        </div>
      </div>

      {/* MODAL: ADD / EDIT TECHNOLOGY (Screenshot 4) */}
      {modalMode && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="bg-[#0b2447] text-white px-5 py-3.5 flex items-center justify-between">
              <h3 className="text-sm font-bold">
                {modalMode === "add" ? "Add Technology" : "Edit Technology"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-slate-300 hover:text-white p-1 rounded transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveModal} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter technology name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1.5">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter description"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold transition shadow-sm cursor-pointer"
                >
                  {modalMode === "add" ? "Save" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


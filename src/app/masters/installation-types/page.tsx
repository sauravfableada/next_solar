"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  List,
  LayoutGrid,
  Check,
  ChevronDown,
  Tag,
  Info,
  AlignLeft,
  Wrench,
} from "lucide-react";

interface InstallationOptionItem {
  id: number;
  srNo: number;
  name: string;
  description: string;
  status: "Active" | "Inactive";
  pipelineStages: string[];
}

export default function InstallationOptionsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [installationOptions, setInstallationOptions] = useState<InstallationOptionItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [activeStatusDropdownId, setActiveStatusDropdownId] = useState<number | null>(null);

  // Form view: 'list' | 'add' | 'edit'
  const [currentView, setCurrentView] = useState<"list" | "add" | "edit">("list");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form fields
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formStatus, setFormStatus] = useState<"Active" | "Inactive">("Active");
  const [formStages, setFormStages] = useState<string[]>([""]);

  const filteredOptions = installationOptions.filter((o) =>
    o.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartAdd = () => {
    setFormName("");
    setFormDescription("");
    setFormStatus("Active");
    setFormStages([""]);
    setCurrentView("add");
  };

  const handleStartEdit = (item: InstallationOptionItem) => {
    setEditingId(item.id);
    setFormName(item.name);
    setFormDescription(item.description === "-" ? "" : item.description);
    setFormStatus(item.status);
    setFormStages(item.pipelineStages.length > 0 ? [...item.pipelineStages] : [""]);
    setCurrentView("edit");
  };

  const handleAddStageRow = () => {
    setFormStages([...formStages, ""]);
  };

  const handleStageChange = (index: number, val: string) => {
    const updated = [...formStages];
    updated[index] = val;
    setFormStages(updated);
  };

  const handleDeleteStageRow = (index: number) => {
    if (formStages.length > 1) {
      setFormStages(formStages.filter((_, i) => i !== index));
    } else {
      setFormStages([""]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const cleanedStages = formStages.map((s) => s.trim()).filter(Boolean);

    if (currentView === "add") {
      const newItem: InstallationOptionItem = {
        id: Date.now(),
        srNo: installationOptions.length + 1,
        name: formName.trim(),
        description: formDescription.trim() || "-",
        status: formStatus,
        pipelineStages: cleanedStages,
      };
      setInstallationOptions([...installationOptions, newItem]);
    } else if (currentView === "edit" && editingId !== null) {
      setInstallationOptions(
        installationOptions.map((o) =>
          o.id === editingId
            ? {
                ...o,
                name: formName.trim(),
                description: formDescription.trim() || "-",
                status: formStatus,
                pipelineStages: cleanedStages,
              }
            : o
        )
      );
    }
    setCurrentView("list");
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this installation option?")) {
      const updated = installationOptions.filter((o) => o.id !== id);
      setInstallationOptions(updated.map((item, index) => ({ ...item, srNo: index + 1 })));
    }
  };

  const toggleStatus = (id: number, newStatus: "Active" | "Inactive") => {
    setInstallationOptions(
      installationOptions.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    setActiveStatusDropdownId(null);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fe] dark:bg-[#0b1437] flex text-slate-800 dark:text-slate-100">
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />

      {/* MAIN CONTENT AREA */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <AdminHeader
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          onSearch={(q) => setSearchQuery(q)}
        />

        <main className="p-6 md:p-8 space-y-6">
          {currentView === "list" ? (
            <>
              {/* Header Title & Add Button */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-[#1b2559] dark:text-white">
                    Manage Installation Options
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Configure the installation options available for customer records.
                  </p>
                </div>
                <button
                  onClick={handleStartAdd}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white font-medium text-sm transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Installation Option</span>
                </button>
              </div>

              {/* Card Container */}
              <div className="bg-white dark:bg-[#111c44] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800/80">
                  <h2 className="text-base font-semibold text-[#1b2559] dark:text-white">
                    Active Installation Options
                  </h2>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-72">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search installation options..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                      />
                    </div>
                    {/* View Switcher */}
                    <div className="flex items-center bg-slate-100 dark:bg-[#0b1437] rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-1.5 rounded ${
                          viewMode === "list"
                            ? "bg-white dark:bg-[#111c44] text-[#1b2559] dark:text-white shadow-xs"
                            : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        }`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-1.5 rounded ${
                          viewMode === "grid"
                            ? "bg-white dark:bg-[#111c44] text-[#1b2559] dark:text-white shadow-xs"
                            : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        }`}
                      >
                        <LayoutGrid className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Table Header Row */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#0b1437]/30 text-slate-400 dark:text-slate-400 uppercase text-[11px] font-semibold tracking-wider">
                        <th className="py-3 px-6">SR.NO</th>
                        <th className="py-3 px-6">NAME</th>
                        <th className="py-3 px-6">DESCRIPTION</th>
                        <th className="py-3 px-6">STATUS</th>
                        <th className="py-3 px-6 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                      {filteredOptions.length > 0 ? (
                        filteredOptions.map((opt) => (
                          <tr
                            key={opt.id}
                            className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                          >
                            <td className="py-4 px-6 text-slate-600 dark:text-slate-300 font-medium">
                              {opt.srNo}
                            </td>
                            <td className="py-4 px-6 font-semibold text-[#1b2559] dark:text-white">
                              {opt.name}
                            </td>
                            <td className="py-4 px-6 text-slate-400 dark:text-slate-400">
                              {opt.description}
                            </td>
                            <td className="py-4 px-6 relative">
                              <button
                                onClick={() =>
                                  setActiveStatusDropdownId(
                                    activeStatusDropdownId === opt.id ? null : opt.id
                                  )
                                }
                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                                  opt.status === "Active"
                                    ? "bg-[#dcfce7] text-[#15803d] dark:bg-emerald-950/40 dark:text-emerald-400"
                                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                                }`}
                              >
                                <span>{opt.status}</span>
                                <ChevronDown className="w-3 h-3" />
                              </button>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <div className="inline-flex items-center gap-2">
                                <button
                                  onClick={() => handleStartEdit(opt)}
                                  className="p-1.5 text-slate-400 hover:text-[#001738] dark:hover:text-white rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                  title="Edit"
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(opt.id)}
                                  className="p-1.5 text-red-400 hover:text-red-600 rounded hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        /* Empty State Illustration exactly matching screenshot */
                        <tr>
                          <td colSpan={5} className="py-20 text-center">
                            <div className="flex flex-col items-center justify-center">
                              {/* Wrench and Screwdriver / Tools SVG */}
                              <div className="w-20 h-20 mb-4 flex items-center justify-center text-slate-300 dark:text-slate-600">
                                <svg
                                  className="w-16 h-16 stroke-[1.5]"
                                  viewBox="0 0 64 64"
                                  fill="none"
                                  stroke="currentColor"
                                >
                                  <path
                                    d="M18 10L24 16L18 22L12 16L18 10Z"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M21 19L44 42C46 44 46 48 44 50C42 52 38 52 36 50L13 27"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M46 12C48 10 52 10 54 12C56 14 56 18 54 20L49 25L39 15L44 10"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M44 20L21 43C19 45 19 49 21 51C23 53 27 53 29 51L52 28"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <p className="text-sm text-slate-400 dark:text-slate-400 font-medium">
                                No installation options found.
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            /* Add or Edit Installation Option View */
            <div className="bg-white dark:bg-[#111c44] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 md:p-8 space-y-6">
              {/* Form Title & Back Button */}
              <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800/80 pb-5">
                <div>
                  <h1 className="text-xl font-bold text-[#1b2559] dark:text-white">
                    {currentView === "add" ? "Add Installation Option" : "Edit Installation Option"}
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Create a new installation master option and define its workflow stages.
                  </p>
                </div>
                <button
                  onClick={() => setCurrentView("list")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium text-sm transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#1b2559] dark:text-white flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-slate-400" />
                      <span>Name</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter installation option name"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#1b2559] dark:text-white flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-slate-400" />
                      <span>Status</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value as "Active" | "Inactive")}
                        className="w-full appearance-none px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#1b2559] dark:text-white flex items-center gap-1.5">
                    <AlignLeft className="w-3.5 h-3.5 text-slate-400" />
                    <span>Description</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Enter optional description..."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y"
                  />
                </div>

                {/* Pipeline Stages Section */}
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-bold text-[#1b2559] dark:text-white">
                        Pipeline Stages
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Define the sequential workflow stages for this installation option.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddStageRow}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Stage</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formStages.map((stg, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <input
                          type="text"
                          placeholder={idx === 0 ? "e.g. Site Survey" : "Enter stage name"}
                          value={stg}
                          onChange={(e) => handleStageChange(idx, e.target.value)}
                          className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteStageRow(idx)}
                          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-red-200 dark:border-red-900/40 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 text-xs font-medium transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white text-sm font-medium transition-colors shadow-sm"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Installation Option</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentView("list")}
                    className="px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}


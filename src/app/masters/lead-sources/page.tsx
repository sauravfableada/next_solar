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
  User,
  Info,
  AlignLeft,
} from "lucide-react";

interface LeadSourceItem {
  id: number;
  srNo: number;
  name: string;
  description: string;
  status: "Active" | "Inactive";
}

const initialLeadSources: LeadSourceItem[] = [
  { id: 1, srNo: 1, name: "B2B Partner", description: "-", status: "Active" },
  { id: 2, srNo: 2, name: "Channel Partner", description: "-", status: "Active" },
  { id: 3, srNo: 3, name: "Facebook Ads", description: "-", status: "Active" },
  { id: 4, srNo: 4, name: "Google Ads", description: "-", status: "Active" },
  { id: 5, srNo: 5, name: "Instagram", description: "-", status: "Active" },
  { id: 6, srNo: 6, name: "Referral", description: "-", status: "Active" },
  { id: 7, srNo: 7, name: "Walk-In", description: "-", status: "Active" },
  { id: 8, srNo: 8, name: "Website Form", description: "-", status: "Active" },
];

export default function LeadSourcesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [leadSources, setLeadSources] = useState<LeadSourceItem[]>(initialLeadSources);
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

  const filteredLeadSources = leadSources.filter((l) =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartAdd = () => {
    setFormName("");
    setFormDescription("");
    setFormStatus("Active");
    setCurrentView("add");
  };

  const handleStartEdit = (item: LeadSourceItem) => {
    setEditingId(item.id);
    setFormName(item.name);
    setFormDescription(item.description === "-" ? "" : item.description);
    setFormStatus(item.status);
    setCurrentView("edit");
  };

  const handleSaveLeadSource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (currentView === "add") {
      const newItem: LeadSourceItem = {
        id: Date.now(),
        srNo: leadSources.length + 1,
        name: formName.trim(),
        description: formDescription.trim() || "-",
        status: formStatus,
      };
      setLeadSources([...leadSources, newItem]);
    } else if (currentView === "edit" && editingId !== null) {
      setLeadSources(
        leadSources.map((l) =>
          l.id === editingId
            ? {
                ...l,
                name: formName.trim(),
                description: formDescription.trim() || "-",
                status: formStatus,
              }
            : l
        )
      );
    }
    setCurrentView("list");
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this lead source?")) {
      const updated = leadSources.filter((l) => l.id !== id);
      setLeadSources(updated.map((item, index) => ({ ...item, srNo: index + 1 })));
    }
  };

  const toggleStatus = (id: number, newStatus: "Active" | "Inactive") => {
    setLeadSources(
      leadSources.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
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
                    Manage Lead Sources
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Configure lead acquisition channels and tracking sources.
                  </p>
                </div>
                <button
                  onClick={handleStartAdd}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white font-medium text-sm transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Lead Source</span>
                </button>
              </div>

              {/* Table Card */}
              <div className="bg-white dark:bg-[#111c44] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800/80">
                  <h2 className="text-base font-semibold text-[#1b2559] dark:text-white">
                    Active Lead Sources
                  </h2>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-72">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search lead sources..."
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

                {/* Table */}
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
                      {filteredLeadSources.map((source) => (
                        <tr
                          key={source.id}
                          className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                        >
                          <td className="py-4 px-6 text-slate-600 dark:text-slate-300 font-medium">
                            {source.srNo}
                          </td>
                          <td className="py-4 px-6 font-semibold text-[#1b2559] dark:text-white">
                            {source.name}
                          </td>
                          <td className="py-4 px-6 text-slate-400 dark:text-slate-400">
                            {source.description}
                          </td>
                          <td className="py-4 px-6 relative">
                            <button
                              onClick={() =>
                                setActiveStatusDropdownId(
                                  activeStatusDropdownId === source.id
                                    ? null
                                    : source.id
                                )
                              }
                              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                                source.status === "Active"
                                  ? "bg-[#dcfce7] text-[#15803d] dark:bg-emerald-950/40 dark:text-emerald-400"
                                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                              }`}
                            >
                              <span>{source.status}</span>
                              <ChevronDown className="w-3 h-3" />
                            </button>

                            {/* Dropdown */}
                            {activeStatusDropdownId === source.id && (
                              <div className="absolute left-6 top-11 z-30 w-36 bg-white dark:bg-[#111c44] rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-1">
                                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                                  Change Status
                                </div>
                                <button
                                  onClick={() => toggleStatus(source.id, "Active")}
                                  className={`w-full text-left px-3 py-1.5 text-xs font-medium flex items-center justify-between ${
                                    source.status === "Active"
                                      ? "bg-[#001738] text-white"
                                      : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                                  }`}
                                >
                                  <span>Active</span>
                                  {source.status === "Active" && (
                                    <Check className="w-3.5 h-3.5" />
                                  )}
                                </button>
                                <button
                                  onClick={() => toggleStatus(source.id, "Inactive")}
                                  className={`w-full text-left px-3 py-1.5 text-xs font-medium flex items-center justify-between ${
                                    source.status === "Inactive"
                                      ? "bg-[#001738] text-white"
                                      : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                                  }`}
                                >
                                  <span>Inactive</span>
                                  {source.status === "Inactive" && (
                                    <Check className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="inline-flex items-center gap-2">
                              <button
                                onClick={() => handleStartEdit(source)}
                                className="p-1.5 text-slate-400 hover:text-[#001738] dark:hover:text-white rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                title="Edit"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(source.id)}
                                className="p-1.5 text-red-400 hover:text-red-600 rounded hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="p-4 px-6 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                  <span>Showing 1 to {filteredLeadSources.length} of {filteredLeadSources.length} results</span>
                  <div className="flex items-center gap-1">
                    <button
                      disabled
                      className="px-3 py-1.5 text-xs rounded border border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button className="px-3 py-1.5 text-xs rounded bg-[#001738] text-white font-medium">
                      1
                    </button>
                    <button
                      disabled
                      className="px-3 py-1.5 text-xs rounded border border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Add or Edit Lead Source Form View */
            <div className="bg-white dark:bg-[#111c44] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 md:p-8 space-y-6">
              {/* Form Title & Back Button */}
              <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800/80 pb-5">
                <div>
                  <h1 className="text-xl font-bold text-[#1b2559] dark:text-white">
                    {currentView === "add" ? "Add Lead Source" : "Edit Lead Source"}
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Create a new lead acquisition source.
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

              {/* Form Fields */}
              <form onSubmit={handleSaveLeadSource} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Lead Source Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#1b2559] dark:text-white flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Lead Source Name</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter lead source name"
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

                {/* Form Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white text-sm font-medium transition-colors shadow-sm"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Lead Source</span>
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


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
  Check,
  ChevronDown,
  X,
} from "lucide-react";

interface StageItem {
  id: number;
  srNo: number;
  name: string;
  status: "Active" | "Inactive";
  createdAt: string;
}

const initialStages: StageItem[] = [
  { id: 1, srNo: 1, name: "Document Verification", status: "Active", createdAt: "29 Oct 2026, 13:21" },
  { id: 2, srNo: 2, name: "New", status: "Active", createdAt: "29 Oct 2026, 13:21" },
  { id: 3, srNo: 3, name: "Contacted", status: "Active", createdAt: "29 Oct 2026, 13:21" },
  { id: 4, srNo: 4, name: "Registration", status: "Active", createdAt: "29 Oct 2026, 13:21" },
  { id: 5, srNo: 5, name: "Meter Charge", status: "Active", createdAt: "29 Oct 2026, 13:21" },
  { id: 6, srNo: 6, name: "Proposal Sent", status: "Active", createdAt: "29 Oct 2026, 13:21" },
  { id: 7, srNo: 7, name: "Finance", status: "Active", createdAt: "29 Oct 2026, 13:21" },
  { id: 8, srNo: 8, name: "Negotiation", status: "Active", createdAt: "29 Oct 2026, 13:21" },
  { id: 9, srNo: 9, name: "Waiting Floor", status: "Active", createdAt: "29 Oct 2026, 13:21" },
  { id: 10, srNo: 10, name: "Dispatch", status: "Active", createdAt: "29 Oct 2026, 13:21" },
];

export default function StagesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [stages, setStages] = useState<StageItem[]>(initialStages);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatusDropdownId, setActiveStatusDropdownId] = useState<number | null>(null);

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formStageName, setFormStageName] = useState("");
  const [formStatus, setFormStatus] = useState<"Active" | "Inactive">("Active");

  const filteredStages = stages.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartAdd = () => {
    setEditingId(null);
    setFormStageName("");
    setFormStatus("Active");
    setIsModalOpen(true);
  };

  const handleStartEdit = (stage: StageItem) => {
    setEditingId(stage.id);
    setFormStageName(stage.name);
    setFormStatus(stage.status);
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formStageName.trim()) return;

    if (editingId === null) {
      const newStage: StageItem = {
        id: Date.now(),
        srNo: stages.length + 1,
        name: formStageName.trim(),
        status: formStatus,
        createdAt: "13 Nov 2026, 10:45",
      };
      setStages([...stages, newStage]);
    } else {
      setStages(
        stages.map((s) =>
          s.id === editingId
            ? {
                ...s,
                name: formStageName.trim(),
                status: formStatus,
              }
            : s
        )
      );
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this stage?")) {
      const updated = stages.filter((s) => s.id !== id);
      setStages(updated.map((item, index) => ({ ...item, srNo: index + 1 })));
    }
  };

  const toggleStatus = (id: number, newStatus: "Active" | "Inactive") => {
    setStages(
      stages.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
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
          {/* Header Title & Add Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#1b2559] dark:text-white">
                Manage Stages
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Organize your CRM workflow stages and statuses.
              </p>
            </div>
            <button
              onClick={handleStartAdd}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white font-medium text-sm transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Stage</span>
            </button>
          </div>

          {/* Table Card */}
          <div className="bg-white dark:bg-[#111c44] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800/80">
              <h2 className="text-base font-semibold text-[#1b2559] dark:text-white">
                All Stages
              </h2>
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search stages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#0b1437]/30 text-slate-400 dark:text-slate-400 uppercase text-[11px] font-semibold tracking-wider">
                    <th className="py-3 px-6">SR.NO</th>
                    <th className="py-3 px-6">STAGE NAME</th>
                    <th className="py-3 px-6">STATUS</th>
                    <th className="py-3 px-6">CREATED AT</th>
                    <th className="py-3 px-6 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {filteredStages.map((stage) => (
                    <tr
                      key={stage.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-4 px-6 text-slate-600 dark:text-slate-300 font-medium">
                        {stage.srNo}
                      </td>
                      <td className="py-4 px-6 font-semibold text-[#1b2559] dark:text-white">
                        {stage.name}
                      </td>
                      <td className="py-4 px-6 relative">
                        <button
                          onClick={() =>
                            setActiveStatusDropdownId(
                              activeStatusDropdownId === stage.id
                                ? null
                                : stage.id
                            )
                          }
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                            stage.status === "Active"
                              ? "bg-[#dcfce7] text-[#15803d] dark:bg-emerald-950/40 dark:text-emerald-400"
                              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                          }`}
                        >
                          <span>{stage.status}</span>
                          <ChevronDown className="w-3 h-3" />
                        </button>

                        {/* Dropdown */}
                        {activeStatusDropdownId === stage.id && (
                          <div className="absolute left-6 top-11 z-30 w-36 bg-white dark:bg-[#111c44] rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-1">
                            <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                              Change Status
                            </div>
                            <button
                              onClick={() => toggleStatus(stage.id, "Active")}
                              className={`w-full text-left px-3 py-1.5 text-xs font-medium flex items-center justify-between ${
                                stage.status === "Active"
                                ? "bg-[#001738] text-white"
                                : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                              }`}
                            >
                              <span>Active</span>
                              {stage.status === "Active" && (
                                <Check className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <button
                              onClick={() => toggleStatus(stage.id, "Inactive")}
                              className={`w-full text-left px-3 py-1.5 text-xs font-medium flex items-center justify-between ${
                                stage.status === "Inactive"
                                  ? "bg-[#001738] text-white"
                                  : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                              }`}
                            >
                              <span>Inactive</span>
                              {stage.status === "Inactive" && (
                                <Check className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6 text-slate-500 dark:text-slate-400">
                        {stage.createdAt}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => handleStartEdit(stage)}
                            className="p-1.5 text-slate-400 hover:text-[#001738] dark:hover:text-white rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(stage.id)}
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
              <span>Showing 1 to {filteredStages.length} of {filteredStages.length} results</span>
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
        </main>
      </div>

      {/* Add / Edit Stage Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111c44] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-[#1b2559] dark:text-white">
                {editingId === null ? "Add Stage" : "Edit Stage"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveModal} className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1b2559] dark:text-white">
                  Stage Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter stage name"
                  value={formStageName}
                  onChange={(e) => setFormStageName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1b2559] dark:text-white">
                  Status <span className="text-red-500">*</span>
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

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white text-sm font-medium transition-colors shadow-sm"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


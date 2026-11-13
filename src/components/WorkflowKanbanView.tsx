"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Phone,
  SlidersHorizontal,
  ArrowUpDown,
  FolderOpen,
} from "lucide-react";

export interface WorkflowCustomer {
  id: string;
  name: string;
  asplId: string;
  phone: string;
  date: string;
  stageId: number;
}

export interface WorkflowStage {
  id: number;
  name: string;
  order: number;
}

interface WorkflowKanbanPageProps {
  workflowTitle: string; // e.g. "Document Verification", "Registration", "Meter Charge", "Finance", "Waiting Floor", "Dispatch", "Installations", "Net Metering", "Subsidy"
  activeSubItemName: string;
  initialStages?: WorkflowStage[];
  initialCustomers?: WorkflowCustomer[];
}

const defaultStages: WorkflowStage[] = [
  { id: 1, name: "Pending", order: 1 },
  { id: 2, name: "In Progress", order: 2 },
  { id: 3, name: "Completed", order: 3 },
];

export default function WorkflowKanbanView({
  workflowTitle,
  activeSubItemName,
  initialStages = defaultStages,
  initialCustomers = [],
}: WorkflowKanbanPageProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [stages, setStages] = useState<WorkflowStage[]>(initialStages);
  const [customers, setCustomers] = useState<WorkflowCustomer[]>(initialCustomers);
  const [activeStageTab, setActiveStageTab] = useState<number>(initialStages[0]?.id || 1);
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");

  // Manage Stages Modal
  const [isStagesModalOpen, setIsStagesModalOpen] = useState(false);
  const [newStageNameInput, setNewStageNameInput] = useState("");
  const [editingStageId, setEditingStageId] = useState<number | null>(null);
  const [editingStageName, setEditingStageName] = useState("");

  // Move customer left / right across stages
  const handleMoveCustomer = (customerId: string, direction: "prev" | "next") => {
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id !== customerId) return c;
        const currentStageIdx = stages.findIndex((s) => s.id === c.stageId);
        if (direction === "prev" && currentStageIdx > 0) {
          return { ...c, stageId: stages[currentStageIdx - 1].id };
        }
        if (direction === "next" && currentStageIdx < stages.length - 1) {
          return { ...c, stageId: stages[currentStageIdx + 1].id };
        }
        return c;
      })
    );
  };

  // Add new stage in modal
  const handleAddNewStage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStageNameInput.trim()) return;
    const newStage: WorkflowStage = {
      id: Date.now(),
      name: newStageNameInput.trim(),
      order: stages.length + 1,
    };
    setStages([...stages, newStage]);
    setNewStageNameInput("");
  };

  // Delete stage
  const handleDeleteStage = (stageId: number) => {
    if (confirm("Are you sure you want to delete this stage?")) {
      setStages(stages.filter((s) => s.id !== stageId));
    }
  };

  // Edit stage name
  const handleSaveEditStage = (stageId: number) => {
    if (!editingStageName.trim()) return;
    setStages(
      stages.map((s) =>
        s.id === stageId ? { ...s, name: editingStageName.trim() } : s
      )
    );
    setEditingStageId(null);
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.asplId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f4f7fe] dark:bg-[#0b1437] flex text-slate-800 dark:text-slate-100">
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeItem="Workflow"
        activeSubItem={activeSubItemName}
      />

      {/* Main Content Area */}
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
          {/* Header Title with Workflow Sub-tag */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                <span className="text-emerald-500 font-bold">—</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-wider">WORKFLOW</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#1b2559] dark:text-white">
                {workflowTitle}
              </h1>
            </div>

            {/* Stages Pill Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              {stages.map((stage) => {
                const count = customers.filter((c) => c.stageId === stage.id).length;
                const isActive = activeStageTab === stage.id;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStageTab(stage.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-700 shadow-2xs"
                        : "bg-white dark:bg-[#111c44] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>{stage.name}</span>
                    <span
                      className={`text-xs ${
                        isActive ? "text-emerald-600 dark:text-emerald-300" : "text-slate-400"
                      }`}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Bar + Manage Stages + Sort Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="relative flex-1 w-full max-w-2xl">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, ASPL ID, phone, city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-white dark:bg-[#111c44] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400 shadow-2xs"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setIsStagesModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111c44] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors shadow-2xs"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                <span>Manage Stages</span>
              </button>
              <button
                onClick={() => setSortOrder(sortOrder === "latest" ? "oldest" : "latest")}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111c44] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors shadow-2xs"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                <span className="capitalize">{sortOrder === "latest" ? "Latest First" : "Oldest First"}</span>
              </button>
            </div>
          </div>

          {/* Active Stage Single-Column / Kanban Card Box (Matching Intimation Screen) */}
          {(() => {
            const currentStage = stages.find((s) => s.id === activeStageTab) || stages[0];
            const currentCustomers = filteredCustomers.filter(
              (c) => c.stageId === (currentStage?.id || 1)
            );

            return (
              <div className="bg-white dark:bg-[#111c44] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
                {/* Stage Header */}
                <div className="bg-[#0b172a] text-white p-3.5 px-6 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
                    <span className="text-xs font-bold tracking-wider uppercase">
                      {currentStage ? currentStage.name : "Stage"}
                    </span>
                  </div>
                  <span className="w-6 h-6 rounded-full bg-white/10 text-xs font-bold flex items-center justify-center">
                    {currentCustomers.length}
                  </span>
                </div>

                {/* Content Area */}
                <div className="p-8 min-h-[300px] flex flex-col items-center justify-center">
                  {currentCustomers.length > 0 ? (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {currentCustomers.map((cust) => (
                        <div
                          key={cust.id}
                          className="bg-white dark:bg-[#0b1437] p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-2xs space-y-2 hover:border-blue-400 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-[#1b2559] dark:text-white uppercase">
                              {cust.name}
                            </h4>
                          </div>

                          <div className="inline-block px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                            {cust.asplId}
                          </div>

                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            <span>{cust.phone}</span>
                          </div>

                          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                            <span>🕒 {cust.date}</span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleMoveCustomer(cust.id, "prev")}
                                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-blue-600"
                                title="Move Previous"
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleMoveCustomer(cust.id, "next")}
                                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-blue-600"
                                title="Move Next"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center space-y-3 py-12">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-slate-400">
                        <FolderOpen className="w-6 h-6 stroke-[1.5]" />
                      </div>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        No records found.
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer Count */}
                <div className="py-2.5 text-center text-xs text-slate-400 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0b172a]/20">
                  {currentCustomers.length} of {customers.length} customers · {currentStage?.name}
                </div>
              </div>
            );
          })()}
        </main>
      </div>

      {/* MANAGE STAGES MODAL (matching Screenshots 2, 4, 6, 8, 10) */}
      {isStagesModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111c44] rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-bold text-sm">1=2</span>
                <h3 className="text-sm font-bold text-[#1b2559] dark:text-white">
                  Manage Stages ({workflowTitle})
                </h3>
              </div>
              <button
                onClick={() => setIsStagesModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Add Stage Input Row */}
              <form onSubmit={handleAddNewStage} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Enter new stage name..."
                  value={newStageNameInput}
                  onChange={(e) => setNewStageNameInput(e.target.value)}
                  className="flex-1 px-4 py-2 text-sm bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold transition-colors"
                >
                  Add
                </button>
              </form>

              {/* Stages Table */}
              <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-[#0b1437]/50 text-slate-400 uppercase text-[10px] font-semibold tracking-wider border-b border-slate-100 dark:border-slate-800">
                    <tr>
                      <th className="py-2.5 px-4 w-12">#</th>
                      <th className="py-2.5 px-4">STAGE NAME</th>
                      <th className="py-2.5 px-4 w-20 text-center">ORDER</th>
                      <th className="py-2.5 px-4 w-24 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {stages.map((stg, idx) => (
                      <tr key={stg.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                        <td className="py-3 px-4 text-slate-500">{idx + 1}</td>
                        <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                          {editingStageId === stg.id ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                autoFocus
                                value={editingStageName}
                                onChange={(e) => setEditingStageName(e.target.value)}
                                className="px-2 py-1 text-xs border rounded bg-white dark:bg-[#0b1437] border-slate-300 dark:border-slate-700"
                              />
                              <button
                                onClick={() => handleSaveEditStage(stg.id)}
                                className="text-xs text-blue-600 font-bold"
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            <div className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                              {stg.name}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold">
                            {stg.order}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setEditingStageId(stg.id);
                                setEditingStageName(stg.name);
                              }}
                              className="p-1.5 text-slate-400 hover:text-blue-600 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                              title="Edit"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteStage(stg.id)}
                              className="p-1.5 text-rose-400 hover:text-rose-600 rounded hover:bg-rose-50 dark:hover:bg-rose-950/20"
                              title="Delete"
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


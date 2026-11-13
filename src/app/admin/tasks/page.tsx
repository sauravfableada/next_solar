"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { useTheme } from "@/context/ThemeContext";
import {
  Search,
  SlidersHorizontal,
  Download,
  Plus,
  Play,
  Pencil,
  Eye,
  Trash2,
  Calendar,
  X,
  FileText,
  User,
  Clock,
  Layers,
  ChevronDown,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Paperclip,
  Upload,
  AlertCircle,
  Link2
} from "lucide-react";

interface TaskItem {
  id: number;
  srNo: number;
  customerName: string;
  staffName: string;
  invoice: string;
  taskTitle: string;
  taskType: string;
  status: "Pending" | "In Progress" | "Completed" | "Cancelled";
  priority: "Low" | "Medium" | "High" | "Urgent";
  dueDate: string;
  createdBy: string;
  description: string;
  comments?: string[];
  attachments?: string[];
}

export default function TasksPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: 1,
      srNo: 1,
      customerName: "-",
      staffName: "Solar CRM",
      invoice: "No invoice linked",
      taskTitle: "Send proposal",
      taskType: "-",
      status: "Pending",
      priority: "Medium",
      dueDate: "08 Nov 2026",
      createdBy: "Solar CRM",
      description: "Auto task for new deal: #01INV-test customer",
      comments: [],
      attachments: []
    }
  ]);

  // Views: "list" | "create" | "details"
  const [currentView, setCurrentView] = useState<"list" | "create" | "details">("list");
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);

  // Filters state
  const [filterCustomer, setFilterCustomer] = useState("");
  const [filterStaff, setFilterStaff] = useState("");
  const [filterTaskType, setFilterTaskType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDueDate, setFilterDueDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Start Task Modal state
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [taskToStart, setTaskToStart] = useState<TaskItem | null>(null);
  const [startComment, setStartComment] = useState("");
  const [startFileName, setStartFileName] = useState("");

  // Status dropdown toggle in row
  const [activeStatusDropdownId, setActiveStatusDropdownId] = useState<number | null>(null);

  // Create form state
  const [createForm, setCreateForm] = useState({
    invoice: "Select Invoice",
    assignedTo: "Solar CRM",
    taskTitle: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
    taskType: "Select Task Type"
  });

  const clearFilters = () => {
    setFilterCustomer("");
    setFilterStaff("");
    setFilterTaskType("");
    setFilterStatus("");
    setFilterDueDate("");
    setSearchQuery("");
  };

  const handleOpenStartModal = (task: TaskItem) => {
    setTaskToStart(task);
    setStartComment("");
    setStartFileName("");
    setIsStartModalOpen(true);
  };

  const handleConfirmStart = () => {
    if (!taskToStart) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskToStart.id
          ? {
            ...t,
            status: "In Progress",
            comments: startComment ? [...(t.comments || []), startComment] : t.comments,
            attachments: startFileName ? [...(t.attachments || []), startFileName] : t.attachments
          }
          : t
      )
    );
    if (selectedTask && selectedTask.id === taskToStart.id) {
      setSelectedTask((prev) => (prev ? { ...prev, status: "In Progress" } : null));
    }
    setIsStartModalOpen(false);
    setTaskToStart(null);
  };

  const handleUpdateStatus = (taskId: number, newStatus: TaskItem["status"]) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    setActiveStatusDropdownId(null);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.taskTitle.trim()) {
      alert("Please enter a Task Title");
      return;
    }

    const newTask: TaskItem = {
      id: Date.now(),
      srNo: tasks.length + 1,
      customerName: "-",
      staffName: createForm.assignedTo || "Solar CRM",
      invoice: createForm.invoice === "Select Invoice" ? "No invoice linked" : createForm.invoice,
      taskTitle: createForm.taskTitle,
      taskType: createForm.taskType === "Select Task Type" ? "-" : createForm.taskType,
      status: createForm.status as TaskItem["status"],
      priority: createForm.priority as TaskItem["priority"],
      dueDate: createForm.dueDate || "12 Nov 2026",
      createdBy: "Solar CRM",
      description: createForm.description || "Task description"
    };

    setTasks([newTask, ...tasks]);
    setCurrentView("list");
    // Reset form
    setCreateForm({
      invoice: "Select Invoice",
      assignedTo: "Solar CRM",
      taskTitle: "",
      description: "",
      dueDate: "",
      priority: "Medium",
      status: "Pending",
      taskType: "Select Task Type"
    });
  };

  const handleDeleteTask = (id: number) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
      if (selectedTask && selectedTask.id === id) {
        setCurrentView("list");
      }
    }
  };

  // Filtered tasks
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      searchQuery === "" ||
      t.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.staffName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCustomer =
      filterCustomer === "" || t.customerName.toLowerCase().includes(filterCustomer.toLowerCase());
    const matchesStaff =
      filterStaff === "" || t.staffName.toLowerCase().includes(filterStaff.toLowerCase());
    const matchesType =
      filterTaskType === "" || t.taskType.toLowerCase().includes(filterTaskType.toLowerCase());
    const matchesStatus =
      filterStatus === "" || t.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesCustomer && matchesStaff && matchesType && matchesStatus;
  });

  return (
    <div className="flex h-screen bg-[#f3f5f9] text-[#1e293b] overflow-hidden font-sans">
      {/* Sidebar */}
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeItem="Manage Tasks"
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Top Header */}
        <AdminHeader sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />

        {/* Content Area */}
        <div className="p-6 max-w-[1600px] w-full mx-auto space-y-5">
          {/* VIEW 1: MANAGE TASKS LIST */}
          {currentView === "list" && (
            <>
              {/* Page Title & Top Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-[#1e293b]">Manage Tasks</h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Track team tasks, priorities, and deadlines.
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold shadow-sm transition">
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Export</span>
                  </button>
                  <button
                    onClick={() => setCurrentView("create")}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold shadow-sm transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Task</span>
                  </button>
                </div>
              </div>

              {/* Filter Panel */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4">
                {/* Search & Filters Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                      <span>Filters</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>Show per page:</span>
                    <select className="border border-slate-200 rounded-lg px-2 py-1 bg-white text-xs text-slate-700 focus:outline-none">
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                    </select>
                  </div>
                </div>

                {/* Filter Inputs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-1 border-t border-slate-100">
                  {/* Customer Name */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      placeholder="All customer name"
                      value={filterCustomer}
                      onChange={(e) => setFilterCustomer(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Staff Name */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Staff Name
                    </label>
                    <input
                      type="text"
                      placeholder="All staff name"
                      value={filterStaff}
                      onChange={(e) => setFilterStaff(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Task Type */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Task Type
                    </label>
                    <input
                      type="text"
                      placeholder="All task type"
                      value={filterTaskType}
                      onChange={(e) => setFilterTaskType(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Status
                    </label>
                    <input
                      type="text"
                      placeholder="All status"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Due Date & Clear button */}
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Due Date
                      </label>
                      <div className="relative">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="From - To"
                          value={filterDueDate}
                          onChange={(e) => setFilterDueDate(e.target.value)}
                          className="w-full pl-8 pr-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <button
                      onClick={clearFilters}
                      className="px-4 py-1.5 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Tasks Table */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="py-3 px-4 w-14">SR.NO</th>
                        <th className="py-3 px-4">CUSTOMER</th>
                        <th className="py-3 px-4">STAFF NAME</th>
                        <th className="py-3 px-4">INVOICE</th>
                        <th className="py-3 px-4">TASK</th>
                        <th className="py-3 px-4">TASK TYPE</th>
                        <th className="py-3 px-4">STATUS</th>
                        <th className="py-3 px-4 text-center">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {filteredTasks.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-10 text-center text-slate-400">
                            No tasks found
                          </td>
                        </tr>
                      ) : (
                        filteredTasks.map((t) => (
                          <tr key={t.id} className="hover:bg-slate-50/60 transition">
                            <td className="py-3.5 px-4 font-medium text-slate-500">{t.srNo}</td>
                            <td className="py-3.5 px-4 font-medium text-slate-700">
                              {t.customerName}
                            </td>
                            <td className="py-3.5 px-4 font-medium text-slate-800">{t.staffName}</td>
                            <td className="py-3.5 px-4 text-slate-500">{t.invoice}</td>
                            <td className="py-3.5 px-4 font-semibold text-slate-800">
                              {t.taskTitle}
                            </td>
                            <td className="py-3.5 px-4 text-slate-500">{t.taskType}</td>
                            <td className="py-3.5 px-4 relative">
                              <div className="relative inline-block text-left">
                                <button
                                  onClick={() =>
                                    setActiveStatusDropdownId(
                                      activeStatusDropdownId === t.id ? null : t.id
                                    )
                                  }
                                  className={`px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 ${t.status === "Pending"
                                      ? "bg-[#fff3d6] text-[#b45309]"
                                      : t.status === "In Progress"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-emerald-100 text-emerald-700"
                                    }`}
                                >
                                  <span>{t.status}</span>
                                  <ChevronDown className="w-3 h-3 opacity-60" />
                                </button>

                                {/* Dropdown menu */}
                                {activeStatusDropdownId === t.id && (
                                  <div className="absolute left-0 mt-1.5 w-32 bg-[#0b2447] text-white rounded-lg shadow-xl z-30 py-1 text-xs">
                                    <div className="text-[10px] text-slate-400 px-3 py-1 font-semibold uppercase">
                                      Change Status
                                    </div>
                                    <button
                                      onClick={() => handleUpdateStatus(t.id, "Pending")}
                                      className={`w-full text-left px-3 py-1.5 hover:bg-white/10 ${t.status === "Pending" ? "font-bold text-amber-300" : ""
                                        }`}
                                    >
                                      Pending
                                    </button>
                                    <button
                                      onClick={() => handleUpdateStatus(t.id, "In Progress")}
                                      className={`w-full text-left px-3 py-1.5 hover:bg-white/10 ${t.status === "In Progress" ? "font-bold text-blue-300" : ""
                                        }`}
                                    >
                                      In Progress
                                    </button>
                                    <button
                                      onClick={() => handleUpdateStatus(t.id, "Completed")}
                                      className={`w-full text-left px-3 py-1.5 hover:bg-white/10 ${t.status === "Completed" ? "font-bold text-emerald-300" : ""
                                        }`}
                                    >
                                      Completed
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                {/* START Button */}
                                <button
                                  onClick={() => handleOpenStartModal(t)}
                                  className="px-3.5 py-1 bg-[#107c41] hover:bg-[#0c6233] text-white text-[11px] font-bold rounded-md tracking-wider transition uppercase"
                                >
                                  START
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedTask(t);
                                    setCurrentView("create");
                                    setCreateForm({
                                      invoice: t.invoice,
                                      assignedTo: t.staffName,
                                      taskTitle: t.taskTitle,
                                      description: t.description,
                                      dueDate: t.dueDate,
                                      priority: t.priority,
                                      status: t.status,
                                      taskType: t.taskType
                                    });
                                  }}
                                  title="Edit"
                                  className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-slate-100 transition"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedTask(t);
                                    setCurrentView("details");
                                  }}
                                  title="View Details"
                                  className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-md hover:bg-slate-100 transition"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteTask(t.id)}
                                  title="Delete"
                                  className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-slate-100 transition"
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

                {/* Table Footer & Pagination */}
                <div className="px-4 py-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
                  <div>
                    Showing 1 to {filteredTasks.length} of {filteredTasks.length} results
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      disabled
                      className="px-2.5 py-1 text-slate-400 bg-slate-50 border border-slate-200 rounded text-xs cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button className="px-3 py-1 text-white bg-[#0b2447] rounded text-xs font-semibold">
                      1
                    </button>
                    <button
                      disabled
                      className="px-2.5 py-1 text-slate-400 bg-slate-50 border border-slate-200 rounded text-xs cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* VIEW 2: ADD / EDIT TASK FORM */}
          {currentView === "create" && (
            <div className="space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-[#1e293b]">Add Task</h1>
                  <p className="text-xs text-slate-500 mt-0.5">Create a new task for the team.</p>
                </div>
                <button
                  onClick={() => setCurrentView("list")}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold transition shadow-sm"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              </div>

              {/* Form Container */}
              <form
                onSubmit={handleCreateSubmit}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Invoice */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Link2 className="w-3.5 h-3.5 text-slate-400" />
                        Invoice <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <select
                      value={createForm.invoice}
                      onChange={(e) => setCreateForm({ ...createForm, invoice: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white"
                    >
                      <option>Select Invoice</option>
                      <option>#01INV-Test Customer (₹2.00)</option>
                      <option>#02INV-Solar Project (₹85,000.00)</option>
                    </select>
                  </div>

                  {/* Assigned To */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        Assigned To <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      value={createForm.assignedTo}
                      onChange={(e) => setCreateForm({ ...createForm, assignedTo: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>

                  {/* Task Title */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        Task Title <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter task title"
                      value={createForm.taskTitle}
                      onChange={(e) => setCreateForm({ ...createForm, taskTitle: e.target.value })}
                      required
                      className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>

                  {/* Description */}
                  <div className="row-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        Description
                      </span>
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Enter task description"
                      value={createForm.description}
                      onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white resize-none"
                    />
                  </div>

                  {/* Due Date */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        Due Date
                      </span>
                    </label>
                    <input
                      type="date"
                      value={createForm.dueDate}
                      onChange={(e) => setCreateForm({ ...createForm, dueDate: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                        Priority
                      </span>
                    </label>
                    <select
                      value={createForm.priority}
                      onChange={(e) => setCreateForm({ ...createForm, priority: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                        Status
                      </span>
                    </label>
                    <select
                      value={createForm.status}
                      onChange={(e) => setCreateForm({ ...createForm, status: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white"
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  </div>

                  {/* Task Type */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-slate-400" />
                        Task Type <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <select
                      value={createForm.taskType}
                      onChange={(e) => setCreateForm({ ...createForm, taskType: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white"
                    >
                      <option>Select Task Type</option>
                      <option>Follow Up</option>
                      <option>Document Collection</option>
                      <option>Site Survey</option>
                      <option>Proposal Preparation</option>
                    </select>
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setCurrentView("list")}
                    className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold transition shadow-sm"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* VIEW 3: TASK DETAILS */}
          {currentView === "details" && selectedTask && (
            <div className="space-y-5">
              {/* Top Banner & Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-[#1e293b]">Task Details</h1>
                  <p className="text-xs text-slate-500 mt-0.5">Complete information about this task</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setCurrentView("create");
                      setCreateForm({
                        invoice: selectedTask.invoice,
                        assignedTo: selectedTask.staffName,
                        taskTitle: selectedTask.taskTitle,
                        description: selectedTask.description,
                        dueDate: selectedTask.dueDate,
                        priority: selectedTask.priority,
                        status: selectedTask.status,
                        taskType: selectedTask.taskType
                      });
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

              {/* Detail Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-[#1e293b]">{selectedTask.taskTitle}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-xs">
                  {/* Created By */}
                  <div className="flex items-center">
                    <span className="w-36 text-slate-500 font-medium flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      Created By:
                    </span>
                    <span className="text-slate-800 font-semibold">{selectedTask.createdBy}</span>
                  </div>

                  {/* Invoice */}
                  <div className="flex items-center">
                    <span className="w-36 text-slate-500 font-medium flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      Invoice:
                    </span>
                    <span className="text-slate-800 font-semibold">{selectedTask.invoice}</span>
                  </div>

                  {/* Customer Name */}
                  <div className="flex items-center">
                    <span className="w-36 text-slate-500 font-medium flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      Customer Name:
                    </span>
                    <span className="text-slate-800 font-semibold">{selectedTask.customerName}</span>
                  </div>

                  {/* Staff Name */}
                  <div className="flex items-center">
                    <span className="w-36 text-slate-500 font-medium flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      Staff Name:
                    </span>
                    <span className="text-slate-800 font-semibold">{selectedTask.staffName}</span>
                  </div>

                  {/* Priority */}
                  <div className="flex items-center">
                    <span className="w-36 text-slate-500 font-medium flex items-center gap-2">
                      <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                      Priority:
                    </span>
                    <span className="px-3 py-0.5 rounded-full text-[11px] font-semibold bg-[#fff3d6] text-[#b45309]">
                      {selectedTask.priority}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="flex items-start">
                    <span className="w-36 text-slate-500 font-medium flex items-center gap-2 pt-0.5">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      Description:
                    </span>
                    <span className="text-slate-700 flex-1">{selectedTask.description}</span>
                  </div>

                  {/* Due Date */}
                  <div className="flex items-center">
                    <span className="w-36 text-slate-500 font-medium flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Due Date:
                    </span>
                    <span className="text-slate-800 font-semibold">{selectedTask.dueDate}</span>
                  </div>

                  {/* Status */}
                  <div className="flex items-center">
                    <span className="w-36 text-slate-500 font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                      Status:
                    </span>
                    <span
                      className={`px-3 py-0.5 rounded-full text-[11px] font-semibold ${selectedTask.status === "Pending"
                          ? "bg-[#fff3d6] text-[#b45309]"
                          : selectedTask.status === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                    >
                      {selectedTask.status}
                    </span>
                  </div>
                </div>

                {/* Optional Comments & Attachments section */}
                {selectedTask.comments && selectedTask.comments.length > 0 && (
                  <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-xs font-bold text-slate-700 mb-2">Comments & History</h3>
                    <div className="space-y-2">
                      {selectedTask.comments.map((c, i) => (
                        <div key={i} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
                          {c}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer note */}
          <div className="text-center text-xs text-slate-400 pt-8 pb-4">
            © 2026 Copyright - Fablead Developers Technolab
          </div>
        </div>
      </div>

      {/* START TASK MODAL (from Screenshot 2) */}
      {isStartModalOpen && taskToStart && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-[#0b2447] text-white px-5 py-3.5 flex items-center justify-between">
              <h2 className="text-sm font-bold tracking-wide">Task Details</h2>
              <button
                onClick={() => setIsStartModalOpen(false)}
                className="text-slate-300 hover:text-white p-1 rounded transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">
                  Comment <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Add comment if needed"
                  value={startComment}
                  onChange={(e) => setStartComment(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">
                  Upload Images/ Docs
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md border border-slate-300 text-xs font-medium transition">
                    Choose Files
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setStartFileName(e.target.files[0].name);
                        }
                      }}
                    />
                  </label>
                  <span className="text-slate-400 text-xs">
                    {startFileName || "No file chosen"}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={handleConfirmStart}
                className="px-5 py-2 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold transition shadow-sm"
              >
                Start Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

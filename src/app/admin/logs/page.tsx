"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import {
  RotateCw,
  Trash2,
  Search,
  Eye,
  X,
  Calendar,
  User,
  Activity,
  Layers,
} from "lucide-react";

interface LogEntry {
  id: string;
  actionedBy: string;
  module: string;
  moduleColor: string;
  takenAction: "UPDATE" | "ADD" | "DELETE";
  message: string;
  subtext: string;
  createdAt: string;
}

const initialLogs: LogEntry[] = [
  {
    id: "1",
    actionedBy: "Solar CRM",
    module: "Follow Up",
    moduleColor: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
    takenAction: "UPDATE",
    message: "Updated a Follow Up Purpose",
    subtext: "1 updated",
    createdAt: "06 Nov 2026, 04:21 PM",
  },
  {
    id: "2",
    actionedBy: "Solar CRM",
    module: "Follow Up",
    moduleColor: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
    takenAction: "UPDATE",
    message: "Updated a Follow Up Purpose",
    subtext: "1 updated",
    createdAt: "06 Nov 2026, 04:21 PM",
  },
  {
    id: "3",
    actionedBy: "Solar CRM",
    module: "Follow Up",
    moduleColor: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
    takenAction: "UPDATE",
    message: "Updated a Follow Up Purpose",
    subtext: "1 updated",
    createdAt: "06 Nov 2026, 04:21 PM",
  },
  {
    id: "4",
    actionedBy: "Solar CRM",
    module: "Support Ticket",
    moduleColor: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400",
    takenAction: "ADD",
    message: "Created a Ticket Ticket - test customer",
    subtext: "5 added",
    createdAt: "06 Nov 2026, 03:59 PM",
  },
  {
    id: "5",
    actionedBy: "Solar CRM",
    module: "Support Ticket",
    moduleColor: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400",
    takenAction: "ADD",
    message: "Created a Support Ticket Ticket - test customer",
    subtext: "5 added",
    createdAt: "06 Nov 2026, 03:59 PM",
  },
  {
    id: "6",
    actionedBy: "Solar CRM",
    module: "User",
    moduleColor: "bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400",
    takenAction: "ADD",
    message: "Created a Staff test",
    subtext: "7 added",
    createdAt: "06 Nov 2026, 03:58 PM",
  },
  {
    id: "7",
    actionedBy: "Solar CRM",
    module: "Deal",
    moduleColor: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400",
    takenAction: "ADD",
    message: "Created a Deal #01INV-test customer",
    subtext: "14 added",
    createdAt: "06 Nov 2026, 03:53 PM",
  },
  {
    id: "8",
    actionedBy: "Solar CRM",
    module: "Invoice",
    moduleColor: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
    takenAction: "ADD",
    message: "Created an Invoice INV-00001",
    subtext: "22 added",
    createdAt: "06 Nov 2026, 03:37 PM",
  },
  {
    id: "9",
    actionedBy: "Solar CRM",
    module: "Invoice",
    moduleColor: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
    takenAction: "ADD",
    message: "Created a Invoice ID 1",
    subtext: "22 added",
    createdAt: "06 Nov 2026, 03:37 PM",
  },
  {
    id: "10",
    actionedBy: "Solar CRM",
    module: "Meeting",
    moduleColor: "bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400",
    takenAction: "ADD",
    message: "Scheduled a Meeting test",
    subtext: "5 added",
    createdAt: "06 Nov 2026, 03:12 PM",
  },
];

export default function UserLogsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);

  const handleClearSingle = (id: string) => {
    setLogs((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to delete all activity logs?")) {
      setLogs([]);
    }
  };

  const handleRefresh = () => {
    setLogs(initialLogs);
  };

  const filteredLogs = logs.filter(
    (log) =>
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actionedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.takenAction.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / perPage));
  const displayedLogs = filteredLogs.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="min-h-screen bg-[#f4f7fe] dark:bg-[#0b1437] flex text-slate-800 dark:text-slate-100">
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
          onSearch={(q) => setSearchQuery(q)}
        />

        <main className="p-6 md:p-8 space-y-6">
          {/* Header Title & Top Actions (Matches Screenshot 1) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#1b2559] dark:text-white">
                User Logs
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Track user activity across CRM modules.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#111c44] border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-2xs"
              >
                <RotateCw className="w-3.5 h-3.5 text-slate-500" />
                <span>Refresh</span>
              </button>

              <button
                onClick={handleClearAll}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold transition shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete All</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white dark:bg-[#111c44] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 space-y-5">
            {/* Show Entries & Search Bar Row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>Show</span>
                <select
                  value={perPage}
                  onChange={(e) => {
                    setPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#0b1437] text-xs font-medium focus:outline-none"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span>entries</span>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                />
              </div>
            </div>

            {/* Logs Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4">ACTIONED BY</th>
                    <th className="py-3 px-4">MODULE</th>
                    <th className="py-3 px-4">TAKEN ACTION</th>
                    <th className="py-3 px-4">MESSAGE</th>
                    <th className="py-3 px-4">CREATED AT</th>
                    <th className="py-3 px-4 text-center">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {displayedLogs.map((log) => (
                    <tr
                      key={log.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                        {log.actionedBy}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold ${log.moduleColor}`}
                        >
                          {log.module}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            log.takenAction === "UPDATE"
                              ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800"
                              : log.takenAction === "ADD"
                              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                              : "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-800"
                          }`}
                        >
                          {log.takenAction}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800 dark:text-slate-100">
                          {log.message}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {log.subtext}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {log.createdAt}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setSelectedLog(log)}
                            className="px-3 py-1 rounded-full border border-blue-400 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-[11px] font-semibold transition"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleClearSingle(log.id)}
                            className="px-3 py-1 rounded-full bg-[#ef4444] hover:bg-[#dc2626] text-white text-[11px] font-semibold transition shadow-2xs"
                          >
                            Clear
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {displayedLogs.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">
                        No activity logs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination / Count Footer */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <div>
                Showing {filteredLogs.length === 0 ? 0 : (currentPage - 1) * perPage + 1} to{" "}
                {Math.min(currentPage * perPage, filteredLogs.length)} of{" "}
                {filteredLogs.length} results
              </div>

              <div className="flex items-center gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition ${
                      currentPage === i + 1
                        ? "bg-[#001738] text-white"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Log Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111c44] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-[#1b2559] dark:text-white">
                Log Details
              </h3>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-3.5 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Actioned By</span>
                <span className="font-semibold text-slate-800 dark:text-slate-100">
                  {selectedLog.actionedBy}
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Module</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${selectedLog.moduleColor}`}>
                  {selectedLog.module}
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Action Type</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">
                  {selectedLog.takenAction}
                </span>
              </div>
              <div className="py-1.5 border-b border-slate-100 dark:border-slate-800 space-y-1">
                <span className="text-slate-400 block">Message</span>
                <p className="font-semibold text-slate-800 dark:text-slate-100">
                  {selectedLog.message}
                </p>
                <p className="text-[11px] text-slate-400">{selectedLog.subtext}</p>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400">Timestamp</span>
                <span className="text-slate-600 dark:text-slate-300 font-medium">
                  {selectedLog.createdAt}
                </span>
              </div>
            </div>
            <div className="px-6 py-3 bg-slate-50 dark:bg-[#0b1437]/50 flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#001738] hover:bg-[#00224f] text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


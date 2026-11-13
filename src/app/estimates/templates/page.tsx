"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

interface PdfTemplateRecord {
  id: string;
  srNo: number;
  templateName: string;
  createdDate: string;
  createdTime: string;
}

const initialTemplates: PdfTemplateRecord[] = [
  {
    id: "tpl-1",
    srNo: 1,
    templateName: "Test",
    createdDate: "06 Nov 2026",
    createdTime: "03:26 PM",
  },
];

export default function ManagePdfTemplatesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [templates, setTemplates] = useState<PdfTemplateRecord[]>(initialTemplates);

  const handleDeleteTemplate = (id: string) => {
    if (confirm("Are you sure you want to delete this template?")) {
      setTemplates((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const filteredTemplates = templates.filter((t) =>
    t.templateName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f4f7fe] dark:bg-[#0b1437] flex text-slate-800 dark:text-slate-100">
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeItem="Manage Estimates"
        activeSubItem="Templates"
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
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#1b2559] dark:text-white">
                Manage PDF Templates
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Track and manage your custom PDF templates.
              </p>
            </div>
            <Link
              href="/estimates/templates/create"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold transition-colors shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Template</span>
            </Link>
          </div>

          {/* Table Card */}
          <div className="bg-white dark:bg-[#111c44] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            {/* Table Subheader & Search */}
            <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-sm font-bold text-[#1b2559] dark:text-white">
                All Templates
              </h2>
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/70 dark:bg-[#0b1437]/50 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="py-3.5 px-6 w-16">SR.NO</th>
                    <th className="py-3.5 px-6">TEMPLATE NAME</th>
                    <th className="py-3.5 px-6">CREATED DATE</th>
                    <th className="py-3.5 px-6 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredTemplates.length > 0 ? (
                    filteredTemplates.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="py-4 px-6 text-slate-500 font-medium">
                          {item.srNo}
                        </td>
                        <td className="py-4 px-6 font-bold text-slate-800 dark:text-white">
                          {item.templateName}
                        </td>
                        <td className="py-4 px-6">
                          <p className="font-semibold text-slate-700 dark:text-slate-200">
                            {item.createdDate}
                          </p>
                          <p className="text-[11px] text-slate-400">{item.createdTime}</p>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <Link
                              href={`/estimates/templates/edit/${item.id}`}
                              className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <Link
                              href={`/estimates/templates/edit/${item.id}`}
                              className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDeleteTemplate(item.id)}
                              className="p-1.5 text-rose-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-16 text-slate-400 text-xs">
                        No templates found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <span>Showing 1 to {filteredTemplates.length} of {filteredTemplates.length} results</span>
              <div className="flex items-center gap-1">
                <button
                  disabled
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 text-xs font-semibold cursor-not-allowed"
                >
                  Previous
                </button>
                <button className="w-8 h-8 rounded-lg bg-[#001738] text-white text-xs font-bold flex items-center justify-center">
                  1
                </button>
                <button
                  disabled
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 text-xs font-semibold cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


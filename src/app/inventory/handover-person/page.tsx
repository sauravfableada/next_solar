"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { Search, Plus, Trash2, X } from "lucide-react";

interface HandoverRecord {
  id: number;
  srNo: number;
  name: string;
  phone: string;
  address: string;
  createdAt: string;
}

export default function ManageHandoverPersonPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [handoverPersons, setHandoverPersons] = useState<HandoverRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State (Screenshot 9)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formAddress, setFormAddress] = useState("");

  const handleStartAdd = () => {
    setFormName("");
    setFormPhone("");
    setFormAddress("");
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) return;

    const newPerson: HandoverRecord = {
      id: Date.now(),
      srNo: handoverPersons.length + 1,
      name: formName.trim(),
      phone: formPhone.trim(),
      address: formAddress.trim() || "--",
      createdAt: "13 Nov 2026, 12:00",
    };

    setHandoverPersons([...handoverPersons, newPerson]);
    setIsModalOpen(false);
  };

  const filteredPersons = handoverPersons.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-[#f4f7fe] dark:bg-[#0b1437] flex text-slate-800 dark:text-slate-100">
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeItem="Manage Inventory"
        activeSubItem="Handover Person"
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
          {/* Header Title & Actions (Screenshot 8) */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#1b2559] dark:text-white">
                Manage Handover Person
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Manage handover persons in Solar CRM.
              </p>
            </div>
            <button
              onClick={handleStartAdd}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white font-medium text-sm transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Handover Person</span>
            </button>
          </div>

          {/* Table Card */}
          <div className="bg-white dark:bg-[#111c44] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800/80">
              <h2 className="text-base font-semibold text-[#1b2559] dark:text-white">
                All Handover Persons
              </h2>
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search handover persons..."
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
                  <tr className="border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#0b1437]/30 text-slate-400 uppercase text-[11px] font-semibold tracking-wider">
                    <th className="py-3 px-6">SR.NO</th>
                    <th className="py-3 px-6">NAME</th>
                    <th className="py-3 px-6">PHONE</th>
                    <th className="py-3 px-6">ADDRESS</th>
                    <th className="py-3 px-6">CREATED AT</th>
                    <th className="py-3 px-6 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {filteredPersons.length > 0 ? (
                    filteredPersons.map((p) => (
                      <tr
                        key={p.id}
                        className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="py-4 px-6 text-slate-600 dark:text-slate-300 font-medium">
                          {p.srNo}
                        </td>
                        <td className="py-4 px-6 font-semibold text-[#1b2559] dark:text-white">
                          {p.name}
                        </td>
                        <td className="py-4 px-6 text-slate-600 dark:text-slate-300">
                          {p.phone}
                        </td>
                        <td className="py-4 px-6 text-slate-500 dark:text-slate-400">
                          {p.address}
                        </td>
                        <td className="py-4 px-6 text-slate-500 dark:text-slate-400">
                          {p.createdAt}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() =>
                              setHandoverPersons(
                                handoverPersons.filter((item) => item.id !== p.id)
                              )
                            }
                            className="p-1.5 text-red-400 hover:text-red-600 rounded hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    /* Empty State Illustration exactly matching Screenshot 8 */
                    <tr>
                      <td colSpan={6} className="py-20 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-20 h-20 mb-4 flex items-center justify-center text-slate-300 dark:text-slate-600">
                            <svg
                              className="w-16 h-16 stroke-[1.5]"
                              viewBox="0 0 64 64"
                              fill="none"
                              stroke="currentColor"
                            >
                              <path
                                d="M14 28L20 12H44L50 28"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12 28H24L28 36H36L40 28H52V48C52 50.2091 50.2091 52 48 52H16C13.7909 52 12 50.2091 12 48V28Z"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <p className="text-sm text-slate-400 dark:text-slate-400 font-medium mb-4">
                            No handover persons found.
                          </p>
                          <button
                            onClick={handleStartAdd}
                            className="px-6 py-2.5 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white text-sm font-semibold transition-colors shadow-sm"
                          >
                            Add Handover Person
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Add Handover Person Modal (Screenshot 9) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111c44] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-[#1b2559] dark:text-white">
                Add Handover Person
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1b2559] dark:text-white">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1b2559] dark:text-white">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Enter phone number"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1b2559] dark:text-white">
                  Address
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter address"
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y"
                />
              </div>

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


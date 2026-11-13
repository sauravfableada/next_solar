"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { Search } from "lucide-react";

interface InventoryRecord {
  id: number;
  srNo: number;
  productInfo: string;
  currentStock: number;
  createdAt: string;
}

export default function InventoryStockPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [inventoryList, setInventoryList] = useState<InventoryRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInventory = inventoryList.filter((item) =>
    item.productInfo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f4f7fe] dark:bg-[#0b1437] flex text-slate-800 dark:text-slate-100">
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeItem="Manage Inventory"
        activeSubItem="Inventory"
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
          {/* Header Title */}
          <div>
            <h1 className="text-2xl font-bold text-[#1b2559] dark:text-white">
              Manage Inventory
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Track product stock levels and inventory changes.
            </p>
          </div>

          {/* Table Card */}
          <div className="bg-white dark:bg-[#111c44] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800/80">
              <h2 className="text-base font-semibold text-[#1b2559] dark:text-white">
                Inventory List
              </h2>
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search inventory..."
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
                    <th className="py-3 px-6">PRODUCT INFO</th>
                    <th className="py-3 px-6">CURRENT STOCK</th>
                    <th className="py-3 px-6">CREATED AT</th>
                    <th className="py-3 px-6 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {filteredInventory.length > 0 ? (
                    filteredInventory.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="py-4 px-6 text-slate-600 dark:text-slate-300 font-medium">
                          {item.srNo}
                        </td>
                        <td className="py-4 px-6 font-semibold text-[#1b2559] dark:text-white">
                          {item.productInfo}
                        </td>
                        <td className="py-4 px-6 font-mono text-slate-700 dark:text-slate-200">
                          {item.currentStock}
                        </td>
                        <td className="py-4 px-6 text-slate-500 dark:text-slate-400">
                          {item.createdAt}
                        </td>
                        <td className="py-4 px-6 text-right">-</td>
                      </tr>
                    ))
                  ) : (
                    /* Empty State Illustration exactly matching Screenshot 1 */
                    <tr>
                      <td colSpan={5} className="py-20 text-center">
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
                          <p className="text-sm text-slate-400 dark:text-slate-400 font-medium">
                            No inventory records found.
                          </p>
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
    </div>
  );
}

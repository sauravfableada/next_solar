"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import {
  Search,
  RotateCcw,
  SlidersHorizontal,
  Building2,
} from "lucide-react";

interface ReceivableRecord {
  id: string;
  customer: string;
  invoice: string;
  bankBranch: string;
  invoiceTotal: string;
  customerReceived: string;
  customerPending: string;
  bankReceived: string;
  bankPendingFinalRelease: string;
}

const initialReceivables: ReceivableRecord[] = [];

export default function BankCustomerReceivablesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [receivables, setReceivables] = useState<ReceivableRecord[]>(initialReceivables);

  // Filters state
  const [filterBank, setFilterBank] = useState("");
  const [filterBranch, setFilterBranch] = useState("");
  const [filterFunding, setFilterFunding] = useState("");
  const [filterPaymentStatus, setFilterPaymentStatus] = useState("");

  const handleClearFilters = () => {
    setSearchQuery("");
    setFilterBank("");
    setFilterBranch("");
    setFilterFunding("");
    setFilterPaymentStatus("");
  };

  return (
    <div className="min-h-screen bg-[#f4f7fe] dark:bg-[#0b1437] flex text-slate-800 dark:text-slate-100">
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeItem="Manage Estimates"
        activeSubItem="Bank & Customer Receivables"
      />

      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-64"
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
                Bank & Customer Receivables
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Invoice-wise funding, collections and outstanding amounts. Totals use INR only.
              </p>
            </div>
            <Link
              href="/invoices"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold transition-colors shadow-2xs"
            >
              <span>All invoices</span>
            </Link>
          </div>

          {/* 4 Summary Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total received */}
            <div className="bg-white dark:bg-[#111c44] p-5 rounded-2xl border-l-4 border-l-blue-600 border border-slate-100 dark:border-slate-800 shadow-2xs">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total received</p>
              <p className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white mt-1">
                0.00
              </p>
            </div>

            {/* Due from customers */}
            <div className="bg-white dark:bg-[#111c44] p-5 rounded-2xl border-l-4 border-l-blue-600 border border-slate-100 dark:border-slate-800 shadow-2xs">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Due from customers</p>
              <p className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white mt-1">
                0.00
              </p>
            </div>

            {/* Received from banks */}
            <div className="bg-white dark:bg-[#111c44] p-5 rounded-2xl border-l-4 border-l-blue-600 border border-slate-100 dark:border-slate-800 shadow-2xs">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Received from banks</p>
              <p className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white mt-1">
                0.00
              </p>
            </div>

            {/* Due from banks */}
            <div className="bg-white dark:bg-[#111c44] p-5 rounded-2xl border-l-4 border-l-blue-600 border border-slate-100 dark:border-slate-800 shadow-2xs">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Due from banks</p>
              <p className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white mt-1">
                0.00
              </p>
            </div>
          </div>

          {/* Search & Filters Card */}
          <div className="bg-white dark:bg-[#111c44] p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Search finance records"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Bank
                </label>
                <select
                  value={filterBank}
                  onChange={(e) => setFilterBank(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                >
                  <option value="">All banks</option>
                  <option value="SBI">State Bank of India</option>
                  <option value="HDFC">HDFC Bank</option>
                  <option value="ICICI">ICICI Bank</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Branch
                </label>
                <select
                  value={filterBranch}
                  onChange={(e) => setFilterBranch(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                >
                  <option value="">All branches</option>
                  <option value="Main Branch">Main Branch</option>
                  <option value="City Center">City Center</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Funding
                </label>
                <select
                  value={filterFunding}
                  onChange={(e) => setFilterFunding(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                >
                  <option value="">All funding</option>
                  <option value="Bank Loan">Bank Loan</option>
                  <option value="Self Funded">Self Funded</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Payment status
                </label>
                <select
                  value={filterPaymentStatus}
                  onChange={(e) => setFilterPaymentStatus(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                >
                  <option value="">All statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div>
                <button
                  onClick={handleClearFilters}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>
            </div>
          </div>

          {/* Table Card */}
          <div className="bg-white dark:bg-[#111c44] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/70 dark:bg-[#0b1437]/50 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">CUSTOMER</th>
                    <th className="py-3.5 px-4">INVOICE</th>
                    <th className="py-3.5 px-4">BANK / BRANCH</th>
                    <th className="py-3.5 px-4">INVOICE TOTAL</th>
                    <th className="py-3.5 px-4">CUSTOMER RECEIVED</th>
                    <th className="py-3.5 px-4">CUSTOMER PENDING</th>
                    <th className="py-3.5 px-4">BANK RECEIVED</th>
                    <th className="py-3.5 px-4">BANK PENDING / FINAL RELEASE</th>
                    <th className="py-3.5 px-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {receivables.length > 0 ? (
                    receivables.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="py-4 px-4 font-bold text-slate-800 dark:text-white">
                          {item.customer}
                        </td>
                        <td className="py-4 px-4">{item.invoice}</td>
                        <td className="py-4 px-4">{item.bankBranch}</td>
                        <td className="py-4 px-4 font-semibold">{item.invoiceTotal}</td>
                        <td className="py-4 px-4 text-emerald-600">{item.customerReceived}</td>
                        <td className="py-4 px-4 text-amber-600">{item.customerPending}</td>
                        <td className="py-4 px-4 text-emerald-600">{item.bankReceived}</td>
                        <td className="py-4 px-4 text-amber-600">{item.bankPendingFinalRelease}</td>
                        <td className="py-4 px-4 text-right">
                          <button className="text-blue-600 hover:underline">View</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="text-center py-16 text-slate-400 text-xs">
                        No matching invoices found.
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


"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import {
  ArrowLeft,
  Pencil,
  CreditCard,
  Building,
  Phone,
  Mail,
  Calendar,
  Layers,
  Award,
  Wallet,
  Clock,
  CheckCircle2,
  TrendingUp,
  FileText,
  User,
  Info,
  ChevronRight,
  FolderOpen,
} from "lucide-react";

export default function PartnerDetailsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "details" | "leads" | "payments">("overview");

  // Partner summary
  const partner = {
    name: "TEST",
    code: "CP-000001",
    status: "Active",
    phone: "9996663355",
    assignedStaff: "Solar CRM",
    joinedDate: "06 Nov 2026",
    commission: "0.00 INR fixed commission",
    timeReport: "All-time report",
  };

  const metrics = [
    { label: "Leads Given", value: "0", icon: "📢", color: "blue" },
    { label: "Converted Leads", value: "0", icon: "👥", color: "emerald" },
    { label: "Conversion Rate", value: "0%", icon: "📈", color: "purple" },
    { label: "Eligible Customers", value: "0", icon: "🏅", color: "amber" },
    { label: "Customer Collections", value: "0.00 INR", icon: "💵", color: "blue" },
    { label: "Partner Earned", value: "0.00 INR", icon: "📁", color: "purple" },
    { label: "Paid to Partner", value: "0.00 INR", icon: "✅", color: "emerald" },
    { label: "Pending to Partner", value: "0.00 INR", icon: "⏳", color: "amber" },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fe] dark:bg-[#0b1437] flex text-slate-800 dark:text-slate-100">
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeItem="Manage Partners"
      />

      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <AdminHeader
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />

        <main className="p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Top Profile Summary Card (Matches Screenshot 3) */}
          <div className="bg-white dark:bg-[#111c44] p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center font-bold text-lg border border-blue-100 dark:border-blue-900/50">
                  📱
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-[#1b2559] dark:text-white">
                      {partner.name}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      {partner.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 font-medium">
                    {partner.code}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => alert("Payment recorded modal")}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition"
                >
                  <CreditCard className="w-3.5 h-3.5 text-slate-500" />
                  <span>Record Payment</span>
                </button>

                <Link
                  href={`/admin/partners/edit/1`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition"
                >
                  <Pencil className="w-3.5 h-3.5 text-slate-500" />
                  <span>Edit</span>
                </Link>

                <Link
                  href="/admin/partners"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold shadow-sm transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </Link>
              </div>
            </div>

            {/* Sub-meta strip */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                {partner.phone}
              </span>
              <span>Assigned: {partner.assignedStaff}</span>
              <span>Joined {partner.joinedDate}</span>
              <span>{partner.commission}</span>
              <span className="text-slate-400 font-semibold">• {partner.timeReport}</span>
            </div>
          </div>

          {/* 8 Stats Cards Grid (Matches Screenshot 3) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {metrics.map((m, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#111c44] p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {m.label}
                  </span>
                  <span className="text-base">{m.icon}</span>
                </div>
                <h4 className="text-xl font-black text-[#1b2559] dark:text-white">
                  {m.value}
                </h4>
              </div>
            ))}
          </div>

          {/* Partner Insights Tabs (Matches Screenshot 3) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1b2559] dark:text-white">
              <Info className="w-4 h-4 text-blue-500" />
              <span>Partner Insights</span>
            </div>

            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              {[
                { id: "overview", label: "Overview" },
                { id: "details", label: "Partner Details" },
                { id: "leads", label: "Referred Leads" },
                { id: "payments", label: "Payment History" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                    activeTab === tab.id
                      ? "bg-white dark:bg-[#111c44] text-[#1b2559] dark:text-white shadow-xs border border-slate-200 dark:border-slate-700 font-bold"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENT: Overview */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* 2 Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Lead & Conversion Trend */}
                  <div className="bg-white dark:bg-[#111c44] p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-[#1b2559] dark:text-white">
                        Lead & Conversion Trend
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Leads created each month and how many of those leads are converted now.
                      </p>
                    </div>
                    <div className="h-56 flex flex-col items-center justify-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-400">
                      No data yet
                    </div>
                    <div className="flex items-center justify-center gap-6 text-xs text-slate-500 pt-2">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Leads given
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Converted
                      </span>
                    </div>
                  </div>

                  {/* Lead Conversion */}
                  <div className="bg-white dark:bg-[#111c44] p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-[#1b2559] dark:text-white">
                        Lead Conversion
                      </h4>
                    </div>
                    <div className="h-56 flex flex-col items-center justify-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-400">
                      No data yet
                    </div>
                    <div className="flex items-center justify-center gap-6 text-xs text-slate-500 pt-2">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Converted
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Not converted
                      </span>
                    </div>
                    <p className="text-center text-[11px] text-slate-400">
                      0 converted from 0 referred leads
                    </p>
                  </div>
                </div>

                {/* Financial Summary & Commission Settlement */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Your Business from this Partner */}
                  <div className="bg-white dark:bg-[#111c44] p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                    <h4 className="text-sm font-bold text-[#1b2559] dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
                      Your Business from this Partner
                    </h4>
                    <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                      <div className="flex justify-between py-2">
                        <span className="text-slate-500">Estimates subtotal</span>
                        <span className="font-bold text-slate-800 dark:text-slate-100">0.00 INR</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-slate-500">Approved estimate subtotal</span>
                        <span className="font-bold text-slate-800 dark:text-slate-100">0.00 INR</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-slate-500">Invoiced revenue</span>
                        <span className="font-bold text-slate-800 dark:text-slate-100">0.00 INR</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-slate-500">Customer collections</span>
                        <span className="font-bold text-slate-800 dark:text-slate-100">0.00 INR</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-slate-500">Partner commission earned</span>
                        <span className="font-bold text-slate-800 dark:text-slate-100">0.00 INR</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-slate-500">Collections after earned commission</span>
                        <span className="font-bold text-slate-800 dark:text-slate-100">0.00 INR</span>
                      </div>
                      <div className="flex justify-between py-2 font-bold text-emerald-600 dark:text-emerald-400">
                        <span>Cash remaining after partner payments</span>
                        <span>0.00 INR</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 pt-2">
                      Collections after commission exclude materials, installation, taxes and other costs; this is not a profit calculation.
                    </p>
                  </div>

                  {/* Commission Settlement */}
                  <div className="bg-white dark:bg-[#111c44] p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                    <h4 className="text-sm font-bold text-[#1b2559] dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
                      Commission Settlement
                    </h4>
                    <div className="h-56 flex flex-col items-center justify-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-400">
                      No data yet
                    </div>
                    <div className="flex items-center justify-center gap-6 text-xs text-slate-500 pt-2">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Paid
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Pending
                      </span>
                    </div>
                  </div>
                </div>

                {/* Customer Contribution Table */}
                <div className="bg-white dark:bg-[#111c44] p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                  <h4 className="text-sm font-bold text-[#1b2559] dark:text-white">
                    Customer Contribution
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          <th className="py-2.5 px-3">CUSTOMER</th>
                          <th className="py-2.5 px-3">ESTIMATES SUBTOTAL</th>
                          <th className="py-2.5 px-3">APPROVED SUBTOTAL</th>
                          <th className="py-2.5 px-3">INVOICED</th>
                          <th className="py-2.5 px-3">COLLECTED</th>
                          <th className="py-2.5 px-3">PARTNER EARNED</th>
                          <th className="py-2.5 px-3">ELIGIBILITY</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-slate-400">
                            No converted customers attributed to this partner yet.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* How this report is calculated banner */}
                <div className="bg-slate-50 dark:bg-[#0b1437]/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-2">
                  <h5 className="font-bold text-[#1b2559] dark:text-white text-xs">
                    How this report is calculated
                  </h5>
                  <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
                    <li>Amounts use INR only. 0 invoices in another or unrecognized currency are excluded. Legacy records without a currency use the estimate currency or application default.</li>
                    <li>Commission uses current partner settings: Estimate subtotal, payable on payment collection. Fixed commission applies once per eligible converted customer.</li>
                    <li>The customer's saved channel partner takes priority; otherwise the earliest converted partner lead by creation date is used, with lead ID breaking ties. 0 customers attributed elsewhere are excluded.</li>
                    <li>Estimates subtotal includes pending and approved/completed estimates; commission on estimate subtotal uses approved/completed estimates only. Issued, non-cancelled invoices count as revenue. Paid invoices count as fully collected; otherwise saved receipts count up to invoice value, without double counting. Paid amounts use recorded, non-voided partner payments.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}


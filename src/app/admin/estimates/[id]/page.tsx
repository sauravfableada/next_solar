"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import {
  ArrowLeft,
  Pencil,
  FileText,
  Boxes,
} from "lucide-react";

export default function ViewEstimatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const estimateId = resolvedParams.id;

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Equipment table rows
  const [equipmentRows, setEquipmentRows] = useState([
    { id: 1, panelSerial: "-", inverterSerial: "-" },
    { id: 2, panelSerial: "-", inverterSerial: "-" },
    { id: 3, panelSerial: "-", inverterSerial: "-" },
    { id: 4, panelSerial: "-", inverterSerial: "-" },
    { id: 5, panelSerial: "-", inverterSerial: "-" },
    { id: 6, panelSerial: "-", inverterSerial: "-" },
    { id: 7, panelSerial: "-", inverterSerial: "-" },
    { id: 8, panelSerial: "-", inverterSerial: "-" },
    { id: 9, panelSerial: "-", inverterSerial: "-" },
    { id: 10, panelSerial: "-", inverterSerial: "-" },
  ]);

  return (
    <div className="min-h-screen bg-[#f4f7fe] dark:bg-[#0b1437] flex text-slate-800 dark:text-slate-100">
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeItem="Manage Estimates"
        activeSubItem="All Estimates"
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

        <main className="p-6 md:p-8 space-y-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#1b2559] dark:text-white">
                Estimates Details
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Complete information about this deal
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111c44] hover:bg-slate-50 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Generate PDF</span>
              </button>

              <Link
                href={`/estimates/edit/${estimateId}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold transition-colors shadow-2xs"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit</span>
              </Link>

              <Link
                href="/estimates"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold transition-colors shadow-2xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </Link>
            </div>
          </div>

          {/* Quotation Document Container */}
          <div className="bg-white dark:bg-[#111c44] p-8 md:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-5xl mx-auto space-y-6">
            {/* Document Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#001738] flex items-center justify-center text-white font-black text-lg">
                  F
                </div>
                <div>
                  <h3 className="font-extrabold text-[#1b2559] dark:text-white text-lg tracking-tight">
                    Fablead Developer Technolab
                  </h3>
                  <p className="text-xs text-slate-400">Solar & Renewable EPC Solutions</p>
                </div>
              </div>

              <div className="text-right text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <p className="font-bold text-slate-800 dark:text-white">Fablead Developer Technolab</p>
                <p>A-5001, Ascon Plaza, Adajan, Surat, Gujarat 395009 India</p>
                <p>1234567895</p>
              </div>
            </div>

            {/* Estimate No, Title, Date */}
            <div className="flex flex-col sm:flex-row justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 py-1">
              <span>Estimate no.: #000001</span>
              <span className="text-sm uppercase tracking-wider underline font-extrabold text-[#001738] dark:text-blue-400">
                ESTIMATION
              </span>
              <span>Date: 2026-11-06</span>
            </div>

            {/* Customer Details Table with green header */}
            <div className="border border-emerald-600/40 rounded-lg overflow-hidden text-xs">
              <div className="bg-[#4d8c57] text-white px-4 py-2 font-bold tracking-wide">
                Customer Details
              </div>
              <table className="w-full">
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr className="divide-x divide-slate-100 dark:divide-slate-800">
                    <td className="w-1/4 p-2.5 font-bold bg-slate-50/50 dark:bg-[#0b1437]/30">Customer Name</td>
                    <td className="w-1/4 p-2.5">test customer</td>
                    <td className="w-1/4 p-2.5 font-bold bg-slate-50/50 dark:bg-[#0b1437]/30">Email</td>
                    <td className="w-1/4 p-2.5 text-blue-600">testcustomer@gmail.com</td>
                  </tr>
                  <tr className="divide-x divide-slate-100 dark:divide-slate-800">
                    <td className="p-2.5 font-bold bg-slate-50/50 dark:bg-[#0b1437]/30">Address</td>
                    <td className="p-2.5">--</td>
                    <td className="p-2.5 font-bold bg-slate-50/50 dark:bg-[#0b1437]/30">Contact</td>
                    <td className="p-2.5">9870543210</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Description / Summary Table with green header */}
            <div className="border border-emerald-600/40 rounded-lg overflow-hidden text-xs">
              <table className="w-full">
                <thead className="bg-[#4d8c57] text-white">
                  <tr>
                    <th className="p-2.5 text-left font-bold">Description</th>
                    <th className="p-2.5 text-right font-bold w-40">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="p-2.5">Bill of Materials (BOM)</td>
                    <td className="p-2.5 text-right font-semibold">1.00</td>
                  </tr>
                  <tr className="font-bold bg-slate-50/50 dark:bg-[#0b1437]/30">
                    <td className="p-2.5">Consumer Net Payable <span className="text-[11px] font-normal italic">(Base cost + BOM + BOM Taxes)</span></td>
                    <td className="p-2.5 text-right">1.00</td>
                  </tr>
                  <tr className="bg-[#4d8c57] text-white font-extrabold text-sm">
                    <td className="p-2.5">Net Amount Payable</td>
                    <td className="p-2.5 text-right">1.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* System Parameters Table */}
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden text-xs">
              <table className="w-full divide-y divide-slate-200 dark:divide-slate-700">
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  <tr className="divide-x divide-slate-200 dark:divide-slate-700">
                    <td className="w-1/3 p-2.5 font-bold bg-slate-50 dark:bg-[#0b1437]/40">System Capacity</td>
                    <td className="p-2.5">5.00 kW</td>
                  </tr>
                  <tr className="divide-x divide-slate-200 dark:divide-slate-700">
                    <td className="p-2.5 font-bold bg-slate-50 dark:bg-[#0b1437]/40">Estimate Type</td>
                    <td className="p-2.5">Residential</td>
                  </tr>
                  <tr className="divide-x divide-slate-200 dark:divide-slate-700">
                    <td className="p-2.5 font-bold bg-slate-50 dark:bg-[#0b1437]/40">Solar Meter Charges</td>
                    <td className="p-2.5">As Per Actual</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Comment Section */}
            <div className="border border-emerald-600/40 rounded-lg overflow-hidden text-xs">
              <div className="bg-[#4d8c57] text-white px-4 py-1.5 font-bold">Comment</div>
              <div className="p-3 text-slate-500">--</div>
            </div>

            {/* Bill of Materials (BOM) Section */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Boxes className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                    Bill of Materials (BOM)
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Materials, specifications and pricing breakdown
                  </p>
                </div>
              </div>

              <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden text-xs">
                <table className="w-full">
                  <thead className="bg-[#001738] text-white text-[11px] font-bold">
                    <tr>
                      <th className="p-3 text-left">PRODUCT NAME</th>
                      <th className="p-3 text-left">SPECIFICATIONS</th>
                      <th className="p-3 text-center">QUANTITY</th>
                      <th className="p-3 text-right">PRICE</th>
                      <th className="p-3 text-right">TOTAL(EXCL. GST)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr>
                      <td className="p-3 font-semibold text-slate-800 dark:text-white">Test</td>
                      <td className="p-3 text-slate-400">-</td>
                      <td className="p-3 text-center">1</td>
                      <td className="p-3 text-right">1.00</td>
                      <td className="p-3 text-right font-medium">1.00</td>
                    </tr>
                    <tr className="bg-slate-50 dark:bg-[#0b1437]/50 font-bold border-t border-slate-200">
                      <td colSpan={2} className="p-3 text-right">Total:</td>
                      <td className="p-3 text-center">1</td>
                      <td className="p-3 text-right">-</td>
                      <td className="p-3 text-right bg-[#001738] text-white">1.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Equipment Details Card */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-800 dark:text-white">
                    📊 Equipment Details · Estimate #000001
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200">
                    Pending
                  </span>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold"
                >
                  <Pencil className="w-3 h-3" />
                  <span>Edit Equipment Details</span>
                </button>
              </div>

              <p className="text-xs text-slate-500">
                Configuration: 2 panel(s) per kW, with one inverter per panel.
              </p>

              <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-[#0b1437]/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-4 w-12">#</th>
                      <th className="py-2.5 px-4">PANEL SERIAL NO.</th>
                      <th className="py-2.5 px-4">INVERTER SERIAL NO.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {equipmentRows.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/50">
                        <td className="py-2.5 px-4 text-slate-500 font-medium">{row.id}</td>
                        <td className="py-2.5 px-4 text-slate-500">{row.panelSerial}</td>
                        <td className="py-2.5 px-4 text-slate-500">{row.inverterSerial}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


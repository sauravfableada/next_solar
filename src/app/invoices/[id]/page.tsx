"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import {
  ArrowLeft,
  Pencil,
  FileText,
  CreditCard,
  X,
  Boxes,
} from "lucide-react";

export default function ViewInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const invoiceId = resolvedParams.id;

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Manage payments modal state (Screenshots 4, 5, 6, 7)
  const [isPaymentsModalOpen, setIsPaymentsModalOpen] = useState(false);
  const [fundingType, setFundingType] = useState("Customer funded");
  const [plannedAdvance, setPlannedAdvance] = useState("0");
  const [whatAreYouSaving, setWhatAreYouSaving] = useState("Funding plan only");
  const [remarks, setRemarks] = useState("");

  return (
    <div className="min-h-screen bg-[#f4f7fe] dark:bg-[#0b1437] flex text-slate-800 dark:text-slate-100">
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeItem="Manage Estimates"
        activeSubItem="All Invoices"
      />

      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-64"
          }`}
      >
        <AdminHeader
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />

        <main className="p-6 md:p-8 space-y-6">
          {/* TOP FINANCE & COLLECTIONS CARD (Screenshot 3) */}
          <div className="bg-white dark:bg-[#111c44] p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-base font-bold text-[#1b2559] dark:text-white">
                  Invoice finance & collections
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  #01INV-test customer · INV-00001 · Pending
                </p>
              </div>

              {/* Manage Payments Button */}
              <button
                type="button"
                onClick={() => setIsPaymentsModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold transition-colors shadow-2xs"
              >
                <CreditCard className="w-4 h-4" />
                <span>Manage payments</span>
              </button>
            </div>

            {/* 4 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437]/30 border-l-4 border-l-emerald-500">
                <p className="text-[11px] font-semibold text-slate-500">Customer received</p>
                <p className="text-xl font-extrabold text-slate-800 dark:text-white mt-1">
                  0.00 INR
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437]/30 border-l-4 border-l-amber-500">
                <p className="text-[11px] font-semibold text-slate-500">Customer pending</p>
                <p className="text-xl font-extrabold text-slate-800 dark:text-white mt-1">
                  2.00 INR
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437]/30 border-l-4 border-l-emerald-500">
                <p className="text-[11px] font-semibold text-slate-500">Bank received</p>
                <p className="text-xl font-extrabold text-slate-800 dark:text-white mt-1">
                  0.00 INR
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437]/30 border-l-4 border-l-amber-500">
                <p className="text-[11px] font-semibold text-slate-500">Bank pending</p>
                <p className="text-xl font-extrabold text-slate-800 dark:text-white mt-1">
                  0.00 INR
                </p>
              </div>
            </div>
          </div>

          {/* INVOICE DETAILS SECTION */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-[#1b2559] dark:text-white">
                Invoice Details
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Complete information about this invoice
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/invoices/edit/${invoiceId}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold transition-colors shadow-2xs"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit</span>
              </Link>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold transition-colors shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>PDF</span>
              </button>
              <Link
                href="/invoices"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold transition-colors shadow-2xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </Link>
            </div>
          </div>

          {/* PRINTABLE INVOICE SHEET (Matching Screenshot 3) */}
          <div className="bg-white dark:bg-[#111c44] p-8 md:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-5xl mx-auto space-y-6">
            {/* Header info & Logo */}
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
                <p>1234567895 | solarcrm@gmail.com</p>
                <p className="font-semibold text-slate-700">GSTIN/UIN: TX343504922</p>
              </div>
            </div>

            {/* INVOICE TITLE */}
            <div className="text-center font-extrabold tracking-wider text-slate-800 dark:text-white text-sm uppercase">
              INVOICE
            </div>

            <div className="flex justify-between items-center text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span>GSTIN: TX343504922</span>
              <span>
                Invoice No.: <strong className="text-slate-800 dark:text-white">INV-00001</strong> · Date: 06-Nov-2026
              </span>
            </div>

            {/* Address Columns */}
            <div className="grid grid-cols-2 border border-emerald-600/40 rounded-lg overflow-hidden text-xs">
              <div className="p-3 border-r border-emerald-600/40 space-y-1">
                <p className="bg-[#4d8c57] text-white -m-3 mb-2 p-1.5 font-bold">Billing Address</p>
                <p className="font-bold text-slate-800 dark:text-white">test customer</p>
                <p className="text-slate-500">Phone: 9870543210</p>
              </div>
              <div className="p-3 space-y-1">
                <p className="bg-[#4d8c57] text-white -m-3 mb-2 p-1.5 font-bold">Shipping Address</p>
                <p className="font-bold text-slate-800 dark:text-white">test customer</p>
                <p className="text-slate-500">Phone: 9870543210</p>
              </div>
            </div>

            {/* Product Table */}
            <div className="border border-emerald-600/40 rounded-lg overflow-hidden text-xs">
              <table className="w-full">
                <thead className="bg-[#4d8c57] text-white text-[11px] font-bold">
                  <tr>
                    <th className="p-2.5 text-center w-12">No.</th>
                    <th className="p-2.5 text-left">Item & Description</th>
                    <th className="p-2.5 text-center w-14">Qty</th>
                    <th className="p-2.5 text-center w-14">Unit</th>
                    <th className="p-2.5 text-right w-20">Rate (₹)</th>
                    <th className="p-2.5 text-right w-20">Taxable (₹)</th>
                    <th className="p-2.5 text-right w-16">CGST</th>
                    <th className="p-2.5 text-right w-16">SGST</th>
                    <th className="p-2.5 text-right w-24">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="p-2.5 text-center text-slate-500">1</td>
                    <td className="p-2.5 font-medium text-slate-800 dark:text-white">Base cost</td>
                    <td className="p-2.5 text-center">1</td>
                    <td className="p-2.5 text-center">Job</td>
                    <td className="p-2.5 text-right">1.00</td>
                    <td className="p-2.5 text-right">1.00</td>
                    <td className="p-2.5 text-right">0.00%</td>
                    <td className="p-2.5 text-right">0.00%</td>
                    <td className="p-2.5 text-right font-semibold">1.00</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 text-center text-slate-500">2</td>
                    <td className="p-2.5 font-medium text-slate-800 dark:text-white">test</td>
                    <td className="p-2.5 text-center">1</td>
                    <td className="p-2.5 text-center">Nos.</td>
                    <td className="p-2.5 text-right">1.00</td>
                    <td className="p-2.5 text-right">1.00</td>
                    <td className="p-2.5 text-right">0.00%</td>
                    <td className="p-2.5 text-right">0.00%</td>
                    <td className="p-2.5 text-right font-semibold">1.00</td>
                  </tr>
                </tbody>
              </table>

              <div className="grid grid-cols-2 border-t border-emerald-600/40 text-xs">
                <div className="p-3 bg-slate-50/50 dark:bg-[#0b1437]/30 border-r border-emerald-600/40">
                  <span className="font-bold">Total Invoice Amount in Words:</span>
                  <p className="italic text-slate-600 dark:text-slate-300 mt-1">Rupees Two Only</p>
                </div>
                <div className="divide-y divide-slate-100">
                  <div className="p-2.5 flex justify-between">
                    <span>Total Amount before Tax (₹):</span>
                    <span className="font-bold">2.00</span>
                  </div>
                  <div className="p-2.5 bg-[#4d8c57] text-white flex justify-between font-extrabold text-sm">
                    <span>Grand Total (₹):</span>
                    <span>2.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Authorised Signatory */}
            <div className="flex justify-between items-end pt-4">
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-white">
                  Total Payable (₹): 2.00
                </p>
                <p className="text-[10px] text-slate-400">
                  This is a computer-generated invoice. E. & O. E.
                </p>
              </div>
              <div className="text-right text-xs space-y-6">
                <p className="text-slate-500">For, Fablead Developer Technolab</p>
                <p className="font-bold text-slate-800 dark:text-white pt-6 border-t border-slate-300">
                  Authorised Signatory
                </p>
              </div>
            </div>

            {/* BOM Table */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <Boxes className="w-4 h-4 text-blue-600" />
                <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                  Bill of Materials (BOM)
                </h4>
              </div>

              <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden text-xs">
                <table className="w-full">
                  <thead className="bg-[#001738] text-white text-[11px] font-bold">
                    <tr>
                      <th className="p-3 text-left w-20">IMAGE</th>
                      <th className="p-3 text-left">PRODUCT NAME</th>
                      <th className="p-3 text-left">SPECIFICATIONS</th>
                      <th className="p-3 text-center">QUANTITY</th>
                      <th className="p-3 text-right">PRICE</th>
                      <th className="p-3 text-right">TOTAL(EXCL. GST)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3">
                        <div className="w-10 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                          📦
                        </div>
                      </td>
                      <td className="p-3 font-semibold">Test</td>
                      <td className="p-3 text-slate-400">-</td>
                      <td className="p-3 text-center">1</td>
                      <td className="p-3 text-right">1.00</td>
                      <td className="p-3 text-right font-medium">1.00</td>
                    </tr>
                    <tr className="bg-slate-50 dark:bg-[#0b1437]/50 font-bold border-t border-slate-200">
                      <td colSpan={3} className="p-3 text-right">Total:</td>
                      <td className="p-3 text-center">1</td>
                      <td className="p-3 text-right">-</td>
                      <td className="p-3 text-right bg-[#001738] text-white">1.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-center text-xs text-slate-400 italic pt-2">
              Thank you for your business!
            </p>
          </div>

          <p className="text-xs text-slate-400 text-center">
            Equipment details are available when this invoice is linked to an estimate.
          </p>
        </main>
      </div>

      {/* MANAGE PAYMENTS MODAL (Screenshots 4, 5, 6, 7) */}
      {isPaymentsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111c44] rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden border border-slate-100 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="bg-[#001738] text-white px-6 py-4 flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-base font-bold tracking-wide">
                  Invoice finance & payments
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  test customer | #01INV-test customer | INV-00001 | INR
                </p>
              </div>
              <button
                onClick={() => setIsPaymentsModalOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
              {/* 8 Stat Cards Grid (Screenshot 4) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437]/30 border-l-4 border-l-blue-600">
                  <p className="text-[10px] text-slate-500 font-semibold">Invoice total</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-white mt-0.5">2.00</p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437]/30 border-l-4 border-l-blue-600">
                  <p className="text-[10px] text-slate-500 font-semibold">Customer received</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-white mt-0.5">0.00</p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437]/30 border-l-4 border-l-blue-600">
                  <p className="text-[10px] text-slate-500 font-semibold">Bank received</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-white mt-0.5">0.00</p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437]/30 border-l-4 border-l-blue-600">
                  <p className="text-[10px] text-slate-500 font-semibold">Total outstanding</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-white mt-0.5">2.00</p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437]/30 border-l-4 border-l-blue-600">
                  <p className="text-[10px] text-slate-500 font-semibold">Customer pending</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-white mt-0.5">2.00</p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437]/30 border-l-4 border-l-blue-600">
                  <p className="text-[10px] text-slate-500 font-semibold">Bank pending</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-white mt-0.5">0.00</p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437]/30 border-l-4 border-l-blue-600">
                  <p className="text-[10px] text-slate-500 font-semibold">Bank funded share</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-white mt-0.5">0.00</p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437]/30 border-l-4 border-l-blue-600">
                  <p className="text-[10px] text-slate-500 font-semibold">Earlier paid / unallocated</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-white mt-0.5">0.00</p>
                </div>
              </div>

              {/* 1. Who will pay this invoice? */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="text-xs font-bold text-slate-800 dark:text-white">
                  1. Who will pay this invoice?
                </h4>
                <p className="text-[11px] text-slate-400 -mt-1">
                  Set the customer contribution and bank loan separately. Each can be received in multiple installments.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Funding type
                    </label>
                    <select
                      value={fundingType}
                      onChange={(e) => setFundingType(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                    >
                      <option value="Customer funded">Customer funded</option>
                      <option value="Bank funded">Bank funded</option>
                      <option value="Part customer + part bank">Part customer + part bank</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Planned customer advance / down payment
                    </label>
                    <input
                      type="number"
                      value={plannedAdvance}
                      onChange={(e) => setPlannedAdvance(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Record an actual payment (Screenshot 5) */}
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="text-xs font-bold text-slate-800 dark:text-white">
                  2. Record an actual payment
                </h4>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    What are you saving?
                  </label>
                  <select
                    value={whatAreYouSaving}
                    onChange={(e) => setWhatAreYouSaving(e.target.value)}
                    className="w-full sm:w-72 px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                  >
                    <option value="Funding plan only">Funding plan only</option>
                    <option value="Customer payment">Customer payment</option>
                    <option value="Bank disbursement">Bank disbursement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Remarks / finance notes
                  </label>
                  <textarea
                    rows={2}
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none resize-none"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Only actual receipts reduce the balance. Loan approval and the funding plan do not count as money received.
                  </p>
                </div>
              </div>

              {/* Funding breakdown (INR) (Screenshot 6) */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-800 dark:text-white">
                  Funding breakdown (INR)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 border-l-4 border-l-blue-600 bg-slate-50/50">
                    <p className="text-[10px] text-slate-500">Total customer contribution</p>
                    <p className="text-base font-bold text-slate-800 dark:text-white mt-0.5">2.00</p>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 border-l-4 border-l-blue-600 bg-slate-50/50">
                    <p className="text-[10px] text-slate-500">Total bank loan</p>
                    <p className="text-base font-bold text-slate-800 dark:text-white mt-0.5">0.00</p>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 border-l-4 border-l-blue-600 bg-slate-50/50">
                    <p className="text-[10px] text-slate-500">Still due from customer</p>
                    <p className="text-base font-bold text-slate-800 dark:text-white mt-0.5">2.00</p>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 border-l-4 border-l-blue-600 bg-slate-50/50">
                    <p className="text-[10px] text-slate-500">Still due from bank</p>
                    <p className="text-base font-bold text-slate-800 dark:text-white mt-0.5">0.00</p>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400">
                  Invoice status after saving: Unpaid. Bank installments can be recorded again whenever received.
                </p>
              </div>

              {/* Payment ledger (Screenshot 6) */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 dark:text-white">
                  Payment ledger
                </h4>
                <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-[#0b1437]/50 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-2.5 px-3">DATE</th>
                        <th className="p-2.5 px-3">SOURCE</th>
                        <th className="p-2.5 px-3">AMOUNT</th>
                        <th className="p-2.5 px-3">METHOD / REFERENCE</th>
                        <th className="p-2.5 px-3">RECORD</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={5} className="text-center py-6 text-slate-400 text-xs">
                          No receipts recorded yet.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Finance audit history (Screenshot 7) */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/30">
                <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                  <span>▾</span>
                  <span>Finance audit history</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  No finance changes recorded yet.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-[#0b1437]/20 shrink-0">
              <Link
                href="/estimates/receivables"
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50"
              >
                Receivables report
              </Link>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPaymentsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert("Finance details saved successfully!");
                    setIsPaymentsModalOpen(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold shadow-2xs"
                >
                  Save finance details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


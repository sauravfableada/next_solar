"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import {
  ArrowLeft,
  Building,
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Calendar,
  User,
  Percent,
  DollarSign,
  Landmark,
  FileText,
  Save,
  Copy,
} from "lucide-react";

interface AddPartnerProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function AddPartnerPage({ initialData, isEdit = false }: AddPartnerProps) {
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Form Fields matching Screenshot 2 & 4
  const [formData, setFormData] = useState({
    name: initialData?.name || (isEdit ? "TEST" : ""),
    companyName: initialData?.companyName || "",
    phone: initialData?.phone || (isEdit ? "9996663355" : ""),
    whatsapp: initialData?.whatsapp || (isEdit ? "9996663355" : ""),
    email: initialData?.email || "",
    address: initialData?.address || "",
    status: initialData?.status || "Active",
    assignedStaff: initialData?.assignedStaff || "Solar CRM",
    joiningDate: initialData?.joiningDate || (isEdit ? "11/06/2026" : "11/13/2026"),
    commissionType: initialData?.commissionType || "Fixed",
    commissionValue: initialData?.commissionValue || (isEdit ? "0.00" : "0"),
    commissionBasis: initialData?.commissionBasis || "Estimate subtotal",
    payableOn: initialData?.payableOn || "Payment collection",
    currency: initialData?.currency || "INR",
    panNumber: initialData?.panNumber || "",
    gstNumber: initialData?.gstNumber || "",
    bankName: initialData?.bankName || "",
    accountHolder: initialData?.accountHolder || "",
    accountNumber: initialData?.accountNumber || "",
    ifscCode: initialData?.ifscCode || "",
    notes: initialData?.notes || "",
  });

  const handleCopyPhoneToWhatsapp = () => {
    setFormData((prev) => ({ ...prev, whatsapp: prev.phone }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert("Please provide required partner name and phone number.");
      return;
    }
    alert(isEdit ? "Partner updated successfully!" : "Partner created successfully with auto-generated code CP-000001!");
    router.push("/admin/partners");
  };

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

        <main className="p-6 md:p-8 space-y-6 max-w-6xl w-full mx-auto">
          {/* Header Title & Back Button (Matches Screenshot 2 & 4) */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#1b2559] dark:text-white">
                {isEdit ? "Edit Partner" : "Add Partner"}
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                {isEdit ? "CP-000001" : "Partner code is generated when saved."}
              </p>
            </div>

            <Link
              href="/admin/partners"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold shadow-sm transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Partner Details Section */}
            <div className="bg-white dark:bg-[#111c44] p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-[#1b2559] dark:text-white">
                <User className="w-4 h-4 text-slate-500" />
                <span>Partner Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <span>Name</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter partner name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                  />
                </div>

                {/* Company / Business Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Company / Business Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter company or business name"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <span>Phone</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                  />
                </div>

                {/* WhatsApp with Copy Phone action */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      WhatsApp
                    </label>
                    <button
                      type="button"
                      onClick={handleCopyPhoneToWhatsapp}
                      className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                      Copy Phone
                    </button>
                  </div>
                  <input
                    type="tel"
                    placeholder="WhatsApp number"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                  />
                </div>

                {/* Address */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Address
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Full address..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                  />
                </div>

                {/* Status, Assigned Staff, Joining Date row */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Assigned Staff
                  </label>
                  <select
                    value={formData.assignedStaff}
                    onChange={(e) => setFormData({ ...formData, assignedStaff: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                  >
                    <option value="Solar CRM">Solar CRM</option>
                  </select>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <span>Joining Date</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.joiningDate}
                    onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* 2. Commission Settings Section (Matches Screenshot 2) */}
            <div className="bg-white dark:bg-[#111c44] p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-[#1b2559] dark:text-white">
                <Percent className="w-4 h-4 text-slate-500" />
                <span>Commission Settings</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Commission Type
                  </label>
                  <input
                    type="text"
                    value={formData.commissionType}
                    onChange={(e) => setFormData({ ...formData, commissionType: e.target.value as any })}
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <span>Commission Value</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.commissionValue}
                    onChange={(e) => setFormData({ ...formData, commissionValue: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                  <p className="text-[10px] text-slate-400">Fixed amount per eligible referral.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Commission Basis
                  </label>
                  <input
                    type="text"
                    value={formData.commissionBasis}
                    onChange={(e) => setFormData({ ...formData, commissionBasis: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Payable On
                  </label>
                  <input
                    type="text"
                    value={formData.payableOn}
                    onChange={(e) => setFormData({ ...formData, payableOn: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* 3. Commission & Report Currency */}
            <div className="bg-white dark:bg-[#111c44] p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Commission & Report Currency
              </label>
              <input
                type="text"
                value={formData.currency}
                readOnly
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
              />
              <p className="text-[11px] text-slate-400">
                The dashboard includes financial records in this currency only. Currency is locked after a partner payment is recorded.
              </p>
            </div>

            {/* 4. Bank, Tax & Agreement (Optional) */}
            <div className="bg-white dark:bg-[#111c44] p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-[#1b2559] dark:text-white">
                <Landmark className="w-4 h-4 text-slate-500" />
                <span>Bank, Tax & Agreement</span>
                <span className="text-slate-400 font-normal">(Optional)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    PAN Number
                  </label>
                  <input
                    type="text"
                    placeholder="PAN Number"
                    value={formData.panNumber}
                    onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    GST Number
                  </label>
                  <input
                    type="text"
                    placeholder="GST Number"
                    value={formData.gstNumber}
                    onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    placeholder="Bank Name"
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Account Holder
                  </label>
                  <input
                    type="text"
                    placeholder="Account Holder"
                    value={formData.accountHolder}
                    onChange={(e) => setFormData({ ...formData, accountHolder: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Account Number
                  </label>
                  <input
                    type="text"
                    placeholder="Account Number"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    placeholder="IFSC Code"
                    value={formData.ifscCode}
                    onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-3">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Partner Agreement
                  </label>
                  <input
                    type="file"
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500"
                  />
                  <p className="text-[10px] text-slate-400">PDF, Word documents or images. Maximum 10 MB.</p>
                </div>
              </div>
            </div>

            {/* 5. Notes */}
            <div className="bg-white dark:bg-[#111c44] p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Notes
              </label>
              <textarea
                rows={3}
                placeholder="Additional notes..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>

            {/* Submit Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Link
                href="/admin/partners"
                className="px-5 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl text-xs font-semibold bg-[#001738] hover:bg-[#00224f] text-white shadow-sm transition"
              >
                Save Partner
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}


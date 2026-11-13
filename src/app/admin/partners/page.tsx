"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import {
  Users,
  UserCheck,
  Megaphone,
  CheckCircle,
  Search,
  RotateCw,
  Plus,
  Download,
  Eye,
  Pencil,
  Trash2,
  Phone,
  Mail,
  Building,
  DollarSign,
  ChevronRight,
  TrendingUp,
  Award,
  Wallet,
  Clock,
  Layers,
  ArrowLeft,
  X,
  CreditCard,
  FileText,
  Calendar,
  AlertCircle,
} from "lucide-react";

export interface Partner {
  id: string;
  code: string;
  name: string;
  companyName: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  status: "Active" | "Inactive";
  assignedStaff: string;
  joiningDate: string;
  commissionType: "Fixed" | "Percentage";
  commissionValue: string;
  commissionBasis: string;
  payableOn: string;
  currency: string;
  panNumber?: string;
  gstNumber?: string;
  bankName?: string;
  accountHolder?: string;
  accountNumber?: string;
  ifscCode?: string;
  notes?: string;
  leadsCount: number;
}

const initialPartners: Partner[] = [
  {
    id: "1",
    code: "CP-000001",
    name: "TEST",
    companyName: "",
    phone: "9996663355",
    whatsapp: "9996663355",
    email: "-",
    address: "",
    status: "Active",
    assignedStaff: "Solar CRM",
    joiningDate: "11/06/2026",
    commissionType: "Fixed",
    commissionValue: "0.00",
    commissionBasis: "Estimate subtotal",
    payableOn: "Payment collection",
    currency: "INR",
    leadsCount: 0,
  },
];

export default function ManagePartnersPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [commissionFilter, setCommissionFilter] = useState("All");
  const [staffFilter, setStaffFilter] = useState("All");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Stats calculation
  const totalPartners = partners.length;
  const activePartners = partners.filter((p) => p.status === "Active").length;
  const referredLeads = partners.reduce((sum, p) => sum + p.leadsCount, 0);
  const convertedLeads = 0;

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this partner?")) {
      setPartners((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setCommissionFilter("All");
    setStaffFilter("All");
  };

  const filteredPartners = partners.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery) ||
      p.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    const matchesCommission =
      commissionFilter === "All" || p.commissionType === commissionFilter;
    const matchesStaff =
      staffFilter === "All" || p.assignedStaff === staffFilter;

    return (
      matchesSearch && matchesStatus && matchesCommission && matchesStaff
    );
  });

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
          onSearch={(q) => setSearchQuery(q)}
        />

        <main className="p-6 md:p-8 space-y-6">
          {/* Top Title & Header Actions (Matches Screenshot 1) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#1b2559] dark:text-white">
                Manage Partners
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Manage channel partners, referrals, and commission settings.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111c44] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-2xs">
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export</span>
              </button>

              <Link
                href="/admin/partners/create"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#001738] hover:bg-[#00224f] text-white text-xs font-semibold shadow-sm transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add Partner</span>
              </Link>
            </div>
          </div>

          {/* 4 Stat Cards Row (Matches Screenshot 1) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Total Partners */}
            <div className="bg-white dark:bg-[#111c44] p-5 rounded-2xl border-l-4 border-l-blue-500 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Total Partners
                </span>
                <h3 className="text-2xl font-black text-[#1b2559] dark:text-white mt-1">
                  {totalPartners < 10 ? `0${totalPartners}` : totalPartners}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-500 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>

            {/* 2. Active Partners */}
            <div className="bg-white dark:bg-[#111c44] p-5 rounded-2xl border-l-4 border-l-emerald-500 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Active Partners
                </span>
                <h3 className="text-2xl font-black text-[#1b2559] dark:text-white mt-1">
                  {activePartners < 10 ? `0${activePartners}` : activePartners}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>

            {/* 3. Referred Leads */}
            <div className="bg-white dark:bg-[#111c44] p-5 rounded-2xl border-l-4 border-l-amber-500 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Referred Leads
                </span>
                <h3 className="text-2xl font-black text-[#1b2559] dark:text-white mt-1">
                  {referredLeads < 10 ? `0${referredLeads}` : referredLeads}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center">
                <Megaphone className="w-5 h-5" />
              </div>
            </div>

            {/* 4. Converted Leads */}
            <div className="bg-white dark:bg-[#111c44] p-5 rounded-2xl border-l-4 border-l-purple-500 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Converted Leads
                </span>
                <h3 className="text-2xl font-black text-[#1b2559] dark:text-white mt-1">
                  {convertedLeads < 10 ? `0${convertedLeads}` : convertedLeads}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-500 flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Search and Filters Bar (Matches Screenshot 1) */}
          <div className="bg-white dark:bg-[#111c44] p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
              {/* Search partners */}
              <div className="space-y-1.5 lg:col-span-2">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  Search partners
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Name, code, phone, email or company"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                  />
                </div>
              </div>

              {/* Status */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                >
                  <option value="All">All statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Commission */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  Commission
                </label>
                <select
                  value={commissionFilter}
                  onChange={(e) => setCommissionFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                >
                  <option value="All">All types</option>
                  <option value="Fixed">Fixed</option>
                  <option value="Percentage">Percentage</option>
                </select>
              </div>

              {/* Assigned staff + Clear button */}
              <div className="flex items-center gap-2">
                <div className="flex-1 space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Assigned staff
                  </label>
                  <select
                    value={staffFilter}
                    onChange={(e) => setStaffFilter(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                  >
                    <option value="All">All staff</option>
                    <option value="Solar CRM">Solar CRM</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="p-2.5 rounded-xl bg-[#001738] hover:bg-[#00224f] text-white transition mt-5 shadow-sm"
                  title="Reset Filters"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Show per page control */}
            <div className="flex justify-end items-center gap-2 text-xs text-slate-400 pt-2">
              <span>Show</span>
              <input
                type="number"
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
                className="w-14 px-2 py-1 text-center bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
              />
              <span>per page</span>
            </div>

            {/* Partners Table */}
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4">PARTNER</th>
                    <th className="py-3 px-4">CONTACT</th>
                    <th className="py-3 px-4">COMMISSION</th>
                    <th className="py-3 px-4">ASSIGNED TO</th>
                    <th className="py-3 px-4">LEADS</th>
                    <th className="py-3 px-4">STATUS</th>
                    <th className="py-3 px-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredPartners.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-800 dark:text-slate-100">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium">
                          {item.code}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        <div>{item.phone}</div>
                        <div className="text-[11px] text-slate-400 font-normal">
                          {item.email}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800 dark:text-slate-200">
                          {item.commissionValue} ({item.commissionType.toLowerCase()})
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {item.commissionBasis}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        {item.assignedStaff}
                      </td>

                      <td className="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-200">
                        {item.leadsCount}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                          {item.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Link
                            href={`/admin/partners/${item.id}`}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                            title="View Partner Insights"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            href={`/admin/partners/edit/${item.id}`}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                            title="Edit Partner"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredPartners.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        No channel partners found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Count */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
              Showing {filteredPartners.length} to {filteredPartners.length} of{" "}
              {filteredPartners.length} partners
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { Search, Plus, Pencil, Eye, Trash2, Download, ChevronLeft } from "lucide-react";

interface VendorRecord {
  id: number;
  srNo: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  image: string;
  createdAt: string;
}

const initialVendors: VendorRecord[] = [
  {
    id: 1,
    srNo: 1,
    name: "D",
    email: "--",
    phone: "2121212121",
    address: "--",
    image: "",
    createdAt: "06 Nov 2026, 15:44",
  },
];

export default function ManageVendorsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [vendors, setVendors] = useState<VendorRecord[]>(initialVendors);
  const [searchQuery, setSearchQuery] = useState("");

  // Views: 'list' | 'add'
  const [currentView, setCurrentView] = useState<"list" | "add">("list");

  // Form Fields (Screenshot 7)
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formImage, setFormImage] = useState("");

  const handleStartAdd = () => {
    setFormName("");
    setFormEmail("");
    setFormPhone("");
    setFormAddress("");
    setFormImage("");
    setCurrentView("add");
  };

  const handleSaveVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) return;

    const newVendor: VendorRecord = {
      id: Date.now(),
      srNo: vendors.length + 1,
      name: formName.trim(),
      email: formEmail.trim() || "--",
      phone: formPhone.trim(),
      address: formAddress.trim() || "--",
      image: formImage || "",
      createdAt: "13 Nov 2026, 12:00",
    };

    setVendors([...vendors, newVendor]);
    setCurrentView("list");
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this vendor?")) {
      const updated = vendors.filter((v) => v.id !== id);
      setVendors(updated.map((v, i) => ({ ...v, srNo: i + 1 })));
    }
  };

  const filteredVendors = vendors.filter(
    (v) =>
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.phone.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-[#f4f7fe] dark:bg-[#0b1437] flex text-slate-800 dark:text-slate-100">
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeItem="Manage Inventory"
        activeSubItem="Vendors"
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
          {currentView === "list" ? (
            /* VIEW 1: VENDORS LIST (Screenshot 6) */
            <>
              {/* Header Title & Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-[#1b2559] dark:text-white">
                    Manage Vendors
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Track vendor details in the CRM.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111c44] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium text-sm transition-colors shadow-xs">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                  <button
                    onClick={handleStartAdd}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white font-medium text-sm transition-colors shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Vendor</span>
                  </button>
                </div>
              </div>

              {/* Table Card */}
              <div className="bg-white dark:bg-[#111c44] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800/80">
                  <h2 className="text-base font-semibold text-[#1b2559] dark:text-white">
                    All Vendors
                  </h2>
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search vendors..."
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
                        <th className="py-3 px-6">VENDOR NAME</th>
                        <th className="py-3 px-6">EMAIL</th>
                        <th className="py-3 px-6">PHONE</th>
                        <th className="py-3 px-6">CREATED AT</th>
                        <th className="py-3 px-6 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                      {filteredVendors.map((v) => (
                        <tr
                          key={v.id}
                          className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                        >
                          <td className="py-4 px-6 text-slate-600 dark:text-slate-300 font-medium">
                            {v.srNo}
                          </td>
                          <td className="py-4 px-6 font-semibold text-[#1b2559] dark:text-white">
                            {v.name}
                          </td>
                          <td className="py-4 px-6 text-slate-500 dark:text-slate-400">
                            {v.email}
                          </td>
                          <td className="py-4 px-6 text-blue-600 font-medium">
                            {v.phone}
                          </td>
                          <td className="py-4 px-6 text-slate-500 dark:text-slate-400">
                            {v.createdAt}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="inline-flex items-center gap-2">
                              <button
                                className="p-1.5 text-slate-400 hover:text-[#001738] dark:hover:text-white rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                title="Edit"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                className="p-1.5 text-slate-400 hover:text-[#001738] dark:hover:text-white rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                title="View"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(v.id)}
                                className="p-1.5 text-red-400 hover:text-red-600 rounded hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="p-4 px-6 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                  <span>Showing 1 to {filteredVendors.length} of {filteredVendors.length} entries</span>
                  <div className="flex items-center gap-1">
                    <button
                      disabled
                      className="px-3 py-1.5 text-xs rounded border border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button className="px-3 py-1.5 text-xs rounded bg-[#001738] text-white font-medium">
                      1
                    </button>
                    <button
                      disabled
                      className="px-3 py-1.5 text-xs rounded border border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* VIEW 2: ADD VENDOR FORM (Screenshot 7) */
            <div className="bg-white dark:bg-[#111c44] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 md:p-8 space-y-6">
              {/* Header Title & Back Button */}
              <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800/80 pb-5">
                <div>
                  <h1 className="text-xl font-bold text-[#1b2559] dark:text-white">
                    Add Vendor
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Create a vendor entry for inventory operations.
                  </p>
                </div>
                <button
                  onClick={() => setCurrentView("list")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white font-medium text-sm transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSaveVendor} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Vendor Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#1b2559] dark:text-white">
                      Vendor Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter vendor name"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#1b2559] dark:text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
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

                  {/* Image */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#1b2559] dark:text-white">
                      Image
                    </label>
                    <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-lg p-2 bg-white dark:bg-[#0b1437]">
                      <input
                        type="file"
                        className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#1b2559] dark:text-white">
                    Address
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Enter address details"
                    value={formAddress}
                    onChange={(e) => setFormAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y"
                  />
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => setCurrentView("list")}
                    className="px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white text-sm font-semibold transition-colors shadow-sm"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}


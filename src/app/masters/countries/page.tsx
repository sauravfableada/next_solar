"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  List,
  LayoutGrid,
  Check,
  ChevronDown,
  Globe2,
  Tag,
  Info,
} from "lucide-react";

interface CountryItem {
  id: number;
  srNo: number;
  name: string;
  isoCode: string;
  status: "Active" | "Inactive";
}

const initialCountries: CountryItem[] = [
  { id: 1, srNo: 1, name: "Australia", isoCode: "AUS", status: "Active" },
  { id: 2, srNo: 2, name: "India", isoCode: "IND", status: "Active" },
  { id: 3, srNo: 3, name: "Singapore", isoCode: "SGP", status: "Active" },
  { id: 4, srNo: 4, name: "Thailand", isoCode: "THA", status: "Active" },
  { id: 5, srNo: 5, name: "United Arab Emirates", isoCode: "UAE", status: "Active" },
  { id: 6, srNo: 6, name: "United Kingdom", isoCode: "GBR", status: "Active" },
  { id: 7, srNo: 7, name: "United States", isoCode: "USA", status: "Active" },
];

export default function CountriesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [countries, setCountries] = useState<CountryItem[]>(initialCountries);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [activeStatusDropdownId, setActiveStatusDropdownId] = useState<number | null>(null);

  // Form view: 'list' | 'add' | 'edit'
  const [currentView, setCurrentView] = useState<"list" | "add" | "edit">("list");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form fields
  const [formCountryName, setFormCountryName] = useState("");
  const [formIsoCode, setFormIsoCode] = useState("");
  const [formStatus, setFormStatus] = useState<"Active" | "Inactive">("Active");

  const filteredCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.isoCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartAdd = () => {
    setFormCountryName("");
    setFormIsoCode("");
    setFormStatus("Active");
    setCurrentView("add");
  };

  const handleStartEdit = (country: CountryItem) => {
    setEditingId(country.id);
    setFormCountryName(country.name);
    setFormIsoCode(country.isoCode);
    setFormStatus(country.status);
    setCurrentView("edit");
  };

  const handleSaveCountry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCountryName.trim()) return;

    if (currentView === "add") {
      const newCountry: CountryItem = {
        id: Date.now(),
        srNo: countries.length + 1,
        name: formCountryName.trim(),
        isoCode: formIsoCode.trim().toUpperCase() || "N/A",
        status: formStatus,
      };
      setCountries([...countries, newCountry]);
    } else if (currentView === "edit" && editingId !== null) {
      setCountries(
        countries.map((c) =>
          c.id === editingId
            ? {
              ...c,
              name: formCountryName.trim(),
              isoCode: formIsoCode.trim().toUpperCase() || c.isoCode,
              status: formStatus,
            }
            : c
        )
      );
    }
    setCurrentView("list");
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this country?")) {
      const updated = countries.filter((c) => c.id !== id);
      setCountries(updated.map((item, index) => ({ ...item, srNo: index + 1 })));
    }
  };

  const toggleStatus = (id: number, newStatus: "Active" | "Inactive") => {
    setCountries(
      countries.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    setActiveStatusDropdownId(null);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fe] dark:bg-[#0b1437] flex text-slate-800 dark:text-slate-100">
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />

      {/* MAIN CONTENT AREA */}
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
            <>
              {/* Header Title & Add Button */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-[#1b2559] dark:text-white">
                    Manage Countries
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Configure the country records and their active status.
                  </p>
                </div>
                <button
                  onClick={handleStartAdd}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white font-medium text-sm transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Country</span>
                </button>
              </div>

              {/* Table Card */}
              <div className="bg-white dark:bg-[#111c44] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800/80">
                  <h2 className="text-base font-semibold text-[#1b2559] dark:text-white">
                    Active Countries
                  </h2>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-72">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search countries..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-[#0b1437] border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                      />
                    </div>
                    {/* View Switcher List / Grid */}
                    <div className="flex items-center bg-slate-100 dark:bg-[#0b1437] rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-1.5 rounded ${viewMode === "list"
                            ? "bg-white dark:bg-[#111c44] text-[#1b2559] dark:text-white shadow-xs"
                            : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                          }`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-1.5 rounded ${viewMode === "grid"
                            ? "bg-white dark:bg-[#111c44] text-[#1b2559] dark:text-white shadow-xs"
                            : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                          }`}
                      >
                        <LayoutGrid className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#0b1437]/30 text-slate-400 dark:text-slate-400 uppercase text-[11px] font-semibold tracking-wider">
                        <th className="py-3 px-6">SR.NO</th>
                        <th className="py-3 px-6">COUNTRY NAME</th>
                        <th className="py-3 px-6">ISO CODE</th>
                        <th className="py-3 px-6">STATUS</th>
                        <th className="py-3 px-6 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                      {filteredCountries.map((country) => (
                        <tr
                          key={country.id}
                          className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                        >
                          <td className="py-4 px-6 text-slate-600 dark:text-slate-300 font-medium">
                            {country.srNo}
                          </td>
                          <td className="py-4 px-6 font-semibold text-[#1b2559] dark:text-white">
                            {country.name}
                          </td>
                          <td className="py-4 px-6">
                            <span className="inline-block px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                              {country.isoCode}
                            </span>
                          </td>
                          <td className="py-4 px-6 relative">
                            <button
                              onClick={() =>
                                setActiveStatusDropdownId(
                                  activeStatusDropdownId === country.id
                                    ? null
                                    : country.id
                                )
                              }
                              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${country.status === "Active"
                                  ? "bg-[#dcfce7] text-[#15803d] dark:bg-emerald-950/40 dark:text-emerald-400"
                                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                                }`}
                            >
                              <span>{country.status}</span>
                              <ChevronDown className="w-3 h-3" />
                            </button>

                            {/* Status Dropdown */}
                            {activeStatusDropdownId === country.id && (
                              <div className="absolute left-6 top-11 z-30 w-36 bg-white dark:bg-[#111c44] rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-1">
                                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                                  Change Status
                                </div>
                                <button
                                  onClick={() => toggleStatus(country.id, "Active")}
                                  className={`w-full text-left px-3 py-1.5 text-xs font-medium flex items-center justify-between ${country.status === "Active"
                                      ? "bg-[#001738] text-white"
                                      : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                                    }`}
                                >
                                  <span>Active</span>
                                  {country.status === "Active" && (
                                    <Check className="w-3.5 h-3.5" />
                                  )}
                                </button>
                                <button
                                  onClick={() => toggleStatus(country.id, "Inactive")}
                                  className={`w-full text-left px-3 py-1.5 text-xs font-medium flex items-center justify-between ${country.status === "Inactive"
                                      ? "bg-[#001738] text-white"
                                      : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                                    }`}
                                >
                                  <span>Inactive</span>
                                  {country.status === "Inactive" && (
                                    <Check className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="inline-flex items-center gap-2">
                              <button
                                onClick={() => handleStartEdit(country)}
                                className="p-1.5 text-slate-400 hover:text-[#001738] dark:hover:text-white rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                title="Edit"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(country.id)}
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

                {/* Footer Pagination */}
                <div className="p-4 px-6 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                  <span>Showing 1 to {filteredCountries.length} of {filteredCountries.length} results</span>
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
            /* Add or Edit Country Form View */
            <div className="bg-white dark:bg-[#111c44] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 md:p-8 space-y-6">
              {/* Form Title & Back Button */}
              <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800/80 pb-5">
                <div>
                  <h1 className="text-xl font-bold text-[#1b2559] dark:text-white">
                    {currentView === "add" ? "Add Country" : "Edit Country"}
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {currentView === "add"
                      ? "Create a new country entry with ISO code and active status."
                      : "Update the existing country details."}
                  </p>
                </div>
                <button
                  onClick={() => setCurrentView("list")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium text-sm transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              </div>

              {/* Form Fields */}
              <form onSubmit={handleSaveCountry} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Country Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#1b2559] dark:text-white flex items-center gap-1.5">
                      <Globe2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>Country Name</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter country name"
                      value={formCountryName}
                      onChange={(e) => setFormCountryName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* ISO Code */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#1b2559] dark:text-white flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-slate-400" />
                      <span>ISO Code</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="E.G. IN, US, GB"
                      value={formIsoCode}
                      onChange={(e) => setFormIsoCode(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#1b2559] dark:text-white flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-slate-400" />
                      <span>Status</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value as "Active" | "Inactive")}
                        className="w-full appearance-none px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white text-sm font-medium transition-colors shadow-sm"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Country</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentView("list")}
                    className="px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancel
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


"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { useTheme } from "@/context/ThemeContext";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Boxes,
  FileSpreadsheet,
  GitBranch,
  Package,
  Award,
  ListTodo,
  Database,
  Handshake,
  UserCheck,
  Ticket,
  BarChart3,
  Search,
  Bell,
  Moon,
  Sun,
  Headphones,
  ChevronDown,
  Menu,
  Upload,
  Download,
  Plus,
  Filter,
  Eye,
  Edit2,
  Share2,
  Trash2,
  GitFork,
  ArrowLeft,
  CheckCircle2,
  Settings as SettingsIcon,
  User,
  History,
  Globe,
  LogOut,
  Phone,
  Mail,
  MapPin,
  Building,
  Tag,
} from "lucide-react";

export default function ManageCustomersPage() {
  const { isDarkMode } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // View state: "list" | "create"
  const [viewMode, setViewMode] = useState<"list" | "create">("list");

  // Create form tab: "Personal Information" | "Other Information"
  const [createTab, setCreateTab] = useState<"Personal Information" | "Other Information">("Personal Information");

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [showPerPage, setShowPerPage] = useState("10");

  // Customers table data matching Image 1
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Test Lead",
      phone: "7894561995",
      email: "-",
      pipelineStage: "Document Verification",
      createdBy: "Solar CRM",
      createdAt: "29 Oct 2026",
    },
    {
      id: 2,
      name: "Test Customer",
      phone: "9870543210",
      email: "testcustomer@gmail.com",
      pipelineStage: "Document Verification",
      createdBy: "Solar CRM",
      createdAt: "29 Oct 2026",
    },
  ]);

  // Form states matching Images 2, 3 & 4
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    profileImage: "",
    companyName: "",
    type: "Individual",
    website: "",
    taxNumber: "",
    customerSource: "",
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyPhone = () => {
    if (formData.phone) {
      setFormData({ ...formData, whatsapp: formData.phone });
      showToast("Phone number copied to WhatsApp number!");
    } else {
      showToast("Please enter phone number first!");
    }
  };

  const handleSaveCustomer = () => {
    if (!formData.name.trim()) {
      showToast("Please enter Customer Full Name!");
      return;
    }
    const newCustomer = {
      id: customers.length + 1,
      name: formData.name,
      phone: formData.phone || "9876543210",
      email: formData.email || "-",
      pipelineStage: "Document Verification",
      createdBy: "Solar CRM",
      createdAt: "12 Nov 2026",
    };
    setCustomers([...customers, newCustomer]);
    showToast("Customer created successfully!");
    setViewMode("list");
    // reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      whatsapp: "",
      address: "",
      profileImage: "",
      companyName: "",
      type: "Individual",
      website: "",
      taxNumber: "",
      customerSource: "",
    });
  };

  const navModules = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard", active: false },
    { name: "Manage Customers", icon: Users, href: "/admin/customers", active: true },
    { name: "Sales CRM", icon: Briefcase, href: "/admin/dashboard", hasSub: true },
    { name: "Manage BOM", icon: Boxes, href: "/admin/dashboard", hasSub: true },
    { name: "Manage Estimates", icon: FileSpreadsheet, href: "/admin/dashboard", hasSub: true },
    { name: "Workflow", icon: GitBranch, href: "/admin/dashboard", hasSub: true },
    { name: "Manage Inventory", icon: Package, href: "/admin/dashboard", hasSub: true },
    { name: "Manage Deals", icon: Award, href: "/admin/dashboard", hasSub: false },
    { name: "Manage Tasks", icon: ListTodo, href: "/admin/dashboard", hasSub: false },
    { name: "Manage Masters", icon: Database, href: "/admin/dashboard", hasSub: true },
    { name: "Manage Partners", icon: Handshake, href: "/admin/dashboard", hasSub: false },
    { name: "Manage Staff", icon: UserCheck, href: "/admin/dashboard", hasSub: false },
    { name: "Manage Tickets", icon: Ticket, href: "/admin/dashboard", hasSub: false },
    { name: "Manage Reports", icon: BarChart3, href: "/admin/dashboard", hasSub: true },
  ];

  return (
    <div
      className={`min-h-screen flex font-sans antialiased transition-colors duration-300 ${isDarkMode ? "bg-[#0b1329] text-slate-100" : "bg-[#f1f5f9] text-[#1e293b]"
        }`}
    >
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center space-x-2 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          LEFT SIDEBAR (Fablead CRM)
         ========================================================================= */}
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeItem="Manage Customers"
      />

      {/* =========================================================================
          MAIN WORKSPACE
         ========================================================================= */}
      <div
        className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-64"
          } flex flex-col min-h-screen`}
      >
        <AdminHeader
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          onSearch={(q) => setSearchQuery(q)}
        />

        {/* =========================================================================
            CONTENT BODY
           ========================================================================= */}
        <div className="p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6 flex-1">
          {/* =====================================================================
              VIEW 1: MANAGE CUSTOMERS (LIST VIEW - Image 1 Match)
             ===================================================================== */}
          {viewMode === "list" && (
            <div
              className={`rounded-2xl border p-6 md:p-8 space-y-6 transition-colors shadow-sm ${isDarkMode ? "bg-[#101b33] border-slate-800" : "bg-white border-slate-200/80"
                }`}
            >
              {/* Header Row: Title & Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1
                    className={`text-xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                  >
                    Manage Customers
                  </h1>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    View and manage your customer database and communication history.
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => showToast("CSV Import dialog opened!")}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 transition flex items-center space-x-2 shadow-sm"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Import CSV</span>
                  </button>

                  <button
                    onClick={() => showToast("Exporting customers data to CSV...")}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 transition flex items-center space-x-2 shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>

                  <button
                    onClick={() => setViewMode("create")}
                    className="px-5 py-2.5 rounded-xl bg-[#0f1f3d] hover:bg-slate-900 text-white text-xs font-bold shadow-md transition flex items-center space-x-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Customer</span>
                  </button>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search customers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500 w-64"
                    />
                  </div>
                  <button className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition flex items-center space-x-2">
                    <Filter className="w-3.5 h-3.5" />
                    <span>Filters</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <span>Show per page:</span>
                  <select
                    value={showPerPage}
                    onChange={(e) => setShowPerPage(e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                </div>
              </div>

              {/* Table Matching Image 1 */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="py-3 px-5 w-16">SR.NO</th>
                      <th className="py-3 px-5">CUSTOMER NAME</th>
                      <th className="py-3 px-5">EMAIL</th>
                      <th className="py-3 px-5">PIPELINE STAGE</th>
                      <th className="py-3 px-5">CREATED BY</th>
                      <th className="py-3 px-5">CREATED AT</th>
                      <th className="py-3 px-5 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {customers
                      .filter((c) =>
                        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        c.phone.includes(searchQuery)
                      )
                      .map((c, idx) => (
                        <tr
                          key={c.id}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                        >
                          <td className="py-3.5 px-5 font-medium text-slate-600 dark:text-slate-400">
                            {idx + 1}
                          </td>
                          <td className="py-3.5 px-5">
                            <div className="font-bold text-slate-900 dark:text-slate-100">
                              {c.name}
                            </div>
                            <div className="text-[11px] text-blue-600 dark:text-blue-400 font-mono">
                              {c.phone}
                            </div>
                          </td>
                          <td className="py-3.5 px-5 text-slate-600 dark:text-slate-300">
                            {c.email}
                          </td>
                          <td className="py-3.5 px-5">
                            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800">
                              <span>{c.pipelineStage}</span>
                              <ChevronDown className="w-3 h-3" />
                            </span>
                          </td>
                          <td className="py-3.5 px-5 font-semibold text-slate-700 dark:text-slate-300">
                            {c.createdBy}
                          </td>
                          <td className="py-3.5 px-5 text-slate-500 font-medium">
                            {c.createdAt}
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            <div className="inline-flex items-center space-x-1">
                              <button
                                onClick={() => showToast(`Viewing profile of ${c.name}`)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setFormData({
                                    ...formData,
                                    name: c.name,
                                    phone: c.phone,
                                    email: c.email !== "-" ? c.email : "",
                                  });
                                  setViewMode("create");
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-slate-800 transition"
                                title="Edit Customer"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => showToast(`Share link generated for ${c.name}`)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-slate-800 transition"
                                title="Share"
                              >
                                <Upload className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setCustomers(customers.filter((item) => item.id !== c.id));
                                  showToast(`Customer ${c.name} removed!`);
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4 text-rose-500" />
                              </button>
                              <button
                                onClick={() => showToast(`Workflow pipeline opened for ${c.name}`)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-slate-800 transition"
                                title="Workflow Branch"
                              >
                                <GitFork className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                <div>Showing 1 to {customers.length} of {customers.length} results</div>
                <div className="flex items-center space-x-1">
                  <button
                    disabled
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 opacity-40 font-medium"
                  >
                    Previous
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-[#0f1f3d] text-white font-bold flex items-center justify-center">
                    1
                  </button>
                  <button
                    disabled
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 opacity-40 font-medium"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              VIEW 2: ADD CUSTOMER (Images 2, 3 & 4 Match)
             ===================================================================== */}
          {viewMode === "create" && (
            <div
              className={`rounded-2xl border p-6 md:p-8 space-y-6 transition-colors shadow-sm ${isDarkMode ? "bg-[#101b33] border-slate-800" : "bg-white border-slate-200/80"
                }`}
            >
              {/* Header with Back button matching Image 2 */}
              <div className="flex items-center justify-between">
                <div>
                  <h1
                    className={`text-xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                  >
                    Add Customer
                  </h1>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Create a new customer profile.
                  </p>
                </div>

                <button
                  onClick={() => setViewMode("list")}
                  className="px-5 py-2.5 rounded-xl bg-[#0f1f3d] hover:bg-slate-900 text-white text-xs font-bold shadow-md transition flex items-center space-x-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              </div>

              {/* Step Pills: Personal Information | Other Information */}
              <div className="flex items-center space-x-3 pt-2">
                <button
                  onClick={() => setCreateTab("Personal Information")}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${createTab === "Personal Information"
                      ? "bg-white border-2 border-[#142952] text-[#142952] dark:bg-slate-800 dark:text-white dark:border-blue-500"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"
                    }`}
                >
                  Personal Information
                </button>

                <button
                  onClick={() => setCreateTab("Other Information")}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${createTab === "Other Information"
                      ? "bg-white border-2 border-[#142952] text-[#142952] dark:bg-slate-800 dark:text-white dark:border-blue-500"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"
                    }`}
                >
                  Other Information
                </button>
              </div>

              {/* =================================================================
                  TAB A: PERSONAL INFORMATION (Images 2 & 3 Match)
                 ================================================================= */}
              {createTab === "Personal Information" && (
                <div className="space-y-6 pt-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      Personal Information
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Enter the customer&apos;s primary contact information.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name * */}
                    <div>
                      <label className="flex items-center space-x-1 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        <Tag className="w-3.5 h-3.5 text-slate-400" />
                        <span>Name <span className="text-rose-500">*</span></span>
                      </label>
                      <input
                        type="text"
                        placeholder="Customer Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="flex items-center space-x-1 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>Email</span>
                      </label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Phone no. * */}
                    <div>
                      <label className="flex items-center space-x-1 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>Phone no. <span className="text-rose-500">*</span></span>
                      </label>
                      <input
                        type="text"
                        placeholder="+1234 567 890"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* WhatsApp no. + Copy Phone button */}
                    <div>
                      <label className="flex items-center space-x-1 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        <Phone className="w-3.5 h-3.5 text-emerald-500" />
                        <span>WhatsApp no.</span>
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="WhatsApp Number"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          className="flex-1 h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={handleCopyPhone}
                          className="h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 text-xs font-bold transition flex-shrink-0"
                        >
                          Copy Phone
                        </button>
                      </div>
                    </div>

                    {/* Address textarea across full row */}
                    <div className="md:col-span-2">
                      <label className="flex items-center space-x-1 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>Address</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Full residential or office address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500 resize-y"
                      />
                    </div>
                  </div>

                  {/* Bottom Controls: Cancel | Next | Save & Exit */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setViewMode("list")}
                      className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition"
                    >
                      Cancel
                    </button>

                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => setCreateTab("Other Information")}
                        className="px-6 py-2.5 rounded-xl bg-[#0f1f3d] hover:bg-slate-900 text-white text-xs font-bold shadow-md transition"
                      >
                        Next
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveCustomer}
                        className="px-6 py-2.5 rounded-xl bg-[#0f1f3d] hover:bg-slate-900 text-white text-xs font-bold shadow-md transition"
                      >
                        Save &amp; Exit
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================================
                  TAB B: OTHER INFORMATION (Image 4 Match)
                 ================================================================= */}
              {createTab === "Other Information" && (
                <div className="space-y-6 pt-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      Other Information
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Complete the remaining customer profile information.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Profile Image (Choose File) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        Profile Image
                      </label>
                      <label className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl px-3 h-11 bg-white dark:bg-slate-800 cursor-pointer">
                        <span className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold mr-3">
                          Choose File
                        </span>
                        <span className="text-xs text-slate-400">No file chosen</span>
                        <input type="file" className="hidden" />
                      </label>
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className="flex items-center space-x-1 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        <span>Company Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Business / Company Name"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Type Dropdown */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        Type
                      </label>
                      <div className="relative">
                        <select
                          value={formData.type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none appearance-none cursor-pointer focus:border-blue-500"
                        >
                          <option value="Individual">Individual</option>
                          <option value="Corporate / Commercial">Corporate / Commercial</option>
                          <option value="Industrial">Industrial</option>
                          <option value="Government">Government</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-3.5 pointer-events-none" />
                      </div>
                    </div>

                    {/* Website */}
                    <div>
                      <label className="flex items-center space-x-1 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        <Globe className="w-3.5 h-3.5 text-slate-400" />
                        <span>Website</span>
                      </label>
                      <input
                        type="text"
                        placeholder="https://example.com"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Tax Number */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        Tax Number
                      </label>
                      <input
                        type="text"
                        placeholder="GST / VAT / Tax ID"
                        value={formData.taxNumber}
                        onChange={(e) => setFormData({ ...formData, taxNumber: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Customer Source + '+' Button */}
                    <div className="md:col-span-2">
                      <label className="flex items-center space-x-1 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>Customer Source</span>
                      </label>
                      <div className="flex items-center space-x-2 max-w-lg">
                        <select
                          value={formData.customerSource}
                          onChange={(e) => setFormData({ ...formData, customerSource: e.target.value })}
                          className="flex-1 h-11 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none cursor-pointer focus:border-blue-500"
                        >
                          <option value="">Select Lead Source</option>
                          <option value="Google Ads">Google Ads</option>
                          <option value="Facebook Campaign">Facebook Campaign</option>
                          <option value="Direct Website Visit">Direct Website Visit</option>
                          <option value="Referral Partner">Referral Partner</option>
                          <option value="Cold Call / Outreach">Cold Call / Outreach</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => showToast("Add new Lead Source option")}
                          className="w-11 h-11 rounded-xl bg-[#0f1f3d] hover:bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-md transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Controls: Previous | Save & Exit */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setCreateTab("Personal Information")}
                      className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition"
                    >
                      Previous
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveCustomer}
                      className="px-6 py-2.5 rounded-xl bg-[#0f1f3d] hover:bg-slate-900 text-white text-xs font-bold shadow-md transition cursor-pointer"
                    >
                      Save &amp; Exit
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <footer className="p-4 text-center text-xs text-slate-400 border-t border-slate-200 dark:border-slate-800">
          © 2026 Copyright - Fablead Developers Technolab
        </footer>
      </div>
    </div>
  );
}


"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { useTheme } from "@/context/ThemeContext";
import {
  Search,
  SlidersHorizontal,
  Download,
  Plus,
  Pencil,
  Eye,
  Trash2,
  Calendar,
  X,
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  Camera,
  ChevronDown,
  RotateCcw,
  ArrowLeft,
  CheckCircle2,
  Briefcase,
  FileSpreadsheet,
  Headphones,
  Bell,
  Sun,
  Moon,
  Menu,
  History,
  Globe,
  Settings,
  LogOut,
  Shield,
  Upload,
  Key,
  Users,
  EyeOff
} from "lucide-react";

interface StaffItem {
  id: number;
  srNo: number;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  role: string;
  status: "Active" | "Inactive";
  createdAt: string;
  createdBy: string;
  address: string;
  profileImage?: string;
  permissions: { [module: string]: { view: boolean; insert: boolean; edit: boolean; delete: boolean; all: boolean } };
}

const MODULE_LIST = [
  "Customers",
  "Partners",
  "Followup",
  "Leads",
  "Tickets",
  "Tasks",
  "Deals",
  "Meetings",
  "BOM",
  "Make",
  "Warranty",
  "Technology",
  "Estimates",
  "Invoices",
  "Templates",
  "Material OUT",
  "Material IN",
  "Inventory",
  "Products",
  "Categories",
  "Vendors",
  "Handover Person",
  "Reports"
];

const DEFAULT_PERMISSIONS = () => {
  const perms: { [module: string]: { view: boolean; insert: boolean; edit: boolean; delete: boolean; all: boolean } } = {};
  MODULE_LIST.forEach((m) => {
    // Default customers and partners checked as shown in Screenshot 2
    if (m === "Customers" || m === "Partners") {
      perms[m] = { view: true, insert: true, edit: true, delete: true, all: true };
    } else {
      perms[m] = { view: false, insert: false, edit: false, delete: false, all: false };
    }
  });
  return perms;
};

export default function StaffPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isDarkMode } = useTheme();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Staff members list
  const [staffList, setStaffList] = useState<StaffItem[]>([
    {
      id: 2,
      srNo: 1,
      name: "Test",
      email: "test@gmail.com",
      phone: "9996663355",
      whatsapp: "--",
      role: "Staff",
      status: "Active",
      createdAt: "06 Nov 2026, 15:58",
      createdBy: "Admin",
      address: "Ascon Plaza, Guru Ram Pavan Bhumi, Adajan Gam, Behind Bulka Bhavan School, Narotam Nagar",
      permissions: DEFAULT_PERMISSIONS()
    }
  ]);

  // Views: "list" | "create" | "details"
  const [currentView, setCurrentView] = useState<"list" | "create" | "details">("list");
  const [selectedStaff, setSelectedStaff] = useState<StaffItem | null>(null);

  // Add Staff wizard tab: "personal" | "permissions"
  const [wizardTab, setWizardTab] = useState<"personal" | "permissions">("personal");

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterJobTitle, setFilterJobTitle] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCreatedAt, setFilterCreatedAt] = useState("");

  // Status dropdown toggle in row
  const [activeStatusDropdownId, setActiveStatusDropdownId] = useState<number | null>(null);

  // Permissions Modal state (from Screenshot 2)
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
  const [permissionTargetStaff, setPermissionTargetStaff] = useState<StaffItem | null>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formPhone, setFormPhone] = useState("");
  const [formWhatsapp, setFormWhatsapp] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formImageName, setFormImageName] = useState("");
  const [formPermissions, setFormPermissions] = useState(DEFAULT_PERMISSIONS());
  const [selectAllModules, setSelectAllModules] = useState(false);

  const clearFilters = () => {
    setSearchQuery("");
    setFilterRole("");
    setFilterJobTitle("");
    setFilterStatus("");
    setFilterCreatedAt("");
  };

  const handleCopyPhone = () => {
    setFormWhatsapp(formPhone);
  };

  const handleUpdateStatus = (id: number, newStatus: "Active" | "Inactive") => {
    setStaffList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
    if (selectedStaff && selectedStaff.id === id) {
      setSelectedStaff((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    setActiveStatusDropdownId(null);
  };

  // Toggle single permission box in modal or wizard
  const togglePermission = (
    module: string,
    action: "view" | "insert" | "edit" | "delete" | "all",
    isModal = false
  ) => {
    if (isModal && permissionTargetStaff) {
      const current = permissionTargetStaff.permissions[module] || {
        view: false,
        insert: false,
        edit: false,
        delete: false,
        all: false
      };
      let updatedModule = { ...current };

      if (action === "all") {
        const nextVal = !current.all;
        updatedModule = {
          view: nextVal,
          insert: nextVal,
          edit: nextVal,
          delete: nextVal,
          all: nextVal
        };
      } else {
        updatedModule[action] = !current[action];
        updatedModule.all =
          updatedModule.view &&
          updatedModule.insert &&
          updatedModule.edit &&
          updatedModule.delete;
      }

      const updatedPermissions = {
        ...permissionTargetStaff.permissions,
        [module]: updatedModule
      };

      setPermissionTargetStaff({
        ...permissionTargetStaff,
        permissions: updatedPermissions
      });

      setStaffList((prev) =>
        prev.map((s) =>
          s.id === permissionTargetStaff.id
            ? { ...s, permissions: updatedPermissions }
            : s
        )
      );
    } else {
      // Wizard form toggle
      const current = formPermissions[module] || {
        view: false,
        insert: false,
        edit: false,
        delete: false,
        all: false
      };
      let updatedModule = { ...current };

      if (action === "all") {
        const nextVal = !current.all;
        updatedModule = {
          view: nextVal,
          insert: nextVal,
          edit: nextVal,
          delete: nextVal,
          all: nextVal
        };
      } else {
        updatedModule[action] = !current[action];
        updatedModule.all =
          updatedModule.view &&
          updatedModule.insert &&
          updatedModule.edit &&
          updatedModule.delete;
      }

      setFormPermissions((prev) => ({
        ...prev,
        [module]: updatedModule
      }));
    }
  };

  const handleToggleSelectAll = (checked: boolean) => {
    setSelectAllModules(checked);
    const updated: typeof formPermissions = {};
    MODULE_LIST.forEach((m) => {
      updated[m] = {
        view: checked,
        insert: checked,
        edit: checked,
        delete: checked,
        all: checked
      };
    });
    setFormPermissions(updated);
  };

  const handleNextToPermissions = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) {
      alert("Please fill in Name and Email");
      return;
    }
    setWizardTab("permissions");
  };

  const handleSaveStaff = () => {
    const newStaff: StaffItem = {
      id: Date.now(),
      srNo: staffList.length + 1,
      name: formName,
      email: formEmail,
      phone: formPhone || "9996663355",
      whatsapp: formWhatsapp || formPhone || "--",
      role: "Staff",
      status: "Active",
      createdAt: "12 Nov 2026, 18:45",
      createdBy: "Admin",
      address: formAddress || "Office address",
      permissions: formPermissions
    };

    setStaffList([newStaff, ...staffList]);
    setCurrentView("list");
    // Reset
    setFormName("");
    setFormEmail("");
    setFormPassword("");
    setFormPhone("");
    setFormWhatsapp("");
    setFormAddress("");
    setFormImageName("");
    setFormPermissions(DEFAULT_PERMISSIONS());
    setWizardTab("personal");
  };

  const handleDeleteStaff = (id: number) => {
    if (confirm("Are you sure you want to delete this staff member?")) {
      setStaffList((prev) => prev.filter((s) => s.id !== id));
      if (selectedStaff && selectedStaff.id === id) {
        setCurrentView("list");
      }
    }
  };

  const filteredStaff = staffList.filter((s) => {
    const matchesSearch =
      searchQuery === "" ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole =
      filterRole === "" || s.role.toLowerCase().includes(filterRole.toLowerCase());
    const matchesStatus =
      filterStatus === "" || s.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div
      className={`min-h-screen flex font-sans antialiased transition-colors duration-300 ${
        isDarkMode ? "bg-[#0b1329] text-slate-100" : "bg-[#f1f5f9] text-[#1e293b]"
      }`}
    >
      {/* Sidebar */}
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeItem="Manage Staff"
      />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        {/* Top Header */}
        <AdminHeader sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />

        {/* Content Area */}
        <div className="p-6 max-w-[1600px] w-full mx-auto space-y-5">
          {/* VIEW 1: STAFF & USERS LIST (Screenshot 1) */}
          {currentView === "list" && (
            <>
              {/* Header Title & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-xl font-bold text-[#1e293b] dark:text-white">
                      Staff & Users
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#e0f2fe] text-[#0284c7]">
                      👥 Staff: {staffList.length}/10
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Manage staff accounts and permissions.
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <button className="flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold shadow-sm transition">
                    <Upload className="w-3.5 h-3.5 text-slate-500" />
                    <span>Import CSV</span>
                  </button>
                  <button className="flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold shadow-sm transition">
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Export</span>
                  </button>
                  <button
                    onClick={() => {
                      setWizardTab("personal");
                      setCurrentView("create");
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold shadow-sm transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Staff</span>
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white dark:bg-[#111c38] border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search staff..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                      <span>Filters</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>Show per page:</span>
                    <select className="border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 bg-white dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-200 focus:outline-none">
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                    </select>
                  </div>
                </div>

                {/* Filter Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-1 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Role
                    </label>
                    <input
                      type="text"
                      placeholder="All roles"
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Job Title
                    </label>
                    <input
                      type="text"
                      placeholder="All job titles"
                      value={filterJobTitle}
                      onChange={(e) => setFilterJobTitle(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Status
                    </label>
                    <input
                      type="text"
                      placeholder="All statuses"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Created At
                      </label>
                      <div className="relative">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="From - To"
                          value={filterCreatedAt}
                          onChange={(e) => setFilterCreatedAt(e.target.value)}
                          className="w-full pl-8 pr-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <button
                      onClick={clearFilters}
                      className="px-4 py-1.5 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Staff Table */}
              <div className="bg-white dark:bg-[#111c38] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        <th className="py-3 px-4 w-16">SR.NO</th>
                        <th className="py-3 px-4">NAME</th>
                        <th className="py-3 px-4">EMAIL</th>
                        <th className="py-3 px-4">STATUS</th>
                        <th className="py-3 px-4">CREATED AT</th>
                        <th className="py-3 px-4 text-center">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
                      {filteredStaff.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-10 text-center text-slate-400">
                            No staff found
                          </td>
                        </tr>
                      ) : (
                        filteredStaff.map((s) => (
                          <tr
                            key={s.id}
                            className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition"
                          >
                            <td className="py-3.5 px-4 font-medium text-slate-500">{s.srNo}</td>
                            <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                              {s.name}
                            </td>
                            <td className="py-3.5 px-4 text-blue-600 font-medium">
                              {s.email}
                            </td>
                            <td className="py-3.5 px-4 relative">
                              <div className="relative inline-block text-left">
                                <button
                                  onClick={() =>
                                    setActiveStatusDropdownId(
                                      activeStatusDropdownId === s.id ? null : s.id
                                    )
                                  }
                                  className={`px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 ${
                                    s.status === "Active"
                                      ? "bg-[#dcfce7] text-[#15803d]"
                                      : "bg-slate-200 text-slate-700"
                                  }`}
                                >
                                  <span>{s.status}</span>
                                  <ChevronDown className="w-3 h-3 opacity-60" />
                                </button>

                                {activeStatusDropdownId === s.id && (
                                  <div className="absolute left-0 mt-1.5 w-32 bg-[#0b2447] text-white rounded-lg shadow-xl z-30 py-1 text-xs">
                                    <button
                                      onClick={() => handleUpdateStatus(s.id, "Active")}
                                      className="w-full text-left px-3 py-1.5 hover:bg-white/10"
                                    >
                                      Active
                                    </button>
                                    <button
                                      onClick={() => handleUpdateStatus(s.id, "Inactive")}
                                      className="w-full text-left px-3 py-1.5 hover:bg-white/10"
                                    >
                                      Inactive
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                              {s.createdAt}
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                {/* Permissions Button */}
                                <button
                                  onClick={() => {
                                    setPermissionTargetStaff(s);
                                    setIsPermissionsModalOpen(true);
                                  }}
                                  className="px-3.5 py-1 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-md text-[11px] font-bold tracking-wide transition shadow-sm"
                                >
                                  Permissions
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedStaff(s);
                                    setFormName(s.name);
                                    setFormEmail(s.email);
                                    setFormPhone(s.phone);
                                    setFormWhatsapp(s.whatsapp);
                                    setFormAddress(s.address);
                                    setFormPermissions(s.permissions);
                                    setWizardTab("personal");
                                    setCurrentView("create");
                                  }}
                                  title="Edit"
                                  className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedStaff(s);
                                    setCurrentView("details");
                                  }}
                                  title="View Details"
                                  className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteStaff(s.id)}
                                  title="Delete"
                                  className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <div>
                    Showing 1 to {filteredStaff.length} of {filteredStaff.length} results
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      disabled
                      className="px-2.5 py-1 text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button className="px-3 py-1 text-white bg-[#0b2447] rounded text-xs font-semibold">
                      1
                    </button>
                    <button
                      disabled
                      className="px-2.5 py-1 text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* VIEW 2: ADD STAFF (Screenshots 6 & 7) */}
          {currentView === "create" && (
            <div className="space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-[#1e293b] dark:text-white">Add Staff</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Create a new staff user and assign module access.
                  </p>
                </div>
                <button
                  onClick={() => setCurrentView("list")}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold transition shadow-sm"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              </div>

              {/* Wizard Tabs Header */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setWizardTab("personal")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition border ${
                    wizardTab === "personal"
                      ? "bg-white dark:bg-slate-800 text-blue-600 border-blue-500 shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-200"
                  }`}
                >
                  Personal Details
                </button>
                <button
                  onClick={() => setWizardTab("permissions")}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition border ${
                    wizardTab === "permissions"
                      ? "bg-white dark:bg-slate-800 text-blue-600 border-blue-500 shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-200"
                  }`}
                >
                  Permissions
                </button>
              </div>

              {/* Tab 1: Personal Details (Screenshot 6) */}
              {wizardTab === "personal" && (
                <form
                  onSubmit={handleNextToPermissions}
                  className="bg-white dark:bg-[#111c38] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-5"
                >
                  <div>
                    <h2 className="text-sm font-bold text-slate-800 dark:text-white">
                      Personal Details
                    </h2>
                    <p className="text-xs text-slate-400">
                      Enter staff name, email, phone and basic profile information.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                    {/* Name */}
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          Name <span className="text-red-500">*</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter staff name"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          Email <span className="text-red-500">*</span>
                        </span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Enter email address"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span className="flex items-center gap-1.5">
                          <Key className="w-3.5 h-3.5 text-slate-400" />
                          Password <span className="text-red-500">*</span>
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          value={formPassword}
                          onChange={(e) => setFormPassword(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? (
                            <EyeOff className="w-3.5 h-3.5" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Phone no */}
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          Phone no. <span className="text-red-500">*</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter 10-digit phone number"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* WhatsApp no with Copy Phone */}
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          WhatsApp no.
                        </span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter 10-digit WhatsApp number"
                          value={formWhatsapp}
                          onChange={(e) => setFormWhatsapp(e.target.value)}
                          className="flex-1 px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={handleCopyPhone}
                          className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 text-xs font-semibold whitespace-nowrap"
                        >
                          Copy Phone
                        </button>
                      </div>
                    </div>

                    {/* Profile Image */}
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span className="flex items-center gap-1.5">
                          <Camera className="w-3.5 h-3.5 text-slate-400" />
                          Profile Image
                        </span>
                      </label>
                      <div className="flex items-center gap-3">
                        <label className="cursor-pointer px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md border border-slate-300 dark:border-slate-700 text-xs font-medium transition">
                          Choose File
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setFormImageName(e.target.files[0].name);
                              }
                            }}
                          />
                        </label>
                        <span className="text-slate-400 text-xs">
                          {formImageName || "No file chosen"}
                        </span>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          Address
                        </span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Enter address details"
                        value={formAddress}
                        onChange={(e) => setFormAddress(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 resize-none"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setCurrentView("list")}
                      className="px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold transition shadow-sm"
                    >
                      Next
                    </button>
                  </div>
                </form>
              )}

              {/* Tab 2: Permissions (Screenshot 7) */}
              {wizardTab === "permissions" && (
                <div className="bg-white dark:bg-[#111c38] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-5">
                  <div>
                    <h2 className="text-sm font-bold text-slate-800 dark:text-white">
                      Permissions
                    </h2>
                    <p className="text-xs text-slate-400">
                      Assign module access and permissions for this staff member.
                    </p>
                  </div>

                  {/* Select All Checkbox */}
                  <div className="flex items-center gap-2 pt-1">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectAllModules}
                        onChange={(e) => handleToggleSelectAll(e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                      />
                      <span>Select All Module</span>
                    </label>
                  </div>

                  {/* Permissions Table */}
                  <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                    <div className="max-h-96 overflow-y-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-[10px] uppercase font-bold text-slate-500">
                          <tr>
                            <th className="py-2.5 px-4">MODULE NAME</th>
                            <th className="py-2.5 px-4 text-center">VIEW</th>
                            <th className="py-2.5 px-4 text-center">INSERT</th>
                            <th className="py-2.5 px-4 text-center">EDIT</th>
                            <th className="py-2.5 px-4 text-center">DELETE</th>
                            <th className="py-2.5 px-4 text-center">ALL</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {MODULE_LIST.map((mod) => {
                            const p = formPermissions[mod] || {
                              view: false,
                              insert: false,
                              edit: false,
                              delete: false,
                              all: false
                            };
                            return (
                              <tr key={mod} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                                <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">
                                  {mod}
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <input
                                    type="checkbox"
                                    checked={p.view}
                                    onChange={() => togglePermission(mod, "view")}
                                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                                  />
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <input
                                    type="checkbox"
                                    checked={p.insert}
                                    onChange={() => togglePermission(mod, "insert")}
                                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                                  />
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <input
                                    type="checkbox"
                                    checked={p.edit}
                                    onChange={() => togglePermission(mod, "edit")}
                                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                                  />
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <input
                                    type="checkbox"
                                    checked={p.delete}
                                    onChange={() => togglePermission(mod, "delete")}
                                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                                  />
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <input
                                    type="checkbox"
                                    checked={p.all}
                                    onChange={() => togglePermission(mod, "all")}
                                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setWizardTab("personal")}
                      className="px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 transition"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveStaff}
                      className="px-6 py-2 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold transition shadow-sm"
                    >
                      Save Staff
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VIEW 3: STAFF DETAILS (Screenshot 8) */}
          {currentView === "details" && selectedStaff && (
            <div className="space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-[#1e293b] dark:text-white">
                    Staff Details
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Complete information about this staff member
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setFormName(selectedStaff.name);
                      setFormEmail(selectedStaff.email);
                      setFormPhone(selectedStaff.phone);
                      setFormWhatsapp(selectedStaff.whatsapp);
                      setFormAddress(selectedStaff.address);
                      setFormPermissions(selectedStaff.permissions);
                      setWizardTab("personal");
                      setCurrentView("create");
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold transition shadow-sm"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setCurrentView("list")}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold transition shadow-sm"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                </div>
              </div>

              {/* Details Card */}
              <div className="bg-white dark:bg-[#111c38] border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-sm">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Big Avatar Frame */}
                  <div className="w-40 h-40 border-2 border-slate-800 dark:border-slate-600 rounded-2xl flex items-center justify-center bg-slate-50 dark:bg-slate-800 flex-shrink-0">
                    <User className="w-20 h-20 text-slate-400" />
                  </div>

                  {/* Info Grid */}
                  <div className="flex-1 space-y-5">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {selectedStaff.name}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-xs">
                      {/* Created By */}
                      <div className="flex items-center">
                        <span className="w-36 text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          Created By:
                        </span>
                        <span className="text-slate-800 dark:text-slate-200 font-semibold">
                          {selectedStaff.createdBy}
                        </span>
                      </div>

                      {/* Created At */}
                      <div className="flex items-center">
                        <span className="w-36 text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          Created At:
                        </span>
                        <span className="text-slate-800 dark:text-slate-200 font-semibold">
                          {selectedStaff.createdAt}
                        </span>
                      </div>

                      {/* Email */}
                      <div className="flex items-center">
                        <span className="w-36 text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          Email:
                        </span>
                        <span className="text-blue-600 font-semibold">{selectedStaff.email}</span>
                      </div>

                      {/* Phone Number */}
                      <div className="flex items-center">
                        <span className="w-36 text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          Phone Number:
                        </span>
                        <span className="text-slate-800 dark:text-slate-200 font-semibold">
                          {selectedStaff.phone}
                        </span>
                      </div>

                      {/* WhatsApp Number */}
                      <div className="flex items-center">
                        <span className="w-36 text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          WhatsApp Number:
                        </span>
                        <span className="text-slate-800 dark:text-slate-200 font-semibold">
                          {selectedStaff.whatsapp}
                        </span>
                      </div>

                      {/* Role */}
                      <div className="flex items-center">
                        <span className="w-36 text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          Role:
                        </span>
                        <span className="text-slate-800 dark:text-slate-200 font-semibold">
                          {selectedStaff.role}
                        </span>
                      </div>

                      {/* Address */}
                      <div className="flex items-start">
                        <span className="w-36 text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2 pt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          Address:
                        </span>
                        <span className="text-slate-700 dark:text-slate-300 flex-1 leading-relaxed">
                          {selectedStaff.address}
                        </span>
                      </div>

                      {/* Status */}
                      <div className="flex items-center">
                        <span className="w-36 text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                          Status:
                        </span>
                        <span className="px-3.5 py-0.5 rounded-full text-[11px] font-bold bg-[#10b981] text-white">
                          {selectedStaff.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center text-xs text-slate-400 pt-8 pb-4">
            © 2026 Copyright - Fablead Developers Technolab
          </div>
        </div>
      </div>

      {/* POPUP MODAL: STAFF PERMISSIONS (Screenshots 2, 3, 4, 5) */}
      {isPermissionsModalOpen && permissionTargetStaff && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="bg-[#0b2447] text-white px-6 py-4 flex items-center justify-between">
              <h2 className="text-sm font-bold tracking-wide">
                Staff Permission - {permissionTargetStaff.name.toLowerCase()}
              </h2>
              <button
                onClick={() => setIsPermissionsModalOpen(false)}
                className="text-slate-300 hover:text-white p-1 rounded transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Permissions Matrix */}
            <div className="p-6 overflow-y-auto flex-1">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Module</th>
                    <th className="py-3 px-4 text-center">View</th>
                    <th className="py-3 px-4 text-center">Insert</th>
                    <th className="py-3 px-4 text-center">Edit</th>
                    <th className="py-3 px-4 text-center">Delete</th>
                    <th className="py-3 px-4 text-center">All</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {MODULE_LIST.map((mod) => {
                    const p = permissionTargetStaff.permissions[mod] || {
                      view: false,
                      insert: false,
                      edit: false,
                      delete: false,
                      all: false
                    };
                    return (
                      <tr
                        key={mod}
                        className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition"
                      >
                        <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                          <Users className="w-4 h-4 text-slate-400" />
                          <span>{mod}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={p.view}
                            onChange={() => togglePermission(mod, "view", true)}
                            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                          />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={p.insert}
                            onChange={() => togglePermission(mod, "insert", true)}
                            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                          />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={p.edit}
                            onChange={() => togglePermission(mod, "edit", true)}
                            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                          />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={p.delete}
                            onChange={() => togglePermission(mod, "delete", true)}
                            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                          />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={p.all}
                            onChange={() => togglePermission(mod, "all", true)}
                            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-end">
              <button
                type="button"
                onClick={() => setIsPermissionsModalOpen(false)}
                className="px-5 py-2 bg-[#0b2447] hover:bg-[#19376d] text-white rounded-lg text-xs font-semibold transition shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

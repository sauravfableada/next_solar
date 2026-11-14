"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/context/ToastContext";
import { profileService } from "@/services/api/profile";
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
  Key,
  Upload,
  CheckCircle2,
  AlertCircle,
  LogOut,
  User,
  History,
  Globe,
  Settings,
} from "lucide-react";

export default function ProfilePage() {
  const { success: toastSuccess, error: toastError } = useToast();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState("");
  const [saveError, setSaveError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Form states matching screenshot
  const [profileData, setProfileData] = useState({
    name: "Solar CRM",
    userName: "sola_crmadmin",
    email: "solarcrm@gmail.com",
    contactNo: "1234567895",
    avatar: "/images/avatar-2.jpg",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("/images/avatar-2.jpg");

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navModules = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard", hasSub: false },
    { name: "Manage Customers", icon: Users, href: "/admin/dashboard", hasSub: false },
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

  // Fetch real user profile on mount
  useEffect(() => {
    async function loadProfile() {
      try {
        const user = await profileService.getProfile();
        if (user) {
          const avatarPath = user.avatar || "/images/avatar-2.jpg";
          setProfileData({
            name: user.name || "Solar CRM",
            userName: user.user_name || "sola_crmadmin",
            email: user.email || "solarcrm@gmail.com",
            contactNo: user.phone || "1234567895",
            avatar: avatarPath,
          });
          setPreviewUrl(avatarPath);
        }
      } catch (err) {
        // Keep default fallback state gracefully
      }
    }
    loadProfile();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSaveSuccess("");
    setSaveError("");

    try {
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("email", profileData.email);
      formData.append("phone", profileData.contactNo);
      formData.append("user_name", profileData.userName);
      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }

      const res = await profileService.updateProfile(formData);

      if (res?.data?.avatar) {
        setPreviewUrl(res.data.avatar);
        setProfileData((prev) => ({ ...prev, avatar: res.data.avatar }));
      }

      toastSuccess(res?.message || "Profile updated successfully!", "Profile Updated");
    } catch (err: any) {
      toastError(
        err?.data?.message || err?.message || "Failed to update profile. Please check your inputs.",
        "Update Failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!passwordForm.currentPassword) {
      toastError("Please enter your current password.", "Current Password Required");
      return;
    }

    if (!passwordForm.newPassword) {
      toastError("Please enter your new password.", "New Password Required");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toastError("New password must be at least 6 characters.", "Validation Error");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toastError("New password and confirm password do not match.", "Password Mismatch");
      return;
    }

    setIsChangingPassword(true);
    try {
      const res = await profileService.changePassword({
        current_password: passwordForm.currentPassword,
        new_password: passwordForm.newPassword,
        new_password_confirmation: passwordForm.confirmPassword,
      });

      toastSuccess(res?.message || "Password updated successfully!", "Security Updated");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setShowPasswordModal(false);
    } catch (err: any) {
      toastError(
        err?.data?.message || err?.message || "Current password is incorrect or failed to update.",
        "Change Failed"
      );
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex font-sans antialiased transition-colors duration-300 ${isDarkMode ? "bg-[#0b1329] text-slate-100" : "bg-[#f1f5f9] text-[#1e293b]"
        }`}
    >
      {/* =========================================================================
          LEFT SIDEBAR (Matching CRM Suite)
         ========================================================================= */}
      <aside
        className={`bg-[#0f172a] text-slate-300 flex flex-col justify-between transition-all duration-300 fixed inset-y-0 left-0 z-40 border-r border-slate-800 ${sidebarCollapsed ? "w-20" : "w-64"
          }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Top Logo Container */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            {!sidebarCollapsed ? (
              <Link href="/admin/dashboard" className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff5e3a] to-[#d83a15] flex items-center justify-center text-white font-black text-lg shadow-md">
                  F
                </div>
                <div>
                  <div className="font-extrabold text-base text-white tracking-tight leading-none">
                    Fablead <span className="text-blue-400">CRM</span>
                  </div>
                  <div className="text-[9px] text-slate-400 uppercase tracking-widest mt-0.5">
                    Solar Solutions
                  </div>
                </div>
              </Link>
            ) : (
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff5e3a] to-[#d83a15] flex items-center justify-center text-white font-black mx-auto">
                F
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hidden lg:block"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Org Switcher Pill */}
          {!sidebarCollapsed && (
            <div className="p-3 mx-3 my-3 bg-[#1e293b]/70 rounded-xl border border-slate-700/60 flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-orange-600 flex items-center justify-center text-white text-[10px] font-bold">
                FL
              </div>
              <div className="truncate flex-1">
                <div className="text-xs font-bold text-white uppercase tracking-wider truncate">
                  FABLEAD DEVELOP...
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            </div>
          )}

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 scrollbar-thin scrollbar-thumb-slate-700">
            {navModules.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {!sidebarCollapsed && <span className="truncate">{item.name}</span>}
                  </div>
                  {!sidebarCollapsed && item.hasSub && (
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Footer of Sidebar */}
          <div className="p-3 border-t border-slate-800">
            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              {!sidebarCollapsed && <span>Return to Website</span>}
            </Link>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          MAIN CONTENT AREA
         ========================================================================= */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-64"
          }`}
      >
        {/* Top Header Navbar */}
        <AdminHeader sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />

        {/* =========================================================================
            PROFILE VIEW (Exact match to uploaded screenshot)
           ========================================================================= */}
        <main className="p-6 sm:p-8 space-y-6 flex-1">
          {/* Top Profile Banner Card matching screenshot */}
          <div
            className={`rounded-2xl p-6 sm:p-7 border shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${isDarkMode
                ? "bg-[#0f172a] border-slate-800"
                : "bg-white border-slate-200"
              }`}
          >
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 shadow-md">
                <Image
                  src={previewUrl || "/images/avatar-2.jpg"}
                  alt="Solar CRM"
                  fill
                  unoptimized={previewUrl.startsWith("blob:") || previewUrl.startsWith("http")}
                  className="object-cover"
                />
              </div>
              <div>
                <h2
                  className={`text-2xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                >
                  {profileData.name}
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  (Administrator)
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowPasswordModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f274a] hover:bg-[#163560] text-white text-xs font-bold transition-all shadow-sm"
            >
              <Key className="w-4 h-4 text-blue-400" />
              <span>Change Password</span>
            </button>
          </div>

          {/* UPDATE PROFILE Container matching screenshot */}
          <div
            className={`rounded-2xl border shadow-sm overflow-hidden transition-colors ${isDarkMode
                ? "bg-[#0f172a] border-slate-800"
                : "bg-white border-slate-200"
              }`}
          >
            {/* Header Dark Banner */}
            <div className="bg-[#0b1f3b] text-white px-6 py-4 border-b border-slate-800">
              <h3 className="text-sm font-black uppercase tracking-wider">
                UPDATE PROFILE
              </h3>
            </div>

            {/* Inner Form Content */}
            <form onSubmit={handleProfileSubmit} className="p-6 sm:p-8 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-6">
                  USER INFORMATION
                </span>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Profile Image Preview */}
                  <div className="lg:col-span-3 flex flex-col items-center sm:items-start">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-3 block">
                      Profile Image
                    </span>
                    <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-blue-500/80 shadow-lg">
                      <Image
                        src={previewUrl || "/images/avatar-2.jpg"}
                        alt="Profile Preview"
                        fill
                        unoptimized={previewUrl.startsWith("blob:") || previewUrl.startsWith("http")}
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Form Inputs Grid */}
                  <div className="lg:col-span-9 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) =>
                            setProfileData({ ...profileData, name: e.target.value })
                          }
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${isDarkMode
                              ? "bg-slate-800 border-slate-700 text-white"
                              : "bg-white border-slate-200 text-slate-900"
                            }`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                          User Name
                        </label>
                        <input
                          type="text"
                          value={profileData.userName}
                          onChange={(e) =>
                            setProfileData({ ...profileData, userName: e.target.value })
                          }
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${isDarkMode
                              ? "bg-slate-800 border-slate-700 text-white"
                              : "bg-white border-slate-200 text-slate-900"
                            }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                          Email address
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData({ ...profileData, email: e.target.value })
                          }
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${isDarkMode
                              ? "bg-slate-800 border-slate-700 text-white"
                              : "bg-white border-slate-200 text-slate-900"
                            }`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                          Contact No.
                        </label>
                        <input
                          type="text"
                          value={profileData.contactNo}
                          onChange={(e) =>
                            setProfileData({ ...profileData, contactNo: e.target.value })
                          }
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${isDarkMode
                              ? "bg-slate-800 border-slate-700 text-white"
                              : "bg-white border-slate-200 text-slate-900"
                            }`}
                        />
                      </div>
                    </div>

                    {/* File Upload exactly matching screenshot */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                        Profile Image (Upload)
                      </label>
                      <div className="flex items-center border rounded-xl overflow-hidden max-w-xl">
                        <label className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold cursor-pointer border-r border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                          Choose File
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                        </label>
                        <span className="px-4 text-xs text-slate-400 truncate">
                          {selectedFile ? selectedFile.name : "No file chosen"}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        Any image file - max 50 MB.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  {isSubmitting ? "Saving..." : "Save Profile Changes"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>

      {/* =========================================================================
          CHANGE PASSWORD MODAL
         ========================================================================= */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`w-full max-w-md rounded-2xl p-6 border shadow-2xl animate-in zoom-in-95 duration-200 ${isDarkMode
                ? "bg-[#0f172a] border-slate-800 text-white"
                : "bg-white border-slate-200 text-slate-900"
              }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-5">
              <h4 className="text-base font-bold">Change Password</h4>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handlePasswordSubmit}
              noValidate
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold mb-1.5 text-slate-600 dark:text-slate-300">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold mb-1.5 text-slate-600 dark:text-slate-300">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold mb-1.5 text-slate-600 dark:text-slate-300">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-xl dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 border rounded-xl dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-md"
                >
                  {isChangingPassword ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/context/ToastContext";
import { settingsService } from "@/services/api/settings";
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
  ChevronRight,
  Menu,
  Settings as SettingsIcon,
  User,
  History,
  Globe,
  LogOut,
  CheckCircle2,
  DollarSign,
  Trash2,
  Sliders,
  Send,
  MessageSquare,
  Mail,
  ShieldCheck,
  RefreshCw,
  Save,
  Upload,
} from "lucide-react";

// Social SVG Icons
function FacebookIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function SettingsPage() {
  const { success: toastSuccess, error: toastError } = useToast();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { isDarkMode } = useTheme();

  // Top Tabs: General Settings | Integrations | Financial Information | Table Clear | Estimate/Invoice setting
  const [activeMainTab, setActiveMainTab] = useState<
    "General Settings" | "Integrations" | "Financial Information" | "Table Clear" | "Estimate/Invoice setting"
  >("General Settings");

  // General Settings State
  const [generalConfig, setGeneralConfig] = useState({
    companyName: "Fablead Developers Technolab",
    brandTitle: "Bharat Solar & CRM Solutions",
    contactEmail: "info@fableadtech.com",
    contactPhone: "+91 98705 43210",
    supportEmail: "support@fableadtech.com",
    companyAddress: "Solar Business Hub, Ring Road, Gujarat, India",
    defaultTimezone: "Asia/Kolkata (IST +5:30)",
    dateFormat: "DD/MM/YYYY",
    currencySymbol: "₹ (INR)",
    enableCustomerSelfRegistration: true,
    enableEmailNotifications: true,
    enableSmsAlerts: true,
    enableMaintenanceMode: false,
    companyLogo: "/images/Fablead_CRM.jpg",
    shortLogo: "/images/fablead-crm-logo.png",
  });
  const [companyLogoPreview, setCompanyLogoPreview] = useState("/images/Fablead_CRM.jpg");
  const [shortLogoPreview, setShortLogoPreview] = useState("/images/fablead-crm-logo.png");

  // Load Dynamic Settings from Backend on mount
  useEffect(() => {
    async function loadBackendSettings() {
      try {
        const res = await settingsService.getSettings();
        if (res?.data) {
          const d = res.data;
          setGeneralConfig((prev) => ({
            ...prev,
            companyName: d.company_name ?? prev.companyName,
            brandTitle: d.brand_title ?? prev.brandTitle,
            contactEmail: d.contact_email ?? prev.contactEmail,
            contactPhone: d.contact_phone ?? prev.contactPhone,
            supportEmail: d.support_email ?? prev.supportEmail,
            companyAddress: d.company_address ?? prev.companyAddress,
            defaultTimezone: d.default_timezone ?? prev.defaultTimezone,
            dateFormat: d.date_format ?? prev.dateFormat,
            currencySymbol: d.currency_symbol ?? prev.currencySymbol,
            enableEmailNotifications: d.enable_email_notifications ?? prev.enableEmailNotifications,
            enableSmsAlerts: d.enable_sms_alerts ?? prev.enableSmsAlerts,
            companyLogo: d.company_logo ?? prev.companyLogo,
            shortLogo: d.short_logo ?? prev.shortLogo,
          }));

          if (d.company_logo) setCompanyLogoPreview(d.company_logo);
          if (d.short_logo) setShortLogoPreview(d.short_logo);

          // Integrations
          if (d.fb_app_id) {
            setFbConfig((prev) => ({
              ...prev,
              appId: d.fb_app_id ?? prev.appId,
              accessToken: d.fb_access_token ?? prev.accessToken,
              pageId: d.fb_page_id ?? prev.pageId,
              pixelId: d.fb_pixel_id ?? prev.pixelId,
            }));
          }

          // Financial
          if (d.tax_name || d.pan_no) {
            setFinancialConfig((prev) => ({
              ...prev,
              currency: d.currency ?? prev.currency,
              taxName: d.tax_name ?? prev.taxName,
              taxRate: d.tax_rate ?? prev.taxRate,
              panNo: d.pan_no ?? prev.panNo,
              gstNo: d.gst_no ?? prev.gstNo,
              bankName: d.bank_name ?? prev.bankName,
              accountNumber: d.account_number ?? prev.accountNumber,
              ifscCode: d.ifsc_code ?? prev.ifscCode,
            }));
          }
        }
      } catch (e) {
        // Fallback to initial client values
      }
    }
    loadBackendSettings();
  }, []);

  const [companyLogoFile, setCompanyLogoFile] = useState<File | null>(null);
  const [shortLogoFile, setShortLogoFile] = useState<File | null>(null);
  const [isSavingGeneral, setIsSavingGeneral] = useState(false);

  const handleSaveGeneral = async () => {
    setIsSavingGeneral(true);
    try {
      const formData = new FormData();
      formData.append("group", "general");
      formData.append("company_name", generalConfig.companyName);
      formData.append("brand_title", generalConfig.brandTitle);
      formData.append("contact_email", generalConfig.contactEmail);
      formData.append("contact_phone", generalConfig.contactPhone);
      formData.append("support_email", generalConfig.supportEmail);
      formData.append("company_address", generalConfig.companyAddress);
      formData.append("default_timezone", generalConfig.defaultTimezone);
      formData.append("date_format", generalConfig.dateFormat);
      formData.append("currency_symbol", generalConfig.currencySymbol);
      formData.append("enable_email_notifications", String(generalConfig.enableEmailNotifications));
      formData.append("enable_sms_alerts", String(generalConfig.enableSmsAlerts));

      if (companyLogoFile) {
        formData.append("company_logo", companyLogoFile);
      }
      if (shortLogoFile) {
        formData.append("short_logo", shortLogoFile);
      }

      await settingsService.saveSettings(formData);
      toastSuccess("General settings and logos saved to database!", "General Settings");
    } catch (err: any) {
      toastError(err?.message || "Failed to save settings.", "Save Error");
    } finally {
      setIsSavingGeneral(false);
    }
  };
  const [activeIntegrationTab, setActiveIntegrationTab] = useState<
    "Social Media Integration" | "WhatsApp Integration" | "Email SMTP" | "Google Connection"
  >("Social Media Integration");

  // Global Integration Enable Toggle
  const [integrationsEnabled, setIntegrationsEnabled] = useState(true);

  // Accordion open states
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    facebook: true,
    google: false,
    instagram: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Facebook Ads Form State
  const [fbConfig, setFbConfig] = useState({
    appId: "982348123981234",
    appSecret: "••••••••••••••••••••••••••••••••",
    accessToken: "EAAG...valid_access_token_solar_crm",
    pageId: "1098238127361",
    pixelId: "48239012384912",
  });

  // Google Ads Form State
  const [googleConfig, setGoogleConfig] = useState({
    clientId: "7823491823-solar.apps.googleusercontent.com",
    clientSecret: "••••••••••••••••••••••••",
    developerToken: "G-DEV-98123019238",
    customerId: "123-456-7890",
  });

  // Instagram Ads Form State
  const [instaConfig, setInstaConfig] = useState({
    businessAccountId: "1784140023456789",
    accessToken: "IGQV...instagram_marketing_token",
  });

  // WhatsApp Integration Form State
  const [waConfig, setWaConfig] = useState({
    businessNumber: "+91 98765 43210",
    apiKey: "WA_LIVE_KEY_8912389123",
    webhookUrl: "https://solar-crm.fableadtech.com/api/v1/whatsapp/webhook",
  });

  // Email SMTP Form State
  const [smtpConfig, setSmtpConfig] = useState({
    host: "smtp.gmail.com",
    port: "587",
    username: "notifications@solarcrm.com",
    password: "••••••••••••••••",
    encryption: "TLS",
    fromName: "Solar CRM Team",
    fromEmail: "noreply@solarcrm.com",
  });

  // Financial Info Form State
  const [financialConfig, setFinancialConfig] = useState({
    currency: "INR (₹)",
    taxName: "GST",
    taxRate: "18%",
    panNo: "ABCDE1234F",
    gstNo: "27ABCDE1234F1Z5",
    bankName: "HDFC Bank",
    accountNumber: "50200012345678",
    ifscCode: "HDFC0000123",
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

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

  return (
    <div
      className={`min-h-screen flex font-sans antialiased transition-colors duration-300 ${isDarkMode ? "bg-[#0b1329] text-slate-100" : "bg-[#f1f5f9] text-[#1e293b]"
        }`}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center space-x-2 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          LEFT SIDEBAR (Consistent with Admin CRM)
         ========================================================================= */}
      <aside
        className={`bg-[#0f172a] text-slate-300 flex flex-col justify-between transition-all duration-300 fixed inset-y-0 left-0 z-40 border-r border-slate-800 ${sidebarCollapsed ? "w-20" : "w-64"
          }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Top Logo Container */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            {!sidebarCollapsed ? (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center p-1.5 shadow-md">
                  <div className="w-full h-full bg-[#f97316] rounded flex items-center justify-center font-bold text-white text-xs">
                    F
                  </div>
                </div>
                <div>
                  <span className="font-extrabold tracking-tight text-white text-base block leading-tight">
                    Fablead <span className="text-orange-500 font-medium text-xs">CRM</span>
                  </span>
                  <span className="text-[10px] text-slate-400 tracking-wider">SOLAR SOLUTIONS</span>
                </div>
              </div>
            ) : (
              <div className="w-10 h-10 mx-auto rounded-lg bg-white flex items-center justify-center shadow-md">
                <span className="font-bold text-[#f97316] text-lg">F</span>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Toggle Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Org Switcher Pill */}
          {!sidebarCollapsed && (
            <div className="p-3">
              <div className="flex items-center justify-between bg-slate-800/80 hover:bg-slate-800 px-3 py-2.5 rounded-xl border border-slate-700 cursor-pointer transition">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-md bg-[#ea580c] flex items-center justify-center text-white text-xs font-bold">
                    FL
                  </div>
                  <span className="font-semibold text-xs tracking-wide text-white truncate max-w-[130px]">
                    FABLEAD DEVELOP...
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
          )}

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto py-2 px-3 space-y-1 scrollbar-thin">
            {navModules.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800/80 hover:text-white transition group"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-white" />
                    {!sidebarCollapsed && <span>{item.name}</span>}
                  </div>
                  {!sidebarCollapsed && item.hasSub && (
                    <ChevronDown className="w-3 h-3 text-slate-500 group-hover:text-slate-300" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Bottom Website Return */}
          <div className="p-3 border-t border-slate-800 bg-[#0c1222]">
            <Link
              href="/"
              className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-xs">
                N
              </div>
              {!sidebarCollapsed && <span>Return to Website</span>}
            </Link>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          MAIN CONTENT AREA
         ========================================================================= */}
      <main
        className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-64"
          } flex flex-col min-h-screen`}
      >
        {/* TOP NAVBAR */}
        <AdminHeader sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />

        {/* =========================================================================
            SETTINGS CONTENT CONTAINER (Matching uploaded screenshot)
           ========================================================================= */}
        <div className="p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Header Title & Subtitle */}
          <div>
            <h1
              className={`text-2xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"
                }`}
            >
              Settings
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Manage SMTP, keys, WhatsApp and integration preferences.
            </p>
          </div>

          {/* MAIN TABS PILLS */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "General Settings", label: "General Settings" },
              { id: "Integrations", label: "Integrations" },
              { id: "Financial Information", label: "Financial Information" },
              { id: "Table Clear", label: "Table Clear" },
              { id: "Estimate/Invoice setting", label: "Estimate/Invoice setting" },
            ].map((tab) => {
              const isActive = activeMainTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveMainTab(tab.id as any)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer ${isActive
                      ? "bg-[#142952] text-white shadow-blue-900/20 font-bold"
                      : isDarkMode
                        ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                    }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* =====================================================================
              MAIN TAB 0: GENERAL SETTINGS
             ===================================================================== */}
          {activeMainTab === "General Settings" && (
            <div
              className={`rounded-2xl border p-6 md:p-8 space-y-6 transition-colors shadow-sm ${isDarkMode ? "bg-[#101b33] border-slate-800" : "bg-white border-slate-200/80"
                }`}
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <h2
                    className={`text-sm font-bold tracking-wide uppercase ${isDarkMode ? "text-slate-200" : "text-slate-800"
                      }`}
                  >
                    General System Settings
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Configure your solar organization profile, regional defaults, and global platform flags.
                  </p>
                </div>
                <button
                  disabled={isSavingGeneral}
                  onClick={handleSaveGeneral}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSavingGeneral ? "Saving..." : "Save General Settings"}</span>
                </button>
              </div>

              {/* Organization Info Form */}
              <div className="space-y-6">
                {/* LOGO MANAGEMENT SECTION */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                    Company Logos & Branding
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Primary Company Logo */}
                    <div
                      className={`p-5 rounded-2xl border ${isDarkMode
                          ? "bg-slate-800/40 border-slate-700/60"
                          : "bg-slate-50 border-slate-200"
                        } space-y-3.5`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            Company Full Logo
                          </h4>
                          <p className="text-[11px] text-slate-400">
                            Displayed on header, invoices, PDF documents & sidebar
                          </p>
                        </div>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">
                          Primary
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-40 h-16 rounded-xl bg-white border border-slate-200 p-2 flex items-center justify-center shadow-xs overflow-hidden relative">
                          <Image
                            src={companyLogoPreview}
                            alt="Company Logo Preview"
                            fill
                            unoptimized={companyLogoPreview.startsWith("blob:")}
                            className="object-contain p-1"
                          />
                        </div>

                        <div className="flex-1 space-y-1.5">
                          <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer shadow-sm transition">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Change Logo</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const file = e.target.files[0];
                                  setCompanyLogoFile(file);
                                  const url = URL.createObjectURL(file);
                                  setCompanyLogoPreview(url);
                                  toastSuccess("Company logo selected!", "Logo Upload");
                                }
                              }}
                            />
                          </label>
                          <p className="text-[10px] text-slate-400">
                            Recommended: PNG/JPG with transparent or white background (max 5 MB)
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Short / Compact Icon Logo */}
                    <div
                      className={`p-5 rounded-2xl border ${isDarkMode
                          ? "bg-slate-800/40 border-slate-700/60"
                          : "bg-slate-50 border-slate-200"
                        } space-y-3.5`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            Short Logo / Favicon
                          </h4>
                          <p className="text-[11px] text-slate-400">
                            Collapsed sidebar icon, mobile header, and browser favicon
                          </p>
                        </div>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                          Compact
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 p-2 flex items-center justify-center shadow-xs overflow-hidden relative">
                          <Image
                            src={shortLogoPreview}
                            alt="Short Logo Preview"
                            fill
                            unoptimized={shortLogoPreview.startsWith("blob:")}
                            className="object-contain p-1"
                          />
                        </div>

                        <div className="flex-1 space-y-1.5">
                          <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0f274a] hover:bg-[#163560] text-white text-xs font-semibold cursor-pointer shadow-sm transition">
                            <Upload className="w-3.5 h-3.5 text-blue-400" />
                            <span>Change Short Logo</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const file = e.target.files[0];
                                  setShortLogoFile(file);
                                  const url = URL.createObjectURL(file);
                                  setShortLogoPreview(url);
                                  toastSuccess("Short logo selected!", "Icon Upload");
                                }
                              }}
                            />
                          </label>
                          <p className="text-[10px] text-slate-400">
                            Recommended: Square 1:1 ratio (PNG/SVG, 128x128px)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block pt-2">
                  Company & Brand Profile
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                  <div>
                    <label className="block font-bold mb-1.5 text-slate-600 dark:text-slate-300">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={generalConfig.companyName}
                      onChange={(e) =>
                        setGeneralConfig({ ...generalConfig, companyName: e.target.value })
                      }
                      className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium transition ${isDarkMode
                          ? "bg-slate-800 border-slate-700 text-white"
                          : "bg-white border-slate-200 text-slate-800"
                        }`}
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1.5 text-slate-600 dark:text-slate-300">
                      Brand / Suite Title
                    </label>
                    <input
                      type="text"
                      value={generalConfig.brandTitle}
                      onChange={(e) =>
                        setGeneralConfig({ ...generalConfig, brandTitle: e.target.value })
                      }
                      className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium transition ${isDarkMode
                          ? "bg-slate-800 border-slate-700 text-white"
                          : "bg-white border-slate-200 text-slate-800"
                        }`}
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1.5 text-slate-600 dark:text-slate-300">
                      Official Contact Email
                    </label>
                    <input
                      type="email"
                      value={generalConfig.contactEmail}
                      onChange={(e) =>
                        setGeneralConfig({ ...generalConfig, contactEmail: e.target.value })
                      }
                      className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium transition ${isDarkMode
                          ? "bg-slate-800 border-slate-700 text-white"
                          : "bg-white border-slate-200 text-slate-800"
                        }`}
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1.5 text-slate-600 dark:text-slate-300">
                      Contact Phone / Hotline
                    </label>
                    <input
                      type="text"
                      value={generalConfig.contactPhone}
                      onChange={(e) =>
                        setGeneralConfig({ ...generalConfig, contactPhone: e.target.value })
                      }
                      className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium transition ${isDarkMode
                          ? "bg-slate-800 border-slate-700 text-white"
                          : "bg-white border-slate-200 text-slate-800"
                        }`}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block font-bold mb-1.5 text-slate-600 dark:text-slate-300">
                      Headquarters Address
                    </label>
                    <input
                      type="text"
                      value={generalConfig.companyAddress}
                      onChange={(e) =>
                        setGeneralConfig({ ...generalConfig, companyAddress: e.target.value })
                      }
                      className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium transition ${isDarkMode
                          ? "bg-slate-800 border-slate-700 text-white"
                          : "bg-white border-slate-200 text-slate-800"
                        }`}
                    />
                  </div>
                </div>
              </div>

              {/* Localization & Region Defaults */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Regional & Localization
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
                  <div>
                    <label className="block font-bold mb-1.5 text-slate-600 dark:text-slate-300">
                      Timezone
                    </label>
                    <select
                      value={generalConfig.defaultTimezone}
                      onChange={(e) =>
                        setGeneralConfig({ ...generalConfig, defaultTimezone: e.target.value })
                      }
                      className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium transition ${isDarkMode
                          ? "bg-slate-800 border-slate-700 text-white"
                          : "bg-white border-slate-200 text-slate-800"
                        }`}
                    >
                      <option value="Asia/Kolkata (IST +5:30)">Asia/Kolkata (IST +5:30)</option>
                      <option value="Asia/Dubai (GST +4:00)">Asia/Dubai (GST +4:00)</option>
                      <option value="UTC">UTC Universal (GMT)</option>
                      <option value="America/New_York (EST)">America/New_York (EST)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold mb-1.5 text-slate-600 dark:text-slate-300">
                      Date Format
                    </label>
                    <select
                      value={generalConfig.dateFormat}
                      onChange={(e) =>
                        setGeneralConfig({ ...generalConfig, dateFormat: e.target.value })
                      }
                      className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium transition ${isDarkMode
                          ? "bg-slate-800 border-slate-700 text-white"
                          : "bg-white border-slate-200 text-slate-800"
                        }`}
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY (e.g. 14/11/2026)</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY (e.g. 11/14/2026)</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD (e.g. 2026-11-14)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold mb-1.5 text-slate-600 dark:text-slate-300">
                      Default Currency
                    </label>
                    <select
                      value={generalConfig.currencySymbol}
                      onChange={(e) =>
                        setGeneralConfig({ ...generalConfig, currencySymbol: e.target.value })
                      }
                      className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium transition ${isDarkMode
                          ? "bg-slate-800 border-slate-700 text-white"
                          : "bg-white border-slate-200 text-slate-800"
                        }`}
                    >
                      <option value="₹ (INR)">₹ - Indian Rupee (INR)</option>
                      <option value="$ (USD)">$ - US Dollar (USD)</option>
                      <option value="AED (AED)">AED - UAE Dirham (AED)</option>
                      <option value="€ (EUR)">€ - Euro (EUR)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* System Flags & Features */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Platform Preferences
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <label className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer">
                    <div>
                      <div className="font-bold text-slate-800 dark:text-slate-200">
                        Email Notifications
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Trigger automated customer quotation & invoice emails
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={generalConfig.enableEmailNotifications}
                      onChange={(e) =>
                        setGeneralConfig({
                          ...generalConfig,
                          enableEmailNotifications: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded text-blue-600"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer">
                    <div>
                      <div className="font-bold text-slate-800 dark:text-slate-200">
                        SMS & WhatsApp Dispatch
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Send real-time alerts to customers during workflow stages
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={generalConfig.enableSmsAlerts}
                      onChange={(e) =>
                        setGeneralConfig({
                          ...generalConfig,
                          enableSmsAlerts: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded text-blue-600"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* =====================================================================
              MAIN TAB 1: INTEGRATIONS (Screenshot Match)
             ===================================================================== */}
          {activeMainTab === "Integrations" && (
            <div
              className={`rounded-2xl border p-6 md:p-8 space-y-6 transition-colors shadow-sm ${isDarkMode ? "bg-[#101b33] border-slate-800" : "bg-white border-slate-200/80"
                }`}
            >
              {/* Inner heading */}
              <h2
                className={`text-sm font-bold tracking-wide uppercase ${isDarkMode ? "text-slate-300" : "text-slate-700"
                  }`}
              >
                Integrations
              </h2>

              {/* SECONDARY UNDERLINE TABS */}
              <div className="flex items-center space-x-8 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto text-xs font-semibold">
                {[
                  { id: "Social Media Integration", label: "Social Media Integration" },
                  { id: "WhatsApp Integration", label: "WhatsApp Integration" },
                  { id: "Email SMTP", label: "Email SMTP" },
                  { id: "Google Connection", label: "Google Connection" },
                ].map((subTab) => {
                  const isActive = activeIntegrationTab === subTab.id;
                  return (
                    <button
                      key={subTab.id}
                      onClick={() => setActiveIntegrationTab(subTab.id as any)}
                      className={`relative pb-3 transition whitespace-nowrap ${isActive
                          ? "text-[#142952] dark:text-blue-400 font-bold"
                          : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                        }`}
                    >
                      {subTab.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#142952] dark:bg-blue-400 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* ================= SUB-TAB A: SOCIAL MEDIA INTEGRATION ================= */}
              {activeIntegrationTab === "Social Media Integration" && (
                <div className="space-y-4 pt-2">
                  {/* Enable Switch Row */}
                  <div className="flex items-center justify-between py-2">
                    <span
                      className={`text-sm font-semibold ${isDarkMode ? "text-slate-200" : "text-slate-800"
                        }`}
                    >
                      Integrations
                    </span>
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-slate-500 font-medium">Enable</span>
                      <button
                        onClick={() => setIntegrationsEnabled(!integrationsEnabled)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${integrationsEnabled ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"
                          }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${integrationsEnabled ? "translate-x-5" : "translate-x-0"
                            }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* 1. Facebook Ads Accordion Card */}
                  <div
                    className={`rounded-2xl border transition-all ${isDarkMode
                        ? "border-slate-800 bg-[#0d1527]"
                        : "border-slate-200 bg-[#f8fafc]"
                      }`}
                  >
                    <button
                      onClick={() => toggleAccordion("facebook")}
                      className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none"
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow-sm">
                          <FacebookIcon className="w-5 h-5 fill-white text-white" />
                        </div>
                        <span
                          className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-slate-800"
                            }`}
                        >
                          Facebook Ads
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openAccordions.facebook ? "transform rotate-180" : ""
                          }`}
                      />
                    </button>

                    {openAccordions.facebook && (
                      <div className="px-5 pb-6 pt-2 border-t border-slate-200 dark:border-slate-800 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                              App ID
                            </label>
                            <input
                              type="text"
                              value={fbConfig.appId}
                              onChange={(e) =>
                                setFbConfig({ ...fbConfig, appId: e.target.value })
                              }
                              className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${isDarkMode
                                  ? "bg-slate-800/80 border-slate-700 text-white focus:border-blue-500"
                                  : "bg-white border-slate-300 text-slate-800 focus:border-blue-600"
                                }`}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                              App Secret
                            </label>
                            <input
                              type="password"
                              value={fbConfig.appSecret}
                              onChange={(e) =>
                                setFbConfig({ ...fbConfig, appSecret: e.target.value })
                              }
                              className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${isDarkMode
                                  ? "bg-slate-800/80 border-slate-700 text-white focus:border-blue-500"
                                  : "bg-white border-slate-300 text-slate-800 focus:border-blue-600"
                                }`}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                              Access Token
                            </label>
                            <input
                              type="text"
                              value={fbConfig.accessToken}
                              onChange={(e) =>
                                setFbConfig({ ...fbConfig, accessToken: e.target.value })
                              }
                              className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${isDarkMode
                                  ? "bg-slate-800/80 border-slate-700 text-white focus:border-blue-500"
                                  : "bg-white border-slate-300 text-slate-800 focus:border-blue-600"
                                }`}
                            />
                          </div>
                        </div>

                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => showToast("Facebook Ads Settings saved successfully!")}
                            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition flex items-center space-x-2"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Save Facebook Configuration</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 2. Google Ads Accordion Card */}
                  <div
                    className={`rounded-2xl border transition-all ${isDarkMode
                        ? "border-slate-800 bg-[#0d1527]"
                        : "border-slate-200 bg-[#f8fafc]"
                      }`}
                  >
                    <button
                      onClick={() => toggleAccordion("google")}
                      className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none"
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                          {/* Google Multicolor 'G' */}
                          <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                            />
                          </svg>
                        </div>
                        <span
                          className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-slate-800"
                            }`}
                        >
                          Google Ads
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openAccordions.google ? "transform rotate-180" : ""
                          }`}
                      />
                    </button>

                    {openAccordions.google && (
                      <div className="px-5 pb-6 pt-2 border-t border-slate-200 dark:border-slate-800 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                              Client ID
                            </label>
                            <input
                              type="text"
                              value={googleConfig.clientId}
                              onChange={(e) =>
                                setGoogleConfig({ ...googleConfig, clientId: e.target.value })
                              }
                              className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${isDarkMode
                                  ? "bg-slate-800/80 border-slate-700 text-white focus:border-blue-500"
                                  : "bg-white border-slate-300 text-slate-800 focus:border-blue-600"
                                }`}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                              Developer Token
                            </label>
                            <input
                              type="text"
                              value={googleConfig.developerToken}
                              onChange={(e) =>
                                setGoogleConfig({ ...googleConfig, developerToken: e.target.value })
                              }
                              className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${isDarkMode
                                  ? "bg-slate-800/80 border-slate-700 text-white focus:border-blue-500"
                                  : "bg-white border-slate-300 text-slate-800 focus:border-blue-600"
                                }`}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                              Customer / Account ID
                            </label>
                            <input
                              type="text"
                              value={googleConfig.customerId}
                              onChange={(e) =>
                                setGoogleConfig({ ...googleConfig, customerId: e.target.value })
                              }
                              className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${isDarkMode
                                  ? "bg-slate-800/80 border-slate-700 text-white focus:border-blue-500"
                                  : "bg-white border-slate-300 text-slate-800 focus:border-blue-600"
                                }`}
                            />
                          </div>
                        </div>

                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => showToast("Google Ads Settings saved successfully!")}
                            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition flex items-center space-x-2"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Save Google Configuration</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 3. Instagram Ads Accordion Card */}
                  <div
                    className={`rounded-2xl border transition-all ${isDarkMode
                        ? "border-slate-800 bg-[#0d1527]"
                        : "border-slate-200 bg-[#f8fafc]"
                      }`}
                  >
                    <button
                      onClick={() => toggleAccordion("instagram")}
                      className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none"
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
                          <InstagramIcon className="w-4 h-4" />
                        </div>
                        <span
                          className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-slate-800"
                            }`}
                        >
                          Instagram Ads
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openAccordions.instagram ? "transform rotate-180" : ""
                          }`}
                      />
                    </button>

                    {openAccordions.instagram && (
                      <div className="px-5 pb-6 pt-2 border-t border-slate-200 dark:border-slate-800 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                              Instagram Business Account ID
                            </label>
                            <input
                              type="text"
                              value={instaConfig.businessAccountId}
                              onChange={(e) =>
                                setInstaConfig({ ...instaConfig, businessAccountId: e.target.value })
                              }
                              className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${isDarkMode
                                  ? "bg-slate-800/80 border-slate-700 text-white focus:border-blue-500"
                                  : "bg-white border-slate-300 text-slate-800 focus:border-blue-600"
                                }`}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                              Access Token
                            </label>
                            <input
                              type="text"
                              value={instaConfig.accessToken}
                              onChange={(e) =>
                                setInstaConfig({ ...instaConfig, accessToken: e.target.value })
                              }
                              className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${isDarkMode
                                  ? "bg-slate-800/80 border-slate-700 text-white focus:border-blue-500"
                                  : "bg-white border-slate-300 text-slate-800 focus:border-blue-600"
                                }`}
                            />
                          </div>
                        </div>

                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => showToast("Instagram Ads Settings saved successfully!")}
                            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition flex items-center space-x-2"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Save Instagram Configuration</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ================= SUB-TAB B: WHATSAPP INTEGRATION ================= */}
              {activeIntegrationTab === "WhatsApp Integration" && (
                <div className="space-y-6 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        Business Phone Number
                      </label>
                      <input
                        type="text"
                        value={waConfig.businessNumber}
                        onChange={(e) =>
                          setWaConfig({ ...waConfig, businessNumber: e.target.value })
                        }
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${isDarkMode
                            ? "bg-slate-800/80 border-slate-700 text-white focus:border-blue-500"
                            : "bg-white border-slate-300 text-slate-800 focus:border-blue-600"
                          }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        WhatsApp Business Cloud API Key
                      </label>
                      <input
                        type="password"
                        value={waConfig.apiKey}
                        onChange={(e) =>
                          setWaConfig({ ...waConfig, apiKey: e.target.value })
                        }
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${isDarkMode
                            ? "bg-slate-800/80 border-slate-700 text-white focus:border-blue-500"
                            : "bg-white border-slate-300 text-slate-800 focus:border-blue-600"
                          }`}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        Inbound Webhook URL
                      </label>
                      <input
                        type="text"
                        value={waConfig.webhookUrl}
                        readOnly
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none bg-slate-100 dark:bg-slate-800/50 text-slate-500 border-slate-300 dark:border-slate-700 font-mono`}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => showToast("Test WhatsApp ping sent!")}
                      className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition flex items-center space-x-2"
                    >
                      <Send className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Send Test Message</span>
                    </button>
                    <button
                      onClick={() => showToast("WhatsApp integration updated successfully!")}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md transition flex items-center space-x-2"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save WhatsApp Settings</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ================= SUB-TAB C: EMAIL SMTP ================= */}
              {activeIntegrationTab === "Email SMTP" && (
                <div className="space-y-6 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        SMTP Host
                      </label>
                      <input
                        type="text"
                        value={smtpConfig.host}
                        onChange={(e) =>
                          setSmtpConfig({ ...smtpConfig, host: e.target.value })
                        }
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${isDarkMode
                            ? "bg-slate-800/80 border-slate-700 text-white focus:border-blue-500"
                            : "bg-white border-slate-300 text-slate-800 focus:border-blue-600"
                          }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        Port
                      </label>
                      <input
                        type="text"
                        value={smtpConfig.port}
                        onChange={(e) =>
                          setSmtpConfig({ ...smtpConfig, port: e.target.value })
                        }
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${isDarkMode
                            ? "bg-slate-800/80 border-slate-700 text-white focus:border-blue-500"
                            : "bg-white border-slate-300 text-slate-800 focus:border-blue-600"
                          }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        Username / Email
                      </label>
                      <input
                        type="text"
                        value={smtpConfig.username}
                        onChange={(e) =>
                          setSmtpConfig({ ...smtpConfig, username: e.target.value })
                        }
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${isDarkMode
                            ? "bg-slate-800/80 border-slate-700 text-white focus:border-blue-500"
                            : "bg-white border-slate-300 text-slate-800 focus:border-blue-600"
                          }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        value={smtpConfig.password}
                        onChange={(e) =>
                          setSmtpConfig({ ...smtpConfig, password: e.target.value })
                        }
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${isDarkMode
                            ? "bg-slate-800/80 border-slate-700 text-white focus:border-blue-500"
                            : "bg-white border-slate-300 text-slate-800 focus:border-blue-600"
                          }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        Encryption
                      </label>
                      <select
                        value={smtpConfig.encryption}
                        onChange={(e) =>
                          setSmtpConfig({ ...smtpConfig, encryption: e.target.value })
                        }
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${isDarkMode
                            ? "bg-slate-800 border-slate-700 text-white"
                            : "bg-white border-slate-300 text-slate-800"
                          }`}
                      >
                        <option value="TLS">TLS</option>
                        <option value="SSL">SSL</option>
                        <option value="NONE">None</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        From Name
                      </label>
                      <input
                        type="text"
                        value={smtpConfig.fromName}
                        onChange={(e) =>
                          setSmtpConfig({ ...smtpConfig, fromName: e.target.value })
                        }
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${isDarkMode
                            ? "bg-slate-800/80 border-slate-700 text-white"
                            : "bg-white border-slate-300 text-slate-800"
                          }`}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        From Email
                      </label>
                      <input
                        type="email"
                        value={smtpConfig.fromEmail}
                        onChange={(e) =>
                          setSmtpConfig({ ...smtpConfig, fromEmail: e.target.value })
                        }
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${isDarkMode
                            ? "bg-slate-800/80 border-slate-700 text-white"
                            : "bg-white border-slate-300 text-slate-800"
                          }`}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => showToast("Test email sent to administrator!")}
                      className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition flex items-center space-x-2"
                    >
                      <Mail className="w-3.5 h-3.5 text-blue-500" />
                      <span>Send Test Email</span>
                    </button>
                    <button
                      onClick={() => showToast("SMTP configurations saved successfully!")}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition flex items-center space-x-2"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save SMTP Settings</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ================= SUB-TAB D: GOOGLE CONNECTION ================= */}
              {activeIntegrationTab === "Google Connection" && (
                <div className="space-y-6 pt-2">
                  <div className="flex items-center justify-between p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                        <Globe className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                          Google Calendar & Contacts Sync
                        </h3>
                        <p className="text-xs text-slate-500">
                          Synchronize client appointments, site surveys, and CRM tasks.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => showToast("Google account connected successfully!")}
                      className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 shadow-sm transition flex items-center space-x-2"
                    >
                      <span>Connect Account</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =====================================================================
              MAIN TAB 2: FINANCIAL INFORMATION
             ===================================================================== */}
          {activeMainTab === "Financial Information" && (
            <div
              className={`rounded-2xl border p-6 md:p-8 space-y-6 transition-colors shadow-sm ${isDarkMode ? "bg-[#101b33] border-slate-800" : "bg-white border-slate-200/80"
                }`}
            >
              <h2
                className={`text-sm font-bold tracking-wide uppercase ${isDarkMode ? "text-slate-300" : "text-slate-700"
                  }`}
              >
                Financial & Invoicing Credentials
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    Default Currency
                  </label>
                  <input
                    type="text"
                    value={financialConfig.currency}
                    onChange={(e) =>
                      setFinancialConfig({ ...financialConfig, currency: e.target.value })
                    }
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${isDarkMode
                        ? "bg-slate-800 border-slate-700 text-white"
                        : "bg-white border-slate-300 text-slate-800"
                      }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    Tax Name & Standard Rate
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={financialConfig.taxName}
                      onChange={(e) =>
                        setFinancialConfig({ ...financialConfig, taxName: e.target.value })
                      }
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${isDarkMode
                          ? "bg-slate-800 border-slate-700 text-white"
                          : "bg-white border-slate-300 text-slate-800"
                        }`}
                    />
                    <input
                      type="text"
                      value={financialConfig.taxRate}
                      onChange={(e) =>
                        setFinancialConfig({ ...financialConfig, taxRate: e.target.value })
                      }
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${isDarkMode
                          ? "bg-slate-800 border-slate-700 text-white"
                          : "bg-white border-slate-300 text-slate-800"
                        }`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    PAN Card Number
                  </label>
                  <input
                    type="text"
                    value={financialConfig.panNo}
                    onChange={(e) =>
                      setFinancialConfig({ ...financialConfig, panNo: e.target.value })
                    }
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${isDarkMode
                        ? "bg-slate-800 border-slate-700 text-white"
                        : "bg-white border-slate-300 text-slate-800"
                      }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    GST Number
                  </label>
                  <input
                    type="text"
                    value={financialConfig.gstNo}
                    onChange={(e) =>
                      setFinancialConfig({ ...financialConfig, gstNo: e.target.value })
                    }
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${isDarkMode
                        ? "bg-slate-800 border-slate-700 text-white"
                        : "bg-white border-slate-300 text-slate-800"
                      }`}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => showToast("Financial credentials saved successfully!")}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition flex items-center space-x-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Financial Details</span>
                </button>
              </div>
            </div>
          )}

          {/* =====================================================================
              MAIN TAB 3: TABLE CLEAR
             ===================================================================== */}
          {activeMainTab === "Table Clear" && (
            <div
              className={`rounded-2xl border p-6 md:p-8 space-y-6 transition-colors shadow-sm ${isDarkMode ? "bg-[#101b33] border-slate-800" : "bg-white border-slate-200/80"
                }`}
            >
              <h2
                className={`text-sm font-bold tracking-wide uppercase ${isDarkMode ? "text-slate-300" : "text-slate-700"
                  }`}
              >
                Database Table Maintenance & Purge
              </h2>
              <p className="text-xs text-slate-500">
                Clear test data before going live. This permanently removes sample records from selected tables.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "Sample Leads & Inquiries", count: "14 records" },
                  { name: "Draft Estimates & Proposals", count: "3 records" },
                  { name: "System Activity Logs", count: "128 records" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-slate-500">{item.count}</div>
                    </div>
                    <button
                      onClick={() => showToast(`Purged: ${item.name}`)}
                      className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                      title="Clear Table"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =====================================================================
              MAIN TAB 4: ESTIMATE / INVOICE SETTING
             ===================================================================== */}
          {activeMainTab === "Estimate/Invoice setting" && (
            <div
              className={`rounded-2xl border p-6 md:p-8 space-y-6 transition-colors shadow-sm ${isDarkMode ? "bg-[#101b33] border-slate-800" : "bg-white border-slate-200/80"
                }`}
            >
              <h2
                className={`text-sm font-bold tracking-wide uppercase ${isDarkMode ? "text-slate-300" : "text-slate-700"
                  }`}
              >
                Estimate & Invoice Templates
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    Invoice Prefix
                  </label>
                  <input
                    type="text"
                    defaultValue="INV-2026-"
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${isDarkMode
                        ? "bg-slate-800 border-slate-700 text-white"
                        : "bg-white border-slate-300 text-slate-800"
                      }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    Estimate Prefix
                  </label>
                  <input
                    type="text"
                    defaultValue="EST-SOLAR-"
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition ${isDarkMode
                        ? "bg-slate-800 border-slate-700 text-white"
                        : "bg-white border-slate-300 text-slate-800"
                      }`}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => showToast("Invoice preferences saved!")}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition flex items-center space-x-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Invoice Settings</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  ChevronDown,
  ChevronRight,
  Menu,
  Megaphone,
  UserCheck2,
  HandshakeIcon,
  FileText,
  Building2,
  IndianRupee,
  CheckCircle2,
  Clock,
  Truck,
  Wrench,
  Bell,
  Zap,
  Gift,
  BoxesIcon,
  Tags,
  Globe2,
  ListOrdered,
  Layers,
} from "lucide-react";

export interface NavItem {
  name: string;
  icon: any;
  href?: string;
  permissionKey?: string;
  hasSub?: boolean;
  subItems?: {
    name: string;
    icon: any;
    href: string;
    permissionKey?: string;
  }[];
}

export const adminNavModules: NavItem[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
    permissionKey: "Dashboard",
    hasSub: false,
  },
  {
    name: "Manage Customers",
    icon: Users,
    href: "/admin/customers",
    permissionKey: "Customers",
    hasSub: false,
  },
  {
    name: "Sales CRM",
    icon: Briefcase,
    hasSub: true,
    subItems: [
      { name: "Manage Leads", icon: Megaphone, href: "/admin/leads", permissionKey: "Leads" },
      { name: "Manage Follow up", icon: UserCheck2, href: "/admin/follow-ups", permissionKey: "Followup" },
      { name: "Manage Meetings", icon: HandshakeIcon, href: "/admin/meetings", permissionKey: "Meetings" },
    ],
  },
  {
    name: "Manage BOM",
    icon: Boxes,
    hasSub: true,
    subItems: [
      { name: "All BOM", icon: FileText, href: "/admin/bom", permissionKey: "BOM" },
      { name: "All Make", icon: FileText, href: "/admin/bom/make", permissionKey: "Make" },
      { name: "All Warranty", icon: FileText, href: "/admin/bom/warranty", permissionKey: "Warranty" },
      { name: "All Technology", icon: FileText, href: "/admin/bom/technology", permissionKey: "Technology" },
    ],
  },
  {
    name: "Manage Estimates",
    icon: FileSpreadsheet,
    hasSub: true,
    subItems: [
      { name: "All Estimates", icon: FileText, href: "/admin/estimates", permissionKey: "Estimates" },
      { name: "All Invoices", icon: FileText, href: "/admin/invoices", permissionKey: "Invoices" },
      { name: "Bank & Customer Receivables", icon: Building2, href: "/admin/estimates/receivables", permissionKey: "Estimates" },
      { name: "Templates", icon: FileText, href: "/admin/estimates/templates", permissionKey: "Templates" },
    ],
  },
  {
    name: "Workflow",
    icon: GitBranch,
    hasSub: true,
    subItems: [
      { name: "Document Verification", icon: FileText, href: "/admin/workflow/document-verification", permissionKey: "Workflow" },
      { name: "Registration", icon: FileText, href: "/admin/workflow/registration", permissionKey: "Workflow" },
      { name: "Meter Charge", icon: CheckCircle2, href: "/admin/workflow/meter-charge", permissionKey: "Workflow" },
      { name: "Finance", icon: IndianRupee, href: "/admin/workflow/finance", permissionKey: "Workflow" },
      { name: "Waiting Floor", icon: Clock, href: "/admin/workflow/waiting-floor", permissionKey: "Workflow" },
      { name: "Dispatch", icon: Truck, href: "/admin/workflow/dispatch", permissionKey: "Workflow" },
      { name: "Installations", icon: Wrench, href: "/admin/workflow/installations", permissionKey: "Workflow" },
      { name: "Intimation", icon: Bell, href: "/admin/workflow/intimation", permissionKey: "Workflow" },
      { name: "Net Metering", icon: Zap, href: "/admin/workflow/net-metering", permissionKey: "Workflow" },
      { name: "Subsidy", icon: Gift, href: "/admin/workflow/subsidy", permissionKey: "Workflow" },
    ],
  },
  {
    name: "Manage Inventory",
    icon: Package,
    hasSub: true,
    subItems: [
      { name: "All Material OUT", icon: FileText, href: "/admin/inventory/material-out", permissionKey: "Material OUT" },
      { name: "All Material IN", icon: FileText, href: "/admin/inventory/material-in", permissionKey: "Material IN" },
      { name: "Inventory", icon: FileText, href: "/admin/inventory", permissionKey: "Inventory" },
      { name: "All Products", icon: FileText, href: "/admin/inventory/products", permissionKey: "Products" },
      { name: "All Categories", icon: FileText, href: "/admin/inventory/categories", permissionKey: "Categories" },
      { name: "Vendors", icon: FileText, href: "/admin/inventory/vendors", permissionKey: "Vendors" },
      { name: "Handover Person", icon: FileText, href: "/admin/inventory/handover-person", permissionKey: "Handover Person" },
    ],
  },
  {
    name: "Manage Deals",
    icon: Award,
    href: "/admin/deals",
    permissionKey: "Deals",
    hasSub: false,
  },
  {
    name: "Manage Tasks",
    icon: ListTodo,
    href: "/admin/tasks",
    permissionKey: "Tasks",
    hasSub: false,
  },
  {
    name: "Manage Masters",
    icon: Database,
    hasSub: true,
    subItems: [
      { name: "Countries", icon: Globe2, href: "/admin/masters/countries", permissionKey: "Masters" },
      { name: "Cities", icon: Building2, href: "/admin/masters/cities", permissionKey: "Masters" },
      { name: "Lead Sources", icon: Layers, href: "/admin/masters/lead-sources", permissionKey: "Masters" },
      { name: "Finance Master", icon: IndianRupee, href: "/admin/masters/finance-master", permissionKey: "Masters" },
      { name: "Installation Types", icon: Zap, href: "/admin/masters/installation-types", permissionKey: "Masters" },
      { name: "Stages", icon: ListOrdered, href: "/admin/masters/stages", permissionKey: "Masters" },
    ],
  },
  {
    name: "Manage Partners",
    icon: Handshake,
    href: "/admin/partners",
    permissionKey: "Partners",
    hasSub: false,
  },
  {
    name: "Manage Staff",
    icon: UserCheck,
    href: "/admin/staff",
    permissionKey: "Staff",
    hasSub: false,
  },
  {
    name: "Manage Tickets",
    icon: Ticket,
    href: "/admin/tickets",
    permissionKey: "Tickets",
    hasSub: false,
  },
  {
    name: "Manage Reports",
    icon: BarChart3,
    hasSub: true,
    subItems: [
      { name: "Customer Reports", icon: FileText, href: "/admin/reports/customers", permissionKey: "Reports" },
      { name: "Lead Reports", icon: FileText, href: "/admin/reports/leads", permissionKey: "Reports" },
      { name: "Deal Reports", icon: FileText, href: "/admin/reports/deals", permissionKey: "Reports" },
      { name: "Task Reports", icon: FileText, href: "/admin/reports/tasks", permissionKey: "Reports" },
      { name: "Followup Reports", icon: FileText, href: "/admin/reports/followups", permissionKey: "Reports" },
    ],
  },
];

interface AdminSidebarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  activeItem?: string;
  activeSubItem?: string;
  onSelectSubItem?: (parent: string, sub: string) => void;
}

export default function AdminSidebar({
  sidebarCollapsed,
  setSidebarCollapsed,
  activeItem,
  activeSubItem,
  onSelectSubItem,
}: AdminSidebarProps) {
  const pathname = usePathname();

  // User auth and permissions state
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const loadAuth = () => {
      try {
        const stored = localStorage.getItem("solar_crm_auth");
        if (stored) {
          setCurrentUser(JSON.parse(stored));
        }
      } catch (e) {}
    };

    loadAuth();
    window.addEventListener("storage", loadAuth);
    return () => window.removeEventListener("storage", loadAuth);
  }, []);

  // Permission check helper
  const hasPermission = (permissionKey?: string) => {
    if (!currentUser) return true; // Default view before hydrate
    if (currentUser.role === "admin") return true; // Admin has full access to all modules

    // Always allow dashboard for all authenticated users
    if (!permissionKey || permissionKey === "Dashboard") return true;

    const perms = currentUser.permissions;
    if (!perms) return false;

    // Wildcard permissions
    if (Array.isArray(perms) && (perms.includes("*") || perms.includes(permissionKey))) {
      return true;
    }

    // Role Matrix permission object check (as configured in Add Staff modal)
    if (typeof perms === "object" && perms[permissionKey]) {
      const p = perms[permissionKey];
      return Boolean(p.view || p.all || p.insert || p.edit || p.delete);
    }

    return false;
  };

  // Filter modules based on user permissions
  const filteredNavModules = adminNavModules
    .map((item) => {
      // If it has sub-items, filter sub-items by permission
      if (item.hasSub && item.subItems) {
        const allowedSubs = item.subItems.filter((sub) =>
          hasPermission(sub.permissionKey)
        );

        // If user has access to any subItem, keep parent with allowed subs
        if (allowedSubs.length > 0) {
          return {
            ...item,
            subItems: allowedSubs,
          };
        }
        return null;
      }

      // Direct item check
      return hasPermission(item.permissionKey) ? item : null;
    })
    .filter(Boolean) as NavItem[];

  // Accordion open/close state for parent menus
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    "Sales CRM": activeItem === "Sales CRM" || pathname?.includes("/leads"),
    "Manage BOM": activeItem === "Manage BOM",
    "Manage Estimates": activeItem === "Manage Estimates",
    "Workflow": activeItem === "Workflow",
    "Manage Inventory": activeItem === "Manage Inventory",
    "Manage Masters": activeItem === "Manage Masters",
    "Manage Reports": activeItem === "Manage Reports",
  });

  const toggleMenu = (name: string) => {
    if (sidebarCollapsed) {
      setSidebarCollapsed(false);
    }
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <aside
      className={`bg-[#0f172a] text-slate-300 flex flex-col justify-between transition-all duration-300 fixed inset-y-0 left-0 z-40 border-r border-slate-800 ${
        sidebarCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full overflow-hidden">
        {/* Top Logo Container */}
        <div className="p-3 border-b border-slate-800 flex items-center justify-between">
          {!sidebarCollapsed ? (
            <div className="w-full bg-white rounded-xl p-2 shadow-sm flex items-center justify-center overflow-hidden">
              <Image
                src="/images/Fablead_CRM.jpg"
                alt="Fablead CRM"
                width={717}
                height={208}
                className="w-full h-10 object-contain"
                priority
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md p-1 mx-auto overflow-hidden">
              <Image
                src="/images/Fablead_CRM.jpg"
                alt="Fablead CRM"
                width={717}
                height={208}
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hidden lg:block ml-2 flex-shrink-0 cursor-pointer"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Org Switcher Pill */}
        {!sidebarCollapsed && (
          <div className="p-3 mx-3 my-3 bg-[#1e293b]/70 rounded-xl border border-slate-700/60 flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-orange-600 flex items-center justify-center text-white text-[10px] font-bold">
              {currentUser?.role === "staff" ? "ST" : "FL"}
            </div>
            <div className="truncate flex-1">
              <div className="text-xs font-bold text-white uppercase tracking-wider truncate">
                {currentUser?.role === "staff"
                  ? `${currentUser.name || "STAFF"} (STAFF)`
                  : "FABLEAD DEVELOP..."}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          </div>
        )}

        {/* Navigation Items (Scrollable and filtered by permissions) */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 scrollbar-thin scrollbar-thumb-slate-700">
          {filteredNavModules.map((item) => {
            const Icon = item.icon;
            const isOpen = !!openMenus[item.name];
            
            // Only highlight if this item specifically matches activeItem
            const isDirectActive = activeItem === item.name;

            // Direct link item
            if (!item.hasSub && item.href) {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                    isDirectActive
                      ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <span className="truncate">{item.name}</span>
                    )}
                  </div>
                </Link>
              );
            }

            // Expandable menu item
            return (
              <div key={item.name} className="space-y-0.5">
                <button
                  type="button"
                  onClick={() => toggleMenu(item.name)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    isOpen || isDirectActive
                      ? "text-white bg-slate-800/80 font-semibold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <span className="truncate">{item.name}</span>
                    )}
                  </div>
                  {!sidebarCollapsed && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 opacity-70 ${
                        isOpen ? "rotate-180 text-white" : ""
                      }`}
                    />
                  )}
                </button>

                {/* Submenu Dropdown List */}
                {!sidebarCollapsed && isOpen && item.subItems && (
                  <div className="pl-6 pr-1 py-1 space-y-0.5 border-l border-slate-700/50 ml-5 my-1">
                    {item.subItems.map((sub) => {
                      const SubIcon = sub.icon;
                      const isSubActive = activeSubItem === sub.name;
                      return (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => {
                            if (onSelectSubItem) {
                              onSelectSubItem(item.name, sub.name);
                            }
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-colors text-left cursor-pointer ${
                            isSubActive
                              ? "bg-blue-600 text-white font-semibold shadow-sm"
                              : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                          }`}
                        >
                          <SubIcon className="w-3.5 h-3.5 flex-shrink-0 opacity-80" />
                          <span className="truncate">{sub.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer of Sidebar */}
        <div className="p-3 border-t border-slate-800 bg-[#0c1222]">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
              N
            </div>
            {!sidebarCollapsed && <span>Return to Website</span>}
          </Link>
        </div>
      </div>
    </aside>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { Search, Plus, Pencil, Trash2, X, Image as ImageIcon } from "lucide-react";

interface CategoryRecord {
  id: number;
  srNo: number;
  name: string;
  image: string;
  createdAt: string;
}

const initialCategories: CategoryRecord[] = [
  { id: 1, srNo: 1, name: "D", image: "", createdAt: "06 Nov 2026, 15:39" },
];

export default function ManageCategoriesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [categories, setCategories] = useState<CategoryRecord[]>(initialCategories);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State (Screenshot 5)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formName, setFormName] = useState("");
  const [formImage, setFormImage] = useState("");

  const handleStartAdd = () => {
    setEditingId(null);
    setFormName("");
    setFormImage("");
    setIsModalOpen(true);
  };

  const handleStartEdit = (cat: CategoryRecord) => {
    setEditingId(cat.id);
    setFormName(cat.name);
    setFormImage(cat.image);
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingId === null) {
      const newCat: CategoryRecord = {
        id: Date.now(),
        srNo: categories.length + 1,
        name: formName.trim(),
        image: formImage || "",
        createdAt: "13 Nov 2026, 12:00",
      };
      setCategories([...categories, newCat]);
    } else {
      setCategories(
        categories.map((c) =>
          c.id === editingId ? { ...c, name: formName.trim(), image: formImage } : c
        )
      );
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      const updated = categories.filter((c) => c.id !== id);
      setCategories(updated.map((c, i) => ({ ...c, srNo: i + 1 })));
    }
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f4f7fe] dark:bg-[#0b1437] flex text-slate-800 dark:text-slate-100">
      <AdminSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeItem="Manage Inventory"
        activeSubItem="All Categories"
      />

      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-64"
          }`}
      >
        <AdminHeader
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          onSearch={(q) => setSearchQuery(q)}
        />

        <main className="p-6 md:p-8 space-y-6">
          {/* Header Title & Add Button (Screenshot 4) */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#1b2559] dark:text-white">
                Manage Categories
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Manage categories in Solar CRM.
              </p>
            </div>
            <button
              onClick={handleStartAdd}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white font-medium text-sm transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </button>
          </div>

          {/* Table Card */}
          <div className="bg-white dark:bg-[#111c44] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800/80">
              <h2 className="text-base font-semibold text-[#1b2559] dark:text-white">
                All Categories
              </h2>
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
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
                    <th className="py-3 px-6">IMAGE</th>
                    <th className="py-3 px-6">CATEGORY NAME</th>
                    <th className="py-3 px-6">CREATED AT</th>
                    <th className="py-3 px-6 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {filteredCategories.map((cat) => (
                    <tr
                      key={cat.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-4 px-6 text-slate-600 dark:text-slate-300 font-medium">
                        {cat.srNo}
                      </td>
                      <td className="py-4 px-6">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                      </td>
                      <td className="py-4 px-6 font-semibold text-[#1b2559] dark:text-white">
                        {cat.name}
                      </td>
                      <td className="py-4 px-6 text-slate-500 dark:text-slate-400">
                        {cat.createdAt}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => handleStartEdit(cat)}
                            className="p-1.5 text-slate-400 hover:text-[#001738] dark:hover:text-white rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(cat.id)}
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
              <span>Showing 1 to {filteredCategories.length} of {filteredCategories.length} results</span>
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
        </main>
      </div>

      {/* Add / Edit Category Modal (Screenshot 5) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111c44] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-[#1b2559] dark:text-white">
                {editingId === null ? "Add Category" : "Edit Category"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1b2559] dark:text-white">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Category Name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1437] text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
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

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#001738] hover:bg-[#00224f] text-white text-sm font-medium transition-colors shadow-sm"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


"use client";

import React, { useState } from "react";
import {
  FolderOpen,
  X,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  FileText,
  Sun,
  Eye,
} from "lucide-react";

interface SavedDocumentItem {
  id: string;
  fileName: string;
  customer: string;
  phone: string;
  documentType: "Subsidy Bond" | "Solar Documents";
  updated: string;
}

interface SavedDocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDocument?: (doc: SavedDocumentItem) => void;
}

export default function SavedDocumentsModal({
  isOpen,
  onClose,
  onOpenDocument,
}: SavedDocumentsModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Documents");

  const [documents, setDocuments] = useState<SavedDocumentItem[]>([
    {
      id: "1",
      fileName: "test customer - Subsidy Bond_13-11-2026",
      customer: "test customer",
      phone: "9870543210",
      documentType: "Subsidy Bond",
      updated: "13/11/2026",
    },
    {
      id: "2",
      fileName: "test customer - Solar Documents_13-11-2026",
      customer: "test customer",
      phone: "9870543210",
      documentType: "Solar Documents",
      updated: "13/11/2026",
    },
  ]);

  if (!isOpen) return null;

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.phone.includes(searchTerm);

    const matchesType =
      typeFilter === "All Documents" || doc.documentType === typeFilter;

    return matchesSearch && matchesType;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-white dark:bg-[#0f172a] rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-200 dark:border-slate-800">
        {/* =========================================================================
            HEADER (Matches Screenshot 3: Navy header with Saved Documents & subtitle)
           ========================================================================= */}
        <div className="bg-[#0b192e] text-white px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">
              Saved Documents
            </h2>
            <p className="text-xs text-slate-300">
              Solar documents and subsidy bonds saved by you.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-[#0f172a] flex-shrink-0">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search by file name, customer or phone"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl text-xs bg-slate-50 dark:bg-[#0b1437] border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="w-full sm:w-56">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border rounded-xl text-xs bg-slate-50 dark:bg-[#0b1437] border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option>All Documents</option>
              <option>Subsidy Bond</option>
              <option>Solar Documents</option>
            </select>
          </div>
        </div>

        {/* Table Content (Matches Screenshot 3) */}
        <div className="flex-1 overflow-x-auto p-4 sm:p-6">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 dark:bg-[#0b1437]/60 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">FILE NAME</th>
                  <th className="py-3 px-4">CUSTOMER</th>
                  <th className="py-3 px-4">PHONE</th>
                  <th className="py-3 px-4">DOCUMENT TYPE</th>
                  <th className="py-3 px-4">UPDATED</th>
                  <th className="py-3 px-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredDocuments.map((doc) => (
                  <tr
                    key={doc.id}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition"
                  >
                    <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-100">
                      {doc.fileName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-200">
                      {doc.customer}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-mono">
                      {doc.phone}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-slate-800 dark:text-slate-200 font-medium">
                        {doc.documentType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                      {doc.updated}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onOpenDocument?.(doc)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 text-slate-700 dark:text-slate-200 text-xs font-bold transition shadow-xs"
                      >
                        Open / Edit
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredDocuments.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-8 text-center text-xs text-slate-400"
                    >
                      No saved documents found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer / Pagination */}
        <div className="px-6 py-4 bg-slate-50/80 dark:bg-[#0b1437]/80 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="text-xs text-slate-400">
            {filteredDocuments.length} document(s) | Page 1 of 1
          </div>
          <div className="flex items-center space-x-2">
            <button
              disabled
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 text-xs font-semibold opacity-50 cursor-not-allowed"
            >
              Previous
            </button>
            <button
              disabled
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 text-xs font-semibold opacity-50 cursor-not-allowed"
            >
              Next
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-4 px-4 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


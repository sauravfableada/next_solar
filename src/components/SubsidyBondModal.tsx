"use client";

import React, { useState } from "react";
import {
  FileText,
  X,
  Plus,
  ArrowRight,
  ArrowLeft,
  RotateCw,
  FileCheck,
  Share2,
  Download,
  Edit2,
  CheckCircle2,
} from "lucide-react";

interface SubsidyBondModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubsidyBondModal({
  isOpen,
  onClose,
}: SubsidyBondModalProps) {
  const [step, setStep] = useState<1 | 2>(1);

  const [formData, setFormData] = useState({
    agreementDate: "2026-11-13",
    consumerName: "test customer (9870543210)",
    consumerNumber: "979797979797",
    address: "fsdfdsf",
  });

  const [fileName, setFileName] = useState(
    "test customer - Subsidy Bond_13-11-2026"
  );
  const [isEditingFileName, setIsEditingFileName] = useState(false);

  if (!isOpen) return null;

  const calculateFilledCount = () => {
    let count = 0;
    if (formData.agreementDate.trim()) count++;
    if (formData.consumerName.trim()) count++;
    if (formData.consumerNumber.trim()) count++;
    if (formData.address.trim()) count++;
    return count;
  };

  const filledCount = calculateFilledCount();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFormData({
      agreementDate: "",
      consumerName: "",
      consumerNumber: "",
      address: "",
    });
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-white dark:bg-[#0f172a] rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-200 dark:border-slate-800">
        {/* =========================================================================
            HEADER (Matches Screenshot 1 & 2: Navy header with Subsidy Bond doc icon)
           ========================================================================= */}
        <div className="bg-[#0b192e] text-white px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">
                Subsidy Bond
              </h2>
              <p className="text-xs text-slate-300">
                Agreement and consumer details
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="px-6 py-3 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0f172a] flex items-center justify-between text-xs font-semibold flex-shrink-0">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center space-x-2 cursor-pointer ${
                step === 1
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-400"
              }`}
              onClick={() => setStep(1)}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  step === 1
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900/60 dark:text-blue-300"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                }`}
              >
                1
              </span>
              <span>Document details</span>
            </div>

            <ArrowRight className="w-3.5 h-3.5 text-slate-300" />

            <div
              className={`flex items-center space-x-2 cursor-pointer ${
                step === 2
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-400"
              }`}
              onClick={() => setStep(2)}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  step === 2
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900/60 dark:text-blue-300"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                }`}
              >
                2
              </span>
              <span>Save &amp; export</span>
            </div>
          </div>

          <div className="text-slate-400 text-[11px] font-medium">
            {filledCount} / 4 fields filled
          </div>
        </div>

        {/* =========================================================================
            BODY CONTENT
           ========================================================================= */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {step === 1 ? (
            <>
              {/* SECTION 1: Agreement Details */}
              <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#111c44]/40 shadow-xs relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-5 h-5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center">
                      1
                    </span>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      Agreement Details
                    </h3>
                  </div>
                  {formData.agreementDate && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  )}
                </div>

                <div className="text-xs">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Agreement Date
                  </label>
                  <input
                    type="date"
                    value={formData.agreementDate}
                    onChange={(e) =>
                      handleInputChange("agreementDate", e.target.value)
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* SECTION 2: Consumer Details */}
              <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#111c44]/40 shadow-xs relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-5 h-5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center">
                      2
                    </span>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      Consumer Details
                    </h3>
                  </div>
                  {formData.consumerName && formData.consumerNumber && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Consumer Name
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={formData.consumerName}
                          onChange={(e) =>
                            handleInputChange("consumerName", e.target.value)
                          }
                          className="w-full px-3.5 py-2.5 pr-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        {formData.consumerName && (
                          <button
                            type="button"
                            onClick={() => handleInputChange("consumerName", "")}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <button
                        type="button"
                        className="px-3.5 py-2.5 rounded-xl bg-[#0b192e] hover:bg-[#16386b] text-white flex items-center justify-center transition"
                        title="Add Customer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Consumer Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter consumer number"
                      value={formData.consumerNumber}
                      onChange={(e) =>
                        handleInputChange("consumerNumber", e.target.value)
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Address
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Enter address"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* STEP 2: Save & Export (Matches Screenshot 2) */
            <div className="space-y-6">
              {/* Success Alert Banner */}
              <div className="p-5 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/20 flex items-start space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400 block mb-0.5">
                    SAVED SUCCESSFULLY
                  </span>
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                    Your document is ready
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {formData.consumerName || "test customer"} | Subsidy Bond
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400">
                Choose how you want to export your customized document.
              </div>

              {/* File Name Row with edit icon */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  File Name
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    disabled={!isEditingFileName}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs text-slate-800 dark:text-slate-100 pr-10 ${
                      isEditingFileName
                        ? "border-blue-500 bg-white dark:bg-[#0b1437] ring-1 ring-blue-500"
                        : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0b1437]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setIsEditingFileName(!isEditingFileName)}
                    className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    title={isEditingFileName ? "Save name" : "Edit name"}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 3 Download / Share Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. Download Word Card */}
                <div className="p-5 rounded-2xl border border-blue-100 dark:border-blue-900/40 bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/20 dark:to-[#0f172a] shadow-xs flex flex-col justify-between hover:border-blue-300 transition group cursor-pointer">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 shadow-xs border border-slate-100 dark:border-slate-700 flex items-center justify-center text-blue-600">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 text-[10px] font-bold">
                        DOCX
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      Download Word
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Editable document · .docx
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline">
                    <span>Download file</span>
                    <Download className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 2. Download PDF Card */}
                <div className="p-5 rounded-2xl border border-amber-100 dark:border-amber-900/40 bg-gradient-to-b from-amber-50/40 to-white dark:from-amber-950/20 dark:to-[#0f172a] shadow-xs flex flex-col justify-between hover:border-amber-300 transition group cursor-pointer">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 shadow-xs border border-slate-100 dark:border-slate-700 flex items-center justify-center text-amber-600">
                        <FileCheck className="w-5 h-5" />
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 text-[10px] font-bold">
                        PDF
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      Download PDF
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Ready to print · .pdf
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:underline">
                    <span>Download file</span>
                    <Download className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 3. Share PDF Card */}
                <div className="p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-gradient-to-b from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-[#0f172a] shadow-xs flex flex-col justify-between hover:border-emerald-400 transition group cursor-pointer">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 shadow-xs border border-slate-100 dark:border-slate-700 flex items-center justify-center text-emerald-600">
                        <Share2 className="w-5 h-5" />
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 text-[10px] font-bold">
                        SHARE
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      Share PDF
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Send using your device
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:underline">
                    <span>Share document</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400">
                Download your document as Word or PDF, or share the PDF using your device.
              </p>
            </div>
          )}
        </div>

        {/* =========================================================================
            FOOTER ACTIONS
           ========================================================================= */}
        <div className="px-6 py-4 bg-slate-50/80 dark:bg-[#0b1437]/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end space-x-3 flex-shrink-0">
          {step === 1 ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl bg-[#0b192e] hover:bg-[#16386b] text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm transition"
              >
                <span>Continue to Save</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center space-x-1.5 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                <span>Back to Edit</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-[#0b192e] hover:bg-[#16386b] text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm transition"
              >
                <RotateCw className="w-3.5 h-3.5 mr-1" />
                <span>Start Over</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


"use client";

import React, { useState } from "react";
import {
  Sun,
  X,
  Plus,
  ArrowRight,
  ArrowLeft,
  RotateCw,
  FileText,
  FileCheck,
  Share2,
  Download,
  Edit2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Building,
  Upload,
} from "lucide-react";

interface SolarDocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SolarDocumentsModal({
  isOpen,
  onClose,
}: SolarDocumentsModalProps) {
  // Step navigation
  const [step, setStep] = useState<1 | 2>(1);

  // Form fields
  const [formData, setFormData] = useState({
    // 1. Consumer Details
    consumerName: "test customer",
    consumerNumber: "",
    aadhaarNumber: "",
    mobileNumber: "",

    // 2. Address & Electricity Connection
    city: "",
    state: "",
    billingUnit: "",
    subDivision: "",
    sanctionNo: "",
    sanctionedCapacity: "",
    address: "",
    subDivisionAddress: "",

    // 3. Solar Panel Details
    makeOfSolar: "",
    capacitySolar: "",
    wattagePerModule: "",
    noOfPvModule: "",
    totalCapacity: "",
    warranty: "",

    // 4. Inverter Details
    makeOfInverter: "",
    capacityInverter: "",
    yearOfManufacturing: "",

    // 5. Equipment Serial Numbers
    panelSerialNumbers: "",
    inverterSerialNumber: "",

    // 6. Installation & Document Date
    installationDate: "",
    dateDay: "",
    dateMonthShort: "",
    year: "",

    // 7. Consumer Documents
    consumerAadhaarImage: null as File | null,
  });

  const [fileName, setFileName] = useState("test customer - Solar Documents_13-11-2026");
  const [isEditingFileName, setIsEditingFileName] = useState(false);

  if (!isOpen) return null;

  // Calculate filled fields count (total 28 fields)
  const calculateFilledCount = () => {
    let count = 0;
    const values = [
      formData.consumerName,
      formData.consumerNumber,
      formData.aadhaarNumber,
      formData.mobileNumber,
      formData.city,
      formData.state,
      formData.billingUnit,
      formData.subDivision,
      formData.sanctionNo,
      formData.sanctionedCapacity,
      formData.address,
      formData.subDivisionAddress,
      formData.makeOfSolar,
      formData.capacitySolar,
      formData.wattagePerModule,
      formData.noOfPvModule,
      formData.totalCapacity,
      formData.warranty,
      formData.makeOfInverter,
      formData.capacityInverter,
      formData.yearOfManufacturing,
      formData.panelSerialNumbers,
      formData.inverterSerialNumber,
      formData.installationDate,
      formData.dateDay,
      formData.dateMonthShort,
      formData.year,
      formData.consumerAadhaarImage ? "uploaded" : "",
    ];
    values.forEach((v) => {
      if (v && v.trim() !== "") count++;
    });
    return count;
  };

  const filledCount = calculateFilledCount();

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, consumerAadhaarImage: e.target.files![0] }));
    }
  };

  const handleReset = () => {
    setFormData({
      consumerName: "",
      consumerNumber: "",
      aadhaarNumber: "",
      mobileNumber: "",
      city: "",
      state: "",
      billingUnit: "",
      subDivision: "",
      sanctionNo: "",
      sanctionedCapacity: "",
      address: "",
      subDivisionAddress: "",
      makeOfSolar: "",
      capacitySolar: "",
      wattagePerModule: "",
      noOfPvModule: "",
      totalCapacity: "",
      warranty: "",
      makeOfInverter: "",
      capacityInverter: "",
      yearOfManufacturing: "",
      panelSerialNumbers: "",
      inverterSerialNumber: "",
      installationDate: "",
      dateDay: "",
      dateMonthShort: "",
      year: "",
      consumerAadhaarImage: null,
    });
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-5xl bg-white dark:bg-[#0f172a] rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-200 dark:border-slate-800">
        {/* =========================================================================
            HEADER (Matches screenshots 1-9: Navy header with Sun icon, title & subtitle)
           ========================================================================= */}
        <div className="bg-[#0b192e] text-white px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">Solar Documents</h2>
              <p className="text-xs text-slate-300">
                Consumer, installation and equipment details
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
              className={`flex items-center space-x-2 cursor-pointer ${step === 1 ? "text-blue-600 dark:text-blue-400" : "text-slate-400"
                }`}
              onClick={() => setStep(1)}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step === 1
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
              className={`flex items-center space-x-2 cursor-pointer ${step === 2 ? "text-blue-600 dark:text-blue-400" : "text-slate-400"
                }`}
              onClick={() => setStep(2)}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step === 2
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
            {filledCount} / 28 fields filled
          </div>
        </div>

        {/* =========================================================================
            BODY CONTENT
           ========================================================================= */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {step === 1 ? (
            <>
              {/* SECTION 1: Consumer Details */}
              <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#111c44]/40 shadow-xs">
                <div className="flex items-center space-x-2.5 mb-4">
                  <span className="w-5 h-5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Consumer Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Consumer Name
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Search customer by name or phone"
                        value={formData.consumerName}
                        onChange={(e) => handleInputChange("consumerName", e.target.value)}
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
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
                      onChange={(e) => handleInputChange("consumerNumber", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Aadhaar Number
                    </label>
                    <input
                      type="text"
                      placeholder="12-digit Aadhaar number"
                      value={formData.aadhaarNumber}
                      onChange={(e) => handleInputChange("aadhaarNumber", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter mobile number"
                      value={formData.mobileNumber}
                      onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: Address & Electricity Connection */}
              <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#111c44]/40 shadow-xs">
                <div className="flex items-center space-x-2.5 mb-4">
                  <span className="w-5 h-5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Address &amp; Electricity Connection
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      State
                    </label>
                    <input
                      type="text"
                      placeholder="Enter state"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Billing Unit
                    </label>
                    <input
                      type="text"
                      placeholder="Enter billing unit"
                      value={formData.billingUnit}
                      onChange={(e) => handleInputChange("billingUnit", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Sub-Division
                    </label>
                    <input
                      type="text"
                      placeholder="Enter sub-division"
                      value={formData.subDivision}
                      onChange={(e) => handleInputChange("subDivision", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Sanction No.
                    </label>
                    <input
                      type="text"
                      placeholder="Enter sanction no."
                      value={formData.sanctionNo}
                      onChange={(e) => handleInputChange("sanctionNo", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Sanctioned Capacity
                    </label>
                    <input
                      type="text"
                      placeholder="Enter sanctioned capacity"
                      value={formData.sanctionedCapacity}
                      onChange={(e) => handleInputChange("sanctionedCapacity", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Address
                    </label>
                    <input
                      type="text"
                      placeholder="Enter address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Sub-Division Address
                    </label>
                    <input
                      type="text"
                      placeholder="Enter sub-division address"
                      value={formData.subDivisionAddress}
                      onChange={(e) => handleInputChange("subDivisionAddress", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: Solar Panel Details */}
              <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#111c44]/40 shadow-xs">
                <div className="flex items-center space-x-2.5 mb-4">
                  <span className="w-5 h-5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center">
                    3
                  </span>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Solar Panel Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Make of Solar
                    </label>
                    <input
                      type="text"
                      placeholder="Enter make of solar"
                      value={formData.makeOfSolar}
                      onChange={(e) => handleInputChange("makeOfSolar", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Capacity (Solar)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter capacity (solar)"
                      value={formData.capacitySolar}
                      onChange={(e) => handleInputChange("capacitySolar", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Wattage Per Module
                    </label>
                    <input
                      type="text"
                      placeholder="Enter wattage per module"
                      value={formData.wattagePerModule}
                      onChange={(e) => handleInputChange("wattagePerModule", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      No. Of PV Module
                    </label>
                    <input
                      type="text"
                      placeholder="Enter no. of pv module"
                      value={formData.noOfPvModule}
                      onChange={(e) => handleInputChange("noOfPvModule", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Total Capacity
                    </label>
                    <input
                      type="text"
                      placeholder="Enter total capacity"
                      value={formData.totalCapacity}
                      onChange={(e) => handleInputChange("totalCapacity", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Warranty
                    </label>
                    <input
                      type="text"
                      placeholder="Enter warranty"
                      value={formData.warranty}
                      onChange={(e) => handleInputChange("warranty", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 4: Inverter Details */}
              <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#111c44]/40 shadow-xs">
                <div className="flex items-center space-x-2.5 mb-4">
                  <span className="w-5 h-5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center">
                    4
                  </span>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Inverter Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Make of Inverter
                    </label>
                    <input
                      type="text"
                      placeholder="Enter make of inverter"
                      value={formData.makeOfInverter}
                      onChange={(e) => handleInputChange("makeOfInverter", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Capacity (Inverter)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter capacity (inverter)"
                      value={formData.capacityInverter}
                      onChange={(e) => handleInputChange("capacityInverter", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Year Of Manufacturing
                    </label>
                    <input
                      type="text"
                      placeholder="Enter year of manufacturing"
                      value={formData.yearOfManufacturing}
                      onChange={(e) => handleInputChange("yearOfManufacturing", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 5: Equipment Serial Numbers */}
              <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#111c44]/40 shadow-xs">
                <div className="flex items-center space-x-2.5 mb-4">
                  <span className="w-5 h-5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center">
                    5
                  </span>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Equipment Serial Numbers
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Panel Serial Numbers
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Enter one serial number per line"
                      value={formData.panelSerialNumbers}
                      onChange={(e) => handleInputChange("panelSerialNumbers", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Inverter Serial Number
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Enter one serial number per line"
                      value={formData.inverterSerialNumber}
                      onChange={(e) => handleInputChange("inverterSerialNumber", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 6: Installation & Document Date */}
              <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#111c44]/40 shadow-xs">
                <div className="flex items-center space-x-2.5 mb-4">
                  <span className="w-5 h-5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center">
                    6
                  </span>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Installation &amp; Document Date
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Installation Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.installationDate}
                        onChange={(e) => handleInputChange("installationDate", e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Date Day
                    </label>
                    <input
                      type="text"
                      placeholder="Enter date day"
                      value={formData.dateDay}
                      onChange={(e) => handleInputChange("dateDay", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Date Month Short
                    </label>
                    <input
                      type="text"
                      placeholder="Select month"
                      value={formData.dateMonthShort}
                      onChange={(e) => handleInputChange("dateMonthShort", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Year
                    </label>
                    <input
                      type="text"
                      placeholder="Enter year"
                      value={formData.year}
                      onChange={(e) => handleInputChange("year", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#0b1437] text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 7: Consumer Documents */}
              <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#111c44]/40 shadow-xs">
                <div className="flex items-center space-x-2.5 mb-4">
                  <span className="w-5 h-5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center">
                    7
                  </span>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Consumer Documents
                  </h3>
                </div>

                <div className="text-xs">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Consumer Aadhaar Image
                  </label>
                  <div className="border border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-slate-50/50 dark:bg-[#0b1437] flex items-center gap-3">
                    <label className="cursor-pointer px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-medium shadow-xs hover:bg-slate-50">
                      Choose File
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                    <span className="text-slate-500">
                      {formData.consumerAadhaarImage
                        ? formData.consumerAadhaarImage.name
                        : "No file chosen"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    Choose a JPG, PNG or WebP image (up to 5 MB).
                  </p>
                </div>
              </div>
            </>
          ) : (
            /* STEP 2: Save & Export (Matches Screenshots 8 & 9) */
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
                    {formData.consumerName || "test customer"} | Solar Documents
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
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs text-slate-800 dark:text-slate-100 pr-10 ${isEditingFileName
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

              {/* 3 Download / Share Action Cards (Matches Screenshots 8 & 9) */}
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

              {/* Aadhaar warning note matching Screenshot 9 */}
              {!formData.consumerAadhaarImage && (
                <div className="text-xs text-slate-400">
                  No Aadhaar image is attached to this document. Use Back to Edit to upload it before downloading.
                </div>
              )}
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


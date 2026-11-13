"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@fableadtech.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (email && password) {
        // Authenticate Super Admin session
        localStorage.setItem(
          "solar_crm_auth",
          JSON.stringify({
            name: "Solar CRM Administrator",
            email: email,
            role: "Super Admin",
            plan: "Free Plan (Expires: 28-12-2026)",
            loginTime: new Date().toISOString(),
          })
        );
        router.push("/admin/dashboard");
      } else {
        setError("Please enter valid super-admin credentials.");
        setIsLoading(false);
      }
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#071328] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background radial ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#138A62]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-[#0d1e3d] border border-blue-900/50 px-5 py-3 rounded-2xl shadow-xl mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff5e3a] to-[#d83a15] flex items-center justify-center text-white font-black text-xl shadow-md">
              F
            </div>
            <div className="text-left">
              <span className="font-extrabold text-xl tracking-tight text-white leading-none block">
                Fablead <span className="text-[#3b82f6]">CRM</span>
              </span>
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider block">
                Solar Enterprise Suite
              </span>
            </div>
          </div>
          <h1 className="text-2xl font-black text-white">Super Admin Portal</h1>
          <p className="text-xs text-gray-400 mt-1">
            Access your solar project workflows, BOM, estimates &amp; deals
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-[#0b1b36] border border-blue-900/40 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@fableadtech.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#071328] border border-blue-900/60 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300">
                  Password
                </label>
                <span className="text-[11px] text-blue-400 cursor-pointer hover:underline">
                  Default Demo Access
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-[#071328] border border-blue-900/60 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-700 bg-[#071328] text-blue-600 focus:ring-0"
                />
                <span>Remember this terminal</span>
              </label>
              <span className="text-gray-500 font-mono">v2.4 LTS</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <span>Authenticating Super-Admin...</span>
              ) : (
                <>
                  <span>Sign In to Solar CRM</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Info */}
          <div className="mt-6 pt-5 border-t border-blue-900/40 text-[11px] text-gray-400 flex items-center justify-between">
            <div>
              <span>Pre-filled Super Admin Demo:</span>
              <div className="text-blue-300 font-mono font-semibold">
                admin@fableadtech.com / admin123
              </div>
            </div>
            <Link
              href="/"
              className="text-emerald-400 hover:underline font-semibold"
            >
              &larr; Public Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


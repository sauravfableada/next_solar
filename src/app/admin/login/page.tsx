"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle, ShieldCheck } from "lucide-react";
import apiClient from "@/services/api/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@solar.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await apiClient.post("/auth/login", {
        email,
        password,
        device_name: "solar-web-portal",
      });

      if (response?.data?.token) {
        const user = response.data.user;
        setSuccessMessage(`Login successful! Redirecting as ${user.role}...`);
        localStorage.setItem("crm_auth_token", response.data.token);
        localStorage.setItem(
          "solar_crm_auth",
          JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            department: user.department,
            permissions: user.permissions,
            loginTime: new Date().toISOString(),
          })
        );

        // Dispatch storage event so sidebar dynamically reacts immediately
        window.dispatchEvent(new Event("storage"));

        setTimeout(() => {
          router.push(response.data.redirect || "/admin/dashboard");
        }, 1000);
      } else {
        setError("Invalid response received from authentication server.");
      }
    } catch (err: any) {
      setError(
        err?.data?.message ||
          "Authentication failed. Please verify your email and password."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071328] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background ambient glow */}
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
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <h1 className="text-2xl font-black text-white">Login Portal</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Access solar CRM modules, workflows, projects &amp; permissions
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

          {successMessage && (
            <div className="mb-6 p-3 bg-emerald-500/15 border border-emerald-500/40 rounded-xl flex items-center gap-2 text-xs text-emerald-300 font-semibold animate-in fade-in">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Email Address
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
                  placeholder="name@solar.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#071328] border border-blue-900/60 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Password
              </label>
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
              <span className="text-gray-500 font-mono text-[11px]">Auto Role Detect</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <span>Signing In...</span>
              ) : (
                <>
                  <span>Sign In to CRM</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Info */}
          <div className="mt-6 pt-5 border-t border-blue-900/40 text-[11px] text-gray-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-gray-500">Admin Account:</span>
              <div className="text-blue-300 font-mono font-medium">
                admin@solar.com / password123
              </div>
            </div>
            <div>
              <span className="text-gray-500">Staff Account:</span>
              <div className="text-emerald-300 font-mono font-medium">
                staff@solar.com / password123
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

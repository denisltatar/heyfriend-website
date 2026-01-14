"use client";
import { useState, useEffect } from "react";
import { Lock, Loader2, Mail, MessageSquare, LayoutDashboard, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const trimmedPassword = password.trim();

    try {
      // Test authentication with emails endpoint (any admin endpoint works)
      const response = await fetch('/api/admin/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: trimmedPassword }),
      });
      
      if (response.ok) {
        setIsAuthenticated(true);
        sessionStorage.setItem("adminPassword", trimmedPassword);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.error || "Incorrect password. Please check your password and try again.");
      }
    } catch {
      setError("Failed to authenticate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedPassword = sessionStorage.getItem("adminPassword");
    if (storedPassword) {
      setPassword(storedPassword);
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <Image
              src="/newest-logo.png"
              alt="HeyFriend Logo"
              width={40}
              height={40}
              className="w-10 h-10 rounded-xl"
            />
            <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  placeholder="Enter admin password"
                  required
                />
              </div>
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Access Dashboard"
              )}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 text-slate-800">
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Image
              src="/newest-logo.png"
              alt="HeyFriend Logo"
              width={40}
              height={40}
              className="w-10 h-10 rounded-xl"
            />
            <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
          </div>
          <p className="text-slate-600">
            Manage your HeyFriend website
          </p>
        </div>

        {/* Admin Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Email Subscribers */}
          <Link
            href="/admin/emails"
            className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-200 hover:border-amber-400"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-amber-100 rounded-xl">
                <Mail className="h-6 w-6 text-amber-600" />
              </div>
              <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Email Subscribers</h2>
            <p className="text-slate-600 text-sm mb-4">
              View, export, and manage your email subscriber list
            </p>
            <div className="flex items-center gap-2 text-sm text-amber-600 font-medium">
              <span>Manage emails</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Feedback Management */}
          <Link
            href="/admin/feedback"
            className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-200 hover:border-amber-400"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Feedback Management</h2>
            <p className="text-slate-600 text-sm mb-4">
              View, edit, and delete user feedback posts
            </p>
            <div className="flex items-center gap-2 text-sm text-amber-600 font-medium">
              <span>Manage feedback</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 p-6 bg-white rounded-2xl border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5" />
            Quick Links
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-600 hover:text-amber-600 transition-colors"
            >
              → Landing Page
            </a>
            <a
              href="/feedback"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-600 hover:text-amber-600 transition-colors"
            >
              → Feedback Page
            </a>
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-600 hover:text-amber-600 transition-colors"
            >
              → Privacy Policy
            </a>
            <a
              href="/support"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-600 hover:text-amber-600 transition-colors"
            >
              → Support Page
            </a>
          </div>
        </div>

        {/* Logout */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              sessionStorage.removeItem("adminPassword");
              setIsAuthenticated(false);
              setPassword("");
            }}
            className="text-sm text-slate-600 hover:text-slate-800 underline"
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}


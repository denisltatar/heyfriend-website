"use client";
import { useState, useEffect } from "react";
import { Download, Mail, Lock, Loader2, CheckCircle2, Trash2 } from "lucide-react";
import Image from "next/image";

interface EmailSubscriber {
  id: number;
  email: string;
  created_at: string;
}

export default function AdminEmailsPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [subscribers, setSubscribers] = useState<EmailSubscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Trim password to avoid whitespace issues
    const trimmedPassword = password.trim();

    try {
      // Use POST request to avoid URL encoding issues with special characters like #
      const response = await fetch('/api/admin/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: trimmedPassword }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setSubscribers(data.subscribers);
        setIsAuthenticated(true);
        // Store password in sessionStorage for subsequent requests
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

  const fetchEmails = async () => {
    const storedPassword = sessionStorage.getItem("adminPassword") || password;
    if (!storedPassword) return;

    setLoading(true);
    try {
      // Use POST request to avoid URL encoding issues
      const response = await fetch('/api/admin/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: storedPassword }),
      });
      if (response.ok) {
        const data = await response.json();
        setSubscribers(data.subscribers);
      }
    } catch {
      setError("Failed to fetch emails");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if already authenticated
    const storedPassword = sessionStorage.getItem("adminPassword");
    if (storedPassword) {
      setPassword(storedPassword);
      fetchEmails();
      setIsAuthenticated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exportToCSV = () => {
    const headers = ["Email", "Date Subscribed"];
    const rows = subscribers.map(sub => [
      sub.email,
      new Date(sub.created_at).toLocaleString()
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `heyfriend-emails-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const copyAllEmails = () => {
    const emails = subscribers.map(sub => sub.email).join(", ");
    navigator.clipboard.writeText(emails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async (id: number, email: string) => {
    // Double confirmation safeguard
    const confirmMessage = `Are you sure you want to delete ${email}?\n\nThis action cannot be undone.`;
    if (!confirm(confirmMessage)) {
      return;
    }

    // Second confirmation for extra safety
    const doubleConfirm = confirm(`Final confirmation: Delete ${email}?`);
    if (!doubleConfirm) {
      return;
    }

    setLoading(true);
    setError("");
    const storedPassword = sessionStorage.getItem("adminPassword") || password;

    try {
      const response = await fetch('/api/admin/emails', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          password: storedPassword,
          id: id 
        }),
      });

      if (response.ok) {
        // Remove from local state
        setSubscribers(subscribers.filter(sub => sub.id !== id));
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.error || "Failed to delete email");
      }
    } catch {
      setError("Failed to delete email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <Image
              src="/logo.svg"
              alt="HeyFriend Logo"
              width={40}
              height={40}
              className="w-10 h-10 rounded-xl"
            />
            <h1 className="text-2xl font-bold text-slate-800">Admin Access</h1>
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
                "Access Emails"
              )}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 text-slate-800">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Image
                src="/logo.svg"
                alt="HeyFriend Logo"
                width={40}
                height={40}
                className="w-10 h-10 rounded-xl"
              />
              <h1 className="text-3xl font-bold text-slate-800">Email Subscribers</h1>
            </div>
            <p className="text-slate-600">
              {subscribers.length} {subscribers.length === 1 ? "subscriber" : "subscribers"}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={copyAllEmails}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4" />
                  Copy All
                </>
              )}
            </button>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Email List */}
        {loading && subscribers.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
          </div>
        ) : subscribers.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Mail className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">No email subscribers yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">#</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Date Subscribed</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {subscribers.map((subscriber, index) => (
                    <tr key={subscriber.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-600">{index + 1}</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">{subscriber.email}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(subscriber.created_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(subscriber.id, subscriber.email)}
                          disabled={loading}
                          className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete this email"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Refresh Button */}
        <div className="mt-6 text-center">
          <button
            onClick={fetchEmails}
            disabled={loading}
            className="text-sm text-slate-600 hover:text-slate-800 underline disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>
    </main>
  );
}


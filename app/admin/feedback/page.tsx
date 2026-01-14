"use client";
import { useState, useEffect } from "react";
import { Lock, Loader2, Trash2, Edit2, Save, X, MessageSquare } from "lucide-react";
import Image from "next/image";

interface Feedback {
  id: number;
  content: string;
  upvotes: number;
  downvotes: number;
  score: number;
  created_at: string;
}

export default function AdminFeedbackPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [saving, setSaving] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const trimmedPassword = password.trim();

    try {
      const response = await fetch('/api/admin/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: trimmedPassword }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setFeedback(data.feedback);
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

  const fetchFeedback = async () => {
    const storedPassword = sessionStorage.getItem("adminPassword") || password;
    if (!storedPassword) return;

    setLoading(true);
    try {
      const response = await fetch('/api/admin/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: storedPassword }),
      });
      if (response.ok) {
        const data = await response.json();
        setFeedback(data.feedback);
      }
    } catch {
      setError("Failed to fetch feedback");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedPassword = sessionStorage.getItem("adminPassword");
    if (storedPassword) {
      setPassword(storedPassword);
      fetchFeedback();
      setIsAuthenticated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id: number, content: string) => {
    const preview = content.length > 50 ? content.substring(0, 50) + "..." : content;
    const confirmMessage = `Are you sure you want to delete this feedback?\n\n"${preview}"\n\nThis action cannot be undone.`;
    if (!confirm(confirmMessage)) {
      return;
    }

    const doubleConfirm = confirm(`Final confirmation: Delete this feedback?`);
    if (!doubleConfirm) {
      return;
    }

    setLoading(true);
    setError("");
    const storedPassword = sessionStorage.getItem("adminPassword") || password;

    try {
      const response = await fetch('/api/admin/feedback', {
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
        setFeedback(feedback.filter(f => f.id !== id));
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.error || "Failed to delete feedback");
      }
    } catch {
      setError("Failed to delete feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Feedback) => {
    setEditingId(item.id);
    setEditingContent(item.content);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingContent("");
  };

  const handleSaveEdit = async (id: number) => {
    const trimmedContent = editingContent.trim();
    if (trimmedContent.length < 10) {
      setError("Feedback must be at least 10 characters long");
      return;
    }
    if (trimmedContent.length > 1000) {
      setError("Feedback must be less than 1000 characters");
      return;
    }

    setSaving(true);
    setError("");
    const storedPassword = sessionStorage.getItem("adminPassword") || password;

    try {
      const response = await fetch('/api/admin/feedback', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          password: storedPassword,
          id: id,
          content: trimmedContent
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setFeedback(feedback.map(f => f.id === id ? data.feedback : f));
        setEditingId(null);
        setEditingContent("");
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.error || "Failed to update feedback");
      }
    } catch {
      setError("Failed to update feedback. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Format timestamp to EST/EDT
  const formatTimestamp = (isoString: string) => {
    const utcDate = new Date(isoString);
    let utcYear = utcDate.getUTCFullYear();
    let utcMonth = utcDate.getUTCMonth();
    let utcDay = utcDate.getUTCDate();
    let utcHours = utcDate.getUTCHours();
    const utcMinutes = utcDate.getUTCMinutes();

    // Determine if DST
    const isDST = (() => {
      if (utcMonth >= 3 && utcMonth <= 9) return true;
      if (utcMonth === 11 || utcMonth === 0 || utcMonth === 1) return false;
      if (utcMonth === 2) {
        const firstDay = new Date(Date.UTC(utcYear, 2, 1)).getUTCDay();
        const secondSunday = (7 - firstDay) % 7 + 8;
        return utcDay >= secondSunday;
      }
      if (utcMonth === 10) {
        const firstDay = new Date(Date.UTC(utcYear, 10, 1)).getUTCDay();
        const firstSunday = (7 - firstDay) % 7 + 1;
        return utcDay < firstSunday;
      }
      return false;
    })();

    const offsetHours = isDST ? 4 : 5;
    let estHours = utcHours - offsetHours;
    let estDay = utcDay;
    let estMonth = utcMonth;
    let estYear = utcYear;

    if (estHours < 0) {
      estHours += 24;
      estDay--;
      if (estDay < 1) {
        estMonth--;
        if (estMonth < 0) {
          estMonth = 11;
          estYear--;
        }
        const daysInPrevMonth = new Date(Date.UTC(estYear, estMonth + 1, 0)).getUTCDate();
        estDay = daysInPrevMonth;
      }
    }

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthStr = monthNames[estMonth];
    const ampm = estHours >= 12 ? 'PM' : 'AM';
    let displayHours = estHours % 12;
    displayHours = displayHours || 12;
    const minutesStr = utcMinutes.toString().padStart(2, '0');
    const timezone = isDST ? 'EDT' : 'EST';

    return `${monthStr} ${estDay}, ${estYear}, ${displayHours}:${minutesStr} ${ampm} ${timezone}`;
  };

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
                "Access Feedback"
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
                src="/newest-logo.png"
                alt="HeyFriend Logo"
                width={40}
                height={40}
                className="w-10 h-10 rounded-xl"
              />
              <h1 className="text-3xl font-bold text-slate-800">Feedback Management</h1>
            </div>
            <p className="text-slate-600">
              {feedback.length} {feedback.length === 1 ? "post" : "posts"}
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Feedback List */}
        {loading && feedback.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
          </div>
        ) : feedback.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">No feedback posts yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {feedback.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {editingId === item.id ? (
                  <div className="space-y-4">
                    <textarea
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
                      rows={4}
                      placeholder="Enter feedback content..."
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSaveEdit(item.id)}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                      >
                        {saving ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            Save
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-slate-800 leading-relaxed mb-4 break-words">
                      {item.content}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md font-medium">
                          {item.upvotes} upvotes
                        </span>
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-md font-medium">
                          {item.downvotes} downvotes
                        </span>
                        <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md font-medium">
                          Score: {item.score}
                        </span>
                        <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md font-medium">
                          {formatTimestamp(item.created_at)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          disabled={loading || saving}
                          className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                          title="Edit this feedback"
                        >
                          <Edit2 className="h-4 w-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.content)}
                          disabled={loading || saving}
                          className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                          title="Delete this feedback"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Refresh Button */}
        <div className="mt-6 text-center">
          <button
            onClick={fetchFeedback}
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


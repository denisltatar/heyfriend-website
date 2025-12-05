"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, Mail, Bell } from "lucide-react";

export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "alreadySubscribed">("idle");
  const [message, setMessage] = useState("");
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(null);

  // Check if user has already subscribed (on page load)
  useEffect(() => {
    const savedEmail = localStorage.getItem("heyfriend_subscribed_email");
    if (savedEmail) {
      setSubscribedEmail(savedEmail);
      setStatus("alreadySubscribed");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your email");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Thanks! We'll notify you when we launch.");
        const submittedEmail = email.trim();
        setSubscribedEmail(submittedEmail);
        // Save to localStorage so it persists across page reloads
        localStorage.setItem("heyfriend_subscribed_email", submittedEmail);
        setEmail("");
      } else {
        if (data.alreadyExists) {
          // If email already exists, treat as success and save it
          setStatus("alreadySubscribed");
          const submittedEmail = email.trim();
          setSubscribedEmail(submittedEmail);
          localStorage.setItem("heyfriend_subscribed_email", submittedEmail);
          setEmail("");
        } else {
          setStatus("error");
          setMessage(data.error || "Something went wrong. Please try again.");
        }
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  // Show "You're on the list" message if already subscribed
  if (status === "alreadySubscribed" || subscribedEmail) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg shadow-sm">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <Bell className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-green-800">
              You&apos;re on the list!
            </p>
            <p className="text-xs text-green-600 mt-0.5">
              We&apos;ll notify {subscribedEmail ? `${subscribedEmail.split('@')[0]}@...` : 'you'} when we launch.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={status === "loading"}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            required
          />
        </div>
        <motion.button
          type="submit"
          disabled={status === "loading" || status === "success"}
          whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
          whileTap={{ scale: status === "idle" ? 0.98 : 1 }}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
            status === "success"
              ? "bg-green-500 text-white cursor-not-allowed"
              : status === "loading"
              ? "bg-slate-400 text-white cursor-not-allowed"
              : "bg-amber-500 hover:bg-amber-600 text-white shadow-md hover:shadow-lg"
          }`}
        >
          {status === "loading" ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Subscribing...
            </span>
          ) : status === "success" ? (
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Subscribed!
            </span>
          ) : (
            "Get notified"
          )}
        </motion.button>
      </div>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-3 text-sm ${
            status === "error" ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </motion.p>
      )}
    </form>
  );
}


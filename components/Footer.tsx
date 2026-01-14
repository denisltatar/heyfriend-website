"use client";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/30 backdrop-blur-sm mt-auto">
      <div className="mx-auto max-w-4xl px-6 py-6">
        <div className="flex flex-col gap-3">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <Image
              src="/newest-logo.png"
              alt="HeyFriend Logo"
              width={32}
              height={32}
              className="w-8 h-8 rounded-lg shadow-sm"
            />
            <span className="text-slate-600 font-medium">HeyFriend</span>
          </div>

          {/* Links Grid */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link
              href="/privacy"
              className="text-sm text-slate-600 hover:text-amber-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/support"
              className="text-sm text-slate-600 hover:text-amber-600 transition-colors"
            >
              Support
            </Link>
            <Link
              href="/feedback"
              className="text-sm text-slate-600 hover:text-amber-600 transition-colors"
            >
              Community Feedback
            </Link>
            <Link
              href="/admin"
              className="text-sm text-transparent hover:text-slate-600 transition-colors cursor-pointer"
              title="Admin Dashboard (Password Protected)"
            >
              Admin
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-sm text-slate-500 border-t border-slate-200 pt-4 mt-2">
            Created by <span className="font-medium text-slate-600">Thoughtful Code, LLC</span>
          </div>
        </div>
      </div>
    </footer>
  );
}


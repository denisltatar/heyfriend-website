import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Shield, Lock, Eye, Download, Settings } from "lucide-react";

export const metadata = { title: "Privacy Policy • HeyFriend" };

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <Link href="/" className="inline-flex items-center gap-3 text-slate-600 hover:text-slate-800 transition-colors">
            <ArrowLeft className="h-4 w-4" />
          <Image
              src="/logo.svg"
            alt="HeyFriend Logo"
              width={24}
              height={24}
              className="w-6 h-6 rounded-lg shadow-sm"
            />
            <span className="font-semibold">Back to HeyFriend</span>
        </Link>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Title Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="h-4 w-4" />
            <span>Privacy & Security</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Privacy Policy</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Your privacy is fundamental to HeyFriend. This policy explains how we protect your data and your rights.
          </p>
          <p className="text-sm text-slate-500 mt-4">Last updated: August 12, 2025</p>
        </div>

        {/* Policy Content */}
        <div className="space-y-12">
          {/* What we collect */}
          <section className="bg-white/50 rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <Eye className="h-6 w-6 text-amber-500" />
              What We Collect
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-slate-800">Voice input & transcripts</strong>
                    <p className="text-slate-600 text-sm">Your spoken input and text transcription during sessions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-slate-800">AI responses & summaries</strong>
                    <p className="text-slate-600 text-sm">Assistant replies and post-session insights</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-slate-800">App usage & diagnostics</strong>
                    <p className="text-slate-600 text-sm">Basic analytics to improve reliability</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-slate-800">Account info (if signed in)</strong>
                    <p className="text-slate-600 text-sm">Email and authentication metadata</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How we use data */}
          <section className="bg-white/50 rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <Settings className="h-6 w-6 text-amber-500" />
              How We Use Your Data
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-slate-800">Provide core features</strong>
                  <p className="text-slate-600">Transcribe speech, generate responses, create insights</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-slate-800">Improve reliability</strong>
                  <p className="text-slate-600">Troubleshoot crashes and optimize performance</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-slate-800">We never sell your data</strong>
                  <p className="text-slate-600">No third-party advertising or data sales</p>
                </div>
              </div>
            </div>
          </section>

          {/* Security & Storage */}
          <section className="bg-white/50 rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <Lock className="h-6 w-6 text-amber-500" />
              Security & Storage
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Processing</h3>
                <p className="text-slate-600">We use on-device audio capture and trusted processors (Apple Speech, OpenAI, Firebase) acting on our instructions to provide the service.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Retention</h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• <strong>Transcripts & summaries:</strong> Kept in your account unless you delete them</li>
                  <li>• <strong>Raw audio:</strong> Not retained after processing</li>
                  <li>• <strong>Diagnostics:</strong> Retained for limited time to improve the app</li>
      </ul>
              </div>
            </div>
          </section>

          {/* Your choices */}
          <section className="bg-white/50 rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <Download className="h-6 w-6 text-amber-500" />
              Your Choices
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-white/30 rounded-xl">
                <h3 className="font-semibold text-slate-800 mb-2">Delete Content</h3>
                <p className="text-sm text-slate-600">Delete transcripts and summaries in-app or request deletion</p>
              </div>
              <div className="text-center p-4 bg-white/30 rounded-xl">
                <h3 className="font-semibold text-slate-800 mb-2">Export Data</h3>
                <p className="text-sm text-slate-600">Contact us to receive a copy of your data</p>
              </div>
              <div className="text-center p-4 bg-white/30 rounded-xl">
                <h3 className="font-semibold text-slate-800 mb-2">Opt Out</h3>
                <p className="text-sm text-slate-600">Toggle analytics off in Settings where available</p>
              </div>
            </div>
          </section>

          {/* Additional info */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white/50 rounded-2xl p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-3">Children</h3>
              <p className="text-slate-600 text-sm">Not directed to children under 13 (or the minimum age in your region).</p>
            </div>
            <div className="bg-white/50 rounded-2xl p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-3">International Transfers</h3>
              <p className="text-slate-600 text-sm">Data may be processed in different countries with appropriate safeguards.</p>
            </div>
          </div>

          {/* Contact */}
          <section className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Questions or Requests?</h2>
            <p className="text-slate-600 mb-4">We&apos;re here to help with any privacy concerns or data requests.</p>
            <div className="space-y-2">
              <p className="text-slate-800"><strong>Email:</strong> support@heyfriend.app</p>
            </div>
          </section>

          {/* Disclaimer */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <h3 className="font-semibold text-red-800 mb-2">Important Disclaimer</h3>
            <p className="text-red-700 text-sm">
              HeyFriend is not medical care or a crisis service. If you&apos;re in immediate danger or experiencing a crisis, 
              call <strong>988</strong> (US) or your local emergency number.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MessageCircle, Mail, HelpCircle, Bug, Star, Zap, Shield, Clock, BookOpen } from "lucide-react";

export const metadata = { 
  title: "Support • HeyFriend",
  description: "Get help with HeyFriend. Find answers, report issues, and connect with our support team."
};

export default function SupportPage() {
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

      {/* Hero Section */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <MessageCircle className="h-4 w-4" />
            <span>Support Center</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">How can we help?</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We&apos;re here to support you on your mental health journey. Find answers, get help, or reach out directly.
          </p>
        </div>

        {/* Quick Help Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
          <Link href="#faq" className="group">
            <div className="bg-white/50 rounded-2xl p-6 border border-slate-200 hover:bg-white/70 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <HelpCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Frequently Asked Questions</h3>
              <p className="text-slate-600 text-sm">Find quick answers to common questions about HeyFriend.</p>
            </div>
          </Link>

          <Link href="#contact" className="group">
            <div className="bg-white/50 rounded-2xl p-6 border border-slate-200 hover:bg-white/70 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Contact Support</h3>
              <p className="text-slate-600 text-sm">Get personalized help from our support team.</p>
            </div>
          </Link>

          <Link href="#report-issue" className="group">
            <div className="bg-white/50 rounded-2xl p-6 border border-slate-200 hover:bg-white/70 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                <Bug className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Report an Issue</h3>
              <p className="text-slate-600 text-sm">Found a bug? Let us know so we can fix it.</p>
            </div>
          </Link>
        </div>

        {/* FAQ Section */}
        <section id="faq" className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white/50 rounded-2xl border border-slate-200 overflow-hidden">
              <div className="p-6">
                <h3 className="font-semibold text-lg text-slate-800 mb-3">How does HeyFriend work?</h3>
                <p className="text-slate-600 leading-relaxed">
                  HeyFriend uses AI to provide a safe space for voice-based reflection. Simply tap the microphone, 
                  speak about what&apos;s on your mind, and receive empathetic responses and insights to help you understand 
                  your emotional patterns better.
                </p>
              </div>
            </div>

            <div className="bg-white/50 rounded-2xl border border-slate-200 overflow-hidden">
              <div className="p-6">
                <h3 className="font-semibold text-lg text-slate-800 mb-3">Is my data private and secure?</h3>
                <p className="text-slate-600 leading-relaxed">
                  Absolutely. We prioritize your privacy above all else. Your conversations are encrypted, 
                  never shared with third parties, and you have full control over your data. You can delete 
                  your content at any time.
                </p>
              </div>
            </div>

            <div className="bg-white/50 rounded-2xl border border-slate-200 overflow-hidden">
              <div className="p-6">
                <h3 className="font-semibold text-lg text-slate-800 mb-3">Can HeyFriend replace therapy?</h3>
                <p className="text-slate-600 leading-relaxed">
                  No, HeyFriend is designed to complement your mental health journey, not replace professional therapy. 
                  It&apos;s a tool for daily reflection and emotional awareness. For serious mental health concerns, 
                  please consult a licensed therapist or healthcare provider.
                </p>
              </div>
            </div>

            <div className="bg-white/50 rounded-2xl border border-slate-200 overflow-hidden">
              <div className="p-6">
                <h3 className="font-semibold text-lg text-slate-800 mb-3">What if I&apos;m in crisis?</h3>
                <p className="text-slate-600 leading-relaxed">
                  HeyFriend is not a crisis intervention service. If you&apos;re experiencing a mental health crisis 
                  or having thoughts of self-harm, please contact:
                  <br />• <strong>988</strong> (Suicide & Crisis Lifeline)
                  <br />• <strong>911</strong> (Emergency Services)
                  <br />• Your local emergency number
                </p>
              </div>
            </div>

            <div className="bg-white/50 rounded-2xl border border-slate-200 overflow-hidden">
              <div className="p-6">
                <h3 className="font-semibold text-lg text-slate-800 mb-3">How accurate is the AI analysis?</h3>
                <p className="text-slate-600 leading-relaxed">
                  Our AI is trained to recognize emotional patterns and provide insights, but it&apos;s not perfect. 
                  The insights are meant to help you reflect and should be taken as suggestions, not definitive 
                  diagnoses. Always trust your own judgment about your mental health.
                </p>
              </div>
            </div>

            <div className="bg-white/50 rounded-2xl border border-slate-200 overflow-hidden">
              <div className="p-6">
                <h3 className="font-semibold text-lg text-slate-800 mb-3">Can I export my data?</h3>
                <p className="text-slate-600 leading-relaxed">
                  Yes, you can request a copy of your data at any time.                   Contact our support team and we&apos;ll 
                  provide you with an export of your conversations and insights in a readable format.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Support Section */}
        <section id="contact" className="mb-16">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 border border-amber-200">
            <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Contact Our Support Team</h2>
            <p className="text-slate-600 text-center mb-8 max-w-2xl mx-auto">
              Can&apos;t find what you&apos;re looking for? Our support team is here to help you with any questions or concerns.
            </p>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white/70 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Email Support</h3>
                <p className="text-slate-600 mb-4">Get help via email within 24 hours</p>
                <a 
                  href="mailto:support@tryfriend.com"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  support@tryfriend.com
                </a>
              </div>

              <div className="bg-white/70 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Response Time</h3>
                <p className="text-slate-600 mb-4">We typically respond within 24 hours</p>
                <div className="text-sm text-slate-500">
                  <p>Monday - Friday: 9 AM - 6 PM PST</p>
                  <p>Weekends: Limited support</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Report Issue Section */}
        <section id="report-issue" className="mb-16">
          <div className="bg-white/50 rounded-3xl p-8 border border-slate-200">
            <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Report an Issue</h2>
            <p className="text-slate-600 text-center mb-8 max-w-2xl mx-auto">
              Found a bug or experiencing technical difficulties? Help us improve HeyFriend by reporting the issue.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bug className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Bug Report</h3>
                <p className="text-slate-600 text-sm">App crashes, errors, or unexpected behavior</p>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Performance</h3>
                <p className="text-slate-600 text-sm">Slow loading, audio issues, or connectivity problems</p>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">Feature Request</h3>
                <p className="text-slate-600 text-sm">Ideas for new features or improvements</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <a 
                href="mailto:support@tryfriend.com?subject=Bug Report"
                className="inline-flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-900 transition-colors"
              >
                <Bug className="h-4 w-4" />
                Report Issue
              </a>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Additional Resources</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/privacy" className="group">
              <div className="bg-white/50 rounded-2xl p-6 border border-slate-200 hover:bg-white/70 hover:shadow-lg transition-all duration-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Privacy Policy</h3>
                    <p className="text-slate-600 text-sm">Learn how we protect your data</p>
                  </div>
                </div>
              </div>
            </Link>

            <div className="bg-white/50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">User Guide</h3>
                  <p className="text-slate-600 text-sm">Tips for getting the most out of HeyFriend</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Notice */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Important: Crisis Support
          </h3>
          <p className="text-red-700 text-sm">
            HeyFriend is not a crisis intervention service. If you&apos;re experiencing a mental health crisis, 
            please call <strong>988</strong> (Suicide & Crisis Lifeline) or <strong>911</strong> immediately.
          </p>
        </div>
      </div>
    </main>
  );
}

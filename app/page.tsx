"use client";
import { Mic, TrendingUp, Brain, Heart, ChevronDown, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import IPhoneMockup from "@/components/IPhoneMockup";
import EmailForm from "@/components/EmailForm";
import { useState } from "react";

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How is HeyFriend different from other mental health apps?",
      answer: "HeyFriend is designed to help you graduate from needing us. We focus on building your self-awareness and emotional resilience so you eventually use the app less, not more. Plus, our voice-first approach makes reflection feel more natural than typing."
    },
    {
      question: "Is my data private and secure?",
      answer: "Absolutely. We never sell your data and use local or encrypted cloud storage. Your voice sessions and insights are yours alone. We use biometric login (Face ID/Touch ID) for extra security."
    },
    {
      question: "Can HeyFriend replace therapy?",
      answer: "No, HeyFriend is not a substitute for professional therapy. It's designed for daily emotional support and reflection. If you're in crisis, please call 988 (US) or your local emergency number."
    },
    {
      question: "How does the voice chat work?",
      answer: "Simply tap the mic button and start speaking naturally. Our AI transcribes your speech in real-time and responds with empathy and insight. You can talk freely without interruptions or time limits."
    },
    {
      question: "What kind of insights do I get after each session?",
      answer: "After each voice session, you'll receive a summary of key points, emotional tone analysis, language patterns, and personalized recommendations based on proven mental health methods like CBT and ACT."
    },
    {
      question: "How do I know if I'm making progress?",
      answer: "The Insights tab shows your emotional trends over time, including stress levels, gratitude mentions, and overall emotional balance. You'll see patterns emerge that help you understand your growth journey."
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 text-slate-800">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-12 grid items-center gap-10 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Image
              src="/newest-logo.png"
              alt="HeyFriend Logo"
              width={48}
              height={48}
              className="w-12 h-12 rounded-2xl shadow-sm"
            />
            <h1 className="text-3xl font-bold text-slate-800">HeyFriend</h1>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-800 mb-4">Talk it out. Learn from it.</h2>
          <p className="text-lg text-slate-600 mb-6">
            HeyFriend is a voice-first AI that helps you reflect, then surfaces gentle insights after each session.
          </p>
          <div className="mb-6">
            <p className="text-sm font-medium text-slate-700 mb-3">Get notified when we launch:</p>
            <EmailForm />
          </div>
          {/* <div className="flex gap-3 mb-4">
            <a 
              href="https://apps.apple.com/app/your-app-id" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-medium transition-colors hover:bg-gray-800"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="text-sm font-semibold">App Store</div>
              </div>
            </a>
          </div> */}
          <p className="text-sm text-slate-500">
            Your voice powers the session. We don&apos;t sell data.
          </p>
        </div>
        <div className="flex justify-center">
          <IPhoneMockup />
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-2xl font-semibold text-slate-800 mb-8">What You Get</h2>
        <ul className="grid gap-6 md:grid-cols-2">
          <Feature icon={<Mic className="text-amber-500" />} title="Voice-first reflection" desc="Speak naturally and get transcribed insights that help you understand your patterns." />
          <Feature icon={<Brain className="text-amber-500" />} title="Emotional intelligence" desc="AI that recognizes your tone, sentiment, and recurring thought patterns." />
          <Feature icon={<TrendingUp className="text-amber-500" />} title="Growth tracking" desc="See your emotional trends and progress over time with actionable insights." />
          <Feature icon={<Heart className="text-amber-500" />} title="Designed to graduate from" desc="Build self-awareness and resilience so you eventually need us less." />
        </ul>
        <p className="mt-10 text-xs text-slate-500 text-center">
          Not a medical device. If you&apos;re in crisis, call 988 (US) or your local emergency number.
        </p>
      </section>

      {/* Feedback CTA Section */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-8 py-12 md:px-16 md:py-16">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-amber-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
                  Share Your Feedback
                </h2>
              </div>
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>100% Anonymous & Secure</span>
                </div>
              </div>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Help shape HeyFriend by sharing your ideas, suggestions, and feedback. Your input directly influences our roadmap and product decisions.
              </p>
              <Link
                href="/feedback"
                className="inline-flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors"
              >
                <span>Visit Feedback Forum</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          
          <div className="px-8 py-8 md:px-16 md:py-10 border-t border-slate-100">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Share Ideas</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Suggest new features, improvements, or share what you&apos;d like to see in HeyFriend.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Vote & Prioritize</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Upvote the feedback that matters most to you. Help us understand what to build next.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Anonymous & Secure</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  All feedback is completely anonymous. Share openly and help us build better.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Graduation Section */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>🎓</span>
            <span>Designed to Graduate From</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            The goal? You won&apos;t need us anymore
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Unlike other apps that want to keep you hooked, HeyFriend is designed to help you build the skills you need to thrive on your own.
          </p>
        </div>
        
        {/* Journey Visualization */}
        <div className="relative mb-16">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 transform -translate-y-1/2 hidden md:block"></div>
          
          <div className="grid gap-8 md:grid-cols-3 relative">
            {/* Step 1: Start Talking */}
            <div className="text-center relative">
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mx-auto shadow-xl border-4 border-white relative">
                  <span className="text-3xl font-bold text-white">1</span>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                    <span className="text-white text-sm">🎤</span>
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-xl text-slate-800 mb-3">Start Talking</h3>
              <p className="text-slate-600 leading-relaxed">Begin with voice sessions to understand your emotional patterns and triggers.</p>
            </div>
            
            {/* Step 2: Build Skills */}
            <div className="text-center relative">
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mx-auto shadow-xl border-4 border-white relative">
                  <span className="text-3xl font-bold text-white">2</span>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                    <span className="text-white text-sm">🧠</span>
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-xl text-slate-800 mb-3">Build Skills</h3>
              <p className="text-slate-600 leading-relaxed">Learn to recognize your patterns and develop healthier thought habits.</p>
            </div>
            
            {/* Step 3: Graduate */}
            <div className="text-center relative">
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mx-auto shadow-xl border-4 border-white relative">
                  <span className="text-3xl font-bold text-white">3</span>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                    <span className="text-white text-sm">🎓</span>
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-xl text-slate-800 mb-3">Graduate</h3>
              <p className="text-slate-600 leading-relaxed">Use the app less as you become more self-aware and emotionally resilient.</p>
            </div>
          </div>
        </div>
        
        {/* Success Message */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl px-8 py-4 shadow-lg">
            <span className="text-2xl">🎓</span>
            <div>
              <p className="font-bold text-green-800">Success looks like using HeyFriend less</p>
              <p className="text-sm text-green-600">That&apos;s when we know we&apos;ve done our job</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-slate-800 mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-600">Everything you need to know about HeyFriend</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white/50 rounded-2xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/30 transition-colors"
              >
                <h3 className="font-semibold text-lg text-slate-800 pr-4">{faq.question}</h3>
                <ChevronDown 
                  className={`h-5 w-5 text-slate-600 transition-transform duration-200 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${
                openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-6">
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Disclaimer */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mt-10">
            <h3 className="font-semibold text-red-800 mb-2">Important Disclaimer</h3>
            <p className="text-red-700 text-sm">
              HeyFriend is not medical care or a crisis service. If you&apos;re in immediate danger or experiencing a crisis, 
              call <strong>988</strong> (US) or your local emergency number.
            </p>
          </div>
      </section>
    </main>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <li className="rounded-2xl border border-slate-200 bg-white/50 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 text-slate-700 mb-3">
        <span className="h-6 w-6">{icon}</span>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <p className="text-slate-600">{desc}</p>
    </li>
  );
}

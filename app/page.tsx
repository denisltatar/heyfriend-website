"use client";
import { Mic, Sparkles, TrendingUp, Shield, Brain, Heart, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import IPhoneMockup from "@/components/IPhoneMockup";
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
              src="/logo.png"
              alt="HeyFriend Logo"
              width={48}
              height={48}
              className="w-12 h-12 rounded-2xl shadow-sm"
            />
            <h1 className="text-3xl font-bold text-slate-800">HeyFriend</h1>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-800 mb-4">Talk it out. Learn from it.</h2>
          <p className="text-lg text-slate-600 mb-6">
            HeyFriend is a voice-first AI that helps you reflect—then surfaces gentle insights after each session.
          </p>
          <div className="flex gap-3 mb-4">
            <button aria-disabled className="rounded-xl bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 disabled:opacity-70 font-medium transition-colors">
              Download on the App Store
            </button>
            <Link href="#waitlist" className="rounded-xl border border-slate-300 hover:border-slate-400 px-6 py-3 font-medium transition-colors">Join waitlist</Link>
          </div>
          <p className="text-sm text-slate-500">
            Your voice powers the session. We don&apos;t sell data. <Link href="/privacy" className="underline hover:text-slate-700">Privacy Policy</Link>.
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
              HeyFriend is not medical care or a crisis service. If you're in immediate danger or experiencing a crisis, 
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

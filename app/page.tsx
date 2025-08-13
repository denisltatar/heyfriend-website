import { Mic, Sparkles, SkipForward, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import IPhoneMockup from "@/components/iPhoneMockup";

export default function Page() {
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
        <h2 className="text-2xl font-semibold text-slate-800 mb-8">What you get</h2>
        <ul className="grid gap-6 md:grid-cols-2">
          <Feature icon={<Mic className="text-amber-500" />} title="Multi-turn voice chat" desc="Natural back-and-forth, tuned for empathy." />
          <Feature icon={<Sparkles className="text-amber-500" />} title="Post-session insights" desc="Summaries that help you notice patterns." />
          <Feature icon={<SkipForward className="text-amber-500" />} title="Barge-in" desc="Talk over the assistant when you need to." />
          <Feature icon={<Shield className="text-amber-500" />} title="Privacy-first" desc="No data sales. Clear controls." />
        </ul>
        <p className="mt-10 text-xs text-slate-500 text-center">
          Not a medical device. If you&apos;re in crisis, call 988 (US) or your local emergency number.
        </p>
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

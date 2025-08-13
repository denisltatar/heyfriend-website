import Link from "next/link";
import Image from "next/image";

export const metadata = { title: "Privacy Policy • HeyFriend" };

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14 prose prose-slate bg-gradient-to-b from-amber-50 to-orange-50 min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Image
            src="/logo.png"
            alt="HeyFriend Logo"
            width={32}
            height={32}
            className="w-8 h-8 rounded-xl shadow-sm"
          />
          <span className="text-xl font-bold text-slate-800">HeyFriend</span>
        </Link>
      </div>
      <h1>HeyFriend Privacy Policy</h1>
      <p><em>Last updated: 2025-08-12</em></p>
      <p>HeyFriend (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is a voice-first conversational app that helps you reflect. This policy explains what we collect, why, and your choices.</p>
      <h2>What we collect</h2>
      <ul>
        <li><strong>Voice input & transcripts</strong>: your spoken input and the text transcription during a session.</li>
        <li><strong>AI responses & session summaries</strong>: the assistant&apos;s replies and optional post-session notes.</li>
        <li><strong>App usage & device info</strong>: basic diagnostics and analytics (e.g., crashes, feature usage).</li>
        <li><strong>Account info (if you sign in)</strong>: email and auth metadata.</li>
      </ul>
      <h2>How we use data</h2>
      <ul>
        <li><strong>Provide core features</strong>: transcribe speech, generate responses, create summaries.</li>
        <li><strong>Improve reliability</strong>: troubleshoot crashes and performance.</li>
        <li><strong>No sale of personal data</strong>. No third-party advertising.</li>
      </ul>
      <h2>Processing & storage</h2>
      <p>We use on-device audio capture and trusted processors (e.g., Apple Speech / device, OpenAI for AI responses, Firebase for Auth/Firestore/Analytics) acting on our instructions to provide the service.</p>
      <h2>Retention</h2>
      <ul>
        <li><strong>Transcripts & summaries</strong>: kept in your account unless you delete them.</li>
        <li><strong>Raw audio</strong>: not retained after processing (aside from temporary buffering).</li>
        <li><strong>Diagnostics</strong>: retained for a limited time to improve the app.</li>
      </ul>
      <h2>Your choices</h2>
      <ul>
        <li><strong>Delete content</strong>: delete transcripts/summaries in-app (or request deletion).</li>
        <li><strong>Export data</strong>: contact us to receive a copy.</li>
        <li><strong>Opt out of analytics</strong>: toggle in Settings (where available).</li>
      </ul>
      <h2>Children</h2>
      <p>Not directed to children under 13 (or the minimum age in your region).</p>
      <h2>Security</h2>
      <p>We use industry-standard safeguards (encryption in transit, access controls). No method is 100% secure.</p>
      <h2>International transfers</h2>
      <p>Data may be processed in countries different from yours. We rely on appropriate safeguards where required.</p>
      <h2>Changes</h2>
      <p>We may update this policy. We&apos;ll post the new date above and, for material changes, notify in-app or by email.</p>
      <h2>Contact</h2>
      <p>Questions or requests: <strong>support@heyfriend.app</strong><br/>Mailing address: [Your address]</p>
      <hr/>
      <p><strong>Disclaimer:</strong> HeyFriend is not medical care or a crisis service. If you&apos;re in immediate danger or experiencing a crisis, call <strong>988</strong> (US) or your local emergency number.</p>
    </main>
  );
} 
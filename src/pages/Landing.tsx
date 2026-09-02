import { Link } from "react-router-dom";
import { Plane, Bell, XCircle } from "lucide-react";

import { useDocumentTitle } from "@/lib/use-document-title";

const features = [
  {
    icon: Plane,
    emoji: "✈️",
    title: "盯緊熱門航線",
    subtitle: "Always-on route watching",
    description:
      "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。",
  },
  {
    icon: Bell,
    emoji: "🔔",
    title: "達標自動通知",
    subtitle: "Target-price email alerts",
    description:
      "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。",
  },
  {
    icon: XCircle,
    emoji: "🚫",
    title: "隨時取消",
    subtitle: "Cancel anytime",
    description: "月訂閱制，不想用隨時停，沒有綁約。",
  },
];

export function LandingPage() {
  useDocumentTitle("Flight Price Notifier — 機票降價通知");

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Ambient glow */}
      <div className="glow-orb -top-40 left-1/2 h-125 w-200 -translate-x-1/2" />

      {/* Header */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/30">
            <Plane className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Flight Price Notifier
          </span>
        </div>
        <Link
          to="/sign-in"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40"
        >
          Sign in / 登入
        </Link>
      </header>

      {/* Hero */}
      <main className="relative z-10 mx-auto max-w-6xl px-6">
        <section className="flex flex-col items-center pt-24 pb-20 text-center sm:pt-32">
          <span className="animate-fade-up inline-flex items-center rounded-full border border-border bg-secondary/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
            機票降價通知 · Fare alerts from Taipei
          </span>
          <h1 className="animate-fade-up-delay-1 mt-8 max-w-3xl text-5xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Flight Price
            <br />
            <span className="bg-gradient-to-r from-primary via-fuchsia-400 to-primary bg-clip-text text-transparent">
              Notifier
            </span>
          </h1>
          <p className="animate-fade-up-delay-2 mt-7 max-w-xl text-lg font-medium leading-relaxed text-foreground/90 sm:text-xl">
            設定航線與目標價，機票降價就通知你
          </p>
          <p className="animate-fade-up-delay-2 mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
            Set a route and a target price — we email you when the fare drops.
          </p>
          <div className="animate-fade-up-delay-3 mt-10">
            <Link
              to="/sign-in"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition-all hover:scale-[1.03] hover:bg-primary/90 hover:shadow-primary/50"
            >
              Sign in / 登入
            </Link>
          </div>
        </section>

        {/* Feature cards */}
        <section className="grid gap-5 pb-24 sm:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`animate-fade-up-delay-${i + 1} group rounded-2xl border border-border bg-card/70 p-7 backdrop-blur transition-colors hover:border-primary/40 hover:bg-card`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-2xl transition-transform group-hover:scale-110">
                <span aria-hidden="true">{f.emoji}</span>
              </div>
              <h2 className="mt-5 text-lg font-semibold text-card-foreground">
                {f.title}
              </h2>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-primary">
                {f.subtitle}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2026 Flight Price Notifier
      </footer>
    </div>
  );
}

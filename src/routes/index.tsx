import { createFileRoute, Link } from "@tanstack/react-router";
import { Plane, Bell, Ban } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flight Price Notifier — 機票降價通知" },
      {
        name: "description",
        content:
          "Set a route and a target price — we email you when the fare drops. 設定航線與目標價，機票降價就通知你。",
      },
      { property: "og:title", content: "Flight Price Notifier — 機票降價通知" },
      {
        property: "og:description",
        content:
          "Set a route and a target price — we email you when the fare drops.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const FEATURES = [
  {
    icon: Plane,
    title: "盯緊熱門航線",
    subtitle: "Always-on route watching",
    description: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。",
  },
  {
    icon: Bell,
    title: "達標自動通知",
    subtitle: "Target-price email alerts",
    description: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。",
  },
  {
    icon: Ban,
    title: "隨時取消",
    subtitle: "Cancel anytime",
    description: "月訂閱制，不想用隨時停，沒有綁約。",
  },
];

function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.55 0.2 293 / 60%), transparent)",
        }}
      />

      {/* Header */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Plane className="size-4.5" />
          </div>
          <span className="text-base font-semibold tracking-tight">
            Flight Price Notifier
          </span>
        </div>
        <Link
          to="/auth"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 glow-primary"
        >
          Sign in / 登入
        </Link>
      </header>

      {/* Hero */}
      <main className="relative z-10 mx-auto max-w-6xl px-6">
        <section className="flex flex-col items-center pb-24 pt-16 text-center sm:pt-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              機票降價通知
            </span>
          </div>
          <h1
            className="mt-6 max-w-3xl animate-fade-up text-4xl font-bold leading-tight tracking-tight sm:text-6xl"
            style={{ animationDelay: "100ms" }}
          >
            <span className="text-gradient">設定航線與目標價，</span>
            <br />
            機票降價就通知你
          </h1>
          <p
            className="mt-6 max-w-xl animate-fade-up text-base text-muted-foreground sm:text-lg"
            style={{ animationDelay: "200ms" }}
          >
            Set a route and a target price — we email you when the fare drops.
          </p>
          <div
            className="mt-10 animate-fade-up"
            style={{ animationDelay: "300ms" }}
          >
            <Link
              to="/auth"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:brightness-110 glow-primary"
            >
              Sign in / 登入
            </Link>
          </div>

          {/* Floating plane accent */}
          <div
            aria-hidden
            className="pointer-events-none mt-16 animate-float text-primary/40"
          >
            <Plane className="size-10 rotate-45" />
          </div>
        </section>

        {/* Features */}
        <section className="grid gap-6 pb-28 sm:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 120}>
              <article className="group h-full rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/40">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="size-5.5" />
                </div>
                <h2 className="mt-5 text-lg font-semibold tracking-tight">
                  {feature.title}
                </h2>
                <p className="mt-1 text-sm font-medium text-primary">
                  {feature.subtitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            </Reveal>
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

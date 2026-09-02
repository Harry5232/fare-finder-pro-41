import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Plane, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Flight Price Notifier" },
      {
        name: "description",
        content: "Sign in to manage your fare alerts.",
      },
      { property: "og:title", content: "Sign in — Flight Price Notifier" },
      { property: "og:description", content: "Sign in to manage your fare alerts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotice(null);

    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setLoading(false);
      if (error) {
        setError(error.message);
        return;
      }
      navigate({ to: "/dashboard" });
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      setLoading(false);
      if (error) {
        setError(error.message);
        return;
      }
      if (!data.session) {
        setNotice("Check your email to confirm your account, then sign in.");
        setMode("signin");
        return;
      }
      navigate({ to: "/dashboard" });
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[640px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.55 0.2 293 / 60%), transparent)",
        }}
      />

      <div className="relative z-10 w-full max-w-sm animate-fade-up">
        <Link
          to="/"
          className="mb-8 flex items-center justify-center gap-2.5 text-foreground"
        >
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Plane className="size-4.5" />
          </div>
          <span className="text-base font-semibold tracking-tight">
            Flight Price Notifier
          </span>
        </Link>

        <div className="rounded-2xl border border-border bg-card p-8">
          <h1 className="text-xl font-semibold tracking-tight">
            Welcome back．登入
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Sign in to manage your fare alerts.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                autoComplete={
                  mode === "signin" ? "current-password" : "new-password"
                }
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-ring"
              />
            </div>

            {error && (
              <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive">
                {error}
              </p>
            )}
            {notice && (
              <p className="rounded-lg border border-primary/40 bg-primary/10 px-3.5 py-2.5 text-sm text-primary">
                {notice}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-60 glow-primary"
            >
              {loading && <Loader2 className="size-4 animate-spin" />}
              {mode === "signin" ? "Sign in / 登入" : "Create account / 註冊"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError(null);
              setNotice(null);
            }}
            className="mt-5 w-full text-center text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            {mode === "signin"
              ? "No account yet? Create one"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}

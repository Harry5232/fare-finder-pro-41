import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plane, Loader2 } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { useDocumentTitle } from "@/lib/use-document-title";

type Mode = "signin" | "signup";

export function AuthPage({ initialMode }: { initialMode: Mode }) {
  useDocumentTitle("Sign in — Flight Price Notifier");
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setLoading(true);

    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      navigate("/app");
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      if (!data.session) {
        setNotice("Check your email to confirm your account, then sign in.");
        setMode("signin");
        setLoading(false);
        return;
      }
      navigate("/app");
    }
  }

  function toggleMode() {
    const next = mode === "signin" ? "signup" : "signin";
    setMode(next);
    setError(null);
    setNotice(null);
    navigate(next === "signin" ? "/sign-in" : "/sign-up");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div className="glow-orb -top-32 left-1/2 h-96 w-150 -translate-x-1/2" />

      <div className="animate-fade-up relative z-10 w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Link to="/" className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/30">
            <Plane className="h-6 w-6 text-primary-foreground" />
          </Link>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
            {mode === "signin" ? "Welcome back．登入" : "Create account．註冊"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to manage your fare alerts.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-card/70 p-7 backdrop-blur"
        >
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-card-foreground"
              >
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
                className="w-full rounded-lg border border-input bg-input px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-card-foreground"
              >
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
                className="w-full rounded-lg border border-input bg-input px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive">
              {error}
            </p>
          )}
          {notice && (
            <p className="mt-4 rounded-lg border border-primary/40 bg-primary/10 px-3.5 py-2.5 text-sm text-foreground">
              {notice}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "signin" ? "Sign in / 登入" : "Create account / 註冊"}
          </button>

          <button
            type="button"
            onClick={toggleMode}
            className="mt-5 w-full text-center text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            {mode === "signin"
              ? "No account yet? Create one"
              : "Already have an account? Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

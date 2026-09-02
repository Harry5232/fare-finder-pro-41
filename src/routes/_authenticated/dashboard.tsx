import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plane, LogOut, Bell } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Flight Price Notifier" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const navigate = useNavigate();
  const { user } = Route.useRouteContext();

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[640px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.55 0.2 293 / 60%), transparent)",
        }}
      />

      <header className="relative z-10 mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Plane className="size-4.5" />
          </div>
          <span className="text-base font-semibold tracking-tight">
            Flight Price Notifier
          </span>
        </div>
        <button
          onClick={handleSignOut}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
        >
          <LogOut className="size-4" />
          Sign out / 登出
        </button>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-16">
        <div className="animate-fade-up">
          <h1 className="text-3xl font-bold tracking-tight">
            你的降價通知 <span className="text-gradient">Fare alerts</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Signed in as {user.email}
          </p>
        </div>

        <div
          className="mt-10 flex animate-fade-up flex-col items-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-20 text-center"
          style={{ animationDelay: "150ms" }}
        >
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <Bell className="size-6" />
          </div>
          <h2 className="mt-5 text-lg font-semibold">
            還沒有任何航線通知
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Route subscriptions and target-price alerts are coming in the next
            milestone. 航線訂閱與目標價設定即將推出，敬請期待。
          </p>
        </div>
      </main>
    </div>
  );
}

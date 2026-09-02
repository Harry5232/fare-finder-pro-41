import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Plane, LogOut, Bell } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { useAuthUser } from "@/lib/auth-context";
import { useDocumentTitle } from "@/lib/use-document-title";

export function DashboardPage() {
  useDocumentTitle("Your fare alerts — Flight Price Notifier");
  const user = useAuthUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate("/sign-in", { replace: true });
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="glow-orb -top-40 left-1/2 h-125 w-200 -translate-x-1/2" />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/30">
            <Plane className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Flight Price Notifier
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-muted-foreground sm:block">
            {user.email}
          </span>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-3.5 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="animate-fade-up">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Your fare alerts
          </h1>
          <p className="mt-2 text-muted-foreground">
            Signed in as {user.email}
          </p>
        </div>

        <div className="animate-fade-up-delay-1 mt-10 flex flex-col items-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
            <Bell className="h-7 w-7 text-primary" />
          </div>
          <h2 className="mt-6 text-lg font-semibold text-card-foreground">
            還沒有追蹤任何航線
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Route subscriptions and target-price alerts are coming soon. You'll
            be able to watch routes from Taipei and get emailed when fares drop.
          </p>
        </div>
      </main>
    </div>
  );
}

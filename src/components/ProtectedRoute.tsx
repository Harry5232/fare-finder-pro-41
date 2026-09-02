import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import type { User } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";
import { AuthUserProvider } from "@/lib/auth-context";

type AuthState =
  | { status: "loading"; user: null }
  | { status: "authed"; user: User }
  | { status: "unauthed"; user: null };

// Client-side auth guard: replaces the TanStack `beforeLoad` redirect.
// Unauthenticated visitors are sent to /sign-in; authenticated ones get the
// user injected via context for child routes to read with useAuthUser().
export function ProtectedRoute() {
  const [state, setState] = useState<AuthState>({ status: "loading", user: null });

  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({ data, error }) => {
      if (!active) return;
      if (error || !data.user) {
        setState({ status: "unauthed", user: null });
      } else {
        setState({ status: "authed", user: data.user });
      }
    });
    return () => {
      active = false;
    };
  }, []);

  if (state.status === "loading") return null;
  if (state.status === "unauthed") return <Navigate to="/sign-in" replace />;

  return (
    <AuthUserProvider value={state.user}>
      <Outlet />
    </AuthUserProvider>
  );
}

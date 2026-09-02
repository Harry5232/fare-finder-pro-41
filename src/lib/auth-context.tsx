import { createContext, useContext } from "react";
import type { User } from "@supabase/supabase-js";

const AuthUserContext = createContext<User | null>(null);

export const AuthUserProvider = AuthUserContext.Provider;

// Read the authenticated user inside a route guarded by <ProtectedRoute />.
export function useAuthUser(): User {
  const user = useContext(AuthUserContext);
  if (!user) {
    throw new Error("useAuthUser must be used within an authenticated route");
  }
  return user;
}

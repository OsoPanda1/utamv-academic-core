import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { AuthSession, UserIdentity } from "./index";

export function useAuthSession(): AuthSession {
  const [session, setSession] = useState<AuthSession>({ user: null, accessToken: null });

  useEffect(() => {
    let isMounted = true;

    const toUserIdentity = (rawUser: { id: string; email?: string | null; user_metadata?: unknown; app_metadata?: unknown }): UserIdentity => {
      const userMetadata = (rawUser.user_metadata as Record<string, unknown> | null) ?? {};
      const appMetadata = (rawUser.app_metadata as Record<string, unknown> | null) ?? {};
      const role = (appMetadata.role as UserIdentity["role"] | undefined) ?? "student";

      return {
        id: rawUser.id,
        email: rawUser.email ?? "",
        displayName: (userMetadata.full_name as string | undefined) ?? rawUser.email ?? "",
        role,
      };
    };

    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      if (!isMounted || !data.session?.user) {
        setSession({ user: null, accessToken: null });
        return;
      }

      setSession({
        user: toUserIdentity(data.session.user),
        accessToken: data.session.access_token,
      });
    }

    void loadSession();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!isMounted || !newSession?.user) {
        setSession({ user: null, accessToken: null });
        return;
      }

      setSession({
        user: toUserIdentity(newSession.user),
        accessToken: newSession.access_token,
      });
    });

    return () => {
      isMounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  return session;
}

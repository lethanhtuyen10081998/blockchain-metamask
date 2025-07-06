import { create } from "zustand";
import { createBrowserClient } from "@supabase/ssr";
import type { Session, User } from "@supabase/supabase-js";
import { supabaseBrowser } from "../provider/supabase-client";

type AuthState = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabaseBrowser.auth.signInWithPassword({
      email,
      password,
    });

    if (data.session) {
      set({ user: data.user, session: data.session });
    }

    return { error };
  },

  signUp: async (email: string, password: string) => {
    const { data, error } = await supabaseBrowser.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (data.session) {
      set({ user: data.user, session: data.session });
    }

    return { error };
  },

  signOut: async () => {
    await supabaseBrowser.auth.signOut();
    set({ user: null, session: null });
  },

  refreshSession: async () => {
    const { data } = await supabaseBrowser.auth.getSession();
    set({
      user: data.session?.user ?? null,
      session: data.session,
      isLoading: false,
    });
  },
}));

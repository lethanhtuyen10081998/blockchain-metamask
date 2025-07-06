import { supabase } from "@/lib/supabase/provider/supabaseClient";

export const userService = {
  async findOrCreate(walletAddress: string) {
    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("wallet_address", walletAddress)
      .single();

    if (user) return user;

    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert([{ wallet_address: walletAddress }])
      .select()
      .single();

    if (insertError) throw insertError;

    return newUser;
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data;
  },
};

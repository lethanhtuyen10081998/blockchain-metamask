"use client";

import PasswordField from "@/components/material/form/password";
import TextField from "@/components/material/form/textfield";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/supabase/services/user-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export type SignInForm = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const router = useRouter();
  const forms = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
      })
    ),
    defaultValues: {
      email: "lethanhtuyen10081998@gmail.com",
      password: "Tuyen@123",
    },
  });

  const { signIn } = useAuthStore();

  const onSubmit = async (data: SignInForm) => {
    const { error } = await signIn(data.email, data.password);

    if (error) {
      console.error(error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500">
      <div className="w-[400px] bg-white rounded-lg p-4">
        <FormProvider {...forms}>
          <form
            onSubmit={forms.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <div className="flex flex-col gap-2 items-center mb-5">
              <h1 className="text-2xl font-bold">Sign In</h1>
              <p className="text-sm text-gray-500">
                Sign in to your account to continue
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <TextField
                name="email"
                label="Email"
                placeholder="Enter your email"
              />
              <PasswordField
                name="password"
                label="Password"
                placeholder="Enter your password"
              />

              <Button type="submit">Sign In</Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

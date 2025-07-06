import SignInPage from "@/components/pages/sign-in";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign In to your account",
};

export default function WalletLogin() {
  return <SignInPage />;
}

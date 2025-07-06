import HomePage from "@/components/pages/home";
import { Metadata } from "next";

export default function Home() {
  return <HomePage />;
}

export const metadata: Metadata = {
  title: "My Wallet",
  description: "My Wallet",
};

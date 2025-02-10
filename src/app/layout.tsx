import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import type React from "react";
import { PostHogProvider } from "./_providers/posthog-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Google Drive Clone",
  description: "A simple Google Drive clone UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={`${inter.className} min-h-screen bg-gray-900 text-gray-100`}
        >
          <PostHogProvider>{children}</PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

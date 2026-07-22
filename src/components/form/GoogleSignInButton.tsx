"use client";

import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { getFirebaseAuth, googleProvider } from "@/lib/firebase";
import { signInWithGoogleAction } from "@/actions/auth";
import { FcGoogle } from "react-icons/fc";

export default function GoogleSignInButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGoogleSignIn() {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Open Google sign-in popup via Firebase client SDK
      const result = await signInWithPopup(getFirebaseAuth(), googleProvider);

      // 2. Get the ID token from the signed-in user
      const idToken = await result.user.getIdToken();

      // 3. Send it to the server action to create session
      const response = await signInWithGoogleAction(idToken);

      if (response?.error) {
        setError(response.error);
      }
      // On success, the server action redirects to /configure/design
    } catch (err: any) {
      // Ignore Next.js redirect exceptions
      if (err?.digest?.startsWith("NEXT_REDIRECT") || err?.message === "NEXT_REDIRECT") {
        return;
      }
      // Handle user cancellation gracefully
      if (err?.code === "auth/popup-closed-by-user") {
        setIsLoading(false);
        return;
      }
      console.error("Google sign-in error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {error && (
        <div className="bg-destructive/10 text-destructive text-sm px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="w-full !py-3 !rounded-md flex items-center justify-center gap-3 border border-border hover:bg-muted/50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="size-5 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
        ) : (
          <FcGoogle className="size-5" />
        )}
        <span className="font-medium text-sm">
          {isLoading ? "Signing in..." : "Continue with Google"}
        </span>
      </button>
    </div>
  );
}

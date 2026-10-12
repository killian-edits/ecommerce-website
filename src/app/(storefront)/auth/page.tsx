"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, User, ShieldCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    if (isSignUp) {
      const { error } = await signUpWithEmail(email, password, fullName);
      if (error) {
        setErrorMsg(error.message);
      } else {
        router.push("/account");
      }
    } else {
      const { error } = await signInWithEmail(email, password);
      if (error) {
        setErrorMsg(error.message);
      } else {
        router.push("/account");
      }
    }
    setLoading(false);
  };

  return (
    <div className="container-main py-16 md:py-24 max-w-md mx-auto">
      <div className="bg-white p-8 rounded-2xl border border-subtle shadow-card space-y-6">
        <div className="text-center space-y-2">
          <span className="font-serif text-3xl font-bold tracking-tight">LUXE</span>
          <h2 className="text-xl font-bold text-primary-text">
            {isSignUp ? "Create a Patron Account" : "Access Your Wardrobe"}
          </h2>
          <p className="text-xs text-secondary-text">
            {isSignUp
              ? "Join for private trunk shows, express checkout, and archived orders."
              : "Sign in with your email or social credentials."}
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 text-destructive text-xs rounded-lg border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <Input
              label="Full Name"
              icon={<User size={16} />}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          )}

          <Input
            label="Email Address"
            type="email"
            icon={<Mail size={16} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            icon={<Lock size={16} />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button variant="primary" fullWidth size="lg" type="submit" isLoading={loading}>
            <span className="flex items-center justify-center gap-2">
              {isSignUp ? "Establish Membership" : "Sign In"}
              <ArrowRight size={16} />
            </span>
          </Button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-subtle"></div>
          <span className="flex-shrink mx-4 text-[11px] uppercase tracking-wider text-secondary-text">
            or continue with
          </span>
          <div className="flex-grow border-t border-subtle"></div>
        </div>

        <button
          type="button"
          onClick={signInWithGoogle}
          className="w-full py-3 px-4 border border-subtle rounded-lg text-xs font-semibold text-primary-text hover:bg-neutral-50 flex items-center justify-center gap-2 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          Google OAuth Verification
        </button>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-secondary-text hover:text-accent font-medium transition-colors"
          >
            {isSignUp
              ? "Already hold a patron membership? Sign In"
              : "New to LUXE? Create an Account"}
          </button>
        </div>
      </div>
    </div>
  );
}


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import { Sparkles, Mail, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();
  const router = useRouter();

  const isGoogleConfigured =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID &&
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID !== "" &&
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID !== "dummy-client-id";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signIn(email, password);
      router.push("/chat");
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setError("");
    setIsLoading(true);

    try {
      if (credentialResponse.credential) {
        await signInWithGoogle(credentialResponse.credential);
        router.push("/chat");
      }
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setError("");
      setIsLoading(true);

      try {
        // Fetch user info from Google
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );

        const userInfo = await userInfoResponse.json();

        // Create a mock credential for our signInWithGoogle function
        const mockCredential = btoa(
          JSON.stringify({
            email: userInfo.email,
            name: userInfo.name,
            picture: userInfo.picture,
            sub: userInfo.sub,
          })
        );

        await signInWithGoogle(mockCredential);
        router.push("/chat");
      } catch (err: any) {
        setError(err.message || "Failed to sign in with Google");
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      setError("Google sign-in failed");
    },
  });

  return (
    <div className="relative min-h-screen bg-sand-50 dark:bg-gray-900 overflow-hidden flex items-center justify-center p-6">
      {/* Decorative background */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-terra-200/20 dark:bg-terra-800/10 organic-blob" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-olive-200/20 dark:bg-olive-800/10 organic-blob-2" />
      </div>

      <div className="relative w-full max-w-md" style={{ zIndex: 2 }}>
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-terra-500 to-terra-700 organic-blob flex items-center justify-center shadow-lg">
              <Sparkles className="w-7 h-7 text-sand-50" strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-serif italic text-olive-900 dark:text-sand-100">
              Elena
            </h1>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-olive-600/20 dark:border-olive-600/30 rounded-[32px] p-8 shadow-2xl">
          <h2 className="text-3xl font-serif italic text-olive-900 dark:text-sand-100 mb-2">
            Welcome back
          </h2>
          <p className="text-olive-600 dark:text-olive-400 mb-8 font-medium">
            Sign in to continue your conversations
          </p>

          {error && (
            <div className="mb-6 p-4 bg-terra-100 dark:bg-terra-900/30 border-2 border-terra-500/40 rounded-2xl flex items-start gap-3">
              <AlertCircle
                className="w-5 h-5 text-terra-700 dark:text-terra-400 flex-shrink-0 mt-0.5"
                strokeWidth={2.5}
              />
              <p className="text-sm font-medium text-terra-900 dark:text-terra-300">
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-olive-800 dark:text-olive-300 mb-2 tracking-wide uppercase">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-olive-500"
                  strokeWidth={2.5}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-5 py-3.5 border-2 border-olive-600/30 dark:border-olive-600 rounded-3xl focus:outline-none focus:ring-2 focus:ring-terra-500 focus:border-terra-500 bg-white dark:bg-gray-700 text-olive-900 dark:text-sand-100 font-medium transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-olive-800 dark:text-olive-300 mb-2 tracking-wide uppercase">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-olive-500"
                  strokeWidth={2.5}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-3.5 border-2 border-olive-600/30 dark:border-olive-600 rounded-3xl focus:outline-none focus:ring-2 focus:ring-terra-500 focus:border-terra-500 bg-white dark:bg-gray-700 text-olive-900 dark:text-sand-100 font-medium transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-olive-500 hover:text-olive-700 dark:hover:text-olive-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-br from-terra-500 to-terra-700 hover:from-terra-600 hover:to-terra-800 text-sand-50 rounded-3xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-olive-600/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-800 text-olive-600 dark:text-olive-400 font-semibold">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Sign In - Only show if configured */}
            {isGoogleConfigured ? (
              <button
                type="button"
                onClick={() => googleLogin()}
                disabled={isLoading}
                className="w-full py-4 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-olive-900 dark:text-sand-100 border-2 border-olive-600/30 dark:border-olive-600 rounded-3xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </button>
            ) : (
              <div className="p-4 bg-olive-100/50 dark:bg-olive-900/20 border-2 border-olive-600/20 rounded-2xl">
                <p className="text-sm text-olive-700 dark:text-olive-300 text-center">
                  <strong>Google Sign-In not configured.</strong>
                  <br />
                  See{" "}
                  <code className="text-xs bg-olive-200 dark:bg-olive-800 px-2 py-1 rounded">
                    GOOGLE_SETUP_QUICK.md
                  </code>{" "}
                  for setup instructions.
                </p>
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-olive-600 dark:text-olive-400 font-medium">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-terra-600 dark:text-terra-400 hover:text-terra-700 dark:hover:text-terra-300 font-semibold"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-olive-600 dark:text-olive-400 hover:text-terra-600 dark:hover:text-terra-400 font-semibold transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

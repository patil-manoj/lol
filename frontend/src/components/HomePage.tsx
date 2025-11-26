"use client";

import { useRouter } from "next/navigation";
import {
  Sparkles,
  MessageCircle,
  Brain,
  Shield,
  Mic,
  Heart,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-sand-50 dark:bg-gray-900 overflow-hidden">
      {/* Decorative background elements */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <div
          className="absolute -top-40 -left-40 w-96 h-96 bg-terra-200/20 dark:bg-terra-800/10 organic-blob float-particle"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-1/3 -right-64 w-[600px] h-[600px] bg-olive-200/15 dark:bg-olive-800/10 organic-blob-2 float-particle"
          style={{ animationDelay: "7s" }}
        />
        <div
          className="absolute -bottom-48 left-1/4 w-[500px] h-[500px] bg-sand-300/10 dark:bg-sand-800/5 organic-blob float-particle"
          style={{ animationDelay: "14s" }}
        />
      </div>

      {/* Content */}
      <div className="relative" style={{ zIndex: 2 }}>
        {/* Navigation */}
        <nav className="border-b-2 border-olive-600/20 dark:border-olive-400/20 bg-sand-100/80 dark:bg-gray-900/80 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-terra-500 to-terra-700 organic-blob flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-sand-50" strokeWidth={2.5} />
              </div>
              <h1 className="text-2xl font-serif italic text-olive-900 dark:text-sand-100">
                Elena
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/signin")}
                className="px-6 py-2.5 text-olive-800 dark:text-olive-200 hover:text-terra-700 dark:hover:text-terra-400 font-semibold transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="px-6 py-3 bg-gradient-to-br from-terra-500 to-terra-700 hover:from-terra-600 hover:to-terra-800 text-sand-50 rounded-[24px] font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-20 pb-24 md:pt-32 md:pb-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block px-5 py-2 bg-terra-100 dark:bg-terra-900/30 border-2 border-terra-500/30 rounded-full">
                <p className="text-sm font-semibold text-terra-700 dark:text-terra-400 tracking-wide uppercase">
                  AI-Powered Voice Companion
                </p>
              </div>

              <h2 className="text-6xl md:text-7xl font-serif italic text-olive-900 dark:text-sand-100 leading-tight">
                Your personal
                <span className="block text-terra-600 dark:text-terra-500 mt-2">
                  voice companion
                </span>
              </h2>

              <p className="text-xl text-olive-700 dark:text-olive-300 leading-relaxed max-w-xl font-medium">
                Elena listens, understands, and responds with empathy.
                Experience natural conversations powered by AI that adapts to
                your unique voice and needs.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => router.push("/signup")}
                  className="group px-8 py-4 bg-gradient-to-br from-terra-500 to-terra-700 hover:from-terra-600 hover:to-terra-800 text-sand-50 rounded-[28px] font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3"
                >
                  Start Talking
                  <ArrowRight
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    strokeWidth={2.5}
                  />
                </button>
                <button
                  onClick={() => router.push("/signin")}
                  className="px-8 py-4 bg-olive-100 dark:bg-olive-900/30 hover:bg-olive-200 dark:hover:bg-olive-800/50 text-olive-900 dark:text-olive-100 border-2 border-olive-600/30 rounded-[28px] font-semibold transition-all duration-300"
                >
                  Sign In
                </button>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="relative z-10">
                <div className="w-full aspect-square max-w-md mx-auto bg-gradient-to-br from-terra-400 via-terra-500 to-olive-600 organic-blob flex items-center justify-center shadow-2xl">
                  <Mic className="w-32 h-32 text-sand-50" strokeWidth={1.5} />
                </div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-olive-500/30 organic-blob-2 blur-sm" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-terra-400/20 organic-blob blur-md" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gradient-to-b from-sand-100 to-sand-50 dark:from-gray-800 dark:to-gray-900 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-serif italic text-olive-900 dark:text-sand-100 mb-4">
                Why choose Elena?
              </h3>
              <p className="text-lg text-olive-600 dark:text-olive-400 max-w-2xl mx-auto font-medium">
                More than just a chatbot—a companion that grows with you
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: MessageCircle,
                  title: "Natural Conversations",
                  description:
                    "Speak naturally and Elena understands context, emotion, and intent through advanced AI.",
                  color: "terra",
                },
                {
                  icon: Brain,
                  title: "Personalized Learning",
                  description:
                    "With your consent, Elena remembers your preferences and adapts her tone to match your style.",
                  color: "olive",
                },
                {
                  icon: Shield,
                  title: "Privacy First",
                  description:
                    "Your data, your choice. Control what's stored and delete your history anytime.",
                  color: "sand",
                },
                {
                  icon: Heart,
                  title: "Emotional Support",
                  description:
                    "Elena recognizes emotional cues and responds with empathy and understanding.",
                  color: "terra",
                },
                {
                  icon: Mic,
                  title: "Voice-First Design",
                  description:
                    "Built for hands-free interaction. Just speak and Elena responds in real-time.",
                  color: "olive",
                },
                {
                  icon: Sparkles,
                  title: "Always Improving",
                  description:
                    "Continuous updates bring new features and smarter responses to enhance your experience.",
                  color: "sand",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="stagger-item p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-2 border-olive-600/20 dark:border-olive-600/30 rounded-[32px] hover:border-terra-500/40 transition-all duration-300 hover:shadow-xl group"
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-br from-${feature.color}-400 to-${feature.color}-600 organic-blob flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon
                      className="w-7 h-7 text-sand-50"
                      strokeWidth={2.5}
                    />
                  </div>
                  <h4 className="text-2xl font-serif italic text-olive-900 dark:text-sand-100 mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-olive-700 dark:text-olive-300 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="relative overflow-hidden bg-gradient-to-br from-terra-500 via-terra-600 to-olive-700 rounded-[48px] p-12 md:p-16 text-center shadow-2xl">
            <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl font-serif italic text-sand-50 mb-6">
                Ready to start your journey?
              </h3>
              <p className="text-xl text-sand-100 mb-8 max-w-2xl mx-auto font-medium">
                Join thousands who trust Elena for meaningful conversations
                every day.
              </p>
              <button
                onClick={() => router.push("/signup")}
                className="px-10 py-5 bg-sand-50 hover:bg-white text-terra-700 rounded-[28px] font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Create Free Account
              </button>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-olive-400/20 organic-blob blur-2xl" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-terra-300/20 organic-blob-2 blur-2xl" />
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t-2 border-olive-600/20 dark:border-olive-400/20 bg-sand-100/80 dark:bg-gray-900/80 backdrop-blur-xl mt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-olive-600 dark:text-olive-400 font-medium">
                © 2025 Elena. Built with care for meaningful conversations.
              </p>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="text-olive-600 dark:text-olive-400 hover:text-terra-600 dark:hover:text-terra-400 font-semibold transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="text-olive-600 dark:text-olive-400 hover:text-terra-600 dark:hover:text-terra-400 font-semibold transition-colors"
                >
                  Terms
                </a>
                <a
                  href="#"
                  className="text-olive-600 dark:text-olive-400 hover:text-terra-600 dark:hover:text-terra-400 font-semibold transition-colors"
                >
                  Support
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Shield, Database, Brain, Check, X } from "lucide-react";

export default function OnboardingPage() {
  const [allowChatStorage, setAllowChatStorage] = useState(false);
  const [allowPersonalization, setAllowPersonalization] = useState(false);
  const { updatePreferences } = useAuth();
  const router = useRouter();

  const handleContinue = () => {
    updatePreferences({
      allowChatStorage,
      allowPersonalization,
    });
    router.push("/chat");
  };

  return (
    <div className="relative min-h-screen bg-sand-50 dark:bg-gray-900 overflow-hidden flex items-center justify-center p-6">
      {/* Decorative background */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-terra-200/20 dark:bg-terra-800/10 organic-blob float-particle" />
        <div
          className="absolute -bottom-40 right-1/4 w-96 h-96 bg-olive-200/20 dark:bg-olive-800/10 organic-blob-2 float-particle"
          style={{ animationDelay: "5s" }}
        />
      </div>

      <div className="relative w-full max-w-2xl" style={{ zIndex: 2 }}>
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-olive-600/20 dark:border-olive-600/30 rounded-[40px] p-10 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-br from-terra-500 to-terra-700 organic-blob flex items-center justify-center shadow-lg mx-auto mb-6">
              <Shield className="w-10 h-10 text-sand-50" strokeWidth={2.5} />
            </div>
            <h1 className="text-4xl font-serif italic text-olive-900 dark:text-sand-100 mb-3">
              Your Privacy Matters
            </h1>
            <p className="text-lg text-olive-600 dark:text-olive-400 font-medium max-w-xl mx-auto">
              Before we begin, let's set up how Elena works for you. You can
              change these preferences anytime.
            </p>
          </div>

          {/* Consent Options */}
          <div className="space-y-6 mb-10">
            {/* Chat Storage */}
            <div
              onClick={() => setAllowChatStorage(!allowChatStorage)}
              className={`cursor-pointer p-6 border-2 rounded-[28px] transition-all duration-300 ${
                allowChatStorage
                  ? "bg-terra-50 dark:bg-terra-900/20 border-terra-500 shadow-lg"
                  : "bg-olive-50/50 dark:bg-olive-900/10 border-olive-600/30 hover:border-olive-600/50"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                    allowChatStorage ? "bg-terra-500" : "bg-olive-400"
                  }`}
                >
                  <Database
                    className="w-6 h-6 text-sand-50"
                    strokeWidth={2.5}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-serif italic text-olive-900 dark:text-sand-100">
                      Save Chat History
                    </h3>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                        allowChatStorage
                          ? "bg-terra-500 border-terra-500"
                          : "bg-transparent border-olive-400"
                      }`}
                    >
                      {allowChatStorage && (
                        <Check
                          className="w-5 h-5 text-sand-50"
                          strokeWidth={3}
                        />
                      )}
                    </div>
                  </div>
                  <p className="text-olive-700 dark:text-olive-300 leading-relaxed font-medium">
                    Store your conversations securely so you can review past
                    chats and maintain context across sessions.
                  </p>
                  {allowChatStorage && (
                    <div className="mt-3 text-sm text-terra-700 dark:text-terra-400 font-semibold">
                      ✓ Your chats will be saved locally on your device
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Personalization */}
            <div
              onClick={() => setAllowPersonalization(!allowPersonalization)}
              className={`cursor-pointer p-6 border-2 rounded-[28px] transition-all duration-300 ${
                allowPersonalization
                  ? "bg-terra-50 dark:bg-terra-900/20 border-terra-500 shadow-lg"
                  : "bg-olive-50/50 dark:bg-olive-900/10 border-olive-600/30 hover:border-olive-600/50"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                    allowPersonalization ? "bg-terra-500" : "bg-olive-400"
                  }`}
                >
                  <Brain className="w-6 h-6 text-sand-50" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-serif italic text-olive-900 dark:text-sand-100">
                      Enable Personalization
                    </h3>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                        allowPersonalization
                          ? "bg-terra-500 border-terra-500"
                          : "bg-transparent border-olive-400"
                      }`}
                    >
                      {allowPersonalization && (
                        <Check
                          className="w-5 h-5 text-sand-50"
                          strokeWidth={3}
                        />
                      )}
                    </div>
                  </div>
                  <p className="text-olive-700 dark:text-olive-300 leading-relaxed font-medium">
                    Let Elena learn your preferences and communication style to
                    provide more tailored, empathetic responses.
                  </p>
                  {allowPersonalization && (
                    <div className="mt-3 text-sm text-terra-700 dark:text-terra-400 font-semibold">
                      ✓ Elena will adapt her tone and suggestions based on your
                      conversations
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="mb-8 p-5 bg-olive-100/50 dark:bg-olive-900/20 border-2 border-olive-600/20 rounded-[24px]">
            <p className="text-sm text-olive-800 dark:text-olive-200 font-medium leading-relaxed">
              <Shield
                className="w-4 h-4 inline mr-2 text-olive-600"
                strokeWidth={2.5}
              />
              Your data is stored locally on your device. You can delete your
              history or change these settings anytime from the settings menu.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleContinue}
              className="flex-1 py-4 bg-gradient-to-br from-terra-500 to-terra-700 hover:from-terra-600 hover:to-terra-800 text-sand-50 rounded-3xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {allowChatStorage || allowPersonalization
                ? "Continue with Selected Preferences"
                : "Continue Without Saving"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

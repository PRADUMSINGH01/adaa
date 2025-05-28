"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";

export function WishListAlert() {
  const { data: session } = useSession();
  const [showWelcomeAlert, setShowWelcomeAlert] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setShowWelcomeAlert(true);
      const timer = setTimeout(() => {
        setShowWelcomeAlert(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [session]);

  return (
    <AnimatePresence>
      {showWelcomeAlert && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[1001]"
        >
          <div className="relative bg-gradient-to-br from-primary to-primary-700 backdrop-blur-lg text-white px-6 py-4 rounded-xl shadow-2xl flex items-start gap-4 border border-primary-300/30">
            {/* Progress Bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-accent/80 rounded-b-xl"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 4, ease: "linear" }}
            />

            {/* Icon Container */}
            <div className="shrink-0 p-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/10">
              <FiCheckCircle className="h-7 w-7 text-accent" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-xl font-bold tracking-tight mb-1">
                Welcome back,{" "}
                <span className="text-accent">{session?.user?.name}</span>!
              </h3>
              <p className="text-sm opacity-90 font-medium">
                You're now securely signed in to your account
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowWelcomeAlert(false)}
              className="ml-2 p-1 hover:bg-white/10 rounded-full transition-colors group"
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-5 w-5 group-hover:rotate-90 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

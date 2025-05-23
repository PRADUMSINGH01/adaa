"use client";
// components/GoogleSignInButton.tsx
// import {
//   signInWithGoogle,
//   verifyTokenWithBackend,
// } from "@/server/firebase/firebase_Client";
import { FcGoogle } from "react-icons/fc";

const GoogleSignInButton = () => {
  // const handleSignIn = async () => {
  //   const { token, error } = await signInWithGoogle();

  //   if (error) {
  //     console.error("Sign-in error:", error);
  //     return;
  //   }

  //   if (token) {
  //     try {
  //       const verification = await verifyTokenWithBackend(token);
  //       console.log("Verified user:", verification.user);
  //       // Store user session (e.g., in context/state/store)
  //     } catch (verificationError) {
  //       console.error("Verification error:", verificationError);
  //     }
  //   }
  // };

  return (
    <button className="w-full p-3 bg-white border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
      <FcGoogle className="w-6 h-6" />
      <span className="font-poppins text-dark"></span>
    </button>
  );
};

export default GoogleSignInButton;

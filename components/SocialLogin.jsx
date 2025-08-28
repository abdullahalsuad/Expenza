"use client";

import { Zap } from "lucide-react";
import { signIn } from "next-auth/react";

const SocialLogin = () => {
  const handleAuth = () => {
    signIn("google", { callbackUrl: "/" });
  };
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={handleAuth}
        className="flex items-center justify-center gap-2 py-2.5 
                                    border border-gray-300 dark:border-gray-600 
                                    rounded-lg bg-white dark:bg-gray-700 
                                    text-gray-800 dark:text-white text-sm font-medium 
                                    hover:bg-gray-100 dark:hover:bg-gray-600 
                                    transition-colors duration-200"
      >
        <Zap className="w-4 h-4" />
        Log In With Google
      </button>
    </div>
  );
};

export default SocialLogin;

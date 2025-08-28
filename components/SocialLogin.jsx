"use client";

import { Zap } from "lucide-react";
import { signIn } from "next-auth/react";

const SocialLogin = () => {
  const handleAuth = () => {
    signIn("google", { callbackUrl: "/" });
  };
  return (
    <div className="lg:w-6/12 mx-auto text-center mt-10">
      <div className="grid place-items-center">
        <button
          onClick={handleAuth}
          className="flex items-center justify-center gap-2 py-2.5 
                border border-gray-300 rounded-lg bg-blue-900 
                text-gray-800 dark:text-white text-sm font-medium 
                hover:bg-gray-700 transition-colors duration-200 cursor-pointer px-6"
        >
          <Zap className="w-4 h-4" />
          Log In With Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;

'use client';

import { authClient } from '@/lib/auth-client';
import { Lock, LogIn, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function NotLoggedIn() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
      setIsLoading(true)
      try {
        await authClient.signIn.social({
          provider: "google",
          callbackURL: "/"
        })
      } catch (error) {
        console.error("Google login error:", error)
        alert("Failed to login with Google")
      } finally {
        setIsLoading(false)
      }
    }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
   
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
         
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-gray-600" />
            </div>
          </div>

      
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              You are not logged in
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Please sign in to access this page and continue your experience.
            </p>
          </div>

          
          <div className="space-y-3">
            <button 
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg border border-gray-300 transition-colors duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              {isLoading ? 'Signing in...' : 'Continue with Google'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">
                  Or
                </span>
              </div>
            </div>

            <Link href={'login'} className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group">
              <LogIn className="w-4 h-4" />
              Sign in with email
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            
            <Link href={'signup'}>
              <button className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg border border-gray-300 transition-colors duration-200">
                Create an account
              </button>
            </Link>
          </div>

         
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-xs text-gray-500">
              Need help?{' '}
              <a href="#" className="text-gray-900 hover:underline font-medium">
                Contact support
              </a>
            </p>
          </div>
        </div>

       
        <p className="text-center mt-6 text-sm text-gray-600">
          By continuing, you agree to our{' '}
          <a href="#" className="text-gray-900 hover:underline">
            Terms
          </a>{' '}
          and{' '}
          <a href="#" className="text-gray-900 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
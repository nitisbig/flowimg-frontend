



'use client';

import { Lock, LogIn, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function NotLoggedIn() {
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
            <Link href={'login'} className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group">
              <LogIn className="w-4 h-4" />
              Sign in
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
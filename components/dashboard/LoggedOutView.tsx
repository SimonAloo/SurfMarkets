import React from 'react';
import { Button } from "@/components/ui/button";
import { LogIn, Zap, BarChart3, Film, ShieldCheck } from "lucide-react";

export default function LoggedOutView({ onLogin }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 rounded-xl glass-card border-slate-700/50 bg-slate-900/40 min-h-[60vh]">
      <div className="w-16 h-16 trading-gradient rounded-xl flex items-center justify-center shadow-lg mb-6 neon-glow">
        <Zap className="w-8 h-8 text-slate-900" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-3">
        Welcome to TradingBot Pro
      </h2>
      <p className="text-slate-400 max-w-md mb-8">
        Log in to access your AI-powered trading dashboard, track performance, and manage your content.
      </p>
      <Button 
        onClick={onLogin} 
        size="lg"
        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-slate-900 font-semibold shadow-lg text-base"
      >
        <LogIn className="w-5 h-5 mr-2" />
        Login / Sign Up
      </Button>
      <div className="mt-12 text-slate-400">
        <h3 className="font-semibold text-white mb-4">Features include:</h3>
        <div className="flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span>AI Market Analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-red-400" />
            <span>Content Studio</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <span>Admin Panel</span>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Zap, 
  Sparkles,
  TrendingUp,
  Target,
  Search
} from "lucide-react";

export default function SignalGenerator({ onGenerateSignal, isGenerating }) {
  const [symbol, setSymbol] = useState("");
  
  const popularPairs = [
    "BTC/USD", "ETH/USD", "BNB/USD", "XRP/USD", 
    "ADA/USD", "SOL/USD", "DOT/USD", "LINK/USD"
  ];

  const handleGenerate = () => {
    if (symbol.trim()) {
      onGenerateSignal(symbol.trim());
      setSymbol("");
    }
  };

  const handleQuickGenerate = (pair) => {
    onGenerateSignal(pair);
  };

  return (
    <Card className="glass-card border-slate-700/50 bg-slate-900/40">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-white">
          <Brain className="w-5 h-5 text-purple-400" />
          AI Signal Generator
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 ml-2">
            <Sparkles className="w-3 h-3 mr-1" />
            AI Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Enter trading pair (e.g., BTC/USD)"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400"
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            />
          </div>
          <Button
            onClick={handleGenerate}
            disabled={!symbol.trim() || isGenerating}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold shadow-lg"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Generate
              </>
            )}
          </Button>
        </div>

        <div>
          <p className="text-slate-400 text-sm mb-3">Quick Generate:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {popularPairs.map((pair) => (
              <Button
                key={pair}
                variant="outline"
                size="sm"
                onClick={() => handleQuickGenerate(pair)}
                disabled={isGenerating}
                className="border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-cyan-400 transition-colors"
              >
                {pair}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-400 pt-2 border-t border-slate-700/50">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span>Technical Analysis</span>
          </div>
          <div className="flex items-center gap-1">
            <Target className="w-4 h-4 text-blue-400" />
            <span>Market Sentiment</span>
          </div>
          <div className="flex items-center gap-1">
            <Brain className="w-4 h-4 text-purple-400" />
            <span>AI Insights</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
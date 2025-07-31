import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  TrendingUp, 
  TrendingDown,
  Minus
} from "lucide-react";

export default function TechnicalAnalysis() {
  const indicators = [
    { name: "RSI (14)", value: 62, signal: "neutral", color: "text-amber-400" },
    { name: "MACD", value: 0.45, signal: "bullish", color: "text-green-400" },
    { name: "Moving Avg", value: 78, signal: "bullish", color: "text-green-400" },
    { name: "Bollinger", value: 35, signal: "bearish", color: "text-red-400" },
    { name: "Stochastic", value: 82, signal: "overbought", color: "text-amber-400" },
    { name: "Williams %R", value: 28, signal: "oversold", color: "text-green-400" }
  ];

  const getSignalIcon = (signal) => {
    switch (signal) {
      case 'bullish':
        return <TrendingUp className="w-3 h-3" />;
      case 'bearish':
        return <TrendingDown className="w-3 h-3" />;
      default:
        return <Minus className="w-3 h-3" />;
    }
  };

  const getSignalColor = (signal) => {
    switch (signal) {
      case 'bullish':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'bearish':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'overbought':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'oversold':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <Card className="glass-card border-slate-700/50 bg-slate-900/40">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-white">
          <Activity className="w-5 h-5 text-cyan-400" />
          Technical Indicators
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {indicators.map((indicator, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 text-sm">{indicator.name}</span>
              <div className="flex items-center gap-2">
                <span className={`font-medium text-sm ${indicator.color}`}>
                  {typeof indicator.value === 'number' && indicator.value < 10 
                    ? indicator.value.toFixed(2) 
                    : indicator.value}
                </span>
                <Badge size="sm" className={getSignalColor(indicator.signal)}>
                  {getSignalIcon(indicator.signal)}
                  <span className="ml-1 text-xs capitalize">{indicator.signal}</span>
                </Badge>
              </div>
            </div>
            {typeof indicator.value === 'number' && indicator.value <= 100 && (
              <Progress 
                value={indicator.value} 
                className="h-1.5 bg-slate-700"
              />
            )}
          </div>
        ))}

        <div className="pt-4 border-t border-slate-700/50">
          <div className="text-center">
            <p className="text-slate-400 text-sm mb-2">Overall Technical Rating</p>
            <div className="flex items-center justify-center gap-2">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <TrendingUp className="w-3 h-3 mr-1" />
                Buy (65%)
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
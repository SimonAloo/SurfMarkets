import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  TrendingUp, 
  TrendingDown,
  Target,
  AlertTriangle,
  Clock,
  ArrowRight
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function TopSignals({ signals, isLoading }) {
  const getSignalIcon = (signalType) => {
    switch (signalType) {
      case 'buy':
      case 'strong_buy':
        return <TrendingUp className="w-4 h-4" />;
      case 'sell':
      case 'strong_sell':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const getSignalColor = (signalType) => {
    switch (signalType) {
      case 'strong_buy':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'buy':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'strong_sell':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'sell':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-green-400';
    if (confidence >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <Card className="glass-card border-slate-700/50 bg-slate-900/40">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white">
            <Zap className="w-5 h-5 text-amber-400" />
            Active Signals
          </CardTitle>
          <Link to={createPageUrl("MarketAnalysis")}>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-cyan-400">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-700/50">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-lg bg-slate-700" />
                  <div>
                    <Skeleton className="h-4 w-16 mb-1 bg-slate-700" />
                    <Skeleton className="h-3 w-24 bg-slate-700" />
                  </div>
                </div>
                <Skeleton className="h-6 w-16 bg-slate-700" />
              </div>
            ))}
          </div>
        ) : signals.length > 0 ? (
          <div className="space-y-3">
            {signals.slice(0, 5).map((signal) => (
              <div 
                key={signal.id} 
                className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:bg-slate-700/30 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getSignalColor(signal.signal_type)}`}>
                    {getSignalIcon(signal.signal_type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{signal.symbol}</span>
                      <Badge className={getSignalColor(signal.signal_type)}>
                        {signal.signal_type.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400 mt-1">
                      <Clock className="w-3 h-3" />
                      <span>{signal.timeframe}</span>
                      <span>•</span>
                      <span>Entry: ${signal.entry_price?.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-bold ${getConfidenceColor(signal.confidence_level)}`}>
                    {signal.confidence_level}%
                  </div>
                  <div className="text-xs text-slate-500">
                    {signal.signal_strength}/10
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <AlertTriangle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No active signals</p>
            <p className="text-slate-500 text-sm">Signals will appear here when generated</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}